import { generateDailyBriefing } from "@/lib/insights";
import { initDb, getPool } from "@/lib/db";
import { newId } from "@/lib/uuid";

export async function POST(req) {
  try {
    const { congressData, congressId } = await req.json();
    if (!congressData) return Response.json({ error: "Missing congressData" }, { status: 400 });

    const briefing = await generateDailyBriefing(congressData);

    // Save insight to DB if congressId provided
    if (congressId) {
      try {
        await initDb();
        const pool = getPool();
        await pool.query(
          `INSERT INTO insights (id, congress_id, insight_type, title, content, priority)
           VALUES ($1, $2, 'daily_briefing', $3, $4, $5)`,
          [
            newId(),
            congressId,
            briefing.headline || "Daily Briefing",
            JSON.stringify(briefing),
            1,
          ]
        );
      } catch (dbErr) {
        console.error("Failed to save briefing to DB:", dbErr.message);
      }
    }

    return Response.json(briefing);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}