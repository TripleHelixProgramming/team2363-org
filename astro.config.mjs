import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://team2363.org',
  base: '/team2363-org/',
  integrations: [icon()],
  output: 'static',
});
