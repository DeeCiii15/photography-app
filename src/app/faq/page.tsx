import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { SITE_NAME } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'FAQ',
  description: `Common questions about booking, timelines, and sessions—redirects to the full ${SITE_NAME} experience page.`,
  robots: { index: false, follow: true },
};

/** Legacy URL — nav and bookmarks now use /experience */
export default function FAQRedirectPage() {
  redirect('/experience');
}
