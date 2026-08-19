import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;

  if (
    pathname === '/keystatic' ||
    pathname === '/keystatic/' ||
    (pathname.startsWith('/keystatic/') &&
      !pathname.startsWith('/keystatic/branch/') &&
      !pathname.startsWith('/keystatic/api/'))
  ) {
    return context.redirect(
      '/keystatic/branch/staging' + pathname.slice('/keystatic'.length),
      302
    );
  }

  return next();
});
