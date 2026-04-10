import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: `Wedding, elopement, engagement, portrait, and event galleries—natural light and honest color. ${SITE_NAME}.`,
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: `Portfolio | ${SITE_NAME}`,
    description:
      'Browse wedding, elopement, engagement, portrait, and special event photography.',
    url: '/portfolio',
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
