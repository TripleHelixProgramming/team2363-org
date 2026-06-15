import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

const base = '/team2363-org/';

// Rewrites root-relative hrefs in markdown to include the base path,
// so content files can write /publications/... instead of /team2363-org/publications/...
function rehypeRebaseLinks() {
  return (tree) => {
    function visit(node) {
      if (
        node.type === 'element' &&
        node.tagName === 'a' &&
        typeof node.properties?.href === 'string' &&
        node.properties.href.startsWith('/') &&
        !node.properties.href.startsWith(base)
      ) {
        node.properties.href = base + node.properties.href.slice(1);
      }
      (node.children ?? []).forEach(visit);
    }
    visit(tree);
  };
}

export default defineConfig({
  site: 'https://team2363.org',
  base,
  integrations: [icon()],
  output: 'static',
  markdown: {
    rehypePlugins: [rehypeRebaseLinks],
  },
});
