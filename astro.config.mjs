import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://blog.introl.top',
  output: 'hybrid',
  adapter: vercel(),
  integrations: [tailwind(), sitemap()],
});
