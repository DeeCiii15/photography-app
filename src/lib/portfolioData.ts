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
  Maternity: 'maternity',
  Engagement: 'engagement',
  'Special Events': 'events',
  Professional: 'business',
  Portraits: 'portrait',
};

/** How many tiles to show per gallery (cycles `_1` if higher files aren’t there yet) */
const PHOTO_COUNT_BY_CATEGORY: Record<string, number> = {
  Weddings: 4,
  Maternity: 3,
  Engagement: 3,
  'Special Events': 3,
  Professional: 3,
  Portraits: 4,
};

const PHOTO_ID_PREFIX: Record<string, string> = {
  Weddings: 'w',
  Maternity: 'm',
  Engagement: 'e',
  'Special Events': 's',
  Professional: 'p',
  Portraits: 'pr',
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
  Engagement: {
    2: '/images/engagement_1.jpg',
    3: '/images/engagement_1.jpg',
  },
  Maternity: {
    2: '/images/maternity_1.jpg',
    3: '/images/maternity_1.jpg',
  },
  'Special Events': {
    2: '/images/events_1.jpg',
    3: '/images/events_1.jpg',
  },
  Professional: {
    2: '/images/business_1.jpg',
    3: '/images/business_1.jpg',
  },
  Portraits: {
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
    name: 'Maternity',
    description:
      'That glow, the bump you keep resting your hand on, and the wonder before baby arrives—documented gently, never rushed.',
    homeTagline: 'Bloom & anticipation',
    coverSrc: localImageSrc('Maternity', 0),
    photos: buildPhotos('Maternity', 'Maternity'),
  },
  {
    name: 'Engagement',
    description:
      'Sweet tea strolls, front-porch swings, or downtown at dusk—wherever y’all feel like yourselves is where I’ll meet you.',
    homeTagline: 'Sweet on each other',
    coverSrc: localImageSrc('Engagement', 0),
    photos: buildPhotos('Engagement', 'Engagement'),
  },
  {
    name: 'Special Events',
    description:
      'Galas, brand launches, and the milestones that deserve to be remembered with polish and a little Southern warmth.',
    homeTagline: 'Raise a glass moments',
    coverSrc: localImageSrc('Special Events', 0),
    photos: buildPhotos('Special Events', 'Event'),
  },
  {
    name: 'Professional',
    description:
      'Headshots that feel like you on your best day—approachable, confident, and ready for your website or press kit.',
    homeTagline: 'Your best light',
    coverSrc: localImageSrc('Professional', 0),
    photos: buildPhotos('Professional', 'Professional portrait'),
  },
  {
    name: 'Portraits',
    description:
      'Just you (or your people), soft light, and room to breathe—portraits that feel like a compliment, not a performance.',
    homeTagline: 'Effortless & true',
    coverSrc: localImageSrc('Portraits', 0),
    photos: buildPhotos('Portraits', 'Portrait'),
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
