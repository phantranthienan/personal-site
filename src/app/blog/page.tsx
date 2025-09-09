import React from "react";

import { LibraryBig } from "lucide-react";

import Link from "next/link";

import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { getAllBlogPosts } from "@/lib/content/blog-queries";
import { BlogPost } from "@/types/blog";

export default function BlogPage() {
  const blogPosts = getAllBlogPosts();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-y-6 px-4">
      <nav>
        <Breadcrumbs
          items={[{ href: "/blog", label: "Blog", icon: LibraryBig }]}
        />
      </nav>

      <div className="space-y-8">
        {blogPosts.map((blogPost: BlogPost) => (
          <article
            key={blogPost.slug}
            className="border-b border-gray-200 pb-8 last:border-b-0 dark:border-gray-700"
          >
            <div className="flex flex-col space-y-4">
              <div>
                <Link
                  href={`/blog/${blogPost.slug}`}
                  className="text-2xl font-semibold transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {blogPost.metadata.title}
                </Link>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <time dateTime={blogPost.metadata.date}>
                  {new Date(blogPost.metadata.date).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </time>
              </div>

              <p className="text-gray-700 dark:text-gray-300">
                {blogPost.metadata.summary}
              </p>

              <div className="flex flex-wrap gap-2">
                {blogPost.metadata.tags.map((tag) => (
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
                  href={`/blog/${blogPost.slug}`}
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
  );
}
