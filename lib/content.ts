import fs from "node:fs";
import path from "node:path";
import AIProducts from "@/content/articles/ai-products.mdx";
import GrowthHypothesis from "@/content/articles/growth-hypothesis.mdx";
import ProductRetention from "@/content/articles/product-retention.mdx";
import { cases } from "@/data/cases";
import {
  createContentItem,
  parseContentFrontmatter,
  sortByDate,
} from "@/data/content";
import { research } from "@/data/research";
import { notes } from "@/data/notes";
import type { Article, ContentItem } from "@/data/types";

const articleModules = [
  {
    file: "product-retention.mdx",
    Component: ProductRetention,
  },
  {
    file: "growth-hypothesis.mdx",
    Component: GrowthHypothesis,
  },
  {
    file: "ai-products.mdx",
    Component: AIProducts,
  },
] satisfies Array<{
  file: string;
  Component: Article["Component"];
}>;

function readArticleSource(file: string) {
  return fs.readFileSync(
    path.join(process.cwd(), "content", "articles", file),
    "utf8",
  );
}

export function getAllArticles(): Article[] {
  return sortByDate(
    articleModules.map(({ Component, file }) => {
      const source = readArticleSource(file);
      const frontmatter = parseContentFrontmatter(source);

      return {
        ...createContentItem(
          "articles",
          {
            ...frontmatter,
            seo: {
              title: frontmatter.title,
              description: frontmatter.description,
              image: frontmatter.image,
            },
          },
          source,
        ),
        Component,
      };
    }),
  );
}

export function getPublishedArticles() {
  return getAllArticles().filter((article) => article.status === "published");
}

export function getArticleBySlug(slug: string) {
  return getAllArticles().find(
    (article) => article.slug === slug && article.status === "published",
  );
}

export function getRelatedArticles(article: Article, limit = 3) {
  return getPublishedArticles()
    .filter((item) => item.slug !== article.slug)
    .map((item) => ({
      article: item,
      score:
        (item.category === article.category ? 2 : 0) +
        item.tags.filter((tag) => article.tags.includes(tag)).length,
    }))
    .sort(
      (first, second) =>
        second.score - first.score ||
        new Date(second.article.publishedAt).getTime() -
          new Date(first.article.publishedAt).getTime(),
    )
    .slice(0, limit)
    .map((item) => item.article);
}

export function getArticleNavigation(article: Article) {
  const articles = getPublishedArticles();
  const index = articles.findIndex((item) => item.slug === article.slug);

  return {
    previous: index > 0 ? articles[index - 1] : undefined,
    next: index >= 0 && index < articles.length - 1 ? articles[index + 1] : undefined,
  };
}

export function getPublishedCases() {
  return cases.filter((item) => item.status === "published");
}

export function getCaseBySlug(slug: string) {
  return getPublishedCases().find((item) => item.slug === slug);
}

export function getPublishedResearch() {
  return research.filter((item) => item.status === "published");
}

export function getResearchBySlug(slug: string) {
  return getPublishedResearch().find((item) => item.slug === slug);
}

export function getPublishedNotes() {
  return notes.filter((item) => item.status === "published");
}

export function getAllContentItems(): ContentItem[] {
  return sortByDate([
    ...getPublishedArticles(),
    ...getPublishedCases(),
    ...getPublishedResearch(),
    ...getPublishedNotes(),
  ]);
}
