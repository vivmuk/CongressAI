import { veniceChat } from "./venice.js";
import { searchPublications } from "./pubmed.js";
import { searchTrials } from "./clinicaltrials.js";

export async function buildHCPProfile(name, affiliation, congressData) {
  // (a) Extract speaker info from congress data
  const speakers = congressData?.data?.speakers || congressData?.speakers || [];
  const sessions = congressData?.data?.sessions || congressData?.sessions || [];
  const speakerInfo = speakers.find(
    (s) =>
      s.name?.toLowerCase() === name?.toLowerCase() ||
      (affiliation && s.affiliation?.toLowerCase().includes(affiliation.toLowerCase()))
  ) || { name, affiliation, role: null, bio: null, sessions: [], topics: [] };

  // Find sessions this speaker is in
  const speakerSessions = sessions.filter((s) =>
    s.speakers?.some((sp) => sp?.toLowerCase().includes(name?.toLowerCase()))
  );

  const speakingHistory = speakerSessions.map((s) => ({
    session_id: s.id,
    title: s.title,
    date: s.date,
    role: s.speakers?.find((sp) => sp?.toLowerCase().includes(name?.toLowerCase())) || "speaker",
  }));

  // (b) Search PubMed for publications
  const pubQuery = `${name}${affiliation ? ` ${affiliation}` : ""}`;
  let publications = [];
  try {
    publications = await searchPublications(pubQuery, 10);
  } catch (e) {
    console.error("PubMed lookup failed in HCP profile:", e.message);
  }

  // (c) Search ClinicalTrials for trials
  let trials = [];
  try {
    trials = await searchTrials(name, 10);
  } catch (e) {
    console.error("ClinicalTrials lookup failed in HCP profile:", e.message);
  }

  // (d) Use Venice AI to generate summary and influence score
  const summaryPrompt = `Analyze this healthcare professional (HCP) and provide a strategic profile summary.

HCP Name: ${name}
Affiliation: ${affiliation || "Unknown"}

Speaker Info from Congress:
${JSON.stringify(speakerInfo, null, 2)}

Speaking at sessions:
${JSON.stringify(speakingHistory, null, 2)}

Publications (${publications.length} found):
${publications.slice(0, 5).map((p) => `- ${p.title} (${p.journal}, ${p.year})`).join("\n")}

Clinical Trials (${trials.length} found):
${trials.slice(0, 5).map((t) => `- ${t.title} (${t.status}, ${t.phase})`).join("\n")}

Provide a JSON response with:
- "why_matters": 2-3 sentence strategic summary of why this HCP matters for pharma/congress engagement
- "influence_score": number 0-100 rating their influence and relevance
- "specialty": their likely medical specialty
- "key_topics": array of their main research/clinical topics
- "engagement_recommendation": how a pharma team should engage with this HCP
`;

  const model = process.env.VENICE_MODEL_REASONING || "kimi-k2-5";
  const fallback = process.env.VENICE_MODEL_FALLBACK || "grok-41-fast";

  let aiResult;
  try {
    const data = await veniceChat({
      model,
      messages: [
        { role: "system", content: "You are an expert HCP profiling analyst for pharmaceutical companies. Return STRICT JSON only." },
        { role: "user", content: summaryPrompt },
      ],
      temperature: 0.2,
      max_tokens: 1500,
      response_format: { type: "json_object" },
    });
    aiResult = JSON.parse(data.choices[0].message.content);
  } catch {
    try {
      const data = await veniceChat({
        model: fallback,
        messages: [
          { role: "system", content: "You are an expert HCP profiling analyst for pharmaceutical companies. Return STRICT JSON only." },
          { role: "user", content: summaryPrompt },
        ],
        temperature: 0.2,
        max_tokens: 1500,
        response_format: { type: "json_object" },
      });
      aiResult = JSON.parse(data.choices[0].message.content);
    } catch {
      aiResult = {
        why_matters: "Unable to generate AI summary.",
        influence_score: 50,
        specialty: speakerInfo.specialty || "",
        key_topics: speakerInfo.topics || [],
        engagement_recommendation: "",
      };
    }
  }

  // (e) Return full profile
  return {
    name: speakerInfo.name || name,
    affiliation: speakerInfo.affiliation || affiliation,
    role: speakerInfo.role || aiResult.specialty || "",
    bio: speakerInfo.bio || "",
    specialty: aiResult.specialty || speakerInfo.topics?.[0] || "",
    influence_score: aiResult.influence_score || 50,
    why_matters: aiResult.why_matters || "",
    engagement_recommendation: aiResult.engagement_recommendation || "",
    publications,
    clinical_trials: trials,
    speaking_history: speakingHistory,
    topics: aiResult.key_topics || speakerInfo.topics || [],
    speaker_roles: speakerInfo.speaker_roles || [],
    data: aiResult,
  };
}