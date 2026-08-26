import type { Metadata } from 'next';
import { pageShareMeta } from '@/lib/shareMeta';
import {
  PRIMARY_CITY,
  PRIMARY_REGION,
  PRIMARY_STATE_ABBR,
  SITE_NAME,
} from '@/lib/siteConfig';

const PORTFOLIO_TITLE = `Photography Portfolio in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} | ${SITE_NAME}`;
const PORTFOLIO_DESCRIPTION = `Wedding, elopement, engagement, portrait, & event galleries from ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} & the ${PRIMARY_REGION}. Natural light & honest color by ${SITE_NAME}.`;
const portfolioShare = pageShareMeta({
  title: PORTFOLIO_TITLE,
  description: `Browse wedding, elopement, engagement, portrait, & event photography across the ${PRIMARY_REGION} & ${PRIMARY_STATE_ABBR}.`,
  url: '/portfolio',
});

export const metadata: Metadata = {
  title: {
    absolute: PORTFOLIO_TITLE,
  },
  description: PORTFOLIO_DESCRIPTION,
  alternates: { canonical: '/portfolio' },
  ...portfolioShare,
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
