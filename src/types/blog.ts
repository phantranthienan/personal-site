export interface BlogPostFrontmatter {
  title: string;
  summary: string;
  date: string;
  tags: string[];
}

export interface BlogPostMetadata extends BlogPostFrontmatter {
  languages: string[];
}

export interface BlogPost {
  metadata: BlogPostMetadata;
  slug: string;
}
