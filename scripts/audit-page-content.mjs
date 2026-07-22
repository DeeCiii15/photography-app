/**
 * Site content audit — titles, H1–H3, first ~25 words.
 * Run: node scripts/audit-page-content.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function firstWords(text, n = 25) {
  const words = String(text)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/[#*_`\[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return words.slice(0, n).join(' ') + (words.length > n ? '…' : '');
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

const SITE = 'Taylor Rose Reels';
const CITY = 'Florence';
const STATE = 'South Carolina';
const ABBR = 'SC';
const REGION = 'Pee Dee';

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
      'That glow, the bump you keep resting your hand on, & the wonder before & after baby arrives—documented gently, never rushed.',
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
    // Keys may be bare (Weddings) or quoted ('Couples / Engagement')
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
    const objRe =
      /\{\s*slug:\s*'([^']+)',\s*title:\s*'((?:\\'|[^'])*)'(?:,\s*description:\s*'((?:\\'|[^'])*)')?\s*,?\s*\}/gs;
    let m;
    while ((m = objRe.exec(block))) {
      shoots.push({
        slug: m[1],
        title: m[2].replace(/\\'/g, "'"),
        description: m[3] ? m[3].replace(/\\'/g, "'") : '',
      });
    }
    byCat[cat] = shoots;
  }
  return byCat;
}

function parseServices() {
  const src = fs.readFileSync(path.join(root, 'src/lib/servicesData.ts'), 'utf8');
  const services = [];
  const parts = src.split(/slug:\s*'/).slice(1);
  for (const part of parts) {
    const slug = part.match(/^([^']+)'/)?.[1];
    const name = part.match(/name:\s*'([^']+)'/)?.[1];
    const navLabel = part.match(/navLabel:\s*'([^']+)'/)?.[1];
    const eyebrow = part.match(/eyebrow:\s*'([^']+)'/)?.[1];
    const headline = part.match(/headline:\s*'((?:\\'|[^'])*)'/)?.[1]?.replace(/\\'/g, "'");
    const accent = part.match(/headlineAccent:\s*'((?:\\'|[^'])*)'/)?.[1]?.replace(/\\'/g, "'");
    const intro = part.match(/intro:\s*'((?:\\'|[^'])*)'/)?.[1]?.replace(/\\'/g, "'");
    const metaRaw = part.match(/metaTitle:\s*`([^`]*)`/)?.[1];
    if (!slug || !name) continue;
    const metaTitle = (metaRaw || '')
      .replace(/\$\{PRIMARY_CITY\}/g, CITY)
      .replace(/\$\{PRIMARY_STATE_ABBR\}/g, ABBR)
      .replace(/\$\{PRIMARY_REGION\}/g, REGION);
    services.push({
      slug,
      name,
      navLabel,
      eyebrow,
      headline: `${headline} ${accent}`.trim(),
      intro,
      metaTitle,
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
    const bodyText = content
      .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
      .replace(/\[([^\]]*)\]\([^)]+\)/g, '$1')
      .replace(/^#+\s+/gm, ' ');
    return {
      slug: f.replace(/\.mdx?$/, ''),
      title: String(data.title),
      category: data.category ? String(data.category) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      description: String(data.description || ''),
      first25: firstWords(bodyText || data.description || ''),
      h2s: [...content.matchAll(/^##\s+(.+)$/gm)].map((x) => x[1].trim()),
      h3s: [...content.matchAll(/^###\s+(.+)$/gm)].map((x) => x[1].trim()),
    };
  })
  .sort((a, b) => a.slug.localeCompare(b.slug));

/** @type {Array<{path:string,title:string,h1:string[],h2:string[],h3:string[],first25:string,group:string,notes?:string}>} */
const pages = [];

function add(p) {
  pages.push(p);
}

add({
  group: 'Core',
  path: '/',
  title: `Wedding Photographer in ${CITY}, ${ABBR} and surrounding Pee Dee areas | ${SITE}`,
  h1: [
    `${CITY}, ${ABBR} · ${REGION} · Wedding & portrait Soft light, honest color, warmth that feels like memory.`,
  ],
  h2: [
    "Every photo tells a story; I'd love to help you tell yours.",
    'More stories, same light',
    'What they still talk about',
  ],
  h3: categories.map((c) => c.name),
  first25: firstWords(
    `${CITY}, ${ABBR} · ${REGION} · Wedding & portrait Soft light, honest color, warmth that feels like memory.`,
  ),
  notes:
    'H1 wraps eyebrow + display line in one h1. Portfolio category cards on the home gallery use h3. Testimonials H2 text is “What they still talk about” (italic on “talk about”).',
});

add({
  group: 'Core',
  path: '/contact',
  title: `Contact Wedding Photographer in ${CITY}, ${ABBR} | ${SITE}`,
  h1: ['Tell me about your day'],
  h2: [],
  h3: [],
  first25: firstWords(
    'Contact Tell me about your day Share your date, venue, or vision for weddings, portraits, engagements, motherhood sessions, family photos, or special events—I read every message myself.',
  ),
});

add({
  group: 'Core',
  path: '/portfolio',
  title: `Wedding & Event Portfolio in Florence, SC | ${SITE}`,
  h1: ['More stories, same light'],
  h2: [],
  h3: categories.map((c) => c.name),
  first25: firstWords(
    'Galleries More stories, same light True to color and timeless by design—click any card to wander deeper.',
  ),
  notes:
    'Title set via portfolio/layout.tsx absolute metadata. Category cards use h3 for names in the gallery grid.',
});

add({
  group: 'Location',
  path: '/florence-sc-wedding-photography',
  title: `${CITY}, ${STATE} Wedding Photography | ${SITE}`,
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
  first25: firstWords(
    `${CITY}, ${ABBR} wedding photography ${CITY}, ${STATE} Wedding Photography Natural lighting, true-to-color, documentary style wedding photography for couples saying I do in & around ${CITY}.`,
  ),
});

const portfolioCatBySlug = {
  'wedding-photography': 'Weddings',
  'engagement-photography': 'Couples / Engagement',
  'special-events-photography': 'Special Events',
  'family-portrait-photography': 'Family',
  'motherhood-photography': 'Motherhood',
  'portrait-photography': 'Portraits',
};

// Services with at least one tagged testimonial (motherhood currently has none)
const servicesWithTestimonials = new Set([
  'wedding-photography',
  'engagement-photography',
  'special-events-photography',
  'family-portrait-photography',
  'portrait-photography',
]);

for (const s of services) {
  const h2 = ['A closer look at ' + s.name.toLowerCase()];
  if (s.slug === 'wedding-photography') {
    h2.push('Across the Pee Dee', 'Related reading');
  }
  h2.push('Straight answers');
  if (servicesWithTestimonials.has(s.slug)) {
    h2.push(`What they say about ${s.navLabel.toLowerCase()}`);
  }
  const catName = portfolioCatBySlug[s.slug];
  add({
    group: 'Services',
    path: `/services/${s.slug}`,
    title: s.metaTitle,
    h1: [s.headline],
    h2,
    h3: (shootsByCat[catName] || []).map((x) => x.title),
    first25: firstWords(`${s.eyebrow} ${s.headline} ${s.intro}`),
    notes:
      'Shoot titles in the gallery grid are h3. FAQ questions are <summary>, not headings. Related reading only when matching posts exist (currently weddings). Testimonials H2 omitted when no reviews are tagged for that service.',
  });
}

for (const cat of categories) {
  const shoots = shootsByCat[cat.name] || [];
  add({
    group: 'Portfolio categories',
    path: `/portfolio/${cat.folder}`,
    title: `${cat.name} Gallery | ${SITE}`,
    h1: [cat.name],
    h2: [],
    h3: shoots.map((s) => s.title),
    first25: firstWords(`Gallery ${cat.name} ${cat.description}`),
  });
}

for (const cat of categories) {
  for (const shoot of shootsByCat[cat.name] || []) {
    add({
      group: 'Portfolio shoots',
      path: `/portfolio/${cat.folder}/${shoot.slug}`,
      title: `${shoot.title} | ${SITE}`,
      h1: [shoot.title],
      h2: [],
      h3: [],
      first25: firstWords(
        `${cat.name} ${shoot.title} ${shoot.description || ''}`,
      ),
    });
  }
}

add({
  group: 'Blog',
  path: '/blog',
  title: `Blog | ${SITE}`,
  h1: ['Stories, tips & local light'],
  h2: [],
  h3: [],
  first25: firstWords(
    'Journal Stories, tips & local light True to color and timeless by design—planning notes, Pee Dee guides, and the heart behind the galleries.',
  ),
});

for (const post of posts) {
  add({
    group: 'Blog posts',
    path: `/blog/${post.slug}`,
    title: `${post.title} | ${SITE}`,
    h1: [post.title],
    h2: [...post.h2s, 'More from the journal'],
    h3: post.h3s,
    first25: post.first25,
  });
}

const blogCats = [...new Set(posts.map((p) => p.category).filter(Boolean))];
for (const c of blogCats) {
  add({
    group: 'Blog filters',
    path: `/blog/category/${slugify(c)}`,
    title: `${c} | ${SITE}`,
    h1: [c],
    h2: [],
    h3: [],
    first25: firstWords(
      `Category ${c} Posts in this category from the journal.`,
    ),
  });
}

const blogTags = [...new Set(posts.flatMap((p) => p.tags))];
for (const t of blogTags) {
  add({
    group: 'Blog filters',
    path: `/blog/tag/${slugify(t)}`,
    title: `${t} posts | ${SITE}`,
    h1: [t],
    h2: [],
    h3: [],
    first25: firstWords(
      `Tag ${t} ${posts.filter((p) => p.tags.includes(t)).length} stories tagged with “${t}”.`,
    ),
    notes: 'H1 is the original tag label from frontmatter (via getTagBySlug).',
  });
}

const out = path.join(root, 'scripts/page-content-audit.json');
fs.writeFileSync(
  out,
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
console.log(`Wrote ${pages.length} pages → ${out}`);
