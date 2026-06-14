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

- 2022-11-15-rev-swerve-wheel-tread-jig
- 2022-07-24-matt-wilbur-award
- 2022-07-22-newsletter-triple-helix-robotics-quarterfinalists-at-iri
- 2022-05-25-sds-mk4-swerve-wheel-tread-jigs
- 2022-04-27-triple-helix-featured-in-menchville-hs-student-newspaper-the-lions-roar
- 2022-04-27-triple-helix-featured-in-jefferson-lab-news
- 2022-04-14-2022-first-championship-conference-schedule
- 2022-04-10-newsletter-triple-helix-wins-at-the-first-chesapeake-district-championship
- 2022-04-10-genome-nu-2020-pre-match-checklist
- 2022-04-03-woodie-flowers-2022-chris-garrity
- 2022-04-02-genome-nu-2022-bom
- 2022-03-23-the-engineering-awards-hexafecta
- 2022-03-22-scouting-data-2022-first-richmond-2-day-1-2
- 2022-03-21-newsletter-triple-helix-robotics-now-3x-winners-in-colonial-heights
- 2022-03-21-chairmans-award-judge-feedback
- 2022-03-07-newsletter-triple-helix-robotics-winners-in-colonial-heights
- 2022-03-02-2022-genome-nu-autos
- 2022-02-22-genome-nu-2022-reveal-video
- 2022-02-16-chairmans-award-submission-2022
- 2022-02-10-deans-list-2022-justin-b
- 2022-02-10-deans-list-2022-joshua-n
- 2022-01-26-explainer-intake-linkage-design-process
- 2022-01-06-fall-2021-drivetrain-cad-release
- 2021-12-02-budget-2021-2022
- 2021-11-25-circular-gimbal-mask-for-radiomaster-tx16s
- 2021-11-04-newsletter-triple-helix-robotics-annual-report
- 2021-10-29-2020-2021-annual-report
- 2021-08-20-message-from-iif-on-equal-educational-opportunities-for-transgender-students
- 2021-07-19-qa-hosting-an-offseason-event
- 2021-07-10-electronics-workbench-upgrade
- 2021-07-07-be-a-mentor-for-triple-helix-robotics
- 2021-04-08-newsletter-triple-helix-completes-all-the-infinite-recharge-home-skills-challenges
- 2021-03-27-infinite-recharge-home-interview-presentation
- 2021-03-03-genome-mu-2020-data-sheet
- 2021-02-01-our-infinite-recharge-at-home-skills-competition-raw-scores
- 2021-01-08-genome-mu-2020-cad-release
- 2020-10-16-newsletter-triple-helix-robotics-october-2020-update
- 2020-09-21-newsletter-triple-helix-robotics-september-2020-update
- 2020-09-06-2020-summer-project-vision-aiming-testbed
- 2020-09-03-triple-helix-returns-to-flight-with-a-fpv-drone-competition
- 2020-04-15-newsletter-peninsula-stem-gym-seeks-new-home
- 2020-04-10-beyond-chairmans-teaming-up-to-build-assistive-tech
- 2020-04-05-pre-match-checklist-2020
- 2020-03-28-live-qa-hosting-a-rumble
- 2020-03-19-question-309
- 2020-03-15-genome-mu-controller-maps
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
- 2018-08-30-triple-helix-tech-tips
- 2018-08-03-newsletter-triple-helix-update-august-2018
