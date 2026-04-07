/**
 * Portfolio imagery: themed Unsplash photos per category (weddings, maternity, etc.).
 * Swap any `src` for your own hosted image URL or a file under /public.
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
  /** Folder slug (used for keys / future local bundles) */
  slug: string;
  description: string;
  homeTagline: string;
  coverSrc: string;
  photos: { id: string; src: string; alt: string }[];
};

/** Themed stock photos — wide covers, portrait gallery tiles */
function unsplash(photoId: string, w: number, h: number) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;
}

export const PORTFOLIO_CATEGORY_DEFS: PortfolioCategoryDef[] = [
  {
    name: 'Weddings',
    slug: 'weddings',
    description: 'Beautiful wedding ceremonies and celebrations',
    homeTagline: 'Beautiful ceremonies',
    coverSrc: unsplash('photo-1519741497674-611481863552', 1200, 800),
    photos: [
      {
        id: 'w1',
        src: unsplash('photo-1511285560929-80b456fea0bc', 800, 1200),
        alt: 'Wedding couple portrait',
      },
      {
        id: 'w2',
        src: unsplash('photo-1465495976277-4387d4b0b4c6', 800, 1200),
        alt: 'Wedding reception celebration',
      },
      {
        id: 'w3',
        src: unsplash('photo-1519167758481-83f550bb49b3', 800, 1200),
        alt: 'Bridal portrait',
      },
      {
        id: 'w4',
        src: unsplash('photo-1460978812857-470ed1c77af0', 800, 1200),
        alt: 'Wedding ceremony aisle',
      },
    ],
  },
  {
    name: 'Maternity',
    slug: 'maternity',
    description: 'Celebrating the journey of motherhood',
    homeTagline: 'Celebrating motherhood',
    coverSrc: unsplash('photo-1555252333-9f8e92e65df9', 1200, 800),
    photos: [
      {
        id: 'm1',
        src: unsplash('photo-1511895426328-dc8714191300', 800, 1200),
        alt: 'Maternity portrait outdoors',
      },
      {
        id: 'm2',
        src: unsplash('photo-1522771739844-6a9f6d5f08af', 800, 1200),
        alt: 'Expecting parents together',
      },
      {
        id: 'm3',
        src: unsplash('photo-1503454537195-1dcabb73ffb9', 800, 1200),
        alt: 'Maternity silhouette',
      },
    ],
  },
  {
    name: 'Engagement',
    slug: 'engagement',
    description: 'Romantic engagement sessions',
    homeTagline: 'Romantic sessions',
    coverSrc: unsplash('photo-1516589178581-6cd7833ae3b2', 1200, 800),
    photos: [
      {
        id: 'e1',
        src: unsplash('photo-1518568814500-bf0f8d125f46', 800, 1200),
        alt: 'Engaged couple laughing',
      },
      {
        id: 'e2',
        src: unsplash('photo-1529634597503-139d3726fed5', 800, 1200),
        alt: 'Engagement ring close-up',
      },
      {
        id: 'e3',
        src: unsplash('photo-1490750967868-88ac6d1cb0a7', 800, 1200),
        alt: 'Couple in golden hour light',
      },
    ],
  },
  {
    name: 'Special Events',
    slug: 'special-events',
    description: 'Corporate events and special occasions',
    homeTagline: 'Corporate & occasions',
    coverSrc: unsplash('photo-1511795409834-ef04bbd61622', 1200, 800),
    photos: [
      {
        id: 's1',
        src: unsplash('photo-1464366400600-7168b8af9bc3', 800, 1200),
        alt: 'Evening event with string lights',
      },
      {
        id: 's2',
        src: unsplash('photo-1511578314322-379afb476865', 800, 1200),
        alt: 'Conference and stage lighting',
      },
      {
        id: 's3',
        src: unsplash('photo-1540575467063-178a50c2df87', 800, 1200),
        alt: 'Corporate presentation audience',
      },
    ],
  },
  {
    name: 'Professional',
    slug: 'professional',
    description: 'Professional business headshots',
    homeTagline: 'Business headshots',
    coverSrc: unsplash('photo-1560250097-0b93528c311a', 1200, 800),
    photos: [
      {
        id: 'p1',
        src: unsplash('photo-1507003211169-0a1dd7228f2d', 800, 1200),
        alt: 'Professional headshot with neutral background',
      },
      {
        id: 'p2',
        src: unsplash('photo-1500648767791-00dcc994a43e', 800, 1200),
        alt: 'Business portrait in suit',
      },
      {
        id: 'p3',
        src: unsplash('photo-1573496359142-b8d87734a5a2', 800, 1200),
        alt: 'Corporate headshot in office setting',
      },
    ],
  },
  {
    name: 'Portraits',
    slug: 'portraits',
    description: 'Portrait photography sessions',
    homeTagline: 'Portrait sessions',
    coverSrc: unsplash('photo-1494790108377-be9c29b29330', 1200, 800),
    photos: [
      {
        id: 'pr1',
        src: unsplash('photo-1534528741775-53994a69daeb', 800, 1200),
        alt: 'Creative portrait with soft light',
      },
      {
        id: 'pr2',
        src: unsplash('photo-1529626455594-4ff0802cfb7e', 800, 1200),
        alt: 'Studio portrait',
      },
      {
        id: 'pr3',
        src: unsplash('photo-1539571696357-5a69c17a67c6', 800, 1200),
        alt: 'Outdoor portrait session',
      },
      {
        id: 'pr4',
        src: unsplash('photo-1544005313-94dfea67534e', 800, 1200),
        alt: 'Editorial portrait',
      },
    ],
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

export const PORTFOLIO_GALLERY_CATEGORY_FILTERS = [
  'All',
  ...PORTFOLIO_CATEGORY_DEFS.map((c) => c.name),
] as const;

export const PORTFOLIO_HOME_GALLERY: PortfolioPhoto[] = PORTFOLIO_CATEGORY_DEFS.flatMap(
  (c) =>
    c.photos.slice(0, 2).map((p) => ({
      id: p.id,
      src: p.src,
      alt: p.alt,
      category: c.name,
    }))
);
