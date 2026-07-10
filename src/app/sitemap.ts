import type { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories, getAllTags, categoryToSlug, tagToSlug } from '@/lib/blog';
import { getPortfolioSitemapEntries } from '@/lib/portfolioSeo';
import { getSiteUrl } from '@/lib/siteConfig';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const staticRoutes = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/experience', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.85, changeFrequency: 'weekly' as const },
  ];

  const portfolioEntries = getPortfolioSitemapEntries();
  const blogPosts = getAllPosts();
  const blogCategories = getAllCategories();
  const blogTags = getAllTags();

  return [
    ...staticRoutes.map(({ path, priority, changeFrequency }) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...portfolioEntries.map(({ path, priority }) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority,
    })),
    ...blogPosts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...blogCategories.map((category) => ({
      url: `${base}/blog/category/${categoryToSlug(category)}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.55,
    })),
    ...blogTags.map((tag) => ({
      url: `${base}/blog/tag/${tagToSlug(tag)}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ];
}
