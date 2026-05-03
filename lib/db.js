import pg from "pg";

const { Pool } = pg;

let pool;

export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.PGSSL === "true" ? { rejectUnauthorized: false } : undefined,
    });
  }
  return pool;
}

export async function initDb() {
  const client = await getPool().connect();
  try {
    await client.query(`
      create table if not exists congress (
        id uuid primary key,
        name text,
        source_url text,
        created_at timestamptz default now(),
        data jsonb
      );

      create table if not exists session_embeddings (
        id uuid primary key,
        congress_id uuid references congress(id) on delete cascade,
        session_id text,
        vector float8[],
        metadata jsonb
      );

      create table if not exists hcps (
        id uuid primary key,
        congress_id uuid references congress(id) on delete cascade,
        name text,
        affiliation text,
        role text,
        bio text,
        specialty text,
        influence_score float,
        publications jsonb default '[]',
        clinical_trials jsonb default '[]',
        speaking_history jsonb default '[]',
        topics text[] default '{}',
        data jsonb default '{}',
        created_at timestamptz default now()
      );

      create table if not exists hcp_publications (
        id uuid primary key,
        hcp_id uuid references hcps(id) on delete cascade,
        pmid text,
        title text,
        journal text,
        year text,
        abstract text,
        url text
      );

      create table if not exists hcp_trials (
        id uuid primary key,
        hcp_id uuid references hcps(id) on delete cascade,
        nct_id text,
        title text,
        status text,
        phase text,
        condition text,
        url text
      );

      create table if not exists bookmarks (
        id uuid primary key,
        congress_id uuid references congress(id) on delete cascade,
        user_session text,
        item_type text,
        item_id text,
        created_at timestamptz default now()
      );

      create table if not exists insights (
        id uuid primary key,
        congress_id uuid references congress(id) on delete cascade,
        insight_type text,
        title text,
        content jsonb default '{}',
        priority integer default 0,
        created_at timestamptz default now()
      );
    `);
  } finally {
    client.release();
  }
}