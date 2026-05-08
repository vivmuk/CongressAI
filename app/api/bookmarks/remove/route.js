import { initDb, getPool } from "@/lib/db";

export async function POST(req) {
  try {
    await initDb();
    const { id } = await req.json();
    if (!id) return Response.json({ error: "Missing bookmark id" }, { status: 400 });

    const pool = getPool();
    const { rowCount } = await pool.query("DELETE FROM bookmarks WHERE id = $1", [id]);

    if (rowCount === 0) return Response.json({ error: "Bookmark not found" }, { status: 404 });
    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}