---
name: nextjs-local-service-ia
description: >-
  Scaffold and plan Next.js App Router sites using a hub-and-spoke local-service
  information architecture (services, work/gallery, location hubs, contact) with
  SEO title/heading/linking conventions. No blog or journal. Use when starting a
  new Next.js marketing site, defining site hierarchy, internal linking,
  metadata titles, heading structure, sitemaps, or adapting the
  taylorrosereels-style layout (without a blog) to a different industry.
---

# Next.js local-service IA & SEO template

Reusable **site hierarchy + linking + SEO** pattern distilled from a production
local-service Next.js site. Industry-agnostic: do **not** copy niche offerings—
reuse the **shape**.

**Out of scope:** Blog, journal, or editorial content hubs. Do not scaffold
`/blog`, `/journal`, MDX posts, or category/tag taxonomy unless the user
explicitly asks for them later.

## When to use

- Planning or scaffolding a new Next.js App Router marketing/conversion site
- Defining routes, nav, titles, H1–H3, internal links, sitemap/redirects
- Porting this IA to another trade (contractor, clinic, studio, consultant, etc.)

## Core model (hub and spoke)

```
Home ──► Primary Services ──► Contact (conversion sink)
  │              │
  ├── Work/Gallery ◄─────────┘  (proof)
  └── Location Hubs (local SEO; optional map on main service)
```

| Role | Purpose | Typical path |
|------|---------|--------------|
| **Home** | Brand, trust, teaser of Work + proof | `/` |
| **Primary Service** | Rank + convert for one offering | `/services/[slug]` |
| **Location Hub** | City/region SEO for main offering | `/{city}-{region}-{service}` |
| **Work** | Proof galleries / case studies | `/work` or `/portfolio`… |
| **Contact** | Inquiry / booking | `/contact` |

Thin pages (pricing-only, FAQ-only, “experience”) → **301 into** a Primary Service or Contact.

## Scaffold workflow

Copy and track:

```
IA Progress:
- [ ] 1. Fill Site config worksheet (reference.md)
- [ ] 2. Lock route skeleton + redirects
- [ ] 3. Define Primary Service defs (data module)
- [ ] 4. Wire Work data source
- [ ] 5. Location registry (live | soon)
- [ ] 6. Apply metadata + heading recipes
- [ ] 7. Wire internal linking graph
- [ ] 8. sitemap.ts + robots.ts + JSON-LD basics
```

### Step 1 — Config first

Create `src/lib/siteConfig.ts` (or equivalent) with:

- `SITE_NAME`, `CANONICAL_SITE_URL`, `getSiteUrl()`
- Primary city / region / service-area list
- Location hub path + title constants for live cities

### Step 2 — Routes

Prefer **data-driven** dynamic routes for services and work items.  
Location hubs: registry + dedicated page (or shared `[locationSlug]` template) only when `status: 'live'`.

See [reference.md](reference.md) for full route table and linking graph.

### Step 3 — Metadata rules

Root layout:

```ts
title: {
  default: /* full home SEO title with place + brand */,
  template: `%s | ${SITE_NAME}`,
}
```

| Page type | Title strategy |
|-----------|----------------|
| Home, Contact, Primary Service, Location Hub, Work index | **Absolute** — full intent + place + brand |
| Work deep pages (category / item) | **Relative** — short segment; template appends brand |

Always set **per-URL** `alternates.canonical`. Mirror key titles in Open Graph.  
Include all **live** indexable URLs in `sitemap.ts`; omit `soon` location stubs.

### Step 4 — Heading recipe

- **One H1** per page
- Eyebrow as `<p>`, not a second H1
- **H2** = major sections (proof, FAQ, related Work, locations, testimonials)
- **H3** = card/list entity titles (projects, venues)
- FAQ questions → `<summary>` (or plain text), **not** H2/H3, unless product requires heading semantics; FAQPage JSON-LD can still list Q&As

| Page | H1 content |
|------|------------|
| Home | Brand/mood (+ place can live in eyebrow inside H1) |
| Primary Service | Story/benefit headline (keyword-forward title stays in `metaTitle`) |
| Location Hub | `{City}, {Region} {Primary Service}` |
| Work category / item | Entity name |
| Contact | Action-oriented invite |

### Step 5 — Linking graph (must ship)

1. **Nav:** Home, Work, Services (dropdown of Primary Services), Contact. Location hubs usually **not** in primary nav (discover via map / Work / SEO).
2. **Footer:** At least Primary Service links (+ optional Contact).
3. **Service ↔ Work:** Service embeds related Work; Work category/item links back to matching service.
4. **Service ↔ Location:** Main offering page embeds location map/list; live pins → Location Hubs.
5. **Work ↔ Location:** City-tagged items prefer Location Hub over generic Primary Service when a live hub exists.
6. **Location ↔ Work:** Hub links into Work with `?from=` (or equivalent) so back-nav returns to the hub.
7. **CTAs:** Primary conversion path ends at Contact.

### Step 6 — Data modules

| Entity | Module idea | Generates |
|--------|-------------|-----------|
| Primary Service | `servicesData.ts` — slug, copy, FAQ, meta, workCategoryKey | `/services/[slug]` |
| Work | registry + media manifest | `/work/...` |
| Location | `locations.ts` — path, status `live\|soon`, map coords | Live hubs only |
| Testimonials | tagged by service slug | Filtered proof sections |

Keep server-only FS helpers out of client bundles (don’t import Node readers into footer/nav shared with client).

## Anti-patterns

- Scaffolding a blog/journal “just in case”
- Duplicate thin URLs without 301s
- Location paths in sitemap before a real page exists
- Missing unique canonicals
- Multiple H1s or FAQ questions as heading spam
- Hardcoding every service page instead of one dynamic route + defs
- Importing Node `fs` helpers into client components via shared barrels

## Additional resources

- Full worksheets, route table, linking diagram, metadata samples: [reference.md](reference.md)
