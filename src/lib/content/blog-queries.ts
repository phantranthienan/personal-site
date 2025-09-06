import { Blog } from "@/types/blog";

import { getBlog, getSlugs } from "./blog-loader";

/**
 * Get all blog posts, sorted by date (newest first)
 * Cached for performance
 */
export const getAllBlogs = (): Blog[] => {
  const slugs = getSlugs();

  const blogs = slugs
    .map((slug) => getBlog(slug))
    .filter((post): post is Blog => post !== null)
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
export const getBlogsByTag = (tag: string): Blog[] => {
  const allBlogs = getAllBlogs();

  return allBlogs.filter((blog) =>
    blog.metadata.tags.some(
      (blogTag) => blogTag.toLowerCase() === tag.toLowerCase()
    )
  );
};

/**
 * Get all unique tags from all blog posts
 * Cached for performance
 */
export const getAllTags = (): string[] => {
  const allBlogs = getAllBlogs();
  const tags = new Set<string>();

  allBlogs.forEach((blog) => {
    blog.metadata.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
};
