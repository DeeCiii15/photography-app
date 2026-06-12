/**
 * Portfolio imagery — files under public/images/.
 * Naming: `{slug}_1.jpg`, `{slug}_2.jpg`, … (e.g. engagement → engagement_1.jpg).
 * Add more numbered files anytime; slots beyond existing files repeat `_1` so nothing 404s.
 */

export type PortfolioPhoto = {
  id: string;
  src: string;
  alt: string;
  category: string;
};

export type PortfolioCategoryDef = {
  /** Used in ?category= and links (e.g. "Special Events") */
  name: string;
  description: string;
  homeTagline: string;
  coverSrc: string;
  photos: { id: string; src: string; alt: string }[];
};

/** URL slug segment → filename prefix in /public/images/ */
const CATEGORY_IMAGE_SLUG: Record<string, string> = {
  Weddings: 'wedding',
  Motherhood: 'maternity',
  'Couples / Engagement': 'engagement',
  'Special Events': 'events',
  Family: 'portrait',
};

/** How many tiles to show per gallery (cycles `_1` if higher files aren’t there yet) */
const PHOTO_COUNT_BY_CATEGORY: Record<string, number> = {
  Weddings: 4,
  Motherhood: 3,
  'Couples / Engagement': 3,
  'Special Events': 3,
  Family: 4,
};

const PHOTO_ID_PREFIX: Record<string, string> = {
  Weddings: 'w',
  Motherhood: 'm',
  'Couples / Engagement': 'e',
  'Special Events': 's',
  Family: 'f',
};

/**
 * Per 1-based index overrides — avoids 404s until you add `_2`, `_3`, etc.
 * Remove a category’s block here once those files exist (defaults use `{slug}_{n}.jpg`).
 */
const SRC_OVERRIDES: Partial<Record<string, Record<number, string>>> = {
  Weddings: {
    2: '/images/bridal_1.jpg',
    3: '/images/wedding_1.jpg',
    4: '/images/bridal_1.jpg',
  },
  'Couples / Engagement': {
    2: '/images/engagement_1.jpg',
    3: '/images/engagement_1.jpg',
  },
  Motherhood: {
    2: '/images/maternity_1.jpg',
    3: '/images/maternity_1.jpg',
  },
  'Special Events': {
    2: '/images/events_1.jpg',
    3: '/images/events_1.jpg',
  },
  Family: {
    2: '/images/portrait_1.jpg',
    3: '/images/portrait_1.jpg',
    4: '/images/portrait_1.jpg',
  },
};

function localImageSrc(categoryName: string, indexZeroBased: number): string {
  const slug = CATEGORY_IMAGE_SLUG[categoryName];
  if (!slug) return '/images/wedding_1.jpg';
  const overrides = SRC_OVERRIDES[categoryName];
  const n = indexZeroBased + 1;
  if (overrides?.[n]) return overrides[n]!;
  return `/images/${slug}_${n}.jpg`;
}

function buildPhotos(
  categoryName: string,
  altStem: string
): { id: string; src: string; alt: string }[] {
  const count = PHOTO_COUNT_BY_CATEGORY[categoryName] ?? 3;
  const idPrefix = PHOTO_ID_PREFIX[categoryName] ?? 'x';
  return Array.from({ length: count }, (_, i) => ({
    id: `${idPrefix}${i + 1}`,
    src: localImageSrc(categoryName, i),
    alt: `${altStem} — ${i + 1}`,
  }));
}

export const PORTFOLIO_CATEGORY_DEFS: PortfolioCategoryDef[] = [
  {
    name: 'Weddings',
    description:
      'Veil soft in the breeze, daddy walking you down the aisle, and the quiet tear he tries to hide—I live for those honest wedding-day moments.',
    homeTagline: 'Vows, laughter & legacy',
    coverSrc: localImageSrc('Weddings', 0),
    photos: buildPhotos('Weddings', 'Wedding day'),
  },
  {
    name: 'Motherhood',
    description:
      'That glow, the bump you keep resting your hand on, and the wonder before baby arrives—documented gently, never rushed.',
    homeTagline: 'Bloom & anticipation',
    coverSrc: localImageSrc('Motherhood', 0),
    photos: buildPhotos('Motherhood', 'Motherhood'),
  },
  {
    name: 'Couples / Engagement',
    description:
      'Sweet tea strolls, front-porch swings, or downtown at dusk—wherever y’all feel like yourselves is where I’ll meet you.',
    homeTagline: 'Sweet on each other',
    coverSrc: localImageSrc('Couples / Engagement', 0),
    photos: buildPhotos('Couples / Engagement', 'Couples and engagement'),
  },
  {
    name: 'Special Events',
    description:
      'Galas, brand launches, and the milestones that deserve to be remembered with polish and a little Southern warmth.',
    homeTagline: 'Celebrate key moments',
    coverSrc: localImageSrc('Special Events', 0),
    photos: buildPhotos('Special Events', 'Event'),
  },
  {
    name: 'Family',
    description:
      'Your people, soft light, and room to breathe—family portraits that feel like a compliment, not a performance.',
    homeTagline: 'Effortless & true',
    coverSrc: localImageSrc('Family', 0),
    photos: buildPhotos('Family', 'Family portrait'),
  },
];

export const PORTFOLIO_CATEGORIES_FOR_UI = PORTFOLIO_CATEGORY_DEFS.map((c) => ({
  name: c.name,
  description: c.description,
  image: c.coverSrc,
}));

export const PORTFOLIO_HOME_CARDS = PORTFOLIO_CATEGORY_DEFS.map((c) => ({
  name: c.name,
  image: c.coverSrc,
  tagline: c.homeTagline,
  href: `/portfolio?category=${encodeURIComponent(c.name)}`,
}));

/** Same cards as home, with Weddings in the center position for the polaroid grid */
export const PORTFOLIO_HOME_CARDS_CENTERED = (() => {
  const wedding = PORTFOLIO_HOME_CARDS.find((c) => c.name === 'Weddings')!;
  const rest = PORTFOLIO_HOME_CARDS.filter((c) => c.name !== 'Weddings');
  const mid = Math.floor(PORTFOLIO_HOME_CARDS.length / 2);
  return [...rest.slice(0, mid), wedding, ...rest.slice(mid)];
})();

export const PORTFOLIO_GALLERY_BY_CATEGORY: Record<string, PortfolioPhoto[]> =
  Object.fromEntries(
    PORTFOLIO_CATEGORY_DEFS.map((c) => [
      c.name,
      c.photos.map((p) => ({
        id: p.id,
        src: p.src,
        alt: p.alt,
        category: c.name,
      })),
    ])
  );
