import fs from "fs";
import path from "path";

import matter from "gray-matter";

import { BlogPost, BlogPostMetadata } from "@/types/blog";

const BLOG_DIRECTORY = path.join(process.cwd(), "src/content/blogs");

/**
 * Get all blog slugs by reading the directory structure
 * Each slug corresponds to a folder name in /content/blogs/
 */
export const getSlugs = (): string[] => {
  const entries = fs.readdirSync(BLOG_DIRECTORY, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
};

/**
 * Get blog metadata only (no content)
 */
export const getBlogPost = (slug: string, lang: string = "en"): BlogPost => {
  const blogPostDir = path.join(BLOG_DIRECTORY, slug);
  const filePath = path.join(blogPostDir, `${lang}.mdx`);

  const languages = getAvailableLanguages(blogPostDir);

  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);
  const metadata = {
    ...data,
    languages,
  } as BlogPostMetadata;

  return {
    metadata,
    slug,
  };
};

const getAvailableLanguages = (blogPostDir: string): string[] => {
  const files = fs.readdirSync(blogPostDir);
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
