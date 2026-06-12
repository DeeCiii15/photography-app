/**
 * Canonical site URL for metadata, OG tags, sitemap, and JSON-LD.
 * Set in production: NEXT_PUBLIC_SITE_URL=https://yourdomain.com
 * On Vercel, VERCEL_URL is used when NEXT_PUBLIC_SITE_URL is unset.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '');
  if (fromEnv) return fromEnv;
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
  'hello@taylorrosereels.com';

/** E.164-style number (e.g. +18435551234). Set NEXT_PUBLIC_PHOTOGRAPHER_PHONE in production. */
export const PHOTOGRAPHER_PHONE_RAW =
  process.env.NEXT_PUBLIC_PHOTOGRAPHER_PHONE?.trim() || '';

export function formatPhoneDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return raw.trim();
}

export function telHref(raw: string): string {
  const cleaned = raw.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('+')) return `tel:${cleaned}`;
  const digits = cleaned.replace(/\D/g, '');
  return digits ? `tel:+${digits}` : `tel:${raw}`;
}

export const PHOTOGRAPHER_PHONE_DISPLAY = PHOTOGRAPHER_PHONE_RAW
  ? formatPhoneDisplay(PHOTOGRAPHER_PHONE_RAW)
  : '';

export const PHOTOGRAPHER_IMAGE_ALT = `${SITE_NAME}, ${PRIMARY_CITY} ${PRIMARY_STATE_ABBR} wedding and portrait photographer`;

export const SERVICE_AREA_LABEL = `Based in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} · Serving the ${PRIMARY_REGION} and beyond`;

export const SITE_TAGLINE = `Wedding & portrait photography in natural light across ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} and the ${PRIMARY_REGION}`;

/** Default meta description (home + fallback) */
export const SITE_DESCRIPTION = `${SITE_NAME} is a ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} wedding and portrait photographer serving the ${PRIMARY_REGION}—${SERVICE_AREAS.slice(1, 5).join(', ')}, and beyond. Natural light, sage greens and wheat gold, for Southern and boho-modern love stories.`;

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
