import re

content = open("src/pages/index.astro", encoding="utf-8").read()

# 1. Add ImageMetadata import + sponsors imports
old_imports = 'import { excerpt } from "../utils/excerpt";\nimport { sortPublications } from "../utils/publications";'
new_imports = '''import type { ImageMetadata } from "astro";
import { excerpt } from "../utils/excerpt";
import { sortPublications } from "../utils/publications";
import sponsorsData from "./partners/sponsors.json";

const logoModules = import.meta.glob<{ default: ImageMetadata }>(
  "./partners/sponsor-logos/*.{png,jpg,jpeg,webp,svg}",
  { eager: true },
);
function getLogo(filename: string): ImageMetadata | undefined {
  return logoModules[`./partners/sponsor-logos/${filename}`]?.default;
}
const sponsors = sponsorsData.tiers
  .flatMap((t) => t.sponsors)
  .filter((s) => getLogo(s.logo));'''
assert old_imports in content, "imports not found"
content = content.replace(old_imports, new_imports, 1)

# 2. Change slice(0, 3) to slice(0, 6)
assert ".slice(0, 3);" in content, "slice not found"
content = content.replace(".slice(0, 3);", ".slice(0, 6);", 1)

# 3. Replace Partners preview section
old_partners = """    <!-- Partners preview -->
    <section class="py-16 px-4 text-center">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-navy-dark mb-4">
          Who makes it possible?
        </h2>
        <p class="text-gray-600 mb-8">
          We are grateful to our sponsors and partners for making Triple Helix
          possible.
        </p>
        <a
          href="/partners/"
          class="inline-block bg-navy-dark text-white font-bold px-6 py-3 rounded hover:bg-navy transition-colors"
        >
          See all our partners
        </a>
      </div>
    </section>"""
new_partners = """    <!-- Sponsor carousel -->
    <section class="py-16 px-4">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl font-bold text-navy-dark mb-2 text-center">
          Who makes it possible?
        </h2>
        <p class="text-gray-600 mb-8 text-center">
          We are grateful to our sponsors and partners for making Triple Helix
          possible.
        </p>
        <div
          x-data="{
            prev() { $refs.track.scrollBy({ left: -204, behavior: 'smooth' }) },
            next() { $refs.track.scrollBy({ left: 204, behavior: 'smooth' }) },
          }"
          class="relative"
        >
          <button
            @click="prev()"
            class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 bg-white border border-gray-200 shadow rounded-full p-2 hover:bg-gray-50 transition-colors"
            aria-label="Previous sponsors"
          >
            <svg
              class="w-4 h-4 text-navy"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <div
            x-ref="track"
            class="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory"
            style="scrollbar-width: none; -ms-overflow-style: none;"
          >
            {
              sponsors.map((s) => {
                const logo = getLogo(s.logo)!;
                return (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.name}
                    class="shrink-0 snap-start flex items-center justify-center w-44 h-24 bg-white rounded border border-gray-100 p-4 hover:shadow-md transition-shadow"
                  >
                    <Image
                      src={logo}
                      alt={s.name}
                      class="max-w-full max-h-full object-contain"
                    />
                  </a>
                );
              })
            }
          </div>
          <button
            @click="next()"
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 bg-white border border-gray-200 shadow rounded-full p-2 hover:bg-gray-50 transition-colors"
            aria-label="Next sponsors"
          >
            <svg
              class="w-4 h-4 text-navy"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
        <div class="mt-8 text-center">
          <a
            href="/partners/"
            class="inline-block bg-navy-dark text-white font-bold px-6 py-3 rounded hover:bg-navy transition-colors"
          >
            See all our partners
          </a>
        </div>
      </div>
    </section>"""
assert old_partners in content, "partners section not found"
content = content.replace(old_partners, new_partners, 1)

# 4. Replace publications grid with carousel
# Find the block from the opening { to the closing }
# Match the `latestPublications.length > 0 ? (` block
old_pub_start = '        {\n          latestPublications.length > 0 ? (\n            <ul class="grid gap-6 md:grid-cols-3">'
new_pub_block = """        {
          latestPublications.length > 0 ? (
            <div
              x-data="{
                prev() { $refs.track.scrollBy({ left: -$refs.track.offsetWidth, behavior: 'smooth' }) },
                next() { $refs.track.scrollBy({ left: $refs.track.offsetWidth, behavior: 'smooth' }) },
              }"
              class="relative"
            >
              <button
                @click="prev()"
                class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 bg-white border border-gray-200 shadow rounded-full p-2 hover:bg-gray-50 transition-colors"
                aria-label="Previous publications"
              >
                <svg
                  class="w-4 h-4 text-navy"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <ul
                x-ref="track"
                class="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory"
                style="scrollbar-width: none; -ms-overflow-style: none;"
              >
                {latestPublications.map((pub) => (
                  <li class="shrink-0 snap-start w-80 bg-white rounded shadow-sm p-5">
                    {pub.data.thumbnail && (
                      <Image
                        src={pub.data.thumbnail}
                        alt=""
                        class="w-full h-40 object-cover rounded mb-4"
                      />
                    )}
                    <p class="text-xs text-gray-400 mb-1">
                      {pub.data.date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <h3 class="font-bold text-navy mb-2">
                      <a
                        href={`/publications/${pub.id.replace(/\\/index\\.md$/, "")}/`}
                        class="hover:text-gold transition-colors"
                      >
                        {pub.data.title}
                      </a>
                    </h3>
                    {pub.body && (
                      <p class="text-sm text-gray-600 mb-3">
                        {excerpt(pub.body)}
                      </p>
                    )}
                    {pub.data.links && pub.data.links.length > 0 && (
                      <ul class="flex flex-wrap gap-2">
                        {pub.data.links.map(({ label, url }) => (
                          <li>
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              class="text-xs font-medium text-gold hover:underline"
                            >
                              {label} &rarr;
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              <button
                @click="next()"
                class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 bg-white border border-gray-200 shadow rounded-full p-2 hover:bg-gray-50 transition-colors"
                aria-label="Next publications"
              >
                <svg
                  class="w-4 h-4 text-navy"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <p class="text-gray-500">No publications yet.</p>
          )
        }"""

# Find the old publications block by locating start and end markers
start_marker = '        {\n          latestPublications.length > 0 ? ('
end_marker = '          )\n        }'
start_idx = content.find(start_marker)
assert start_idx != -1, "pub block start not found"
end_idx = content.find(end_marker, start_idx) + len(end_marker)
assert end_idx > start_idx, "pub block end not found"

old_pub_block = content[start_idx:end_idx]
print("Old pub block found, length:", len(old_pub_block))
content = content[:start_idx] + new_pub_block + content[end_idx:]

open("src/pages/index.astro", "w", encoding="utf-8").write(content)
print("Done — index.astro updated")
