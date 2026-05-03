import { veniceChat } from "./venice.js";

const REASONING_MODEL = () => process.env.VENICE_MODEL_REASONING || "kimi-k2-5";
const FALLBACK_MODEL = () => process.env.VENICE_MODEL_FALLBACK || "grok-41-fast";

async function callVenice(messages, max_tokens = 3000) {
  try {
    const data = await veniceChat({
      model: REASONING_MODEL(),
      messages,
      temperature: 0.2,
      max_tokens,
      response_format: { type: "json_object" },
    });
    return JSON.parse(data.choices[0].message.content);
  } catch {
    const data = await veniceChat({
      model: FALLBACK_MODEL(),
      messages,
      temperature: 0.2,
      max_tokens,
      response_format: { type: "json_object" },
    });
    return JSON.parse(data.choices[0].message.content);
  }
}

function sessionsToText(congressData) {
  const data = congressData?.data || congressData;
  const sessions = data?.sessions || [];
  const speakers = data?.speakers || [];
  const conference = data?.conference || {};
  
  let text = `Conference: ${conference.name || "Unknown"}\n`;
  text += `Total Sessions: ${sessions.length}\n`;
  text += `Total Speakers: ${speakers.length}\n\n`;

  text += "=== SESSIONS ===\n";
  for (const s of sessions.slice(0, 50)) {
    text += `ID: ${s.id}\n`;
    text += `Title: ${s.title}\n`;
    text += `Type: ${s.type || "N/A"}\n`;
    text += `Track: ${s.track || "N/A"}\n`;
    text += `Date: ${s.date || "N/A"} ${s.startTime || ""}-${s.endTime || ""}\n`;
    text += `Speakers: ${(s.speakers || []).join(", ")}\n`;
    text += `Topics: ${(s.topics || []).join(", ")}\n`;
    if (s.abstract) text += `Abstract: ${s.abstract.substring(0, 300)}...\n`;
    text += "---\n";
  }

  text += "\n=== SPEAKERS ===\n";
  for (const sp of speakers.slice(0, 50)) {
    text += `${sp.name} - ${sp.affiliation || "N/A"} [${sp.role || "N/A"}] Topics: ${(sp.topics || []).join(", ")}\n`;
  }

  return text;
}

export async function generateDailyBriefing(congressData) {
  const text = sessionsToText(congressData);

  const messages = [
    {
      role: "system",
      content: `You are an expert pharmaceutical congress analyst. Generate a concise daily briefing with key insights. Return STRICT JSON only.`,
    },
    {
      role: "user",
      content: `Based on this congress data, generate a daily briefing with:
- "headline": main headline for the day
- "summary": 3-4 sentence executive summary
- "key_insights": array of {insight, importance (1-5), category} objects (max 8)
- "watch_sessions": array of {session_id, title, reason} (max 5)
- "emerging_topics": array of topic strings that are trending
- "action_items": array of recommended actions for pharma teams

Congress Data:
${text}`,
    },
  ];

  return await callVenice(messages, 2500);
}

export async function generateCompetitiveLandscape(congressData) {
  const text = sessionsToText(congressData);

  const messages = [
    {
      role: "system",
      content: `You are a competitive intelligence analyst for pharma. Extract all competitive signals from congress data. Return STRICT JSON only.`,
    },
    {
      role: "user",
      content: `Analyze this congress data for competitive intelligence. Return:
- "competitor_mentions": array of {name, context, sentiment, relevance, sessions} 
- "drug_mentions": array of {name, indication, phase, company, sessions}
- "asset_tracking": array of {asset_name, asset_type, company, status, sessions}
- "market_implications": 2-3 sentence summary of competitive landscape
- "strategic_recommendations": array of recommended actions

Congress Data:
${text}`,
    },
  ];

  return await callVenice(messages, 3000);
}

export async function generateTopicClusters(congressData) {
  const text = sessionsToText(congressData);

  const messages = [
    {
      role: "system",
      content: `You are an expert conference topic analyst. Group sessions into thematic clusters. Return STRICT JSON only.`,
    },
    {
      role: "user",
      content: `Group these congress sessions into thematic topic clusters. Return:
- "clusters": array of {cluster_name, description, keywords, session_ids, session_count, importance (1-5)}
- "cross_cutting_themes": themes that span multiple clusters
- "emerging_topics": topics gaining momentum at this congress

Congress Data:
${text}`,
    },
  ];

  return await callVenice(messages, 3000);
}

export async function generateMustAttend(congressData) {
  const text = sessionsToText(congressData);

  const messages = [
    {
      role: "system",
      content: `You are a strategic congress planner for a pharma company. Identify the most important sessions. Return STRICT JSON only.`,
    },
    {
      role: "user",
      content: `Identify the must-attend sessions from this congress for a pharma team. Return:
- "must_attend": array of {session_id, title, reason, priority_level (critical/high/medium), category (competitive/clinical/strategic/networking)}
- "scheduling_conflicts": array of {sessions: [session_ids], note} for overlapping must-attend sessions
- "day_by_day_plan": array of {date, sessions: [{session_id, time, title}]}
- "networking_opportunities": key people/sessions for networking

Congress Data:
${text}`,
    },
  ];

  return await callVenice(messages, 3000);
}

export async function generateKOLDashboard(congressData) {
  const data = congressData?.data || congressData;
  const speakers = data?.speakers || [];
  const sessions = data?.sessions || [];
  const text = sessionsToText(congressData);

  const speakerList = speakers
    .slice(0, 30)
    .map((s) => `${s.name} (${s.affiliation || "N/A"}) - Role: ${s.role || "N/A"} - Topics: ${(s.topics || []).join(", ")}`)
    .join("\n");

  const messages = [
    {
      role: "system",
      content: `You are a KOL (Key Opinion Leader) identification specialist for pharma. Rank speakers by influence and strategic value. Return STRICT JSON only.`,
    },
    {
      role: "user",
      content: `Analyze these congress speakers and create a KOL dashboard. Return:
- "kol_rankings": array of {name, affiliation, influence_score (0-100), specialty, key_topics, session_count, priority (tier1/tier2/tier3), engagement_strategy} - sorted by influence_score descending, max 20
- "thematic_experts": grouped by topic area {topic, experts: [names]}
- "rising_stars": speakers gaining prominence
- "network_map": {connections: [{speaker_a, speaker_b, shared_sessions}]}

Speaker List:
${speakerList}

Full Congress Data:
${text}`,
    },
  ];

  return await callVenice(messages, 3000);
}

export async function generateMSLPreparation(congressData) {
  const text = sessionsToText(congressData);
  const speakers = congressData?.data?.speakers || congressData?.speakers || [];

  const speakerList = speakers
    .slice(0, 30)
    .map((s) => `${s.name} (${s.affiliation || "N/A"}) - Role: ${s.role || "N/A"} - Topics: ${(s.topics || []).join(", ")}`)
    .join("\n");

  const messages = [
    {
      role: "system",
      content: `You are an expert MSL (Medical Science Liaison) preparation specialist for pharma companies congresses. Return STRICT JSON only.`,
    },
    {
      role: "user",
      content: `Generate an MSL preparation guide for this congress. Return:
- "kols": array of {name, affiliation, specialty, speaking_at, relevance, preparation_tips}
- "priority_sessions": array of {session_id, title, reason, priority (critical/high/medium), discussion_points}
- "preparation_recommendations": {topics_to_review: [], key_papers: [], questions_to_prepare: []}
- "competitive_watch": {key_competitors: [], data_points_to_watch: []}
- "networking_strategy": {engagement_approaches: [], stakeholder_mapping: [{stakeholder_type, approach}]}

Speaker List:
${speakerList}

Congress Data:
${text}`,
    },
  ];

  return await callVenice(messages, 3000);
}

export async function researchSpeakerOnline(name, role, affiliation, topics) {
  const topicStr = Array.isArray(topics) ? topics.join(", ") : topics || "";
  const model = process.env.VENICE_MODEL_CHAT || "deepseek-v3.2";

  const data = await veniceChat({
    model,
    messages: [
      {
        role: "system",
        content: `You are a professional speaker/KOL researcher. Provide comprehensive research on healthcare professionals. Return STRICT JSON only.`,
      },
      {
        role: "user",
        content: `Research this speaker and provide a detailed professional profile:
Name: ${name}
Role: ${role || "Unknown"}
Affiliation: ${affiliation || "Unknown"}
Topics: ${topicStr || "Unknown"}

Return JSON with:
- "profile_summary": 3-4 sentence executive summary of this person's professional background and significance
- "education": brief education history if known
- "research_areas": array of main research/clinical focus areas
- "notable_publications": array of {title, year, journal} - up to 5 key publications
- "clinical_trials": array of {title, phase, status} - up to 5 notable clinical trials
- "congress_involvement": what sessions/roles they typically have at congresses
- "strategic_relevance": why this person matters for pharma engagement
- "engagement_tips": array of suggested approaches for engagement
- "web_sources": array of source URLs or references used`,
      },
    ],
    temperature: 0.3,
    max_tokens: 2000,
    response_format: { type: "json_object" },
    venice_parameters: {
      enable_web_search: "auto",
    },
  });

  try {
    return JSON.parse(data.choices[0].message.content);
  } catch {
    return { profile_summary: data.choices[0].message.content };
  }
}