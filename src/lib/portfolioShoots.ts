/**
 * Register each photo shoot here (folder must exist under public/images/galleries/).
 * Then run: npm run galleries:sync
 *
 * Photos are read from galleryManifest.json (auto-generated from your folders).
 */

export type PortfolioShootDef = {
  /** Folder name — must match public/images/galleries/{category}/{slug}/ */
  slug: string;
  /** Internal label (not shown on site) */
  name: string;
  tagline?: string;
};

export const SHOOTS_BY_CATEGORY: Record<string, PortfolioShootDef[]> = {
  Weddings: [{ slug: 'couple-4', name: 'Wedding session 4' }],
  Motherhood: [],
  'Couples / Engagement': [
    { slug: 'couple-1', name: 'Couple 1' },
    { slug: 'couple-2', name: 'Couple 2' },
    { slug: 'couple-3', name: 'Couple 3' },
  ],
  'Special Events': [],
  Family: [],
  Portraits: [],
};
