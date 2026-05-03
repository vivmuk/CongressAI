import { initDb, getPool } from "@/lib/db";

export async function GET(req) {
  try {
    await initDb();
    const { searchParams } = new URL(req.url);
    const congressId = searchParams.get("congressId");
    const userSession = searchParams.get("userSession");

    if (!congressId) return Response.json({ error: "Missing congressId" }, { status: 400 });

    const pool = getPool();
    let query = "SELECT * FROM bookmarks WHERE congress_id = $1";
    const params = [congressId];

    if (userSession) {
      query += " AND user_session = $2";
      params.push(userSession);
    }

    query += " ORDER BY created_at DESC";
    const { rows } = await pool.query(query, params);
    return Response.json({ bookmarks: rows });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}