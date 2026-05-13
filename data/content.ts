import type { ContentItem } from "@/data/types";

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

export function sortByDate<T extends ContentItem>(items: T[]) {
  return [...items].sort(
    (first, second) =>
      new Date(second.publishedAt).getTime() -
      new Date(first.publishedAt).getTime(),
  );
}
