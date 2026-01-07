import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import indexNow from 'astro-indexnow';

export default defineConfig({
  site: 'https://blog.introl.top',
  adapter: vercel(),
  integrations: [
    tailwind(),
    sitemap(),
    indexNow({
      key: '2f8b11e2db7043d2ba3130545ba313a9',
      keyLocation: 'https://blog.introl.top/2f8b11e2db7043d2ba3130545ba313a9.txt'
    })
  ],
});
