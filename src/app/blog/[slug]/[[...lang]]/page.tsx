import React from "react";

import Link from "next/link";

import { getBlog } from "@/lib/content/blog-loader";

interface BlogPostPageProps {
  params: {
    slug: string;
    lang?: string[];
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const currentLanguage = params.lang?.[0] || "en";
  const blog = getBlog(params.slug, currentLanguage);

  const blogFile = await import(
    `@/content/blogs/${params.slug}/${currentLanguage}.mdx`
  );
  const BlogContent = blogFile.default;

  const blogDate = blog.metadata.date;
  const blogTitle = blog.metadata.title;
  const blogSummary = blog.metadata.summary;
  const blogTags = blog.metadata.tags;
  const blogReadingTime = blog.metadata.readingTime;

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Back to blog link */}
        <Link
          href="/blog"
          className="mb-8 inline-block text-blue-600 hover:underline dark:text-blue-400"
        >
          ← Back to Blog
        </Link>

        {/* Article header */}
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold">{blogTitle}</h1>

          <div className="mb-4 flex items-center space-x-4 text-gray-600 dark:text-gray-400">
            <time dateTime={blogDate}>
              {new Date(blogDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>•</span>
            <span>By {currentLanguage}</span>
            {blogReadingTime && (
              <>
                <span>•</span>
                <span>{blogReadingTime} min read</span>
              </>
            )}
          </div>

          <p className="mb-6 text-xl text-gray-700 dark:text-gray-300">
            {blogSummary}
          </p>

          {/* Tags */}
          {blogTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {blogTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tag?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 transition-colors hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Article content */}
        <div className="prose dark:prose-invert max-w-none">
          <BlogContent />
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              ← Back to all posts
            </Link>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              Published on{" "}
              <time dateTime={blogDate}>
                {new Date(blogDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}
