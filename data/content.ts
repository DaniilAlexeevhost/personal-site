import type {
  ContentEntryInput,
  ContentFrontmatter,
  ContentItem,
  ContentMetadataInput,
  ContentSection,
  ContentSectionConfig,
  ContentSeo,
} from "@/data/types";

export const contentSections = {
  articles: {
    label: "Статьи",
    route: "/articles",
    feed: true,
    detailPages: true,
  },
  cases: {
    label: "Кейсы",
    route: "/cases",
    feed: false,
    detailPages: true,
  },
  research: {
    label: "Исследования",
    route: "/research",
    feed: false,
    detailPages: true,
  },
  notes: {
    label: "Заметки",
    route: "/notes",
    feed: false,
    detailPages: false,
  },
} satisfies Record<ContentSection, ContentSectionConfig>;

const contentStatuses = ["published", "draft"] as const;

function stripQuotes(value: string) {
  return value.trim().replace(/^["']|["']$/g, "");
}

function normalizeDate(value: string) {
  const date = stripQuotes(value);

  if (Number.isNaN(new Date(date).getTime())) {
    throw new Error(`Invalid content date: ${value}`);
  }

  return date;
}

function normalizeStatus(value?: string) {
  if (!value) {
    return undefined;
  }

  const status = stripQuotes(value);

  if (!contentStatuses.includes(status as (typeof contentStatuses)[number])) {
    throw new Error(`Invalid content status: ${value}`);
  }

  return status as (typeof contentStatuses)[number];
}

function createContentRoute(section: ContentSection, slug: string) {
  const sectionConfig = contentSections[section];

  return sectionConfig.detailPages
    ? `${sectionConfig.route}/${slug}`
    : sectionConfig.route;
}

function assertUniqueSlugs(section: ContentSection, items: ContentItem[]) {
  const slugs = new Set<string>();

  items.forEach((item) => {
    if (slugs.has(item.slug)) {
      throw new Error(`Duplicate ${section} content slug: ${item.slug}`);
    }

    slugs.add(item.slug);
  });
}

export function isPublished(item: ContentItem) {
  return item.status === "published";
}

export function getPublishedItems<T extends ContentItem>(items: T[]) {
  return sortByDate(items.filter(isPublished));
}

export function findPublishedBySlug<T extends ContentItem>(
  items: T[],
  slug: string,
) {
  return getPublishedItems(items).find((item) => item.slug === slug);
}

export function createTagSlug(tag: string) {
  return tag
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/&/g, " and ")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeTag(tag: string) {
  return tag.trim().replace(/\s+/g, " ");
}

export function normalizeTags(tags: string[]) {
  const normalized = new Map<string, string>();

  tags.map(normalizeTag).filter(Boolean).forEach((tag) => {
    const slug = createTagSlug(tag);

    if (slug) {
      normalized.set(slug, tag);
    }
  });

  return Array.from(normalized.values());
}

export function createTagRoute(tag: string) {
  return `/tags/${createTagSlug(tag)}`;
}

export function formatContentDate(value: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function formatReadingTime(text: string) {
  const normalized = text
    .replace(/^---[\s\S]*?---/m, "")
    .replace(/[<>/#`*_{}[\]()]/g, " ");
  const words = normalized.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 210));
}

export function createContentSeo({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image?: string;
}): ContentSeo {
  return {
    title,
    description,
    ...(image ? { image } : {}),
  };
}

export function createContentItem<S extends ContentSection>(
  section: S,
  input: ContentMetadataInput,
  sourceText = `${input.title} ${input.description}`,
): ContentItem & { section: S } {
  const slug = input.slug.trim();

  if (!slug) {
    throw new Error(`Content item in ${section} is missing a slug.`);
  }

  const title = input.title.trim();
  const description = input.description.trim();
  const category = input.category.trim();
  const tags = normalizeTags(input.tags);

  if (!title || !description || !category) {
    throw new Error(`Content item "${slug}" is missing required metadata.`);
  }

  if (tags.length === 0) {
    throw new Error(`Content item "${slug}" must have at least one tag.`);
  }

  const seo = createContentSeo({
    title: input.seo?.title ?? title,
    description: input.seo?.description ?? description,
    image: input.seo?.image,
  });

  return {
    id: slug,
    section,
    slug,
    route: input.route ?? createContentRoute(section, slug),
    title,
    description,
    category,
    tags,
    publishedAt: normalizeDate(input.publishedAt),
    updatedAt: input.updatedAt ? normalizeDate(input.updatedAt) : undefined,
    status: input.status
      ? normalizeStatus(input.status) ?? "published"
      : "published",
    readingTime: input.readingTime ?? formatReadingTime(sourceText),
    seo,
  };
}

export function createContentCollection<
  S extends ContentSection,
  E extends ContentEntryInput,
>(section: S, entries: E[]) {
  const items = entries.map((entry) => ({
    ...createContentItem(section, entry, entry.content),
    content: entry.content,
  }));

  assertUniqueSlugs(section, items);

  return sortByDate(items);
}

export function parseContentFrontmatter(source: string): ContentFrontmatter {
  const match = source.match(/^---\n([\s\S]*?)\n---/);

  if (!match) {
    throw new Error("Content file is missing frontmatter.");
  }

  const rawFields = Object.fromEntries(
    match[1]
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const separatorIndex = line.indexOf(":");

        if (separatorIndex === -1) {
          throw new Error(`Invalid frontmatter line: ${line}`);
        }

        return [
          line.slice(0, separatorIndex).trim(),
          line.slice(separatorIndex + 1).trim(),
        ];
      }),
  );

  const getString = (key: "title" | "description" | "category" | "slug") => {
    const value = rawFields[key];

    if (!value) {
      throw new Error(`Content frontmatter is missing "${key}".`);
    }

    return stripQuotes(value);
  };

  const rawDate = rawFields.publishedAt ?? rawFields.date;

  if (!rawDate) {
    throw new Error('Content frontmatter is missing "publishedAt".');
  }

  const rawTags = rawFields.tags;

  if (!rawTags) {
    throw new Error('Content frontmatter is missing "tags".');
  }

  const tags = rawTags
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((tag) => stripQuotes(tag))
    .filter(Boolean);

  return {
    title: getString("title"),
    description: getString("description"),
    publishedAt: normalizeDate(rawDate),
    category: getString("category"),
    tags,
    slug: getString("slug"),
    status: normalizeStatus(rawFields.status),
    image: rawFields.image ? stripQuotes(rawFields.image) : undefined,
  };
}

export function sortByDate<T extends ContentItem>(items: T[]) {
  return [...items].sort(
    (first, second) =>
      new Date(second.publishedAt).getTime() -
      new Date(first.publishedAt).getTime(),
  );
}
