import { generateCompetitiveLandscape } from "@/lib/insights";
import { initDb, getPool } from "@/lib/db";
import { newId } from "@/lib/uuid";

export async function POST(req) {
  try {
    const { congressData, congressId } = await req.json();
    if (!congressData) return Response.json({ error: "Missing congressData" }, { status: 400 });

    const landscape = await generateCompetitiveLandscape(congressData);

    if (congressId) {
      try {
        await initDb();
        const pool = getPool();
        await pool.query(
          `INSERT INTO insights (id, congress_id, insight_type, title, content, priority)
           VALUES ($1, $2, 'competitive_landscape', $3, $4, $5)`,
          [
            newId(),
            congressId,
            landscape.market_implications || "Competitive Landscape",
            JSON.stringify(landscape),
            2,
          ]
        );
      } catch (dbErr) {
        console.error("Failed to save competitive landscape to DB:", dbErr.message);
      }
    }

    return Response.json(landscape);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}