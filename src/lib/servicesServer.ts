import {
  categoryToSlug,
  getAllPosts,
  tagToSlug,
  type BlogPostMeta,
} from './blog';
import { SERVICE_DEFS, type ServiceDef } from './servicesData';

function postMatchesService(post: BlogPostMeta, service: ServiceDef): boolean {
  if (
    service.blogCategories.some(
      (categorySlug) =>
        post.category && categoryToSlug(post.category) === categorySlug,
    )
  ) {
    return true;
  }
  return service.blogTags.some((tagSlug) =>
    post.tags.some((tag) => tagToSlug(tag) === tagSlug),
  );
}

/** Server-only — reads blog posts from the filesystem */
export function getServiceBlogPosts(service: ServiceDef): BlogPostMeta[] {
  return getAllPosts().filter((post) => postMatchesService(post, service));
}

/** Services related to a blog post via shared category / tags */
export function getServicesForBlogPost(post: BlogPostMeta): ServiceDef[] {
  return SERVICE_DEFS.filter((service) => postMatchesService(post, service));
}
