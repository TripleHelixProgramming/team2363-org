#!/usr/bin/env node
// scripts/extract-pages.js
// Extracts verbatim text from WordPress pages in the XML export.
// Outputs clean markdown reference files to content/ for use when
// rewriting the Astro pages with exact WP copy.
//
// Usage: node scripts/extract-pages.js

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const xmlPath = join(
  __dirname,
  '../content/triplehelixrobotics.WordPress.2026-06-12.xml',
);
const xml = readFileSync(xmlPath, 'utf8');

// ---------------------------------------------------------------------------
// HTML → plain readable text
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

function htmlToText(html) {
  let s = html;
  s = s.replace(/<!--[\s\S]*?-->/g, '');
  s = s.replace(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi, (_, c) => `\n### ${stripTags(c).trim()}\n`);
  s = s.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, c) => `- ${stripTags(c).trim()}\n`);
  s = s.replace(/<\/?[uo]l[^>]*>/gi, '\n');
  s = s.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, c) => `\n> ${stripTags(c).trim()}\n`);
  s = s.replace(/<br\s*\/?>/gi, '\n');
  s = s.replace(/<\/p>/gi, '\n\n');
  s = s.replace(/<p[^>]*>/gi, '');
  s = s.replace(/<[^>]+>/g, '');
  s = decodeEntities(s);
  s = s.replace(/\n{3,}/g, '\n\n').trim();
  return s;
}

// ---------------------------------------------------------------------------
// Recursively extract all text from Elementor widget data JSON
// ---------------------------------------------------------------------------
function extractElementorText(jsonStr) {
  let data;
  try {
    data = JSON.parse(jsonStr);
  } catch {
    return '';
  }

  const textFields = ['editor', 'description_text', 'title_text', 'text'];
  const chunks = [];

  function walk(node) {
    if (Array.isArray(node)) {
      node.forEach(walk);
    } else if (node && typeof node === 'object') {
      for (const [key, val] of Object.entries(node)) {
        if (textFields.includes(key) && typeof val === 'string' && val.trim()) {
          const clean = htmlToText(val);
          if (clean) chunks.push(clean);
        } else {
          walk(val);
        }
      }
    }
  }

  walk(data);
  return chunks.join('\n\n');
}

// ---------------------------------------------------------------------------
// Find a page by slug and extract its content
// ---------------------------------------------------------------------------
function extractPage(slug) {
  for (const raw of xml.split('<item>').slice(1)) {
    const item = raw.slice(0, raw.indexOf('</item>'));
    if (!item.includes(`<wp:post_name><![CDATA[${slug}]]>`)) continue;
    if (!item.includes('<wp:post_type><![CDATA[page]]>')) continue;
    if (!item.includes('<wp:status><![CDATA[publish]]>')) continue;

    const titleM = item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]>/);
    const contentM = item.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]>/);
    const elementorM = item.match(
      /<wp:meta_key><!\[CDATA\[_elementor_data\]\]><\/wp:meta_key>[\s\S]*?<wp:meta_value><!\[CDATA\[([\s\S]*?)\]\]>/,
    );

    const title = titleM ? titleM[1].trim() : slug;
    const contentText = contentM ? htmlToText(contentM[1]) : '';
    const elementorText = elementorM ? extractElementorText(elementorM[1]) : '';

    return { title, contentText, elementorText };
  }
  return null;
}

// ---------------------------------------------------------------------------
// Write reference files
// ---------------------------------------------------------------------------
const pages = [
  { slug: 'my-front-page', file: 'homepage-text.md' },
  { slug: 'partners', file: 'partners-text.md' },
];

for (const { slug, file } of pages) {
  const page = extractPage(slug);
  if (!page) {
    console.log(`Not found: ${slug}`);
    continue;
  }

  let out = `# ${page.title} — verbatim text from WordPress\n\n`;
  out += `Source: \`content/triplehelixrobotics.WordPress.2026-06-12.xml\`\n`;
  out += `Slug: \`${slug}\`\n\n---\n\n`;

  if (page.contentText) {
    out += `## content:encoded\n\n${page.contentText}\n\n`;
  }

  if (page.elementorText) {
    out += `---\n\n## Elementor widget text\n\n${page.elementorText}\n`;
  }

  const outPath = join(__dirname, '../content', file);
  writeFileSync(outPath, out, 'utf8');
  console.log(`Written: content/${file}`);
}