import createMDX from "@next/mdx";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    // remark plugins (Markdown-level)
    remarkPlugins: [
      "remark-frontmatter", // Parse frontmatter
    ],
    // rehype plugins (HTML-level)
    rehypePlugins: [
      "rehype-slug", // add id="my-heading"
      ["rehype-autolink-headings", { behavior: "wrap" }], // clickable headings
    ],
  },
});

export default withMDX(nextConfig);
