import { initDb, getPool } from "@/lib/db";
import { newId } from "@/lib/uuid";
import { buildHCPProfile } from "@/lib/hcp";

export async function POST(req) {
  try {
    await initDb();
    const { name, affiliation, congressId } = await req.json();
    if (!name) return Response.json({ error: "Missing name" }, { status: 400 });

    const pool = getPool();

    // Get congress data if congressId provided
    let congressData = null;
    if (congressId) {
      const { rows } = await pool.query("SELECT * FROM congress WHERE id = $1", [congressId]);
      if (rows.length) congressData = rows[0];
    }

    // Build the full profile
    const profile = await buildHCPProfile(name, affiliation, congressData);

    // Save to database
    const id = newId();
    await pool.query(
      `INSERT INTO hcps (id, congress_id, name, affiliation, role, bio, specialty, influence_score, publications, clinical_trials, speaking_history, topics, data)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [
        id,
        congressId || null,
        profile.name,
        profile.affiliation,
        profile.role,
        profile.bio,
        profile.specialty,
        profile.influence_score,
        profile.publications,
        profile.clinical_trials,
        profile.speaking_history,
        profile.topics,
        profile.data,
      ]
    );

    // Save publications
    for (const pub of profile.publications) {
      if (pub.pmid) {
        await pool.query(
          `INSERT INTO hcp_publications (id, hcp_id, pmid, title, journal, year, abstract, url)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           ON CONFLICT DO NOTHING`,
          [newId(), id, pub.pmid, pub.title, pub.journal, pub.year, pub.abstract, pub.url]
        );
      }
    }

    // Save trials
    for (const trial of profile.clinical_trials) {
      if (trial.nct_id) {
        await pool.query(
          `INSERT INTO hcp_trials (id, hcp_id, nct_id, title, status, phase, condition, url)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           ON CONFLICT DO NOTHING`,
          [newId(), id, trial.nct_id, trial.title, trial.status, trial.phase, trial.condition, trial.url]
        );
      }
    }

    return Response.json({ id, ...profile });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}