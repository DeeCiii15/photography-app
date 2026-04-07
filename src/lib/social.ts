/**
 * Public social URLs. Override in .env.local, e.g. NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/yourhandle
 */
export const socialLinks = {
  instagram:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://www.instagram.com/',
  facebook:
    process.env.NEXT_PUBLIC_FACEBOOK_URL ?? 'https://www.facebook.com/',
  x: process.env.NEXT_PUBLIC_X_URL ?? 'https://x.com/',
} as const;
