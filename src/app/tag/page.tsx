import React from "react";

import Link from "next/link";

import { getAllTags } from "@/lib/content/blog-queries";

export default function TagPage() {
  const allTags = getAllTags();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold">Tags</h1>
        <div>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Browse posts by tag. Click on any tag to see related posts.
          </p>

          {allTags.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              No tags found. Tags will appear here when you create blog posts
              with tags in their frontmatter.
            </p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {allTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tag?tag=${encodeURIComponent(tag)}`}
                  className="rounded-lg bg-blue-100 px-4 py-2 text-blue-800 transition-colors hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
