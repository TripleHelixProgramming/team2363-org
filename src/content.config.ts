import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const publications = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/publications' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      categories: z.array(z.string()),
      links: z
        .array(
          z.object({
            label: z.coerce.string(),
            url: z.string().url(),
          }),
        )
        .optional(),
      // Relative path to a co-located image file, e.g. ./thumbnail.jpg
      // Run scripts/migrate-to-dirs.js to download images and update all entries.
      thumbnail: image().optional(),
      videoUrl: z.string().url().optional(),
      author: z.string().optional(),
    }),
});

export const collections = { publications };
