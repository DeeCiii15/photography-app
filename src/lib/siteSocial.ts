/**
 * Social profile URLs — set in .env (public):
 * NEXT_PUBLIC_INSTAGRAM_URL, NEXT_PUBLIC_FACEBOOK_URL, NEXT_PUBLIC_PINTEREST_URL
 *
 * Instagram and Facebook fall back to matching @taylorrosereels URLs until you set env overrides.
 */
export type SocialNetwork = 'instagram' | 'facebook' | 'pinterest';

export type SocialLink = {
  network: SocialNetwork;
  label: string;
  href: string;
};

/** Public Google Business Profile (Maps) — used in JSON-LD sameAs */
export const GOOGLE_BUSINESS_PROFILE_URL =
  'https://g.page/r/CYR1nxU6ANzjEBM';

/** Direct “write a review” link from Google Business Profile */
export const GOOGLE_REVIEW_URL = `${GOOGLE_BUSINESS_PROFILE_URL}/review`;

export function getSocialLinks(): SocialLink[] {
  const ig =
    process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() ||
    'https://www.instagram.com/taylorrosereels';
  const fb =
    process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() ||
    'https://www.facebook.com/p/Taylor-Rose-Reels-61556159227360';
  const pin = process.env.NEXT_PUBLIC_PINTEREST_URL?.trim();

  const links: SocialLink[] = [
    { network: 'instagram', label: 'Instagram', href: ig },
    { network: 'facebook', label: 'Facebook', href: fb },
  ];
  if (pin) links.push({ network: 'pinterest', label: 'Pinterest', href: pin });
  return links;
}

/** Profiles for LocalBusiness sameAs (social + Google Business Profile) */
export function getSameAsLinks(): string[] {
  return [
    ...getSocialLinks().map((link) => link.href),
    GOOGLE_BUSINESS_PROFILE_URL,
  ];
}
