import { generateMustAttend } from "@/lib/insights";
import { initDb, getPool } from "@/lib/db";
import { newId } from "@/lib/uuid";

export async function POST(req) {
  try {
    const { congressData, congressId } = await req.json();
    if (!congressData) return Response.json({ error: "Missing congressData" }, { status: 400 });

    const mustAttend = await generateMustAttend(congressData);

    if (congressId) {
      try {
        await initDb();
        const pool = getPool();
        await pool.query(
          `INSERT INTO insights (id, congress_id, insight_type, title, content, priority)
           VALUES ($1, $2, 'must_attend', $3, $4, $5)`,
          [
            newId(),
            congressId,
            "Must-Attend Sessions",
            JSON.stringify(mustAttend),
            1,
          ]
        );
      } catch (dbErr) {
        console.error("Failed to save must-attend to DB:", dbErr.message);
      }
    }

    return Response.json(mustAttend);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}