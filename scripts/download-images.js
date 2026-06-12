#!/usr/bin/env node
// scripts/download-images.js
// Downloads all media attachments from the WordPress XML export.
//
// Images are saved to:
//   public/images/uploads/YYYY/MM/<filename>   ← all WP uploads (year/month structure)
//
// This covers sponsor logos and any other media not handled by migrate-to-dirs.js.
// Publication thumbnails are downloaded by migrate-to-dirs.js instead and
// stored alongside their index.md in src/content/publications/<slug>/.
//
// Usage: node scripts/download-images.js
// Safe to re-run: already-downloaded files are skipped.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const xmlPath = join(
  __dirname,
  '../content/triplehelixrobotics.WordPress.2026-06-12.xml',
);
const publicDir = join(__dirname, '../public');

const WP_ORIGIN = 'https://team2363.org';
const WP_UPLOADS_RE = /\/wp-content\/uploads\/(\d{4}\/\d{2}\/.+)$/;

// ---------------------------------------------------------------------------
// Parse attachment URLs from XML
// ---------------------------------------------------------------------------
const xml = readFileSync(xmlPath, 'utf8');
const attachmentUrls = [];

for (const raw of xml.split('<item>').slice(1)) {
  const item = raw.slice(0, raw.indexOf('</item>'));
  if (!item.includes('<wp:post_type><![CDATA[attachment]]>')) continue;

  const m = item.match(/<wp:attachment_url><!\[CDATA\[([\s\S]*?)\]\]>/);
  if (m) attachmentUrls.push(m[1].trim());
}

console.log(`Found ${attachmentUrls.length} attachments in XML`);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function localPathFor(url) {
  const m = url.match(WP_UPLOADS_RE);
  return m ? join(publicDir, 'images/uploads', m[1]) : null;
}

async function download(url, localPath) {
  if (existsSync(localPath)) return 'skip';

  mkdirSync(dirname(localPath), { recursive: true });

  let res;
  try {
    res = await fetch(url, { signal: AbortSignal.timeout(30_000) });
  } catch (err) {
    console.error(`  NETWORK ERROR: ${url}\n  ${err.message}`);
    return 'error';
  }

  if (!res.ok) {
    console.error(`  HTTP ${res.status}: ${url}`);
    return 'error';
  }

  const buf = await res.arrayBuffer();
  writeFileSync(localPath, Buffer.from(buf));
  return 'downloaded';
}

// ---------------------------------------------------------------------------
// Download all attachments
// ---------------------------------------------------------------------------
let downloaded = 0,
  skipped = 0,
  errors = 0;

for (const url of attachmentUrls) {
  const localPath = localPathFor(url);
  if (!localPath) {
    console.warn(`  no path match, skipping: ${url}`);
    continue;
  }

  process.stdout.write(`  ${url.replace(WP_ORIGIN, '')} ... `);
  const result = await download(url, localPath);

  if (result === 'downloaded') {
    downloaded++;
    console.log('✓');
  } else if (result === 'skip') {
    skipped++;
    console.log('(exists)');
  } else {
    errors++;
  } // error already printed
}

console.log(
  `\nDownload complete: ${downloaded} new, ${skipped} skipped, ${errors} errors`,
);
console.log(
  '\nNote: publication thumbnails are handled by scripts/migrate-to-dirs.js',
);
