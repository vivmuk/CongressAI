import { veniceChat } from "@/lib/venice";

export async function POST(req) {
  try {
    const { name, role, affiliation, topics } = await req.json();
    if (!name) return Response.json({ error: "Missing speaker name" }, { status: 400 });

    const topicStr = Array.isArray(topics) ? topics.join(", ") : topics || "";
    const prompt = `Research ${name}, who is ${role || "a speaker"} at ${affiliation || "their organization"}.
Topics of interest: ${topicStr || "Not specified"}

Provide a comprehensive professional profile including:
1. **Professional Background** - Education, training, career history
2. **Research & Publications** - Key research areas, notable publications
3. **Clinical Expertise** - Areas of clinical focus
4. **Congress Involvement** - Sessions they are presenting at or chairing
5. **Strategic Relevance** - Why this person matters for pharmaceutical companies
6. **Engagement Recommendations** - How best to engage with this KOL

Format the response with clear sections and bold headings.`;

    const model = process.env.VENICE_MODEL_CHAT || "deepseek-v3.2";

    const data = await veniceChat({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 2000,
      venice_parameters: {
        enable_web_search: "auto",
        include_venice_system_prompt: true,
      },
    });

    const content = data.choices?.[0]?.message?.content || "";
    const citations = data.venice_parameters?.web_search_citations || [];
    const sources = data.tool_results?.web_search || [];

    return Response.json({
      name,
      profile: content,
      sources,
      citations,
    });
  } catch (e) {
    console.error("Speaker research error:", e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}