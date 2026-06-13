/**
 * Strips markdown formatting from raw body text and returns a plain-text excerpt.
 * Headers are demoted to plain text. Links, bold, italic, blockquotes, etc. are stripped.
 */
export function excerpt(body: string, maxLength = 180): string {
  const text = body
    // Remove fenced code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove images
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    // Links → keep label text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    // Blockquote markers (must precede headers so ">## …" is handled correctly)
    .replace(/^>\s*/gm, '')
    // Headers → plain text (strip leading # chars)
    .replace(/^#{1,6}\s+/gm, '')
    // Bold / italic (**, *, __, _)
    .replace(/\*{1,3}([^*\n]+)\*{1,3}/g, '$1')
    .replace(/_{1,3}([^_\n]+)_{1,3}/g, '$1')
    // HTML tags — void elements like <br> become a space, others are dropped
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, '')
    // Inline code
    .replace(/`[^`]*`/g, '')
    // Horizontal rules
    .replace(/^[-*_]{3,}\s*$/gm, '')
    // Collapse all whitespace (newlines, tabs, multiple spaces) to single space
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut) + '\u2026';
}
