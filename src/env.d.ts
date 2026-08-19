/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    runtime: import('@astrojs/cloudflare').Runtime<Record<string, unknown>>;
  }
}

// Cloudflare Workers types used in API routes
type D1Database = import('@cloudflare/workers-types').D1Database;
type ExecutionContext = import('@cloudflare/workers-types').ExecutionContext;
