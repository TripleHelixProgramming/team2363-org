# team2363-org Rebuild Plan

## Goal

Replace the WordPress site at team2363.org with a static site for Triple Helix
Robotics (FRC Team 2363). Reuse the _content and behavior_ of the current
site, not its architecture. Use modern, low-dependency tooling similar in
spirit to [iifound-org](../iifound-org), refresh the visual design, and make
the repo approachable enough that high-school students can contribute content
(especially publications) via simple, well-documented steps.

A secondary goal: the repo itself should give Triple Helix students exposure
to professional web-dev tooling and workflow (git, PRs, CI, static site
generators) they can carry into early careers.

---

## ~~Phase 1 — Content audit~~ ✓ Done

Inventory written to `content/`. See `content/00-index.md` for full status.

**Remaining:** Logo URL for site header still needs browser inspection of live site to retrieve.

---

## ~~Phase 2 — Tech stack decision~~ ✓ Done

**Astro** + **Tailwind CSS** + **Prettier** (`prettier-plugin-astro`) + **Alpine.js** (CDN).

- Scaffold built and building cleanly (`npm run build`).
- Brand palette (`#fdb813` gold, `#00102E`/`#233452` navy) in `tailwind.config.mjs`.
- Publications content collection with Zod schema in `src/content/config.ts`.
- `src/content/publications/_template.md` ready for student use.
- All 179 WP publications migrated to `src/content/publications/<slug>/index.md` with
  co-located thumbnail images (Astro `image()` schema, optimized to WebP at build time).
- All 274 WP media attachments downloaded to `public/images/uploads/YYYY/MM/`.
- **Page & asset co-location pattern established** — each page that owns images lives in
  its own directory alongside its data and assets:
  - `src/pages/index.astro` + `hero.jpg`
  - `src/pages/contact/index.astro`
  - `src/pages/partners/index.astro` + `sponsors.json` + `sponsor-logos/*.{png,jpg}`
  - `src/pages/publications/index.astro`
  - Sponsor logos use `import.meta.glob` → processed to WebP by Astro at build time.
  - Sponsor tier/name/URL data is in `sponsors.json` — edit that file to add/remove sponsors,
    no `.astro` file changes needed.
- `site: 'https://team2363.org'` set in `astro.config.mjs`.

---

## Phase 3 — Design refresh

- New visual direction: clean typography, generous whitespace, accessible color
  contrast, dark-mode support.
- **Responsive design is a first-class requirement.** Design mobile-first: every
  page must be fully usable on a phone (no horizontal scroll, comfortable tap
  targets, readable font sizes). Layouts should widen gracefully on tablet and
  desktop using Tailwind's `sm:` / `md:` / `lg:` breakpoints — not just
  "shrink the desktop layout."
- Keep the same page structure as today's site (single-page home with anchor
  sections + dedicated Partners, Publications, and Contact pages, sticky nav,
  mobile menu).
- **Follow Astro component best practices:** break pages into focused `.astro`
  components in `src/components/`. Each page section with distinct content or
  logic should be its own component (e.g. `HeroSection.astro`,
  `PublicationsPreview.astro`). Shared UI elements (nav, footer, cards) live in
  `src/components/`. Sections with async data fetching (`getCollection`) are
  especially good candidates to extract. Page files in `src/pages/` should
  read as a high-level outline of the page — not a wall of HTML.
- Brand palette is confirmed (`content/02-branding.md`). **Blocker:** logo URL
  needs browser inspection of live site before design work can finalize header.
- Verify whether burgundy `#b73d3d` is an intentional brand color or a Sydney
  theme default before including it in the new design.

---

## Phase 4 — Publications workflow & contribution guidelines

This is the highest-priority "student-facing" piece.

- Write `CONTRIBUTING.md` at a high-school reading level covering step by step:
  1. Cloning the repo / opening it in an editor.
  2. Running the site locally (`npm install`, `npm run dev`).
  3. Adding a new publication: create `src/content/publications/<slug>/`, copy
     `_template.md` to `index.md`, fill in frontmatter, drop image file alongside it.
  4. Editing existing page text — page prose lives in `.astro` files; sponsor data
     lives in `src/pages/partners/sponsors.json`.
  5. Committing changes and opening a pull request.
  6. What CI checks mean and how to fix common failures (format errors).
- Template file already exists at `src/content/publications/_template.md`.

---

## Phase 5 — CI/CD

- CI: Prettier format check + `astro build` on every pull request.
- CD: deploy `dist/` to GitHub Pages on merge to main.
- Pattern mirrors iifound-org's `ci.yml`/`cd.yml` but adapted for Astro.

---

## Closed questions

- **Sponsor logos:** ✓ All 18 logos downloaded and co-located in
  `src/pages/partners/sponsor-logos/`, optimized to WebP at build time.
- **Contact form:** ✓ Formspree endpoint `mvznwnng` set in `src/pages/contact/index.astro`.
- **Hosting/domain:** ✓ GitHub Pages at `https://team2363.org`. `site: 'https://team2363.org'`
  set in `astro.config.mjs`. No `base` path needed (custom domain serves from root).
  GitHub Pages is fully static — Formspree handles the contact form backend. If the
  team ever moves to Netlify, Netlify Forms would eliminate the third-party dependency.
- **Publications backfill:** ✓ All 179 currently available entries are live.

  ## Open questions

- **Sponsors:** Verify which sponsors are still active before launch (e.g. SPAWAR → NIWC
  Atlantic already updated; others may have changed).
- **Mailchimp inline validation:** Mailchimp's `mc-validate.js` requires jQuery (not loaded
  on this site). On submit the form currently redirects to Mailchimp's hosted confirmation page.
  To show inline success/error messages instead, write a small vanilla JS fetch-based handler
  (replaces jQuery dependency, ~20 lines). Low priority — redirect behavior is acceptable.
- **Site header logo:** URL could not be extracted via text scrape — needs browser
  inspection of the live site to retrieve the logo image file.
- **Analytics:** keep Google Analytics tag `G-RCJPFKDHNM`, or switch to a
  privacy-friendly alternative?
- **LinkedIn:** current URL points to Intentional Innovation Foundation, not the
  team — does a Triple Helix-specific LinkedIn page exist?
- **Individual publication pages:** no `[...slug].astro` route exists yet —
  publication cards on the publications page don't link anywhere. Needed before launch.
