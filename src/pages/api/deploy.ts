import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  const secret: string | undefined = (locals.runtime as any)?.env?.DEPLOY_AUTH_SECRET;
  if (!secret || request.headers.get('X-Deploy-Token') !== secret) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    });
  }

  const token: string | undefined = (locals.runtime as any)?.env?.GITHUB_DEPLOY_TOKEN;
  if (!token) {
    return new Response(JSON.stringify({ error: 'GITHUB_DEPLOY_TOKEN not configured' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }

  const res = await fetch(
    'https://api.github.com/repos/AndyWinkler/web-3choa/actions/workflows/deploy.yml/dispatches',
    {
      method: 'POST',
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': '3choa-cms',
      },
      body: JSON.stringify({ ref: 'staging', inputs: { deploy_to_production: 'true' } }),
    }
  );

  if (!res.ok) {
    const body = await res.json().catch(() => ({})) as any;
    const detail = body?.message ?? body?.error ?? JSON.stringify(body);
    return new Response(JSON.stringify({ error: `GitHub ${res.status}: ${detail}` }), {
      status: 502,
      headers: { 'content-type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
};
