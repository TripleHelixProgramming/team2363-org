import type { CollectionEntry } from 'astro:content';

type Pub = CollectionEntry<'publications'>;

/** Canonical sort: oldest → newest, then alphabetical by id for same-date posts. */
export function sortPublications(pubs: Pub[]): Pub[] {
  return [...pubs].sort((a, b) => {
    const dt = a.data.date.valueOf() - b.data.date.valueOf();
    return dt !== 0 ? dt : a.id.localeCompare(b.id);
  });
}