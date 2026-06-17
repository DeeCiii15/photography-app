/**
 * Register each photo shoot here (folder must exist under public/images/galleries/).
 * Then run: npm run galleries:sync
 *
 * title       — shown under the shoot polaroid + used in page title & image alt text
 * description — optional; used for SEO meta description & blurb on the shoot page
 */

export type PortfolioShootDef = {
  /** Folder name — must match public/images/galleries/{category}/{slug}/ */
  slug: string;
  /** Display title, e.g. "South Carolina Wedding" */
  title: string;
  /** SEO & on-page blurb, e.g. "An intimate wedding in Florence, SC…" */
  description?: string;
};

export const SHOOTS_BY_CATEGORY: Record<string, PortfolioShootDef[]> = {
  Weddings: [
    {
      slug: 'tennessee-wedding',
      title: 'Tennessee Wedding',
      description:
        'Wedding photography in Tennessee—honest light, real emotion, & the quiet in-between moments from vows through celebration.',
    },
  ],
  Motherhood: [
    {
      slug: 'charleston-sc-motherhood',
      title: 'Charleston Beach Motherhood',
      description:
        'Maternity portraits on the Charleston coast—soft sand, golden light, & gentle documentation of life before & after baby arrives.',
    },
    {
      slug: 'sullivans-island-motherhood',
      title: 'Sullivans Island Beach Motherhood',
      description:
        'Beach maternity session on Sullivan\'s Island—ocean air, natural light, & calm portraits that honor the bump & anticipation.',
    },
  ],
  'Couples / Engagement': [
    {
      slug: 'charleston-sc-engagement',
      title: 'Charleston Beach Engagement',
      description:
        'Charleston beach engagement photos—waves, shoreline strolls, & relaxed portraits where you can be yourselves.',
    },
    {
      slug: 'florence-sc-engagement',
      title: 'Downtown Florence Engagement',
      description:
        'Downtown Florence engagement session—city streets at golden hour, easy laughs, & romantic portraits in natural light.',
    },
    {
      slug: 'lake-city-sc-engagement',
      title: 'Pee Dee River Engagement',
      description:
        'Engagement photos along the Pee Dee River near Lake City—soft light, open water, & unhurried couples portraits.',
    },
  ],
  'Special Events': [{
    slug: 'hartsville-sc-prom',
    title: 'Prom Portraits',
    description:
      'Hartsville prom portraits—polished, fun, & full of the excitement of the night, captured with natural warmth.',
  },],
  Family: [
    {
      slug: 'myrtle-beach-family',
      title: 'Myrtle Beach Family Shoot',
      description:
        'Family portraits at Myrtle Beach—siblings, parents, & sandy toes in soft coastal light you\'ll want to frame for years.',
    },
    {
      slug: 'florence-sc-family',
      title: 'Florence Family Shoot',
      description:
        'Family photography in Florence, SC—relaxed portraits with room to breathe, real laughs, & light that flatters your crew.',
    },
    {
      slug: 'marion-sc-family',
      title: 'Marion Family Shoot',
      description:
        'Family session in Marion, SC—togetherness, natural light, & portraits that feel like your everyday love, not a stiff pose.',
    },
  ],
  Portraits: [
    {
      slug: 'hartsville-sc-senior-portraits',
      title: 'Hatsville Senior Portraits',
      description:
        'Senior portraits in Hartsville, SC—confident, relaxed, & true to you, with natural light & room to simply be yourself.',
    },
    {
      slug: 'camden-sc-bridal-portraits',
      title: 'Camden Bridal Portraits',
      description:
        'Bridal portraits in Camden, SC—soft light, elegant details, & the quiet beauty of getting ready for your wedding day.',
    },
  ],
};
