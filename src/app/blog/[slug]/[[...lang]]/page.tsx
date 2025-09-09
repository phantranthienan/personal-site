import React from "react";

import { Book, Calendar, LibraryBig, Hash } from "lucide-react";

import Link from "next/link";

import BlogNavigation from "@/components/blog/BlogNavigation";
import TableOfContents from "@/components/blog/TableOfContents";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { badgeVariants } from "@/components/ui/badge";
import { getBlogPost } from "@/lib/content/blog-loader";
import { getAdjacentPosts } from "@/lib/content/blog-queries";
import { extractToc } from "@/lib/mdx/toc-extractor";

interface BlogPostPageProps {
  params: {
    slug: string;
    lang?: string[];
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, lang } = await params;
  const currentLanguage = lang?.[0] || "en";

  const blogPost = getBlogPost(slug, currentLanguage);
  const { prev, next } = getAdjacentPosts(slug);
  const tocItems = extractToc(slug, currentLanguage);

  const blogPostFile = await import(
    `@/content/blogs/${slug}/${currentLanguage}.mdx`
  );
  const Content = blogPostFile.default;

  // Format the date
  const formattedDate = new Date(blogPost.metadata.date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="grid grid-cols-[minmax(0px,1fr)_min(calc(var(--breakpoint-md)-2rem),100%)_minmax(0px,1fr)] gap-y-6 px-4">
      <nav className="col-start-2">
        <Breadcrumbs
          items={[
            { href: "/blog", label: "Blog", icon: LibraryBig },
            {
              href: `/blog/${slug}`,
              label: blogPost.metadata.title,
              icon: Book,
            },
          ]}
        />
      </nav>

      <header className="col-start-2 flex flex-col gap-y-4 text-center">
        <h1 className="text-3xl font-medium sm:text-4xl">
          {blogPost.metadata.title}
        </h1>

        <div className="text-muted-foreground flex items-center justify-center gap-x-1 text-xs sm:gap-x-2 sm:text-sm">
          <Calendar className="-mt-0.75 size-3 sm:size-4" />
          <time dateTime={blogPost.metadata.date}>{formattedDate}</time>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {blogPost.metadata.tags &&
            blogPost.metadata.tags.length > 0 &&
            blogPost.metadata.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className={badgeVariants({ variant: "secondary" })}
              >
                <Hash className="size-3" />
                {tag}
              </Link>
            ))}
        </div>
      </header>

      <aside className="col-start-1 hidden lg:block">
        <div className="sticky top-8 mr-8">
          <TableOfContents items={tocItems} />
        </div>
      </aside>

      <main className="col-start-2">
        <div className="prose prose-lg dark:prose-invert w-full max-w-none">
          <Content />
        </div>
      </main>

      <div className="col-start-2">
        <BlogNavigation prev={prev} next={next} />
      </div>
    </div>
  );
}
