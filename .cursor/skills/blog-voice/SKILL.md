---
name: taylor-rose-reels-blog-voice
description: >-
  Write blog posts for Taylor Rose Reels in Taylor's established voice—warm,
  first-person, story-driven wedding and portrait photography journal entries.
  Use when drafting, editing, or generating blog content for taylorrosereels.
---

# Taylor Rose Reels Blog Voice

Use this skill when writing or generating blog posts for **Taylor Rose Reels** (`taylorrosereels`). Match the voice, structure, and tone documented below. Reference post: `content/blog/jessica-gage-sawtooth-acres-wedding.mdx`.

## Voice at a glance

- **Perspective:** First person (`I`, `me`, `my`)—Taylor speaking directly to the reader.
- **Tone:** Warm, gracious, intimate, and emotionally present—not salesy or corporate.
- **Focus:** People, relationships, atmosphere, and meaning—not camera settings or technical jargon.
- **Energy:** Calm and elegant; celebrates without hype. Gratitude runs through the piece.

## Signature language

**Use naturally (do not force every word into every post):**

- timeless, authentic, genuine, meaningful, honored, grateful
- gentle, elegant, calm, effortless, magical
- love, laughter, connection, trust
- true to color (brand phrase—use when describing images or aesthetic)
- natural light, golden hour, sunset (when relevant to the session)

**Punctuation & style:**

- Prefer `&` over `and` in flowing prose (e.g. "magical & perfect", "love, laughter, & genuine connection").
- Use em dashes for emphasis or asides: "From choosing photo locations to embracing creative ideas—that kind of trust..."
- Semicolons are welcome in longer, literary sentences.
- Avoid exclamation marks unless truly warranted (rare).

## Post types

### Behind the gallery (wedding recaps)

Default format for real wedding/session stories.

**Structure:**

1. **Opening** — Introduce the couple, venue/location (city + state), and why the setting mattered. Paint the scene with specific details (bridal cabin, pond, ceremony space, etc.).
2. **Bride / subject** — Describe their presence, energy, and trust in Taylor. Highlight how trust enabled authentic images.
3. **Wedding party or support circle** — Bridesmaids, groomsmen, family—how they showed up with love, humor, and encouragement.
4. **Ceremony or central moment** — The most meaningful part of the day; personal details (e.g. officiant who knew their story).
5. **Details & vision** — Vendors, aesthetic, personal touches. Use words like timeless, vintage, ethereal when describing the couple's vision.
6. **Closing** — Gratitude for being trusted; reflect on why this work matters. End warmly, not with a hard sell.
7. **Gallery link** — One natural link to the portfolio shoot page when one exists.
8. **Vendors** — `## Vendors` heading, simple bullet list: `**Role:** Name`

### Planning tips / local guides

Same voice, but more helpful and guiding. Still first person. Lead with empathy ("should feel exciting—not stressful"). Use short sections with `##` headings. End with a soft invitation to [contact](/contact)—not pushy.

## Sentence patterns (from Taylor's writing)

**Venue opener:**
> "[Couple] were married at [venue] in [City], [State]; a [description] that feels just as special as the people who run it."

**Trust & authenticity:**
> "She trusted me completely. From [specific examples]—that kind of trust is something I'll never take for granted. It allowed us to create images that felt so authentically them."

**People-centered descriptions:**
> "They were easygoing, supportive, and always ready to laugh. Photos never felt forced because they genuinely enjoyed being there together."

**Meaningful moment:**
> "One of the most meaningful parts of the day was [moment]. [Specific detail that made it personal]."

**Closing gratitude:**
> "Being trusted to document this day was such an honor. [Couple], along with every friend, family member, and vendor who surrounded them, created an atmosphere that was full of love, laughter, and genuine connection. Days like this remind me why I love what I do, and I'm endlessly grateful I was the one who got to preserve these memories for them."

## What to avoid

- Generic wedding blog clichés ("tying the knot", "the big day finally arrived", "picture-perfect")
- Overly SEO-stuffed copy that breaks the warm tone
- Third-person distance ("the photographer captured...")
- Listing gear, aperture, or editing workflow
- Hard CTAs ("Book now!", "Don't wait!")
- Stiff bullet-heavy posts without narrative flow (except the vendor list at the end)

## Formatting for MDX posts

Posts live in `content/blog/[slug].mdx`.

**Frontmatter:**

```yaml
---
title: "Couple Name | Descriptive Title with Location"
description: "1–2 sentences for SEO/social—warm, specific, includes location when relevant."
date: "YYYY-MM-DD"
coverImage: "/images/blog/[slug]/cover.jpg"
coverImageAlt: "Descriptive alt text"
category: "Behind the gallery"  # or "Planning tips", "Local guides"
tags:
  - "weddings"
  - "City SC"
published: true
---
```

**Images:**

- Store in `public/images/blog/[slug]/`
- Name sequentially: `01.jpg`, `02.jpg`, ... plus `cover.jpg`
- Place images **between paragraphs** in the same order as the story unfolds
- Use descriptive alt text: couple, location, moment—not "image 1"

**Body:**

- Paragraphs only (no `##` headings in narrative sections except `## Vendors` at the end)
- One portfolio link when applicable: `[gallery name](/portfolio/category/shoot-slug)`
- Vendor list at the end for wedding recaps

## Local SEO (woven in, not stuffed)

Naturally mention:

- City and state (e.g. Pamplico, South Carolina; Florence, SC; Pee Dee)
- Venue names when relevant
- Session type (wedding, engagement, portrait, motherhood)

Do not repeat the same keyword awkwardly. Let place names appear in context.

## Categories & tags

| Category | Use for |
|----------|---------|
| Behind the gallery | Real wedding/session stories |
| Planning tips | What to wear, timeline advice, etc. |
| Local guides | Venues, photo spots, Pee Dee area |

Tags: session type + location + topic (e.g. `weddings`, `Pamplico SC`, `Sawtooth Acres`).

## Checklist before publishing

- [ ] Sounds like Taylor—not a template or AI generic voice
- [ ] First person throughout
- [ ] Specific names, places, and moments (not vague)
- [ ] Images placed between paragraphs in story order
- [ ] `cover.jpg` set; alt text on cover
- [ ] Vendor credits included for wedding recaps
- [ ] Portfolio link if gallery exists
- [ ] `published: true` only when ready to go live
