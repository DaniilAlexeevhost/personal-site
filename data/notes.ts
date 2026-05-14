import { createContentItem } from "@/data/content";
import type { Note } from "@/data/types";

const noteEntries = [
  {
    slug: "learning-in-public",
    route: "/notes",
    category: "Learning",
    tags: ["Product", "Reflection"],
    publishedAt: "2026-05-13",
    title: "Учиться публично",
    description:
      "Короткая мысль о том, почему полезно фиксировать путь, а не только готовые выводы.",
    content:
      "Публичные заметки помогают видеть, как меняется мышление: какие вопросы повторяются, какие идеи взрослеют, а какие исчезают после первой проверки.",
  },
  {
    slug: "questions-before-solutions",
    route: "/notes",
    category: "Thinking",
    tags: ["Questions", "Discovery"],
    publishedAt: "2026-05-13",
    title: "Вопросы до решений",
    description:
      "Небольшое наблюдение о том, почему сильная формулировка вопроса часто важнее быстрого ответа.",
    content:
      "Хороший вопрос сужает пространство неопределенности. Быстрый ответ иногда только делает хаос более уверенным.",
  },
  {
    slug: "systems-over-tactics",
    route: "/notes",
    category: "Systems",
    tags: ["Growth", "Practice"],
    publishedAt: "2026-05-13",
    title: "Системы важнее тактик",
    description:
      "Короткая заметка о том, почему отдельные приемы работают слабее без понятной системы.",
    content:
      "Тактика может дать движение, но система помогает повторять результат и понимать, почему он появился.",
  },
];

export const notes: Note[] = noteEntries.map((item) => ({
  ...createContentItem("notes", item, item.content),
  content: item.content,
}));
