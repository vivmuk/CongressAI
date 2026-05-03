import { veniceChat } from "@/lib/venice";

export async function POST(req) {
  try {
    const { congressData, speakers } = await req.json();
    if (!congressData && !speakers) {
      return Response.json({ error: "Missing congress data or speakers" }, { status: 400 });
    }

    const sessions = congressData?.data?.sessions || congressData?.sessions || [];
    const speakerList = speakers || congressData?.data?.speakers || congressData?.speakers || [];

    let contextText = "";
    if (sessions.length > 0) {
      contextText += "=== CONGRESS SESSIONS ===\n";
      for (const s of sessions.slice(0, 40)) {
        contextText += `Title: ${s.title}\nType: ${s.type || "N/A"}\nTrack: ${s.track || "N/A"}\nDate: ${s.date || "N/A"}\nSpeakers: ${(s.speakers || []).join(", ")}\n---\n`;
      }
    }
    if (speakerList.length > 0) {
      contextText += "\n=== SPEAKERS ===\n";
      for (const sp of speakerList.slice(0, 30)) {
        contextText += `${sp.name} - ${sp.affiliation || "N/A"} [${sp.role || "N/A"}] Topics: ${(sp.topics || []).join(", ")}\n`;
      }
    }

    const model = process.env.VENICE_MODEL_CHAT || "deepseek-v3.2";

    const data = await veniceChat({
      model,
      messages: [
        {
          role: "system",
          content: `You are an expert MSL (Medical Science Liaison) preparation specialist for pharmaceutical companies preparing for congresses.
Create a comprehensive MSL preparation guide that includes:

1. **Key Opinion Leaders (KOLs)** - List top KOLs with their expertise areas, highlighting their recent research focus and noting their speaking sessions
2. **Priority Sessions** - List must-attend sessions with their relevance to MSLs and potential discussion topics
3. **Preparation Recommendations** - Specific topics to research, key papers to review, questions to prepare
4. **Competitive Intelligence** - Key competitive data points to watch for
5. **Networking Strategy** - Suggested engagement approaches with key stakeholders

Format the response with clear HTML structure using <b> tags for emphasis and section headers.`,
        },
        {
          role: "user",
          content: contextText || "Generate a general MSL preparation guide for this congress.",
        },
      ],
      temperature: 0.3,
      max_tokens: 3000,
      venice_parameters: {
        enable_web_search: "auto",
        include_venice_system_prompt: true,
      },
    });

    const content = data.choices?.[0]?.message?.content || "";
    const sources = data.tool_results?.web_search || [];

    return Response.json({
      preparation: content,
      sources,
    });
  } catch (e) {
    console.error("MSL preparation error:", e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}