import type {
  ContentFrontmatter,
  ContentItem,
  ContentMetadataInput,
  ContentSection,
  ContentSeo,
} from "@/data/types";

const sectionRoutes: Record<ContentSection, string> = {
  articles: "/articles",
  cases: "/cases",
  research: "/research",
  notes: "/notes",
};

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
  const seo = createContentSeo({
    title: input.seo?.title ?? input.title,
    description: input.seo?.description ?? input.description,
    image: input.seo?.image,
  });

  return {
    id: input.slug,
    section,
    slug: input.slug,
    route: input.route ?? `${sectionRoutes[section]}/${input.slug}`,
    title: input.title,
    description: input.description,
    category: input.category,
    tags: input.tags,
    publishedAt: input.publishedAt,
    updatedAt: input.updatedAt,
    status: input.status ?? "published",
    readingTime: input.readingTime ?? formatReadingTime(sourceText),
    seo,
  };
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

    return value.replace(/^["']|["']$/g, "");
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
    .map((tag) => tag.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);

  return {
    title: getString("title"),
    description: getString("description"),
    publishedAt: rawDate.replace(/^["']|["']$/g, ""),
    category: getString("category"),
    tags,
    slug: getString("slug"),
    status: rawFields.status?.replace(/^["']|["']$/g, "") as
      | ContentFrontmatter["status"]
      | undefined,
    image: rawFields.image?.replace(/^["']|["']$/g, ""),
  };
}

export function sortByDate<T extends ContentItem>(items: T[]) {
  return [...items].sort(
    (first, second) =>
      new Date(second.publishedAt).getTime() -
      new Date(first.publishedAt).getTime(),
  );
}
