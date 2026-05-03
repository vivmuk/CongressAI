import { initDb, getPool } from "@/lib/db";
import { newId } from "@/lib/uuid";

export async function POST(req) {
  try {
    await initDb();
    const { name, affiliation } = await req.json();
    if (!name) return Response.json({ error: "Missing name" }, { status: 400 });

    const pool = getPool();
    let query, params;

    if (affiliation) {
      query = `SELECT * FROM hcps WHERE name ILIKE $1 AND affiliation ILIKE $2 ORDER BY influence_score DESC NULLS LAST LIMIT 20`;
      params = [`%${name}%`, `%${affiliation}%`];
    } else {
      query = `SELECT * FROM hcps WHERE name ILIKE $1 ORDER BY influence_score DESC NULLS LAST LIMIT 20`;
      params = [`%${name}%`];
    }

    const { rows } = await pool.query(query, params);
    return Response.json({ results: rows });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}