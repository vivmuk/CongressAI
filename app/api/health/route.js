import { initDb, getPool } from "@/lib/db";

export async function GET() {
  const checks = { status: "ok", checks: {} };
  let allOk = true;

  // Check VENICE_API_KEY
  if (!process.env.VENICE_API_KEY) {
    checks.checks.venice_api_key = "missing";
    allOk = false;
  } else {
    checks.checks.venice_api_key = "present";
  }

  // Check DATABASE_URL and DB connectivity if configured
  if (process.env.DATABASE_URL) {
    checks.checks.database_url = "present";
    try {
      await initDb();
      const pool = getPool();
      await pool.query("SELECT 1");
      checks.checks.database_query = "ok";
    } catch (e) {
      checks.checks.database_query = `error: ${e.message}`;
      allOk = false;
    }
  } else {
    checks.checks.database_url = "not_configured";
  }

  if (!allOk) {
    checks.status = "degraded";
    return Response.json(checks, { status: 503 });
  }

  return Response.json(checks);
}