/**
 * Shared Tailwind class constants for consistent site-wide styling.
 *
 * Import what you need:
 *   import { card, btn, link } from '../../utils/classes';
 *
 * Usage in templates:
 *   <div class={card}>…</div>
 *   <div class={`${card} p-6`}>…</div>
 *   <a class={btn}>Get in touch</a>
 */

/** Standard card container — white box with border and shadow. */
export const card = 'bg-white rounded-lg border-2 border-gray-200 shadow-sm';

/**
 * Primary outline button (large, px-6 py-3). Works with or without an icon
 * sibling thanks to inline-flex + gap-1.5.
 */
export const btn =
  'inline-flex items-center gap-1.5 border-2 border-purple text-purple font-bold px-6 py-3 rounded hover:bg-purple hover:text-white transition-colors';

/** Primary outline button (small, px-6 py-2) — for form submit buttons. */
export const btnSm =
  'border-2 border-purple text-purple font-bold px-6 py-2 rounded hover:bg-purple hover:text-white transition-colors';

/** Inline text link — watermelon color with gold hover. */
export const link = 'text-watermelon hover:text-gold transition-colors';

/** Standard icon — gold, 20 px, no shrink. Append size overrides as needed. */
export const icon = 'w-5 h-5 text-gold shrink-0';

/** Category / tag pill badge. */
export const badge =
  'text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full';

/** Page-level h1 heading style. Append margin utilities as needed. */
export const h1 = 'text-4xl font-bold text-purple';

/** Card / component sub-heading (h3). Append extra utilities as needed. */
export const h3 = 'font-bold text-purple mb-2';

/** Section h2 heading style. Append alignment utilities as needed. */
export const h2 = 'text-3xl font-bold text-purple mb-8';

/** h2 for CTA / call-to-action sections that have short one-liner copy below. */
export const h2Cta = 'text-3xl font-bold text-purple mb-4';
