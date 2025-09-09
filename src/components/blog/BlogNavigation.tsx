import { ChevronLeft, ChevronRight } from "lucide-react";

import Link from "next/link";

import { BlogPost } from "@/types/blog";

interface BlogNavigationProps {
  prev: BlogPost | null;
  next: BlogPost | null;
}

export default function BlogNavigation({ prev, next }: BlogNavigationProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav className="mt-12 border-t pt-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="group flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <ChevronLeft className="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
            <div className="text-left">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Previous
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {prev.metadata.title}
              </p>
            </div>
          </Link>
        ) : (
          <div></div>
        )}

        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="group flex items-center justify-end gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-50 md:justify-start dark:hover:bg-gray-800"
          >
            <div className="text-right md:text-left">
              <p className="text-sm text-gray-600 dark:text-gray-400">Next</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {next.metadata.title}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </nav>
  );
}
