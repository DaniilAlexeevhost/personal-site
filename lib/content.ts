import fs from "node:fs";
import path from "node:path";
import AIProducts from "@/content/articles/ai-products.mdx";
import GrowthHypothesis from "@/content/articles/growth-hypothesis.mdx";
import ProductRetention from "@/content/articles/product-retention.mdx";
import { cases } from "@/data/cases";
import {
  createContentItem,
  createTagRoute,
  createTagSlug,
  findPublishedBySlug,
  getPublishedItems,
  parseContentFrontmatter,
  sortByDate,
} from "@/data/content";
import { research } from "@/data/research";
import { notes } from "@/data/notes";
import type { Article, ContentItem, ContentTag } from "@/data/types";

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
  const articles = articleModules.map(({ Component, file }) => {
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
  });

  const slugs = new Set<string>();

  articles.forEach((article) => {
    if (slugs.has(article.slug)) {
      throw new Error(`Duplicate article slug: ${article.slug}`);
    }

    slugs.add(article.slug);
  });

  return sortByDate(articles);
}

export function getPublishedArticles() {
  return getPublishedItems(getAllArticles());
}

export function getArticleBySlug(slug: string) {
  return findPublishedBySlug(getAllArticles(), slug);
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
  return getPublishedItems(cases);
}

export function getCaseBySlug(slug: string) {
  return findPublishedBySlug(cases, slug);
}

export function getPublishedResearch() {
  return getPublishedItems(research);
}

export function getResearchBySlug(slug: string) {
  return findPublishedBySlug(research, slug);
}

export function getPublishedNotes() {
  return getPublishedItems(notes);
}

export function getAllContentItems(): ContentItem[] {
  return sortByDate([
    ...getPublishedArticles(),
    ...getPublishedCases(),
    ...getPublishedResearch(),
    ...getPublishedNotes(),
  ]);
}

export function getPublishedTags(): ContentTag[] {
  const tags = new Map<string, ContentTag>();

  getAllContentItems().forEach((item) => {
    item.tags.forEach((tag) => {
      const slug = createTagSlug(tag);
      const current = tags.get(slug);

      tags.set(slug, {
        label: current?.label ?? tag,
        slug,
        route: createTagRoute(tag),
        count: (current?.count ?? 0) + 1,
      });
    });
  });

  return Array.from(tags.values()).sort((first, second) =>
    first.label.localeCompare(second.label, "ru"),
  );
}

export function getTagBySlug(slug: string) {
  return getPublishedTags().find((tag) => tag.slug === slug);
}

export function getPublishedContentByTag(slug: string) {
  return sortByDate(
    getAllContentItems().filter((item) =>
      item.tags.some((tag) => createTagSlug(tag) === slug),
    ),
  );
}
