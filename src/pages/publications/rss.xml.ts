import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { sortPublications } from '../../utils/publications';
import { excerpt } from '../../utils/excerpt';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const allPubs = await getCollection('publications');
  const publications = sortPublications(allPubs).reverse();

  return rss({
    title: 'Triple Helix Robotics Publications',
    description:
      'Technical writeups, newsletters, CAD releases, robot reveals, and more from FRC Team 2363.',
    site: context.site!,
    items: publications.map((pub) => ({
      title: pub.data.title,
      pubDate: pub.data.date,
      description: pub.body ? excerpt(pub.body) : undefined,
      link: `/publications/${pub.id.replace(/\/index$/, '')}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
