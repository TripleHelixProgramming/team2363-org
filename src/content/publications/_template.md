---
# Required fields
title: "Your publication title here"
date: 2026-01-01
categories:
  - CAD
  # Available categories:
  # CAD, Newsletter, Publicity, Awards, Robot Reveals, Programming,
  # Scouting, Administrative, Talks, BOM-CAW, Electrical, Mechanical,
  # Outreach, Instructional videos, Build season vlogs, Pneumatics

# Optional fields

# Thumbnail image shown on the publications index card.
# Place the image file next to this index.md and reference it as ./filename.jpg.
thumbnail: ./thumbnail.jpg

# External links shown as inline chips on the index card and detail page.
links:
  - label: "GrabCAD"
    url: "https://grabcad.com/library/..."
  - label: "Onshape"
    url: "https://cad.onshape.com/..."
  # Add as many links as needed. Each needs a label and url.

# Author shown on the detail page header.
author: "Nate Laverdure"

# Embedded video (YouTube or Vimeo). Shown after the body content.
videoUrl: "https://www.youtube.com/watch?v=..."

# Image gallery with lightbox. Shown after the body content.
# Place image files next to this index.md.
gallery:
  - src: ./gallery-first.jpg
    caption: "Caption for the first image"
  - src: ./gallery-second.jpg
    caption: "Caption for the second image"
  # Add as many images as needed. Each needs src and caption.

# Collapsible accordion sections. Shown after the body content (before gallery).
# Items without a body are rendered as non-expandable static cards.
# In the body, prefix a paragraph with "> " to render it as a blockquote.
accordion:
  - heading: "2024 - Winner Name"
    body: |
      First paragraph of the section body.

      Second paragraph. Separate paragraphs with a blank line.

      > This paragraph will be rendered as a blockquote with a gold left border.
  - heading: "2023 - Another Name"
    body: |
      Body text for this entry.
  - heading: "2022 - No Body Example"
    # Omit body entirely for a non-expandable static card.
---

Write the body of your publication here using Markdown.

You can use **bold**, _italic_, [links](https://example.com), and more.

To add a heading, use `##` or `###` — avoid `#` (that's reserved for the page title).