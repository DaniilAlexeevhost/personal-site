import fs from "node:fs";
import path from "node:path";
import AIProducts from "@/content/articles/ai-products.mdx";
import GrowthHypothesis from "@/content/articles/growth-hypothesis.mdx";
import InspiredMartyCagan from "@/content/articles/inspired-marty-cagan.mdx";
import OneUserMoreImportant from "@/content/articles/pochemu-odin-polzovatel-vazhnee-desyati-ekspertov.mdx";
import SprintBook from "@/content/articles/pochemu-mne-ponravilas-kniga-sprint.mdx";
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
  {
    file: "inspired-marty-cagan.mdx",
    Component: InspiredMartyCagan,
  },
  {
    file: "pochemu-mne-ponravilas-kniga-sprint.mdx",
    Component: SprintBook,
  },
  {
    file: "pochemu-odin-polzovatel-vazhnee-desyati-ekspertov.mdx",
    Component: OneUserMoreImportant,
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

export function getPublishedLongFormItems(): ContentItem[] {
  return sortByDate([
    ...getPublishedArticles(),
    ...getPublishedCases(),
    ...getPublishedResearch(),
  ]);
}

export function getContentNavigation(item: ContentItem) {
  const sectionItems = getPublishedLongFormItems().filter(
    (contentItem) => contentItem.section === item.section,
  );
  const index = sectionItems.findIndex(
    (contentItem) => contentItem.route === item.route,
  );

  return {
    previous: index > 0 ? sectionItems[index - 1] : undefined,
    next:
      index >= 0 && index < sectionItems.length - 1
        ? sectionItems[index + 1]
        : undefined,
  };
}

export function getRelatedContentItems(item: ContentItem, limit = 3) {
  return getPublishedLongFormItems()
    .filter((contentItem) => contentItem.route !== item.route)
    .map((contentItem) => ({
      item: contentItem,
      score:
        (contentItem.section === item.section ? 3 : 0) +
        (contentItem.category === item.category ? 2 : 0) +
        contentItem.tags.filter((tag) => item.tags.includes(tag)).length,
    }))
    .sort(
      (first, second) =>
        second.score - first.score ||
        new Date(second.item.publishedAt).getTime() -
          new Date(first.item.publishedAt).getTime(),
    )
    .slice(0, limit)
    .map(({ item: contentItem }) => contentItem);
}

export function getRelatedLongFormForNote(item: ContentItem, limit = 3) {
  return getPublishedLongFormItems()
    .map((contentItem) => ({
      item: contentItem,
      score:
        (contentItem.category === item.category ? 2 : 0) +
        contentItem.tags.filter((tag) => item.tags.includes(tag)).length,
    }))
    .sort(
      (first, second) =>
        second.score - first.score ||
        new Date(second.item.publishedAt).getTime() -
          new Date(first.item.publishedAt).getTime(),
    )
    .slice(0, limit)
    .map(({ item: contentItem }) => contentItem);
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

export function getNoteBySlug(slug: string) {
  return findPublishedBySlug(notes, slug);
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
    const itemTopics = new Map<string, string>();

    [item.category, ...item.tags].forEach((tag) => {
      const slug = createTagSlug(tag);

      if (slug) {
        itemTopics.set(slug, tag);
      }
    });

    itemTopics.forEach((tag, slug) => {
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
      [item.category, ...item.tags].some((tag) => createTagSlug(tag) === slug),
    ),
  );
}
