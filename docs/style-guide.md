# Style guide — Triple Helix Robotics website

This document defines the visual, typographic, and writing conventions for the team2363.org website. When in doubt, look at existing pages for reference and follow the patterns here.

---

## Brand colors

| Name       | Hex       | Tailwind token                        | Use                                          |
| ---------- | --------- | ------------------------------------- | -------------------------------------------- |
| Gold       | `#fdb813` | `text-gold`, `bg-gold`, `border-gold` | Primary accent, icons, highlights, CTAs      |
| Navy dark  | `#00102E` | `text-navy-dark`, `bg-navy-dark`      | Page backgrounds, hero, footer, dark CTAs    |
| Navy       | `#233452` | `text-navy`, `bg-navy`                | Body text headings, secondary backgrounds    |
| White      | `#ffffff` | `text-white`, `bg-white`              | Card backgrounds, text on dark               |
| Light gray | `#F4F5F7` | `bg-gray-50` (approx.)                | Section backgrounds (alternating with white) |
| Gray 600   | —         | `text-gray-600`                       | Body prose                                   |
| Gray 300   | —         | `text-gray-300`                       | Muted text on dark backgrounds               |

**Do not introduce other accent colors.**

---

## Typography

**Font:** Roboto (loaded from Google Fonts), weights 400 / 500 / 700.

### Heading scale

| Element                    | Tailwind classes                    | Use                 |
| -------------------------- | ----------------------------------- | ------------------- |
| Page title (h1)            | `text-4xl font-bold text-navy-dark` | One per page        |
| Section heading (h2)       | `text-3xl font-bold text-navy-dark` | Major page sections |
| Subsection heading (h3)    | `font-bold text-navy`               | Cards, list items   |
| Footer column heading (h2) | `font-bold`                         | Footer only         |

### Body text

- Default prose: `text-gray-600 text-sm` or `text-gray-600` (depending on context)
- Muted text on dark backgrounds: `text-gray-300`
- Small labels / metadata: `text-xs text-gray-400`

---

## Writing style

### Sentence case everywhere

All headings, link labels, button text, and UI strings use **Sentence case**.

**Exceptions — always use Title Case:**

- Proper nouns: Triple Helix, Hampton Roads, FIRST, STEM, Newport News, NASA, etc.
- Official event/program names: Rumble in the Roads, FIRST Championship, Innovation in Control
- Sponsor and organization names: Intentional Innovation Foundation, TE Connectivity, etc.
- Acronyms: STEM, FRC, CAD, PR, CI

### Tone

- Direct and confident, not boastful.
- Inclusive: "we", "our students", "the team" — not "I" or third-person corporate voice.
- High-school readable: short sentences, active voice, no jargon without explanation.

---

## Icons

Icons are provided by [`astro-icon`](https://github.com/natemoo-re/astro-icon) with two Iconify collections:

| Collection       | Package                      | Use                                               |
| ---------------- | ---------------------------- | ------------------------------------------------- |
| `lucide:*`       | `@iconify-json/lucide`       | General UI — navigation, actions, content anchors |
| `simple-icons:*` | `@iconify-json/simple-icons` | Brand logos — social media platforms              |

Icons are inlined as SVGs at build time. There is no runtime JS cost and no CDN dependency.

### Usage

```astro
import {Icon} from 'astro-icon/components';

<Icon name="lucide:trophy" class="w-5 h-5 text-gold" aria-hidden="true" />
<Icon name="simple-icons:youtube" class="w-4 h-4 shrink-0" aria-hidden="true" />
```

Always include `aria-hidden="true"` on decorative icons. If an icon conveys meaning without adjacent text, add an `aria-label` to the parent element instead.

### Icon sizing

| Context                              | Classes                |
| ------------------------------------ | ---------------------- |
| Inline with text (links, list items) | `w-4 h-4 shrink-0`     |
| Card / section accent                | `w-5 h-5`              |
| Feature / hero accent                | `w-7 h-7` or `w-8 h-8` |

---

## Layout & spacing

- Max content width: `max-w-4xl` (prose), `max-w-5xl` (cards/grids), `max-w-6xl` (full-width sections)
- Section vertical padding: `py-16` standard, `py-12` for compact sections
- Horizontal padding: `px-4` on all sections (prevents edge-to-edge on mobile)

### Responsive grid patterns

| Use                   | Classes                                                               |
| --------------------- | --------------------------------------------------------------------- |
| 3-column feature grid | `grid gap-8 md:grid-cols-3`                                           |
| 2-column card grid    | `grid gap-8 md:grid-cols-2`                                           |
| Sponsor logo grid     | `grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5` |
| Footer columns        | `grid gap-10 md:grid-cols-3`                                          |

---

## Component patterns

### Cards (on light background)

```html
<div class="bg-white rounded p-6 shadow-sm">
  <!-- icon + heading -->
  <div class="flex items-center gap-2 mb-3">
    <Icon
      name="lucide:trophy"
      class="w-5 h-5 text-gold shrink-0"
      aria-hidden="true"
    />
    <h3 class="font-bold text-navy text-sm">Card title</h3>
  </div>
  <p class="text-gray-600 text-sm">Body text.</p>
</div>
```

### Feature columns (mission-style)

```html
<div>
  <Icon
    name="lucide:settings"
    class="w-8 h-8 text-gold mb-3"
    aria-hidden="true"
  />
  <h3 class="font-bold text-navy mb-2">Column heading</h3>
  <p class="text-gray-600 text-sm">Body text.</p>
</div>
```

### CTA button — primary (gold)

```html
<a
  href="/contact/"
  class="inline-block bg-gold text-navy-dark font-bold px-6 py-3 rounded hover:bg-yellow-400 transition-colors"
>
  Button label
</a>
```

### CTA button — secondary (outlined)

```html
<a
  href="/publications/"
  class="inline-block border-2 border-navy-dark text-navy-dark font-bold px-6 py-3 rounded hover:bg-navy-dark hover:text-white transition-colors"
>
  Button label
</a>
```

### CTA button — dark background

```html
<a
  href="/contact/"
  class="inline-block bg-navy-dark text-white font-bold px-6 py-3 rounded hover:bg-navy transition-colors"
>
  Button label
</a>
```

### Social / pill links

```html
<a
  href="..."
  class="inline-flex items-center gap-1.5 border border-navy text-navy text-sm px-3 py-1 rounded hover:bg-navy hover:text-white transition-colors"
>
  <Icon
    name="simple-icons:youtube"
    class="w-4 h-4 shrink-0"
    aria-hidden="true"
  />
  YouTube
</a>
```

---

## Dark sections

Several sections use `bg-navy-dark text-white`. Inside these:

- Body text: `text-gray-300`
- Headings: `text-white` or `font-bold` (inherits white)
- Accent headings: `text-gold font-bold`
- Links: `hover:text-gold transition-colors`
