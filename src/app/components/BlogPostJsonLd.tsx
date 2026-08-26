import { getSiteUrl, SITE_LOGO_PATH, SITE_NAME } from '@/lib/siteConfig';
import type { BlogPostMeta } from '@/lib/blog';

type BlogPostJsonLdProps = {
  post: BlogPostMeta;
};

export default function BlogPostJsonLd({ post }: BlogPostJsonLdProps) {
  const url = getSiteUrl();
  const postUrl = `${url}/blog/${post.slug}`;

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@id': `${url}#person` },
    publisher: {
      '@type': 'Organization',
      '@id': `${url}#business`,
      name: SITE_NAME,
      url,
      logo: {
        '@type': 'ImageObject',
        url: `${url}${SITE_LOGO_PATH}`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  };

  if (post.coverImage) {
    data.image = [`${url}${post.coverImage}`];
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
