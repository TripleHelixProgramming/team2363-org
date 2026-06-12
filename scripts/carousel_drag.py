content = open("src/pages/index.astro", encoding="utf-8").read()

# ── 1. Sponsor carousel: double card size + scroll amount ─────────────────────

old = 'w-44 h-24 bg-white rounded border border-gray-100 p-4 hover:shadow-md transition-shadow'
new = 'w-[22rem] h-48 bg-white rounded border border-gray-100 p-4 hover:shadow-md transition-shadow'
assert old in content
content = content.replace(old, new, 1)

old = "prev() { $refs.track.scrollBy({ left: -204, behavior: 'smooth' }) },"
new = "prev() { $refs.track.scrollBy({ left: -376, behavior: 'smooth' }) },"
assert old in content
content = content.replace(old, new, 1)

old = "next() { $refs.track.scrollBy({ left: 204, behavior: 'smooth' }) },"
new = "next() { $refs.track.scrollBy({ left: 376, behavior: 'smooth' }) },"
assert old in content
content = content.replace(old, new, 1)

# ── 2. Add drag-to-scroll to SPONSOR carousel x-data ─────────────────────────

old = """          x-data="{
            prev() { $refs.track.scrollBy({ left: -376, behavior: 'smooth' }) },
            next() { $refs.track.scrollBy({ left: 376, behavior: 'smooth' }) },
          }\""""
new = """          x-data="{
            drag: false, startX: 0, sl: 0,
            prev() { $refs.track.scrollBy({ left: -376, behavior: 'smooth' }) },
            next() { $refs.track.scrollBy({ left: 376, behavior: 'smooth' }) },
            startDrag(e) { this.drag = true; this.startX = e.pageX; this.sl = this.$refs.track.scrollLeft; },
            onDrag(e) { if (!this.drag) return; e.preventDefault(); this.$refs.track.scrollLeft = this.sl - (e.pageX - this.startX); },
            stopDrag() { this.drag = false; },
          }\""""
assert old in content, "sponsor x-data not found"
content = content.replace(old, new, 1)

# Add drag handlers to the sponsor track div
old = """            class="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory"
            style="scrollbar-width: none; -ms-overflow-style: none;"
          >
            {
              sponsors.map"""
new = """            class="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory"
            :class="drag ? 'cursor-grabbing select-none' : 'cursor-grab'"
            style="scrollbar-width: none; -ms-overflow-style: none;"
            @mousedown="startDrag($event)"
            @mousemove="onDrag($event)"
            @mouseup="stopDrag()"
            @mouseleave="stopDrag()"
          >
            {
              sponsors.map"""
assert old in content, "sponsor track div not found"
content = content.replace(old, new, 1)

# ── 3. Add drag-to-scroll to PUBLICATIONS carousel x-data ────────────────────

old = """              x-data="{
                prev() { $refs.track.scrollBy({ left: -$refs.track.offsetWidth, behavior: 'smooth' }) },
                next() { $refs.track.scrollBy({ left: $refs.track.offsetWidth, behavior: 'smooth' }) },
              }\""""
new = """              x-data="{
                drag: false, startX: 0, sl: 0,
                prev() { $refs.track.scrollBy({ left: -$refs.track.offsetWidth, behavior: 'smooth' }) },
                next() { $refs.track.scrollBy({ left: $refs.track.offsetWidth, behavior: 'smooth' }) },
                startDrag(e) { this.drag = true; this.startX = e.pageX; this.sl = this.$refs.track.scrollLeft; },
                onDrag(e) { if (!this.drag) return; e.preventDefault(); this.$refs.track.scrollLeft = this.sl - (e.pageX - this.startX); },
                stopDrag() { this.drag = false; },
              }\""""
assert old in content, "pub x-data not found"
content = content.replace(old, new, 1)

# Add drag handlers to the publications track ul
old = """              class="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory"
                style="scrollbar-width: none; -ms-overflow-style: none;"
              >"""
new = """              class="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory"
                :class="drag ? 'cursor-grabbing select-none' : 'cursor-grab'"
                style="scrollbar-width: none; -ms-overflow-style: none;"
                @mousedown="startDrag($event)"
                @mousemove="onDrag($event)"
                @mouseup="stopDrag()"
                @mouseleave="stopDrag()"
              >"""
assert old in content, "pub track ul not found"
content = content.replace(old, new, 1)

open("src/pages/index.astro", "w", encoding="utf-8").write(content)
print("Done")
