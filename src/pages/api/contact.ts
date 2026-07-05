import type { APIRoute } from 'astro';
import { pushToGcp } from '../../utils/gcp';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals as any).runtime?.env;
  const ctx = (locals as any).runtime?.ctx;

  if (!env?.DB) {
    return new Response(JSON.stringify({ error: 'Service unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { name, email, community, subject, message } = body;
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return new Response(JSON.stringify({ error: 'Name, email and message are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let rowId: number | undefined;
  try {
    const result = await env.DB.prepare(
      `INSERT INTO contact_submissions (name, email, community, subject, message, created_at)
       VALUES (?, ?, ?, ?, ?, datetime('now'))`
    )
      .bind(name.trim(), email.trim(), community?.trim() ?? '', subject?.trim() ?? '', message.trim())
      .run();
    rowId = result.meta?.last_row_id;
  } catch (err) {
    console.error('D1 insert failed:', err);
    return new Response(JSON.stringify({ error: 'Failed to save submission' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (ctx && rowId !== undefined) {
    const [firstName, ...rest] = name.trim().split(/\s+/);
    ctx.waitUntil(
      pushToGcp(env.DB, env, 'contact_submissions', rowId, {
        source: '3choa',
        form_type: 'contact',
        submitted_at: new Date().toISOString(),
        first_name: firstName,
        last_name: rest.join(' ') || null,
        company: community?.trim() ?? null,
        email: email.trim(),
        subject: subject?.trim() ?? null,
        message: message.trim(),
      })
    );
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
