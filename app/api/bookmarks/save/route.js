import { initDb, getPool } from "@/lib/db";
import { newId } from "@/lib/uuid";

export async function POST(req) {
  try {
    await initDb();
    const { congressId, itemType, itemId, userSession } = await req.json();
    if (!congressId || !itemType || !itemId) {
      return Response.json({ error: "Missing congressId, itemType, or itemId" }, { status: 400 });
    }

    const pool = getPool();
    const id = newId();

    await pool.query(
      `INSERT INTO bookmarks (id, congress_id, user_session, item_type, item_id)
       VALUES ($1, $2, $3, $4, $5)`,
      [id, congressId, userSession || null, itemType, itemId]
    );

    return Response.json({ id, congressId, itemType, itemId });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}