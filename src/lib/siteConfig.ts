/**
 * Canonical site URL for metadata, OG tags, sitemap, and JSON-LD.
 * Override in any environment: NEXT_PUBLIC_SITE_URL=https://yourdomain.com
 */
export const CANONICAL_SITE_URL = 'https://taylorrosereels.com';

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '');
  if (fromEnv) return fromEnv;

  // Production deploys should never fall back to *.vercel.app when a custom domain exists.
  if (process.env.VERCEL_ENV === 'production') {
    const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
    if (productionHost) {
      return `https://${productionHost.replace(/^https?:\/\//, '')}`;
    }
    return CANONICAL_SITE_URL;
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, '')}`;
  return 'http://localhost:3000';
}

export const SITE_NAME = 'Taylor Rose Reels';

export const PRIMARY_CITY = 'Florence';
export const PRIMARY_STATE = 'South Carolina';
export const PRIMARY_STATE_ABBR = 'SC';
export const PRIMARY_REGION = 'Pee Dee';

/** Cities and towns commonly served across the Pee Dee */
export const SERVICE_AREAS = [
  'Florence',
  'Hartsville',
  'Darlington',
  'Marion',
  'Lake City',
  'Dillon',
  'Bennettsville',
  'Mullins',
  'Pamplico',
  'Kingstree',
] as const;

/** Florence, SC — approximate center for local business schema */
export const GEO_COORDINATES = {
  latitude: 34.1954,
  longitude: -79.7626,
} as const;

export const PHOTOGRAPHER_EMAIL =
  process.env.NEXT_PUBLIC_PHOTOGRAPHER_EMAIL?.trim() ||
  'taylorrosereels@gmail.com';

export const PHOTOGRAPHER_IMAGE_ALT = `${SITE_NAME}, ${PRIMARY_CITY} ${PRIMARY_STATE_ABBR} wedding & portrait photographer`;

export const SERVICE_AREA_LABEL = `Based in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} · Serving the ${PRIMARY_REGION} & beyond`;

export const SITE_TAGLINE = `Wedding & portrait photography in natural light across ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} & the ${PRIMARY_REGION}`;

/** Default meta description (home + fallback) */
export const SITE_DESCRIPTION = `${SITE_NAME} is a ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} wedding & portrait photographer serving the ${PRIMARY_REGION}—${SERVICE_AREAS.slice(1, 5).join(', ')}, & beyond. Natural light, sage greens & wheat gold, for Southern & boho-modern love stories.`;

export const LOCAL_KEYWORDS = [
  `${PRIMARY_CITY} ${PRIMARY_STATE_ABBR} photographer`,
  `${PRIMARY_REGION} wedding photographer`,
  `${PRIMARY_CITY} wedding photographer`,
  `${PRIMARY_STATE} portrait photographer`,
  `${PRIMARY_STATE_ABBR} engagement photographer`,
  `wedding photographer ${PRIMARY_CITY} ${PRIMARY_STATE_ABBR}`,
  `elopement photographer ${PRIMARY_REGION}`,
  'natural light photography',
  SITE_NAME,
] as const;

/** Used for Open Graph / Twitter when a page does not set its own image */
export const DEFAULT_OG_IMAGE_PATH = '/images/Taylor_site.jpg';
