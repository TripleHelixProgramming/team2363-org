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

## Architecture decisions

- **Astro** + **Tailwind CSS** + **Prettier** (`prettier-plugin-astro`) + **Alpine.js** (CDN).
- **Page & asset co-location pattern** — each page that owns images lives in
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

## Other opinions

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
- Brand palette is confirmed (`content/02-branding.md`).

---

## Open questions

- **LinkedIn:** current URL points to Intentional Innovation Foundation. Should the team develop a Triple Helix-specific LinkedIn page?

---

## Notes

- GitHub Pages is fully static — Formspree handles the contact form backend. If the team ever moves to Netlify, Netlify Forms would eliminate the third-party dependency.
