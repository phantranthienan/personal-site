export interface BlogFrontmatter {
  title: string;
  summary: string;
  date: string;
  tags: string[];
}

export interface BlogMetadata extends BlogFrontmatter {
  availableLanguages: string[];
  readingTime: number;
}

export interface Blog {
  metadata: BlogMetadata;
  slug: string;
  content: string;
}
