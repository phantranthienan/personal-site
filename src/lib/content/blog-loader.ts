import fs from "fs";
import path from "path";

import matter from "gray-matter";

import { Blog, BlogFrontmatter } from "@/types/blog";

const BLOGS_DIRECTORY = path.join(process.cwd(), "src/content/blogs");

/**
 * Get all blog slugs by reading the directory structure
 * Each slug corresponds to a folder name in /content/blogs/
 */
export const getSlugs = (): string[] => {
  const entries = fs.readdirSync(BLOGS_DIRECTORY, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
};

/**
 * Get a blog post by slug - always returns the main index.mdx with available languages
 */
export const getBlog = (slug: string, lang: string = "en"): Blog => {
  const blogDir = path.join(BLOGS_DIRECTORY, slug);
  const raw = fs.readFileSync(path.join(blogDir, `${lang}.mdx`), "utf8");
  const { content, data } = matter(raw);

  const frontmatter = data as BlogFrontmatter;

  const wordCount = content
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  const availableLanguages = getBlogAvailableLanguages(blogDir);

  const metadata = {
    ...frontmatter,
    availableLanguages,
    readingTime,
  };

  return {
    metadata,
    slug,
    content,
  };
};

/**
 * Get available languages for a blog post
 */
const getBlogAvailableLanguages = (blogDir: string): string[] => {
  const files = fs.readdirSync(blogDir);
  const languages = new Set<string>();

  files.forEach((file) => {
    if (file.endsWith(".mdx")) {
      const langMatch = file.match(/^([a-z]{2})\.mdx$/);
      if (langMatch) {
        languages.add(langMatch[1]);
      }
    }
  });

  return Array.from(languages);
};
