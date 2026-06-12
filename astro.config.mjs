import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://team2363.org',
  integrations: [tailwind(), icon()],
  output: 'static',
});
