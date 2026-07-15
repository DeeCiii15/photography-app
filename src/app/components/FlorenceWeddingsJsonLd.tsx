import {
  FLORENCE_WEDDINGS_PATH,
  getSiteUrl,
  PRIMARY_CITY,
  PRIMARY_REGION,
  PRIMARY_STATE,
  PRIMARY_STATE_ABBR,
  SERVICE_AREAS,
  SITE_NAME,
} from '@/lib/siteConfig';

/**
 * Service + WebPage schema for the Florence, SC wedding landing page.
 * `provider` points at the sitewide LocalBusiness node rendered in the root layout.
 */
export default function FlorenceWeddingsJsonLd() {
  const url = getSiteUrl();
  const pageUrl = `${url}${FLORENCE_WEDDINGS_PATH}`;

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `Wedding Photography in ${PRIMARY_CITY}, ${PRIMARY_STATE} | ${SITE_NAME}`,
        isPartOf: { '@id': `${url}#website` },
        about: { '@id': `${pageUrl}#service` },
        primaryImageOfPage: `${url}/images/hero_1.jpg`,
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        serviceType: 'Wedding photography',
        name: `Wedding Photography in ${PRIMARY_CITY}, ${PRIMARY_STATE}`,
        description: `Natural-light, true-to-color wedding photography for couples in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} & across the ${PRIMARY_REGION} by ${SITE_NAME}.`,
        url: pageUrl,
        provider: { '@id': `${url}#business` },
        areaServed: [
          {
            '@type': 'AdministrativeArea',
            name: `${PRIMARY_REGION} region, ${PRIMARY_STATE}`,
          },
          ...SERVICE_AREAS.map((city) => ({
            '@type': 'City',
            name: `${city}, ${PRIMARY_STATE_ABBR}`,
          })),
        ],
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
