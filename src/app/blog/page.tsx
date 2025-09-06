import React from "react";

import Link from "next/link";

import { getAllBlogs } from "@/lib/content/blog-queries";
import { Blog } from "@/types/blog";

export default function BlogPage() {
  const blogs = getAllBlogs();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold">Blog</h1>

        <div className="space-y-8">
          {blogs.map((blog: Blog) => (
            <article
              key={blog.slug}
              className="border-b border-gray-200 pb-8 last:border-b-0 dark:border-gray-700"
            >
              <div className="flex flex-col space-y-4">
                <div>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-2xl font-semibold transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {blog.metadata.title}
                  </Link>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <time dateTime={blog.metadata.date}>
                    {new Date(blog.metadata.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span>•</span>
                  {blog.metadata.readingTime && (
                    <>
                      <span>•</span>
                      <span>{blog.metadata.readingTime} min read</span>
                    </>
                  )}
                </div>

                <p className="text-gray-700 dark:text-gray-300">
                  {blog.metadata.summary}
                </p>

                <div className="flex flex-wrap gap-2">
                  {blog.metadata.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tag/${encodeURIComponent(tag)}`}
                      className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800 transition-colors hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>

                <div>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
