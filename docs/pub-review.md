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

---

## Review comments

---

## Not yet reviewed

- 2021-10-29-2020-2021-annual-report
- 2020-03-12-chairmans-award-submission-2020
- 2020-03-10-event-floor-non-technical-talking-points-2020
- 2020-03-09-nmir-correspondence
- 2020-03-07-accessible-archery
- 2020-03-02-newsletter-triple-helix-finalists-and-ei-award-winners-in-northern-va
- 2020-02-26-genome-mu-2020-reveal-video
- 2020-02-22-genome-mu-2020-bom
- 2020-02-05-woodie-flowers-submission-2020
- 2020-01-31-standard-roller-end-configurations
- 2020-01-29-latching-switch-adapter-for-arcade-button
- 2020-01-29-case-for-wide-angle-vga-usb-camera-module
- 2020-01-13-outreach-event-log
- 2020-01-09-newsletter-triple-helix-robotics-early-build-season-update
- 2019-12-31-newsletter-triple-helix-robotics-prepares-to-play-infinite-recharge
- 2019-12-09-newsletter-congratulations-waffle-bunnies-and-rrf
- 2019-11-10-dropping-the-bom
- 2019-11-06-budget-2019-2020
- 2019-09-20-in-kind-donation-most-wanted-list
- 2019-08-29-genome-lambda-2019-cad-release
- 2019-07-11-newsletter-triple-helix-robotics-july-2019-update
- 2019-05-11-newsletter-triple-helix-robotics-update-may-2019
- 2019-05-02-a-vision-for-first-chesapeake
- 2019-04-18-accessible-controls-for-ride-on-toy-car
- 2019-04-13-scouting-data-2019-first-chesapeake-district-championship
- 2019-03-18-newsletter-triple-helix-1st-overall-pick-semifinalists-in-portsmouth
- 2019-03-04-newsletter-triple-helix-double-medals-in-haymarket
- 2019-03-01-genome-lambda-2019-bom
- 2019-03-01-destination-deep-space-spectators-guide
- 2019-02-28-typical-pre-competition-briefing
- 2019-02-27-genome-lambda-2019-reveal-video
- 2019-02-15-newsletter-triple-helix-robotics-build-season-update
- 2019-02-10-triple-helix-builds-bumpers
- 2019-02-07-chairmans-award-submission-2019
- 2019-02-06-woodie-flowers-submission-2019
- 2019-01-18-method-for-arcade-drive-input-scaling
- 2019-01-04-2018-summer-mini-ftc-robot-cad
- 2019-01-01-newsletter-triple-helix-update-january-2019
- 2018-12-01-newsletter-triple-helix-update-december-2018
- 2018-11-29-converting-festos-flow-rate-spec-to-cv
- 2018-11-26-replacing-cots-gear-stages-with-chain-or-belt
- 2018-11-15-newsletter-this-saturday-inaugural-open-house-of-the-peninsula-stem-gym
- 2018-11-01-newsletter-triple-helix-update-november-2018
- 2018-10-01-newsletter-triple-helix-update-october-2018
- 2018-09-23-press-release-peninsula-stem-gym-provides-practice-opportunities-for-hampton-roads-youth-robotics-teams
- 2018-09-01-newsletter-triple-helix-update-september-2018
- 2018-08-03-newsletter-triple-helix-update-august-2018
