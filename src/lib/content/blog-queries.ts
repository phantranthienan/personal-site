import { BlogPost } from "@/types/blog";

import { getBlogPost, getSlugs } from "./blog-loader";

/**
 * Get all blog posts, sorted by date (newest first)
 * Cached for performance
 */
export const getAllBlogPosts = (): BlogPost[] => {
  const slugs = getSlugs();

  const blogs = slugs
    .map((slug) => getBlogPost(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort(
      (a, b) =>
        new Date(b.metadata.date).getTime() -
        new Date(a.metadata.date).getTime()
    );

  return blogs;
};

/**
 * Get blog posts by tag
 * Cached for performance
 */
export const getBlogsByTag = (tag: string): BlogPost[] => {
  const allBlogs = getAllBlogPosts();

  return allBlogs.filter((blogPost: BlogPost) =>
    blogPost.metadata.tags.some(
      (blogTag) => blogTag.toLowerCase() === tag.toLowerCase()
    )
  );
};

/**
 * Get all unique tags from all blog posts
 * Cached for performance
 */
export const getAllTags = (): string[] => {
  const allBlogs = getAllBlogPosts();
  const tags = new Set<string>();

  allBlogs.forEach((blogPost: BlogPost) => {
    blogPost.metadata.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
};

/**
 * Get next and previous blog posts for navigation
 */
export const getAdjacentPosts = (
  currentSlug: string
): { prev: BlogPost | null; next: BlogPost | null } => {
  const allPosts = getAllBlogPosts(); // Already sorted by date (newest first)
  const currentIndex = allPosts.findIndex((post) => post.slug === currentSlug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev:
      currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null, // Older post
    next: currentIndex > 0 ? allPosts[currentIndex - 1] : null, // Newer post
  };
};
