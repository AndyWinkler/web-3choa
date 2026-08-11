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
  if (!env.GCP_INGEST_URL || !env.GCP_INGEST_SECRET) {
    console.error(
      `[gcp] missing GCP_INGEST_URL or GCP_INGEST_SECRET — skipping ${table} id=${rowId}. ` +
        `Pages secrets only apply to deployments created after they are set; redeploy to pick them up.`,
    );
    return;
  }

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
      const detail = await res.text().catch(() => '<body unreadable>');
      console.error(`[gcp] HTTP ${res.status} for ${table} id=${rowId}: ${detail.slice(0, 500)}`);
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
