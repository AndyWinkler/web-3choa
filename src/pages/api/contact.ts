import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals as any).runtime?.env;

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

  try {
    await env.DB.prepare(
      `INSERT INTO contact_submissions (name, email, community, subject, message, created_at)
       VALUES (?, ?, ?, ?, ?, datetime('now'))`
    )
      .bind(name.trim(), email.trim(), community?.trim() ?? '', subject?.trim() ?? '', message.trim())
      .run();
  } catch (err) {
    console.error('D1 insert failed:', err);
    return new Response(JSON.stringify({ error: 'Failed to save submission' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
