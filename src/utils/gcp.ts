interface GcpEnv {
  GCP_INGEST_URL: string;
  GCP_INGEST_SECRET: string;
}

export async function pushToGcp(
  db: D1Database,
  env: GcpEnv,
  table: 'contact_submissions',
  rowId: number,
  payload: Record<string, unknown>,
): Promise<void> {
  try {
    const res = await fetch(env.GCP_INGEST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.GCP_INGEST_SECRET}`,
      },
      body: JSON.stringify({ external_id: `${payload.source}-contact-${rowId}`, ...payload }),
    });

    if (!res.ok) {
      console.error(`[gcp] HTTP ${res.status} for ${table} id=${rowId}`);
      return;
    }

    await db
      .prepare(`UPDATE ${table} SET sent_to_gcp = 1, gcp_sent_at = datetime('now') WHERE id = ?`)
      .bind(rowId)
      .run();
  } catch (err) {
    console.error(`[gcp] push failed for ${table} id=${rowId}:`, err);
  }
}
