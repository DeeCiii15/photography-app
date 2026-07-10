import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  coverImage?: string;
  coverImageAlt?: string;
  category?: string;
  tags: string[];
  published: boolean;
  readingTime: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

export function tagToSlug(tag: string): string {
  return slugify(tag);
}

export function categoryToSlug(category: string): string {
  return slugify(category);
}

export function slugToLabel(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function parsePostFilename(filename: string): string {
  return filename.replace(/\.mdx?$/, '');
}

function getPostFilePaths(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .filter((file) => !file.startsWith('_'));
}

function readPostRaw(slug: string) {
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  return matter(raw);
}

function toMeta(
  slug: string,
  data: Record<string, unknown>,
  content: string,
): BlogPostMeta {
  const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    date: String(data.date ?? ''),
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    coverImageAlt: data.coverImageAlt ? String(data.coverImageAlt) : undefined,
    category: data.category ? String(data.category) : undefined,
    tags,
    published: data.published !== false,
    readingTime: readingTime(content).text,
  };
}

export function getPostBySlug(slug: string): BlogPost | null {
  const parsed = readPostRaw(slug);
  if (!parsed) return null;

  const meta = toMeta(slug, parsed.data, parsed.content);
  return { ...meta, content: parsed.content };
}

export function getAllPosts(includeUnpublished = false): BlogPostMeta[] {
  return getPostFilePaths()
    .map((file) => {
      const slug = parsePostFilename(file);
      const parsed = readPostRaw(slug);
      if (!parsed) return null;
      return toMeta(slug, parsed.data, parsed.content);
    })
    .filter((post): post is BlogPostMeta => post !== null)
    .filter((post) => includeUnpublished || post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostSlugs(): string[] {
  return getAllPosts(true).map((post) => post.slug);
}

export function getPublishedPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) tags.add(tag);
  }
  return [...tags].sort((a, b) => a.localeCompare(b));
}

export function getAllCategories(): string[] {
  const categories = new Set<string>();
  for (const post of getAllPosts()) {
    if (post.category) categories.add(post.category);
  }
  return [...categories].sort((a, b) => a.localeCompare(b));
}

export function getPostsByTag(tagSlug: string): BlogPostMeta[] {
  return getAllPosts().filter((post) =>
    post.tags.some((tag) => tagToSlug(tag) === tagSlug),
  );
}

export function getTagBySlug(tagSlug: string): string | null {
  const match = getAllTags().find((tag) => tagToSlug(tag) === tagSlug);
  return match ?? null;
}

export function getPostsByCategory(categorySlug: string): BlogPostMeta[] {
  return getAllPosts().filter(
    (post) => post.category && categoryToSlug(post.category) === categorySlug,
  );
}

export function getCategoryBySlug(categorySlug: string): string | null {
  const match = getAllCategories().find(
    (category) => categoryToSlug(category) === categorySlug,
  );
  return match ?? null;
}

export function getRelatedPosts(slug: string, limit = 3): BlogPostMeta[] {
  const current = getPostBySlug(slug);
  if (!current) return [];

  const all = getAllPosts().filter((post) => post.slug !== slug);
  const scored = all.map((post) => {
    let score = 0;
    if (current.category && post.category === current.category) score += 3;
    for (const tag of post.tags) {
      if (current.tags.includes(tag)) score += 1;
    }
    return { post, score };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
  });

  const top = scored.slice(0, limit).map((entry) => entry.post);
  if (top.length >= limit) return top;

  const remaining = all
    .filter((post) => !top.some((picked) => picked.slug === post.slug))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return [...top, ...remaining].slice(0, limit);
}

export function formatPostDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
