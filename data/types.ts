import type { ComponentType } from "react";

export type ContentSection = "articles" | "cases" | "research" | "notes";

export type ContentStatus = "published" | "draft";

export type ContentItem = {
  id: string;
  section: ContentSection;
  slug: string;
  route: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  status: ContentStatus;
  readingTime?: number;
  seo?: {
    title?: string;
    description?: string;
    image?: string;
  };
};

export type ArticleFrontmatter = {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  slug: string;
  status?: ContentStatus;
  image?: string;
};

export type Article = ContentItem & {
  section: "articles";
  Component: ComponentType;
};

export type CaseStudy = ContentItem & {
  section: "cases";
  content: string;
};

export type ResearchNote = ContentItem & {
  section: "research";
  content: string;
};

export type Note = ContentItem & {
  section: "notes";
  content: string;
};
