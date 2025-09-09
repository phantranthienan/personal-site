import fs from "fs";
import path from "path";

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

/**
 * Extract table of contents from MDX content
 */
export const extractToc = (slug: string, lang: string = "en"): TocItem[] => {
  const blogsDir = path.join(process.cwd(), "src/content/blogs");
  const filePath = path.join(blogsDir, slug, `${lang}.mdx`);

  if (!fs.existsSync(filePath)) {
    return [];
  }

  const content = fs.readFileSync(filePath, "utf8");
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: TocItem[] = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    toc.push({
      id,
      title,
      level,
    });
  }

  return toc;
};
