import {
  DEFAULT_OG_IMAGE_PATH,
  getSiteUrl,
  SITE_DESCRIPTION,
  SITE_NAME,
} from '@/lib/siteConfig';

/** Organization / service schema for rich results */
export default function SiteJsonLd() {
  const url = getSiteUrl();
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url,
    image: `${url}${DEFAULT_OG_IMAGE_PATH}`,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'United States',
    },
    serviceType: ['Wedding photography', 'Portrait photography', 'Elopement photography'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
