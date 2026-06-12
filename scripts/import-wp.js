#!/usr/bin/env node
// scripts/import-wp.js
// One-time conversion of the WordPress XML export to Astro content collection
// markdown files under src/content/publications/.
//
// Usage:
//   node scripts/import-wp.js
//
// Files are named YYYY-MM-DD-{wp-slug}.md.
// Existing files with the same name are skipped (not overwritten).

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const xmlPath = join(
  __dirname,
  '../content/triplehelixrobotics.WordPress.2026-06-12.xml',
);
const outDir = join(__dirname, '../src/content/publications');

const xml = readFileSync(xmlPath, 'utf8');

// ---------------------------------------------------------------------------
// Build attachment ID → URL map (for thumbnail resolution)
// ---------------------------------------------------------------------------
const attachmentMap = {};
for (const raw of xml.split('<item>').slice(1)) {
  const item = raw.slice(0, raw.indexOf('</item>'));
  if (!item.includes('<wp:post_type><![CDATA[attachment]]>')) continue;
  const idM = item.match(/<wp:post_id>(\d+)<\/wp:post_id>/);
  const urlM = item.match(/<wp:attachment_url><!\[CDATA\[(.*?)\]\]>/);
  if (idM && urlM) attachmentMap[idM[1]] = urlM[1];
}

// ---------------------------------------------------------------------------
// HTML → Markdown helpers
// ---------------------------------------------------------------------------
function stripTags(html) {
  return html.replace(/<[^>]+>/g, '');
}

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, '\u2018')
    .replace(/&#8217;/g, '\u2019')
    .replace(/&#8220;/g, '\u201c')
    .replace(/&#8221;/g, '\u201d')
    .replace(/&hellip;/g, '…')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)));
}

function htmlToMd(html) {
  let s = html;
  // Strip Gutenberg/classic block comments
  s = s.replace(/<!--\s*\/?wp:[^\n]*?-->/g, '');
  // Headings
  s = s.replace(
    /<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi,
    (_, c) => `\n## ${stripTags(c).trim()}\n\n`,
  );
  // List items (before stripping ul/ol)
  s = s.replace(
    /<li[^>]*>([\s\S]*?)<\/li>/gi,
    (_, c) => `- ${stripTags(c).trim()}\n`,
  );
  s = s.replace(/<\/?[uo]l[^>]*>/gi, '');
  // Links → Markdown inline links
  s = s.replace(
    /<a\s[^>]*?href=["'](.*?)["'][^>]*?>([\s\S]*?)<\/a>/gi,
    (_, href, txt) => `[${stripTags(txt).trim()}](${href})`,
  );
  // Inline formatting
  s = s.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**');
  s = s.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**');
  s = s.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*');
  s = s.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '*$1*');
  // Paragraphs / breaks
  s = s.replace(/<br\s*\/?>/gi, '\n');
  s = s.replace(/<\/p>/gi, '\n\n');
  s = s.replace(/<p[^>]*>/gi, '');
  // Drop images (referenced separately via thumbnail)
  s = s.replace(/<img[^>]*>/gi, '');
  // Strip all remaining tags
  s = s.replace(/<[^>]+>/g, '');
  // Decode entities
  s = decodeEntities(s);
  // Normalise whitespace
  s = s.replace(/\n{3,}/g, '\n\n').trim();
  return s;
}

// Extract external links (non-team2363.org <a> tags) for the links frontmatter
function extractLinks(html) {
  const seen = new Set();
  const links = [];
  const re =
    /<a\s[^>]*?href=["'](https?:\/\/(?!team2363\.org)[^"']+)["'][^>]*?>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const url = m[1];
    const label = stripTags(m[2]).trim();
    if (label && url && !seen.has(url)) {
      seen.add(url);
      links.push({ label, url });
    }
  }
  return links;
}

// ---------------------------------------------------------------------------
// YAML string quoting
// ---------------------------------------------------------------------------
function yamlStr(str) {
  if (!str) return "''";
  const hasSingle = str.includes("'");
  const hasDouble = str.includes('"');
  // Both types of quotes: single-quote with escaped apostrophes
  if (hasSingle) return `'${str.replace(/'/g, "''")}'`;
  // Only double quotes: wrap in single quotes
  if (hasDouble) return `'${str}'`;
  // No quotes but YAML-special characters: wrap in double quotes
  if (
    /[:#{}\[\]|>&*!,%@`]/.test(str) ||
    /^\s|\s$/.test(str) ||
    str.startsWith('-')
  )
    return `"${str}"`;
  return str;
}

// ---------------------------------------------------------------------------
// Process published posts
// ---------------------------------------------------------------------------
let created = 0;
let skipped = 0;

for (const raw of xml.split('<item>').slice(1)) {
  const item = raw.slice(0, raw.indexOf('</item>'));

  // Only published posts
  if (!item.includes('<wp:post_type><![CDATA[post]]>')) continue;
  if (!item.includes('<wp:status><![CDATA[publish]]>')) continue;

  const titleM = item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]>/);
  const dateM = item.match(/<wp:post_date><!\[CDATA\[(\d{4}-\d{2}-\d{2})/);
  const slugM = item.match(/<wp:post_name><!\[CDATA\[(.*?)\]\]>/);
  const contentM = item.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]>/);
  const excerptM = item.match(/<excerpt:encoded><!\[CDATA\[([\s\S]*?)\]\]>/);

  if (!titleM || !dateM || !slugM) continue;

  const title = titleM[1].trim();
  const date = dateM[1];
  const slug = slugM[1];
  const rawContent = contentM ? contentM[1] : '';
  const rawExcerpt = excerptM ? excerptM[1].trim() : '';

  // Categories
  const cats = [];
  const catRe = /<category domain="category"[^>]*><!\[CDATA\[(.*?)\]\]>/g;
  let cm;
  while ((cm = catRe.exec(item)) !== null) {
    if (cm[1] !== 'Uncategorized') cats.push(cm[1]);
  }

  // Thumbnail: _thumbnail_id meta → attachment URL
  const thumbM = item.match(
    /<wp:meta_key><!\[CDATA\[_thumbnail_id\]\]><\/wp:meta_key>[\s\S]*?<wp:meta_value><!\[CDATA\[(\d+)\]\]>/,
  );
  const thumbnail = thumbM ? attachmentMap[thumbM[1]] || '' : '';

  // External links from content
  const links = extractLinks(rawContent);

  // Description: use excerpt if present; otherwise derive from first paragraph
  let description = '';
  if (rawExcerpt) {
    description = htmlToMd(rawExcerpt).replace(/\n+/g, ' ').trim();
  } else if (rawContent) {
    const firstParaM = rawContent.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    if (firstParaM) {
      const plain = decodeEntities(stripTags(firstParaM[1]))
        .replace(/\s+/g, ' ')
        .trim();
      description = plain.length > 300 ? plain.slice(0, 297) + '…' : plain;
    }
  }

  // Body markdown
  const body = rawContent ? htmlToMd(rawContent) : '';

  // Output file
  const filename = `${date}-${slug}.md`;
  const outPath = join(outDir, filename);

  if (existsSync(outPath)) {
    skipped++;
    console.log(`  skip  ${filename}`);
    continue;
  }

  // Build frontmatter
  let fm = '---\n';
  fm += `title: ${yamlStr(title)}\n`;
  fm += `date: ${date}\n`;
  if (cats.length > 0) {
    fm += 'categories:\n';
    for (const cat of cats) fm += `  - ${yamlStr(cat)}\n`;
  }
  if (description) {
    fm += `description: >\n  ${description}\n`;
  }
  if (links.length > 0) {
    fm += 'links:\n';
    for (const { label, url } of links) {
      fm += `  - label: ${yamlStr(label)}\n`;
      fm += `    url: '${url}'\n`;
    }
  }
  if (thumbnail) {
    fm += `thumbnail: '${thumbnail}'\n`;
  }
  fm += '---\n';
  if (body) fm += '\n' + body + '\n';

  writeFileSync(outPath, fm, 'utf8');
  created++;
  console.log(`created  ${filename}`);
}

console.log(`\nDone: ${created} created, ${skipped} skipped.`);
