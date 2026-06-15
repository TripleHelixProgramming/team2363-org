## Implementation guide

The following patterns cover the most common tasks needed to incorporate review comments. All content lives in `src/content/publications/<slug>/index.md`.

---

### Adding an image before a paragraph

1. Find the image in `public/images/uploads/YYYY/MM/`. WordPress exports use a `-scaled` suffix on resized versions (e.g. `IMG_3593-scaled.jpg`). Drop the suffix when renaming.
2. Move it into the publication directory with git mv:
   ```
   git mv public/images/uploads/YYYY/MM/filename-scaled.jpg src/content/publications/<slug>/filename.jpg
   ```
3. Insert a blank line, then the image tag, then another blank line before the target paragraph:

   ```markdown
   ![](./filename.jpg)

   Target paragraph text...
   ```

4. Images render centered and full-width by default in the prose styles.

---

### Fixing broken inline images from the WordPress import

Some publications have image links written as `[](http://team2363.org/wp-content/uploads/...)` — missing the `!` prefix that makes them images. Find the matching file in `public/images/uploads/`, move it, and fix the syntax:

```markdown
<!-- before -->

[](http://team2363.org/wp-content/uploads/2019/04/IMG_0163.jpg)

<!-- after -->

![](./IMG_0163.jpg)
```

---

### Embedding a YouTube video

Use a centered wrapper div with an iframe. The `src` URL uses `/embed/` instead of `/watch?v=`:

```html
<div style="display:flex;justify-content:center;margin:1.5em 0">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/VIDEO_ID"
    frameborder="0"
    allowfullscreen
  ></iframe>
</div>
```

---

### Line breaks without paragraph spacing

Use `<br>` tags to split lines within the same paragraph (e.g. a byline inside a blockquote):

```markdown
> By Nour Habib<br>Daily Press<br>Apr 16, 2023 at 10:44 am
```

Trailing double spaces also work in theory but are stripped by most editors; `<br>` is more reliable.

---

### Italicizing text

Use standard markdown `*text*`. Works inside links too:

```markdown
[_Behind the Bumpers_ interview](https://...)
```

For a standalone line (e.g. a photo caption or byline):

```markdown
_Gavin Stone, 757-712-4806, gavin.stone@virginiamedia.com_
```

---

### Restructuring a competition results list

Convert flat bullet points into linked `###` subheaders with bullet results underneath:

```markdown
<!-- before -->

- FIRST Chesapeake District - Blacksburg VA Event
  Winner
- Captain of Alliance 1

<!-- after -->

### [FIRST Chesapeake District - Blacksburg VA Event](https://www.thebluealliance.com/event/2023vabla)

- Winner
- Captain of Alliance 1
```

Event links use The Blue Alliance format: `https://www.thebluealliance.com/event/<eventkey>`.

---

### Image file naming conventions

- Drop WordPress size suffixes: `IMG_3593-1000x750.jpg` → `IMG_3593.jpg`
- Drop `-scaled` suffix: `IMG_3593-scaled.jpg` → `IMG_3593.jpg`
- Where multiple variants exist (e.g. `-1-scaled`, `-scaled`), the `-1-` variant is usually a cropped or alternate version — keep the `-1` but drop `-scaled`
