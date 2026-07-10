import { getSiteUrl, SITE_NAME } from '@/lib/siteConfig';
import type { BlogPostMeta } from '@/lib/blog';

type BlogPostJsonLdProps = {
  post: BlogPostMeta;
};

export default function BlogPostJsonLd({ post }: BlogPostJsonLdProps) {
  const url = getSiteUrl();
  const postUrl = `${url}/blog/${post.slug}`;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          post.coverImage
            ? { ...data, image: [`${url}${post.coverImage}`] }
            : data,
        ),
      }}
    />
  );
}
