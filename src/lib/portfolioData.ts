/**
 * Portfolio galleries: category → shoots → photos.
 *
 * Upload layout:
 *   public/images/galleries/{category-folder}/{shoot-slug}/
 *     cover.jpg or cover.jpeg   ← polaroid thumbnail + first gallery image
 *     01.jpg      ← gallery photo
 *     02.jpg      ← …
 */

import { SHOOTS_BY_CATEGORY, type PortfolioShootDef, shootGalleryLabel } from './portfolioShoots';
import galleryManifest from './galleryManifest.json';

type ShootManifestEntry = { cover: string | null; photos: string[] };
type GalleryManifest = Record<string, Record<string, ShootManifestEntry>>;

const MANIFEST = galleryManifest as GalleryManifest;

function getShootManifest(
  categoryFolder: string,
  shootSlug: string,
): ShootManifestEntry | undefined {
  return MANIFEST[categoryFolder]?.[shootSlug];
}

export type PortfolioPhoto = {
  id: string;
  src: string;
  alt: string;
  category: string;
  shoot: string;
};

export type PortfolioCategoryDef = {
  name: string;
  /** On-page body blurb under the category H1 */
  description: string;
  /** Dedicated SEO / Open Graph description (≤160 chars preferred) */
  metaDescription: string;
  homeTagline: string;
  folder: string;
  coverSrc: string;
  shoots: PortfolioShootDef[];
  /** Visible H1 on the category page (defaults to name) */
  pageHeading?: string;
  /** Relative document title segment (template appends | SITE_NAME) */
  metaTitle?: string;
  /** Full document title when set (absolute — skips layout template) */
  documentTitle?: string;
};

export type PortfolioShootCard = {
  category: string;
  categoryFolder: string;
  slug: string;
  title: string;
  /** Short polaroid caption (first names when available) */
  label: string;
  image: string;
  href: string;
};

/** Category → folder under public/images/galleries/ */
export const GALLERY_UPLOAD_FOLDERS: Record<string, string> = {
  Weddings: 'weddings',
  Motherhood: 'motherhood',
  'Couples / Engagement': 'couples-engagement',
  'Special Events': 'special-events',
  Family: 'family',
  Portraits: 'portraits',
};

/** Fallback polaroid covers when a category has no shoots yet */
const LEGACY_CATEGORY_COVERS: Record<string, string> = {
  Weddings: '/images/wedding_1.jpg',
  Motherhood: '/images/maternity_1.jpg',
  'Couples / Engagement': '/images/engagement_1.jpg',
  'Special Events': '/images/events_1.jpg',
  Family: '/images/portrait_1.jpg',
  Portraits: '/images/portrait_1.jpg',
};

export function shootImageSrc(
  categoryFolder: string,
  shootSlug: string,
  filename: string,
): string {
  return `/images/galleries/${categoryFolder}/${shootSlug}/${filename}`;
}

export function shootCoverSrc(
  categoryFolder: string,
  shoot: PortfolioShootDef,
): string {
  const manifest = getShootManifest(categoryFolder, shoot.slug);
  const file = manifest?.cover ?? manifest?.photos[0] ?? 'cover.jpg';
  return shootImageSrc(categoryFolder, shoot.slug, file);
}

export function shootGallerySrc(
  categoryFolder: string,
  shootSlug: string,
  filename: string,
): string {
  return shootImageSrc(categoryFolder, shootSlug, filename);
}

function getCategoryCoverSrc(
  categoryName: string,
  folder: string,
  shoots: PortfolioShootDef[],
): string {
  if (shoots.length > 0) {
    return shootCoverSrc(folder, shoots[0]!);
  }
  return (
    LEGACY_CATEGORY_COVERS[categoryName] ??
    `/images/galleries/${folder}/cover.jpg`
  );
}

function buildShootPhotos(
  categoryName: string,
  categoryFolder: string,
  shoot: PortfolioShootDef,
): PortfolioPhoto[] {
  const manifest = getShootManifest(categoryFolder, shoot.slug);
  if (!manifest) return [];

  const cover = manifest.cover;
  const rest = cover
    ? manifest.photos.filter((filename) => filename !== cover)
    : manifest.photos;
  const filenames = cover ? [cover, ...rest] : rest;
  if (!filenames.length) return [];

  return filenames.map((filename, i) => ({
    id: `${shoot.slug}-${i + 1}`,
    src: shootGallerySrc(categoryFolder, shoot.slug, filename),
    alt: `${shoot.title}, ${categoryName} photography — image ${i + 1}`,
    category: categoryName,
    shoot: shoot.title,
  }));
}

const CATEGORY_COPY: Omit<PortfolioCategoryDef, 'folder' | 'coverSrc' | 'shoots'>[] =
  [
    {
      name: 'Weddings',
      description:
        'Veil soft in the breeze, daddy walking you down the aisle, & the quiet tear he tries to hide—I live for those honest wedding-day moments.',
      metaDescription:
        'Wedding photography portfolios from Florence, SC & the Pee Dee—real wedding-day galleries in natural light & honest color by Taylor Rose Reels.',
      homeTagline: 'Vows, laughter & legacy',
      pageHeading: 'Wedding Portfolios',
      metaTitle: 'Wedding Photography Portfolio',
    },
    {
      name: 'Motherhood',
      description:
        'That glow, the bump, & the wonder before & after baby arrives—documented gently, never rushed.',
      metaDescription:
        'Motherhood photography portfolios from Florence, SC & the Pee Dee—maternity & newborn galleries, soft natural light by Taylor Rose Reels.',
      homeTagline: 'Bloom & anticipation',
      pageHeading: 'Motherhood Portfolios',
    },
    {
      name: 'Couples / Engagement',
      description:
        'Ocean waves, downtown strolls, or evening boat rides—wherever y’all feel like yourselves is where I’ll meet you.',
      metaDescription:
        'Engagement photography portfolios from Florence, SC & the Pee Dee—couples session galleries in natural light & true color by Taylor Rose Reels.',
      homeTagline: 'Sweet on each other',
      pageHeading: 'Engagement Portfolios',
    },
    {
      name: 'Special Events',
      description:
        'Galas, brand launches, & the milestones that deserve to be remembered with polish & a little Southern warmth.',
      metaDescription:
        'Special event photography portfolios from Florence, SC & the Pee Dee—galas, launches & milestone galleries by Taylor Rose Reels.',
      homeTagline: 'Celebrate key moments',
      pageHeading: 'Special Events Portfolios',
    },
    {
      name: 'Family',
      description:
        'Your people, warm light, & so much love. Family portraits that feel natural & authentic, not posed or forced.',
      metaDescription:
        'Family photography portfolios from Florence, SC & the Pee Dee—natural, true-to-color family galleries by Taylor Rose Reels.',
      homeTagline: 'Together & true',
      pageHeading: 'Family Portfolios',
    },
    {
      name: 'Portraits',
      description:
        'Just you—soft light & room to breathe—portraits that feel like a compliment, not a performance.',
      metaDescription:
        'Portrait photography portfolios from Florence, SC & the Pee Dee—individual sessions in soft natural light by Taylor Rose Reels.',
      homeTagline: 'Effortless & true',
      pageHeading: 'Portrait Portfolios',
    },
  ];

export const PORTFOLIO_CATEGORY_DEFS: PortfolioCategoryDef[] = CATEGORY_COPY.map(
  (cat) => {
    const folder = GALLERY_UPLOAD_FOLDERS[cat.name]!;
    const shoots = SHOOTS_BY_CATEGORY[cat.name] ?? [];
    return {
      ...cat,
      folder,
      shoots,
      coverSrc: getCategoryCoverSrc(cat.name, folder, shoots),
    };
  },
);

export function getCategoryByName(name: string): PortfolioCategoryDef | undefined {
  return PORTFOLIO_CATEGORY_DEFS.find((c) => c.name === name);
}

export function getCategoryByFolder(
  folderSlug: string,
): PortfolioCategoryDef | undefined {
  return PORTFOLIO_CATEGORY_DEFS.find((c) => c.folder === folderSlug);
}

export function portfolioCategoryHref(categoryFolder: string): string {
  return `/portfolio/${categoryFolder}`;
}

export function portfolioShootHref(
  categoryFolder: string,
  shootSlug: string,
): string {
  return `/portfolio/${categoryFolder}/${shootSlug}`;
}

export function getShootInCategory(
  categoryName: string,
  shootSlug: string,
): PortfolioShootDef | undefined {
  return SHOOTS_BY_CATEGORY[categoryName]?.find((s) => s.slug === shootSlug);
}

export function getShootCards(categoryName: string): PortfolioShootCard[] {
  const category = getCategoryByName(categoryName);
  if (!category) return [];

  return category.shoots.map((shoot) => ({
    category: category.name,
    categoryFolder: category.folder,
    slug: shoot.slug,
    title: shoot.title,
    label: shootGalleryLabel(shoot),
    image: shootCoverSrc(category.folder, shoot),
    href: portfolioShootHref(category.folder, shoot.slug),
  }));
}

export function getShootPhotos(
  categoryName: string,
  shootSlug: string,
): PortfolioPhoto[] {
  const category = getCategoryByName(categoryName);
  const shoot = getShootInCategory(categoryName, shootSlug);
  if (!category || !shoot) return [];
  return buildShootPhotos(category.name, category.folder, shoot);
}

export const PORTFOLIO_CATEGORIES_FOR_UI = PORTFOLIO_CATEGORY_DEFS.map((c) => ({
  name: c.name,
  description: c.description,
  image: c.coverSrc,
}));

export const PORTFOLIO_HOME_CARDS = PORTFOLIO_CATEGORY_DEFS.map((c) => ({
  name: c.name,
  image: c.coverSrc,
  tagline: c.homeTagline,
  href: portfolioCategoryHref(c.folder),
}));

export const PORTFOLIO_HOME_CARDS_CENTERED = (() => {
  const wedding = PORTFOLIO_HOME_CARDS.find((c) => c.name === 'Weddings')!;
  const rest = PORTFOLIO_HOME_CARDS.filter((c) => c.name !== 'Weddings');
  return [...rest.slice(0, 4), wedding, ...rest.slice(4)];
})();

/** Footer gallery nav — matches contact-page service order & labels */
export const FOOTER_PORTFOLIO_LINKS = (
  [
    ['Weddings', 'Weddings'],
    ['Portraits', 'Portraits'],
    ['Couples / Engagement', 'Engagements'],
    ['Motherhood', 'Motherhood'],
    ['Family', 'Family'],
    ['Special Events', 'Special Events'],
  ] as const
).map(([categoryName, label]) => ({
  label,
  href: portfolioCategoryHref(GALLERY_UPLOAD_FOLDERS[categoryName]!),
}));
