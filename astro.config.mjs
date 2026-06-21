import { defineConfig } from 'astro/config';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

const isBuild = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: 'https://3choa.com',
  output: 'server',
  adapter: cloudflare(),
  integrations: [react(), keystatic(), sitemap({ filter: (page) => !page.includes('/keystatic') })],
  vite: {
    optimizeDeps: {
      include: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
    },
    ...(isBuild && {
      resolve: {
        alias: {
          'react-dom/server': 'react-dom/server.edge',
        },
      },
    }),
  },
});
