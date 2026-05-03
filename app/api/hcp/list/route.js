import { initDb, getPool } from "@/lib/db";

export async function GET(req) {
  try {
    await initDb();
    const { searchParams } = new URL(req.url);
    const congressId = searchParams.get("congressId");
    if (!congressId) return Response.json({ error: "Missing congressId" }, { status: 400 });

    const pool = getPool();
    const { rows } = await pool.query(
      "SELECT * FROM hcps WHERE congress_id = $1 ORDER BY influence_score DESC NULLS LAST",
      [congressId]
    );
    return Response.json({ hcps: rows });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}