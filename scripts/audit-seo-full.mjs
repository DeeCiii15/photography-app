/**
 * Full SEO audit — title, description, canonical, OG, robots, H1–H3 per live route.
 * Run: node scripts/audit-seo-full.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import PDFDocument from 'pdfkit';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const SITE = 'Taylor Rose Reels';
const CITY = 'Florence';
const STATE = 'South Carolina';
const ABBR = 'SC';
const REGION = 'Pee Dee';
const SITE_DESC =
  'Taylor Rose Reels is a Florence, SC wedding & portrait photographer serving the Pee Dee—Hartsville, Darlington, Marion, Lake City, & beyond.';

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function listHtml(items) {
  if (!items?.length) return '<span class="empty">—</span>';
  return `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
}

const categories = [
  {
    name: 'Weddings',
    folder: 'weddings',
    description:
      'Veil soft in the breeze, daddy walking you down the aisle, & the quiet tear he tries to hide—I live for those honest wedding-day moments.',
  },
  {
    name: 'Motherhood',
    folder: 'motherhood',
    description:
      'That glow, the bump, & the wonder before & after baby arrives—documented gently, never rushed.',
  },
  {
    name: 'Couples / Engagement',
    folder: 'couples-engagement',
    description:
      'Ocean waves, downtown strolls, or evening boat rides—wherever y’all feel like yourselves is where I’ll meet you.',
  },
  {
    name: 'Special Events',
    folder: 'special-events',
    description:
      'Galas, brand launches, & the milestones that deserve to be remembered with polish & a little Southern warmth.',
  },
  {
    name: 'Family',
    folder: 'family',
    description:
      'Your people, warm light, & so much love. Family portraits that feel natural & authentic, not posed or forced.',
  },
  {
    name: 'Portraits',
    folder: 'portraits',
    description:
      'Just you—soft light & room to breathe—portraits that feel like a compliment, not a performance.',
  },
];

function parseShoots() {
  const shootsSrc = fs.readFileSync(
    path.join(root, 'src/lib/portfolioShoots.ts'),
    'utf8',
  );
  const byCat = {};
  for (const cat of categories.map((c) => c.name)) {
    const escaped = cat.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const keyRe = new RegExp(`(?:'${escaped}'|${escaped})\\s*:\\s*\\[`);
    const mKey = keyRe.exec(shootsSrc);
    if (!mKey) {
      byCat[cat] = [];
      continue;
    }
    const start = shootsSrc.indexOf('[', mKey.index);
    let depth = 0;
    let end = start;
    for (let i = start; i < shootsSrc.length; i++) {
      if (shootsSrc[i] === '[') depth++;
      if (shootsSrc[i] === ']') {
        depth--;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }
    const block = shootsSrc.slice(start, end + 1);
    const shoots = [];
    // Match each shoot object; description may be single- or double-quoted, and
    // name/venue fields may appear between title and description.
    const objRe =
      /\{\s*slug:\s*'([^']+)'\s*,\s*title:\s*'((?:\\'|[^'])*)'([\s\S]*?)(?=\n\s*\{|\n\s*\])/g;
    let m;
    while ((m = objRe.exec(block))) {
      const rest = m[3] || '';
      const descSingle = rest.match(/description:\s*'((?:\\'|[^'])*)'/);
      const descDouble = rest.match(/description:\s*"((?:\\"|[^"])*)"/);
      let description = '';
      if (descSingle) description = descSingle[1].replace(/\\'/g, "'");
      else if (descDouble) description = descDouble[1].replace(/\\"/g, '"');
      shoots.push({
        slug: m[1],
        title: m[2].replace(/\\'/g, "'"),
        description,
      });
    }
    byCat[cat] = shoots;
  }
  return byCat;
}

function expandSiteTokens(s) {
  return (s || '')
    .replace(/\$\{PRIMARY_CITY\}/g, CITY)
    .replace(/\$\{PRIMARY_STATE_ABBR\}/g, ABBR)
    .replace(/\$\{PRIMARY_STATE\}/g, STATE)
    .replace(/\$\{PRIMARY_REGION\}/g, REGION)
    .replace(/\$\{SITE_NAME\}/g, SITE)
    .replace(/\$\{CITY\}/g, CITY)
    .replace(/\$\{ABBR\}/g, ABBR)
    .replace(/\$\{STATE\}/g, STATE)
    .replace(/\$\{REGION\}/g, REGION)
    .replace(/\$\{SITE\}/g, SITE);
}

/** Read a single-quoted / template-literal / double-quoted const from a page file. */
function readPageConst(relPath, constName) {
  const src = fs.readFileSync(path.join(root, relPath), 'utf8');
  const re = new RegExp(
    `(?:const|export const)\\s+${constName}\\s*=\\s*(?:\n\\s*)?([\\\`'"])([\\s\\S]*?)\\1\\s*;`,
  );
  const m = src.match(re);
  if (!m) return null;
  return expandSiteTokens(m[2]);
}

function readFirstH2(relPath) {
  const src = fs.readFileSync(path.join(root, relPath), 'utf8');
  const m = src.match(/<h2\b[^>]*>\s*([\s\S]*?)\s*<\/h2>/i);
  if (!m) return null;
  return m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

/** Metadata description= template/string on a page (first match). */
function readPageMetaDescription(relPath) {
  const src = fs.readFileSync(path.join(root, relPath), 'utf8');
  const tpl = src.match(/description:\s*`([^`]*)`/);
  if (tpl) return expandSiteTokens(tpl[1]);
  const sq = src.match(/description:\s*'((?:\\'|[^'])*)'/);
  if (sq) return expandSiteTokens(sq[1].replace(/\\'/g, "'"));
  const dq = src.match(/description:\s*"((?:\\"|[^"])*)"/);
  if (dq) return expandSiteTokens(dq[1].replace(/\\"/g, '"'));
  return null;
}

function parseCategorySeoFromData() {
  const src = fs.readFileSync(
    path.join(root, 'src/lib/portfolioData.ts'),
    'utf8',
  );
  const byName = {};
  const blockRe =
    /\{\s*name:\s*'((?:\\'|[^'])*)'\s*,[\s\S]*?(?=^\s*\{|\n\s*\];)/gm;
  let m;
  while ((m = blockRe.exec(src))) {
    const block = m[0];
    const name = m[1].replace(/\\'/g, "'");
    const pageHeading = block.match(/pageHeading:\s*'((?:\\'|[^'])*)'/)?.[1];
    const metaTitle = block.match(/metaTitle:\s*'((?:\\'|[^'])*)'/)?.[1];
    const documentTitle = block.match(
      /documentTitle:\s*'((?:\\'|[^'])*)'/,
    )?.[1];
    byName[name] = {
      pageHeading: pageHeading?.replace(/\\'/g, "'") || null,
      metaTitle: metaTitle?.replace(/\\'/g, "'") || null,
      documentTitle: documentTitle?.replace(/\\'/g, "'") || null,
    };
  }
  return byName;
}

function parseServices() {
  const src = fs.readFileSync(path.join(root, 'src/lib/servicesData.ts'), 'utf8');
  const services = [];
  const parts = src.split(/slug:\s*'/).slice(1);
  for (const part of parts) {
    const slug = part.match(/^([^']+)'/)?.[1];
    const name = part.match(/name:\s*'([^']+)'/)?.[1];
    const navLabel = part.match(/navLabel:\s*'([^']+)'/)?.[1];
    const copyTopic = part.match(/copyTopic:\s*'([^']+)'/)?.[1];
    const eyebrow = part.match(/eyebrow:\s*'([^']+)'/)?.[1];
    const headline = part
      .match(/headline:\s*'((?:\\'|[^'])*)'/)?.[1]
      ?.replace(/\\'/g, "'");
    const accent = part
      .match(/headlineAccent:\s*'((?:\\'|[^'])*)'/)?.[1]
      ?.replace(/\\'/g, "'");
    const metaRaw = part.match(/metaTitle:\s*`([^`]*)`/)?.[1];
    const metaDescRaw = part.match(/metaDescription:\s*`([^`]*)`/)?.[1];
    if (!slug || !name) continue;
    services.push({
      slug,
      name,
      navLabel,
      copyTopic: copyTopic || (navLabel || '').toLowerCase(),
      eyebrow,
      serviceNameAsH1: /serviceNameAsH1:\s*true/.test(part.slice(0, 400)),
      headline: `${headline} ${accent}`.trim(),
      metaTitle: expandSiteTokens(metaRaw),
      metaDescription: expandSiteTokens(metaDescRaw),
    });
  }
  return services;
}

const shootsByCat = parseShoots();
const services = parseServices();

const blogDir = path.join(root, 'content/blog');
const posts = fs
  .readdirSync(blogDir)
  .filter((f) => (f.endsWith('.mdx') || f.endsWith('.md')) && !f.startsWith('_'))
  .map((f) => {
    const raw = fs.readFileSync(path.join(blogDir, f), 'utf8');
    const { data, content } = matter(raw);
    return {
      slug: f.replace(/\.mdx?$/, ''),
      title: String(data.title),
      description: String(data.description || ''),
      category: data.category ? String(data.category) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      h2s: [...content.matchAll(/^##\s+(.+)$/gm)].map((x) => x[1].trim()),
      h3s: [...content.matchAll(/^###\s+(.+)$/gm)].map((x) => x[1].trim()),
    };
  })
  .sort((a, b) => a.slug.localeCompare(b.slug));

const ROBOTS_INDEX =
  'index, follow (googleBot: index, follow) — from root layout';

/** @type {Array<Record<string, unknown>>} */
const pages = [];

function add(p) {
  pages.push({
    robots: ROBOTS_INDEX,
    keywords: null,
    ogTitle: p.title,
    ogDescription: p.description,
    ogUrl: p.canonical,
    ...p,
  });
}

const portfolioCatBySlug = {
  'wedding-photography': 'Weddings',
  'engagement-photography': 'Couples / Engagement',
  'special-events-photography': 'Special Events',
  'family-portrait-photography': 'Family',
  'motherhood-photography': 'Motherhood',
  'portrait-photography': 'Portraits',
};

const servicesWithTestimonials = new Set([
  'wedding-photography',
  'engagement-photography',
  'special-events-photography',
  'family-portrait-photography',
  'portrait-photography',
]);

// —— Core ——
// Matches HOME_PAGE_TITLE in src/app/layout.tsx
const HOME_PAGE_TITLE = `${CITY}, ${ABBR} Photographer | Weddings & Portraits | ${SITE}`;

add({
  group: 'Core',
  path: '/',
  title: HOME_PAGE_TITLE,
  description: SITE_DESC,
  canonical: '/',
  keywords:
    'Florence SC photographer; Pee Dee wedding photographer; Florence wedding photographer; South Carolina portrait photographer; SC engagement photographer; wedding photographer Florence SC; elopement photographer Pee Dee; natural light photography; true to color; timeless; Taylor Rose Reels',
  titleMode: 'absolute (layout default / HOME_PAGE_TITLE)',
  h1: [
    `${CITY}, ${ABBR} · ${REGION} · Wedding & portrait Soft light, honest color, warmth that feels like memory.`,
  ],
  h2: [
    "Every photo tells a story; I'd love to help you tell yours.",
    'More stories, same light',
    'What they still talk about',
  ],
  h3: categories.map((c) => c.name),
  notes:
    'H1 wraps location eyebrow + display line. Category cards on home gallery are H3. Keywords only set on root layout (inherited sitewide unless overridden).',
});

// Contact — read title/description/H2 from src/app/contact/page.tsx
const CONTACT_TITLE =
  readPageConst('src/app/contact/page.tsx', 'CONTACT_TITLE') ||
  `Contact a ${CITY}, ${ABBR} Photographer | ${SITE}`;
const CONTACT_DESCRIPTION =
  readPageConst('src/app/contact/page.tsx', 'CONTACT_DESCRIPTION') ||
  readPageMetaDescription('src/app/contact/page.tsx');
const CONTACT_H2 = readFirstH2('src/app/contact/page.tsx');

add({
  group: 'Core',
  path: '/contact',
  title: CONTACT_TITLE,
  description: CONTACT_DESCRIPTION,
  canonical: '/contact',
  titleMode: 'absolute',
  h1: ['Share your event vision with me'],
  h2: CONTACT_H2 ? [CONTACT_H2] : [],
  h3: [],
  notes:
    'Title/meta/H2 read from contact/page.tsx (not hardcoded inventory).',
});

const PORTFOLIO_H2 = readFirstH2('src/app/portfolio/page.tsx');

add({
  group: 'Core',
  path: '/portfolio',
  title: `Wedding & Event Portfolio in Florence, SC | ${SITE}`,
  description: `Wedding, elopement, engagement, portrait, & event galleries from ${CITY}, ${ABBR} & the ${REGION}. Natural light & honest color by ${SITE}.`,
  canonical: '/portfolio',
  titleMode: 'absolute (portfolio/layout)',
  h1: ['Documenting Stories One Photograph at a Time'],
  h2: PORTFOLIO_H2 ? [PORTFOLIO_H2] : [],
  h3: categories.map((c) => c.name),
  notes: 'Supporting line is H2 (read from portfolio/page.tsx). Category cards use H3.',
});

const FLORENCE_DESC =
  readPageMetaDescription('src/app/florence-sc-wedding-photography/page.tsx') ||
  `${CITY}, ${ABBR} wedding photographer—documentary, true-to-color galleries at favorite venues. Honest coverage for couples across the ${REGION}.`;

add({
  group: 'Location',
  path: '/florence-sc-wedding-photography',
  title: `${CITY}, ${STATE} Wedding Photography | ${SITE}`,
  description: FLORENCE_DESC,
  canonical: '/florence-sc-wedding-photography',
  titleMode: 'absolute',
  h1: [`${CITY}, ${STATE} Wedding Photography`],
  h2: [
    `Why I love being a part of your ${CITY} wedding`,
    `${CITY} wedding venues I love`,
    `Let's talk about your ${CITY} area wedding`,
  ],
  h3: [
    'Glenview Farm Events',
    'Parker Pines',
    'The Cabin at Old Spur',
    'Murphy Farm',
  ],
  notes:
    'Meta description read from florence-sc-wedding-photography/page.tsx. Only live location hub in sitemap.',
});

for (const s of services) {
  const h2 = [`A closer look at ${s.name.toLowerCase()}`];
  if (s.slug === 'wedding-photography') {
    h2.push(`Across the ${REGION}`, 'Wedding related reading');
  }
  if (s.slug === 'engagement-photography') {
    h2.push(`Suggested engagement venues in and around ${CITY}`);
  }
  if (s.slug === 'special-events-photography') {
    h2.push('Wherever feels meaningful');
  }
  if (s.slug === 'family-portrait-photography') {
    h2.push(`Suggested family portrait locations in and around ${CITY}`);
  }
  h2.push(`Straight answers about ${s.copyTopic || s.navLabel.toLowerCase()}`);
  if (servicesWithTestimonials.has(s.slug)) {
    h2.push(`What they say about ${s.copyTopic || s.navLabel.toLowerCase()}`);
  }
  const catName = portfolioCatBySlug[s.slug];
  const weddingTitleNote =
    s.slug === 'wedding-photography'
      ? ' Title intentionally omits city (location lives in meta description); not an SEO defect.'
      : '';
  add({
    group: 'Services',
    path: `/services/${s.slug}`,
    title: s.metaTitle,
    description: s.metaDescription,
    canonical: `/services/${s.slug}`,
    titleMode: 'absolute (service.metaTitle)',
    h1: [s.serviceNameAsH1 ? s.name : s.headline],
    h2,
    h3: (shootsByCat[catName] || []).map((x) => x.title),
    notes: s.serviceNameAsH1
      ? `H1 is service name via serviceNameAsH1 (eyebrow styling); display line is non-heading brand copy.${weddingTitleNote}`
      : 'Shoot titles in gallery are H3. FAQ questions are <summary>, not headings. Related reading only when matching posts exist (weddings). Testimonials H2 omitted when no tagged reviews (motherhood).',
  });
}

// Mirrors categoryMetadata() in src/lib/portfolioSeo.ts
const categorySeo = parseCategorySeoFromData();

for (const cat of categories) {
  const shoots = shootsByCat[cat.name] || [];
  const desc =
    `${cat.description} ${CITY}, ${ABBR} & ${REGION} photography by ${SITE}.`.slice(
      0,
      160,
    );
  const seo = categorySeo[cat.name] || {};
  // portfolioSeo.ts: metaTitle ?? pageHeading ?? `${name} Portfolio`
  const titleSeg =
    seo.documentTitle ||
    seo.metaTitle ||
    seo.pageHeading ||
    `${cat.name} Portfolio`;
  add({
    group: 'Portfolio categories',
    path: `/portfolio/${cat.folder}`,
    title: `${titleSeg} | ${SITE}`,
    description: desc,
    canonical: `/portfolio/${cat.folder}`,
    titleMode: 'relative + template (portfolioSeo.categoryMetadata)',
    ogTitle: `${titleSeg} | ${SITE}`,
    h1: [seo.pageHeading || cat.name],
    h2: [],
    h3: shoots.map((s) => s.title),
    notes:
      'Title segment from portfolioData (metaTitle/pageHeading) — same fallback order as portfolioSeo.ts (not “… Gallery”).',
  });
}

for (const cat of categories) {
  for (const shoot of shootsByCat[cat.name] || []) {
    const desc = (
      shoot.description?.trim() ||
      `${shoot.title} — ${cat.name.toLowerCase()} photography in ${CITY}, ${ABBR} & the ${REGION} by ${SITE}.`
    ).slice(0, 160);
    add({
      group: 'Portfolio shoots',
      path: `/portfolio/${cat.folder}/${shoot.slug}`,
      title: `${shoot.title} | ${SITE}`,
      description: desc,
      canonical: `/portfolio/${cat.folder}/${shoot.slug}`,
      titleMode: 'relative + template',
      ogTitle: `${shoot.title} | ${cat.name} | ${SITE}`,
      h1: [shoot.title],
      h2: [],
      h3: [],
    });
  }
}

// Blog index — read meta from src/app/blog/page.tsx (do not hardcode stale copy)
const BLOG_DESCRIPTION =
  readPageConst('src/app/blog/page.tsx', 'BLOG_DESCRIPTION') ||
  readPageMetaDescription('src/app/blog/page.tsx') ||
  '';

add({
  group: 'Blog',
  path: '/blog',
  title: `Blog | ${SITE}`,
  description: BLOG_DESCRIPTION,
  canonical: '/blog',
  titleMode: 'relative + template',
  h1: ['Stories, tips & local light'],
  h2: [],
  h3: [],
  notes:
    'Meta description read from blog/page.tsx BLOG_DESCRIPTION (not hardcoded inventory).',
});

for (const post of posts) {
  add({
    group: 'Blog posts',
    path: `/blog/${post.slug}`,
    title: `${post.title} | ${SITE}`,
    description: post.description,
    canonical: `/blog/${post.slug}`,
    titleMode: 'relative + template (article OG)',
    ogTitle: `${post.title} | ${SITE}`,
    h1: [post.title],
    h2: [...post.h2s, 'More from the journal'],
    h3: post.h3s,
  });
}

const blogCats = [...new Set(posts.map((p) => p.category).filter(Boolean))];
for (const c of blogCats) {
  add({
    group: 'Blog filters',
    path: `/blog/category/${slugify(c)}`,
    title: `${c} | ${SITE}`,
    description: `${c} from the ${SITE} journal.`,
    canonical: `/blog/category/${slugify(c)}`,
    titleMode: 'relative + template',
    ogTitle: `${c} | Blog | ${SITE}`,
    h1: [c],
    h2: [],
    h3: [],
  });
}

const blogTags = [...new Set(posts.flatMap((p) => p.tags))];
for (const t of blogTags) {
  add({
    group: 'Blog filters',
    path: `/blog/tag/${slugify(t)}`,
    title: `${t} posts | ${SITE}`,
    description: `Journal posts tagged “${t}” from ${SITE}.`,
    canonical: `/blog/tag/${slugify(t)}`,
    titleMode: 'relative + template',
    ogTitle: `${t} | Blog | ${SITE}`,
    h1: [t],
    h2: [],
    h3: [],
  });
}

// —— Write JSON ——
const outDir = path.join(root, 'reports');
fs.mkdirSync(outDir, { recursive: true });
const jsonPath = path.join(outDir, 'seo-audit.json');
fs.writeFileSync(
  jsonPath,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      pageCount: pages.length,
      pages,
    },
    null,
    2,
  ),
);
console.log(`Wrote ${jsonPath} (${pages.length} pages)`);

// —— HTML ——
const groups = [...new Set(pages.map((p) => p.group))];
const toc = groups
  .map((g) => {
    const n = pages.filter((p) => p.group === g).length;
    return `<li><a href="#group-${esc(g).replace(/\s+/g, '-')}">${esc(g)}</a> <span class="muted">(${n})</span></li>`;
  })
  .join('');

const sections = groups
  .map((g) => {
    const rows = pages
      .filter((p) => p.group === g)
      .map(
        (p) => `
      <article class="page">
        <header>
          <h3><code>${esc(p.path)}</code></h3>
        </header>
        <dl class="meta">
          <dt>Title</dt><dd>${esc(p.title)}</dd>
          <dt>Title mode</dt><dd>${esc(p.titleMode)}</dd>
          <dt>Meta description</dt><dd>${esc(p.description)}</dd>
          <dt>Canonical</dt><dd><code>${esc(p.canonical)}</code></dd>
          <dt>Open Graph title</dt><dd>${esc(p.ogTitle)}</dd>
          <dt>Open Graph description</dt><dd>${esc(p.ogDescription)}</dd>
          <dt>Open Graph URL</dt><dd><code>${esc(p.ogUrl)}</code></dd>
          <dt>Robots</dt><dd>${esc(p.robots)}</dd>
          ${p.keywords ? `<dt>Keywords</dt><dd>${esc(p.keywords)}</dd>` : ''}
        </dl>
        <div class="grid">
          <div><h4>H1</h4>${listHtml(p.h1)}</div>
          <div><h4>H2</h4>${listHtml(p.h2)}</div>
          <div><h4>H3</h4>${listHtml(p.h3)}</div>
        </div>
        ${p.notes ? `<p class="notes"><strong>Note:</strong> ${esc(p.notes)}</p>` : ''}
      </article>`,
      )
      .join('');
    return `<section class="group" id="group-${esc(g).replace(/\s+/g, '-')}"><h2>${esc(g)} <span class="muted">(${pages.filter((p) => p.group === g).length})</span></h2>${rows}</section>`;
  })
  .join('');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Taylor Rose Reels — Full SEO Audit</title>
  <style>
    :root { --ink:#2c241c; --muted:#6b5f52; --line:#ddd4c8; --bg:#faf8f4; --card:#fff; --accent:#8b5a3c; }
    * { box-sizing: border-box; }
    body { margin:0; font-family: Georgia, "Times New Roman", serif; color:var(--ink); background:var(--bg); line-height:1.5; font-size:14px; }
    .wrap { max-width:960px; margin:0 auto; padding:40px 28px 80px; }
    h1 { font-size:1.85rem; margin:0 0 8px; }
    h2 { font-size:1.35rem; margin:40px 0 16px; padding-bottom:8px; border-bottom:2px solid var(--ink); page-break-after:avoid; }
    h3 { font-size:1.05rem; margin:0 0 10px; }
    h4 { font-size:0.72rem; text-transform:uppercase; letter-spacing:0.08em; color:var(--accent); margin:0 0 6px; font-family:system-ui,sans-serif; }
    .lede { color:var(--muted); margin:0 0 12px; max-width:42em; }
    .meta-top { font-family:system-ui,sans-serif; font-size:12px; color:var(--muted); margin-bottom:24px; }
    .toc { background:var(--card); border:1px solid var(--line); border-radius:8px; padding:16px 20px; margin-bottom:28px; }
    .toc h2 { margin-top:0; font-size:1rem; border:none; padding:0; }
    .toc ul { margin:0; padding-left:1.2em; columns:2; }
    .toc a { color:var(--accent); text-decoration:none; }
    .muted { color:var(--muted); font-weight:400; }
    .page { background:var(--card); border:1px solid var(--line); border-radius:8px; padding:16px 18px; margin-bottom:14px; page-break-inside:avoid; }
    .page code { font-family:ui-monospace,Consolas,monospace; font-size:0.95em; color:var(--accent); }
    dl.meta { display:grid; grid-template-columns:140px 1fr; gap:6px 12px; margin:0 0 14px; font-size:13px; }
    dl.meta dt { font-family:system-ui,sans-serif; font-size:11px; text-transform:uppercase; letter-spacing:0.06em; color:var(--accent); }
    dl.meta dd { margin:0; }
    .grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; }
    ul { margin:0; padding-left:1.1em; }
    .empty { color:var(--muted); }
    .notes { color:var(--muted); font-size:0.92em; font-style:italic; margin:10px 0 0; }
    @media (max-width:700px) { .grid, dl.meta { grid-template-columns:1fr; } .toc ul { columns:1; } }
    @media print { body { background:#fff; font-size:10.5pt; } .wrap { padding:0; } .toc { break-after:page; } }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>Full SEO audit</h1>
    <p class="lede">Document title, meta description, canonical, Open Graph, robots, and H1–H3 for every live route on Taylor Rose Reels.</p>
    <p class="meta-top">Generated ${esc(new Date().toISOString().slice(0, 10))} · ${pages.length} pages · Source: app metadata + page components + services/portfolio/blog data</p>
    <nav class="toc"><h2>Contents</h2><ul>${toc}</ul></nav>
    ${sections}
  </div>
</body>
</html>`;

const htmlPath = path.join(outDir, 'seo-audit.html');
fs.writeFileSync(htmlPath, html);
console.log(`Wrote ${htmlPath}`);

// —— PDF ——
const pdfPath = path.join(outDir, 'seo-audit.pdf');
const doc = new PDFDocument({
  margin: 48,
  size: 'LETTER',
  info: {
    Title: 'Taylor Rose Reels — Full SEO Audit',
    Author: SITE,
  },
});
const stream = fs.createWriteStream(pdfPath);
doc.pipe(stream);
const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

function ensureSpace(needed = 90) {
  if (doc.y + needed > doc.page.height - doc.page.margins.bottom) doc.addPage();
}

function field(label, value) {
  doc.font('Helvetica-Bold').fontSize(8).fillColor('#8b5a3c').text(label);
  doc.moveDown(0.1);
  doc
    .font('Helvetica')
    .fontSize(9.5)
    .fillColor('#2c241c')
    .text(String(value || '—'), { width: pageWidth });
  doc.moveDown(0.35);
}

function heads(label, items) {
  doc.font('Helvetica-Bold').fontSize(8).fillColor('#8b5a3c').text(label);
  doc.moveDown(0.1);
  if (!items?.length) {
    doc.font('Helvetica-Oblique').fontSize(9.5).fillColor('#6b5f52').text('—');
  } else {
    doc.font('Helvetica').fontSize(9.5).fillColor('#2c241c');
    for (const item of items) doc.text(`• ${item}`, { width: pageWidth });
  }
  doc.moveDown(0.35);
}

doc.font('Helvetica-Bold').fontSize(18).fillColor('#2c241c').text('Full SEO audit');
doc.moveDown(0.35);
doc
  .font('Helvetica')
  .fontSize(10)
  .fillColor('#6b5f52')
  .text(
    `Title, meta description, canonical, Open Graph, robots, and H1–H3 for every live route. Generated ${new Date().toISOString().slice(0, 10)} · ${pages.length} pages.`,
    { width: pageWidth },
  );
doc.moveDown(0.8);

doc.font('Helvetica-Bold').fontSize(11).fillColor('#2c241c').text('Contents');
doc.moveDown(0.25);
doc.font('Helvetica').fontSize(9.5);
for (const g of groups) {
  doc.text(`${g} (${pages.filter((p) => p.group === g).length})`);
}
doc.moveDown(0.8);

for (const g of groups) {
  ensureSpace(50);
  doc.font('Helvetica-Bold').fontSize(13).fillColor('#2c241c').text(g);
  doc
    .moveTo(doc.page.margins.left, doc.y + 2)
    .lineTo(doc.page.margins.left + pageWidth, doc.y + 2)
    .strokeColor('#2c241c')
    .lineWidth(1)
    .stroke();
  doc.moveDown(0.7);

  for (const p of pages.filter((x) => x.group === g)) {
    ensureSpace(140);
    doc.font('Courier-Bold').fontSize(10).fillColor('#8b5a3c').text(p.path);
    doc.moveDown(0.25);
    field('Title', p.title);
    field('Title mode', p.titleMode);
    field('Meta description', p.description);
    field('Canonical', p.canonical);
    field('OG title', p.ogTitle);
    field('OG description', p.ogDescription);
    field('OG URL', p.ogUrl);
    field('Robots', p.robots);
    if (p.keywords) field('Keywords', p.keywords);
    heads('H1', p.h1);
    heads('H2', p.h2);
    heads('H3', p.h3);
    if (p.notes) {
      doc
        .font('Helvetica-Oblique')
        .fontSize(8.5)
        .fillColor('#6b5f52')
        .text(`Note: ${p.notes}`, { width: pageWidth });
      doc.moveDown(0.3);
    }
    doc.moveDown(0.35);
    doc
      .moveTo(doc.page.margins.left, doc.y)
      .lineTo(doc.page.margins.left + pageWidth, doc.y)
      .strokeColor('#ddd4c8')
      .lineWidth(0.5)
      .stroke();
    doc.moveDown(0.55);
  }
}

doc.end();
await new Promise((resolve, reject) => {
  stream.on('finish', resolve);
  stream.on('error', reject);
});
console.log(`Wrote ${pdfPath} (${fs.statSync(pdfPath).size} bytes)`);
