# Triple Helix Robotics — team2363.org

Source code for the Triple Helix Robotics website at [team2363.org](https://team2363.org).

## Stack

| Tool                                                                                                          | Role                                                                                                              |
| ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [Astro](https://astro.build)                                                                                  | Static site generator. Builds the site to plain HTML/CSS/JS.                                                      |
| [Tailwind CSS](https://tailwindcss.com)                                                                       | Utility-first CSS framework for styling.                                                                          |
| [Alpine.js](https://alpinejs.dev)                                                                             | Lightweight JavaScript for interactive elements (nav toggle, publication filter). Loaded via CDN — no build step. |
| [Prettier](https://prettier.io) + [prettier-plugin-astro](https://github.com/withastro/prettier-plugin-astro) | Code formatter for `.astro`, `.ts`, `.md`, and `.json` files.                                                     |
| GitHub Actions                                                                                                | CI (format check + build) and CD (deploy to GitHub Pages) on every push.                                          |

## Prerequisites

- [Node.js](https://nodejs.org) v18 or later
- npm (comes with Node.js)

## Getting started

```bash
# Install dependencies
npm install

# Start the local development server (http://localhost:4321)
npm run dev

# Build the static site to dist/
npm run build

# Preview the built site locally
npm run preview
```

## Formatting

```bash
# Check formatting
npm run format:check

# Auto-fix formatting
npm run format
```

## Project structure

```
team2363-org/
├── public/                      Static assets served as-is (favicon, legacy images, etc.)
│   └── images/uploads/          WP media archive (reference; new images go in src/pages/)
├── src/
│   ├── content/
│   │   └── publications/        One directory per publication: index.md + thumbnail image
│   ├── content.config.ts        Zod schema for the publications content collection
│   ├── styles/
│   │   └── global.css           Tailwind base/components/utilities entry point
│   ├── components/
│   │   ├── Nav.astro            Site navigation
│   │   └── Footer.astro         Site footer
│   ├── layouts/
│   │   └── Base.astro           Base HTML layout (fonts, meta, Alpine.js)
│   └── pages/
│       ├── index.astro          Homepage
│       ├── hero.jpg             Hero background image (co-located with homepage)
│       ├── contact/
│       │   └── index.astro      Contact page
│       ├── partners/
│       │   ├── index.astro      Partners & sponsors page
│       │   ├── sponsors.json    Sponsor tier/name/URL data (edit to add/remove sponsors)
│       │   └── sponsor-logos/   Sponsor logo images, optimized to WebP at build time
│       └── publications/
│           └── index.astro      Publications listing with category filter
├── content/                     Content audit notes from team2363.org (reference only, not built)
├── docs/
│   └── style-guide.md           Brand colors, typography, icons, and design conventions
├── astro.config.mjs             Astro configuration
├── postcss.config.mjs           PostCSS configuration (wires Tailwind into the build)
├── tailwind.config.mjs          Tailwind configuration (brand colors, fonts)
└── PLAN.md                      Project plan and phase roadmap
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for step-by-step instructions on adding a publication, editing page content, running the site locally, and opening a pull request.

The short version: each publication is a single Markdown file in `src/content/publications/`. Copy `_template.md` in that folder, fill in the frontmatter fields, and open a pull request.
