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

export const SITE_TAGLINE =
  'Wedding & portrait photography in natural light across the American South';

/** Default meta description (home + fallback) */
export const SITE_DESCRIPTION =
  'Photography inspired by open fields, cedar arches, and soft film light—sage greens, wheat gold, and airy romance for Southern and boho-modern love stories.';

/** Used for Open Graph / Twitter when a page does not set its own image */
export const DEFAULT_OG_IMAGE_PATH = '/images/Taylor_site.jpg';
