import type { Metadata } from 'next';
import { PRIMARY_CITY, PRIMARY_REGION, PRIMARY_STATE_ABBR, SITE_NAME } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: `Wedding, elopement, engagement, portrait, & event galleries from ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} & the ${PRIMARY_REGION}. Natural light & honest color by ${SITE_NAME}.`,
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: `Portfolio | ${SITE_NAME}`,
    description: `Browse wedding, elopement, engagement, portrait, & event photography across the ${PRIMARY_REGION} & ${PRIMARY_STATE_ABBR}.`,
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
