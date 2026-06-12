#!/usr/bin/env node
// scripts/migrate-to-dirs.js
// One-shot migration: converts flat src/content/publications/<slug>.md files
// to a directory-per-publication structure:
//
//   src/content/publications/<slug>/
//     index.md        ← the original .md with updated frontmatter
//     <image.ext>     ← thumbnail downloaded from WordPress CDN (if any)
//
// Changes made to each index.md:
//   - Adds `slug: <slug>` so Astro generates clean URLs (no /index suffix)
//   - Rewrites `thumbnail: 'https://...'` to `thumbnail: ./<filename>`
//
// IMPORTANT: src/content/config.ts and page templates have already been
// updated to use Astro's image() schema and <Image> component. Run this
// script before running `astro dev` or `astro build`.
//
// Usage:   node scripts/migrate-to-dirs.js
// Re-run:  safe — skips slugs whose directory already exists.

import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  readdirSync,
  unlinkSync,
} from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pubsDir = join(__dirname, '../src/content/publications');

// Matches: thumbnail: 'https://...' or thumbnail: "https://..." or bare URL
// Uses [ \t]* (not \s*) to avoid consuming the trailing newline.
const THUMB_REMOTE_RE = /^(thumbnail:\s*)['"]?(https?:\/\/[^'"}\s\n]+)['"]?[ \t]*$/m;

// ---------------------------------------------------------------------------
// Download helper
// ---------------------------------------------------------------------------
async function downloadFile(url, dest) {
  if (existsSync(dest)) return 'exists';
  let res;
  try {
    res = await fetch(url, { signal: AbortSignal.timeout(30_000) });
  } catch (err) {
    return { error: err.message };
  }
  if (!res.ok) return { error: `HTTP ${res.status}` };
  const buf = await res.arrayBuffer();
  writeFileSync(dest, Buffer.from(buf));
  return 'downloaded';
}

// ---------------------------------------------------------------------------
// Find all flat .md files (not already in a subdirectory)
// ---------------------------------------------------------------------------
const flatFiles = readdirSync(pubsDir).filter(
  (f) => f.endsWith('.md') && !f.startsWith('_'),
);

console.log(`Found ${flatFiles.length} flat publication files to migrate\n`);

let migrated = 0,
  skipped = 0,
  errors = 0;

for (const filename of flatFiles) {
  const slug = filename.slice(0, -3); // strip .md
  const srcPath = join(pubsDir, filename);
  const destDir = join(pubsDir, slug);
  const destMd = join(destDir, 'index.md');

  if (existsSync(destDir)) {
    console.log(`  skip (exists): ${slug}/`);
    skipped++;
    continue;
  }

  const content = readFileSync(srcPath, 'utf8');

  // Find frontmatter bounds
  const fmOpen = content.indexOf('---');
  const fmClose = content.indexOf('---', fmOpen + 3);
  if (fmOpen === -1 || fmClose === -1) {
    console.error(`  ERROR malformed frontmatter: ${filename}`);
    errors++;
    continue;
  }

  let fm = content.slice(fmOpen + 3, fmClose);
  const body = content.slice(fmClose + 3);

  // Extract thumbnail URL
  const thumbMatch = fm.match(THUMB_REMOTE_RE);
  const thumbnailUrl = thumbMatch ? thumbMatch[2] : null;
  let thumbnailFilename = null;

  // Create directory
  mkdirSync(destDir, { recursive: true });

  // Download thumbnail
  if (thumbnailUrl) {
    // Derive filename from URL, strip query string
    thumbnailFilename = decodeURIComponent(thumbnailUrl.split('/').pop().split('?')[0]);
    const thumbDest = join(destDir, thumbnailFilename);
    process.stdout.write(`  ${slug}: thumbnail ... `);
    const result = await downloadFile(thumbnailUrl, thumbDest);
    if (typeof result === 'object') {
      console.log(`FAILED (${result.error}) — keeping URL in frontmatter`);
      thumbnailFilename = null;
    } else {
      console.log(result); // 'downloaded' or 'exists'
    }
  } else {
    console.log(`  ${slug}: (no thumbnail)`);
  }

  // Update frontmatter
  // 1. Add slug: as the first field (right after the opening ---)
  fm = `\nslug: ${slug}${fm}`;

  // 2. Rewrite thumbnail to relative path (if downloaded)
  if (thumbnailFilename) {
    fm = fm.replace(THUMB_REMOTE_RE, `$1./${thumbnailFilename}`);
  }

  // Write index.md
  writeFileSync(destMd, `---${fm}---${body}`, 'utf8');

  // Remove original flat file
  unlinkSync(srcPath);

  migrated++;
}

console.log(
  `\nMigration complete: ${migrated} migrated, ${skipped} already done, ${errors} errors`,
);