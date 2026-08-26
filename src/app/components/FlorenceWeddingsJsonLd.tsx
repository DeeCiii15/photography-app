import {
  FLORENCE_WEDDINGS_HERO_PATH,
  FLORENCE_WEDDINGS_PATH,
  FLORENCE_WEDDINGS_TITLE,
  getSiteUrl,
  PRIMARY_CITY,
  PRIMARY_REGION,
  PRIMARY_STATE_ABBR,
  schemaAreaServed,
  SITE_NAME,
} from '@/lib/siteConfig';

/**
 * Service + WebPage schema for the Florence, SC wedding landing page.
 * `provider` points at the sitewide LocalBusiness node rendered in the root layout.
 */
export default function FlorenceWeddingsJsonLd() {
  const url = getSiteUrl();
  const pageUrl = `${url}${FLORENCE_WEDDINGS_PATH}`;
  const hero = `${url}${FLORENCE_WEDDINGS_HERO_PATH}`;

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${FLORENCE_WEDDINGS_TITLE} | ${SITE_NAME}`,
        isPartOf: { '@id': `${url}#website` },
        about: { '@id': `${pageUrl}#service` },
        primaryImageOfPage: hero,
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        serviceType: 'Wedding photography',
        name: FLORENCE_WEDDINGS_TITLE,
        description: `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} wedding photography—natural light, true-to-color coverage for couples across the ${PRIMARY_REGION} by ${SITE_NAME}.`,
        url: pageUrl,
        image: hero,
        provider: { '@id': `${url}#business` },
        areaServed: schemaAreaServed(),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
