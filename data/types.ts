import type { ComponentType } from "react";

export type ContentSection = "articles" | "cases" | "research" | "notes";

export type ContentStatus = "published" | "draft";

export type ContentSeo = {
  title: string;
  description: string;
  image?: string;
};

export type ContentMetadataInput = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  status?: ContentStatus;
  readingTime?: number;
  route?: string;
  seo?: Partial<ContentSeo>;
};

export type BaseContentItem = {
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
  readingTime: number;
  seo: ContentSeo;
};

export type ContentFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  category: string;
  tags: string[];
  slug: string;
  status?: ContentStatus;
  image?: string;
};

export type ArticleFrontmatter = ContentFrontmatter;

export type ContentItem = BaseContentItem;

export type Article = BaseContentItem & {
  section: "articles";
  Component: ComponentType;
};

export type CaseStudy = BaseContentItem & {
  section: "cases";
  content: string;
};

export type ResearchNote = BaseContentItem & {
  section: "research";
  content: string;
};

export type Note = BaseContentItem & {
  section: "notes";
  content: string;
};
