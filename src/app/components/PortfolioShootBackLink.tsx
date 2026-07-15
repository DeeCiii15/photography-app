'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PortfolioBackLink from './PortfolioBackLink';
import {
  FLORENCE_WEDDINGS_PATH,
  FLORENCE_WEDDINGS_REF,
  PRIMARY_CITY,
} from '@/lib/siteConfig';

type PortfolioShootBackLinkProps = {
  /** Where the back link points by default (the shoot's own category gallery). */
  defaultHref: string;
  defaultLabel: string;
};

/**
 * Reads the `?from=` flag so visitors who opened a gallery from a landing page
 * (e.g. the Florence weddings page) are sent back there instead of the generic
 * category gallery. Falls back to the category link for everyone else.
 */
function BackLink({ defaultHref, defaultLabel }: PortfolioShootBackLinkProps) {
  const cameFromFlorence =
    useSearchParams().get('from') === FLORENCE_WEDDINGS_REF;

  if (cameFromFlorence) {
    return (
      <PortfolioBackLink
        href={FLORENCE_WEDDINGS_PATH}
        label={`Back to ${PRIMARY_CITY} weddings`}
      />
    );
  }

  return <PortfolioBackLink href={defaultHref} label={defaultLabel} />;
}

export default function PortfolioShootBackLink(
  props: PortfolioShootBackLinkProps,
) {
  return (
    <Suspense
      fallback={
        <PortfolioBackLink href={props.defaultHref} label={props.defaultLabel} />
      }
    >
      <BackLink {...props} />
    </Suspense>
  );
}
