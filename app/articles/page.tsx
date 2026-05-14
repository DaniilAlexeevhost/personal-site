import ContentGrid from "@/components/ContentGrid";
import EditorialScope from "@/components/EditorialScope";
import SectionHero from "@/components/SectionHero";
import { articles } from "@/data/articles";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Статьи",
  description:
    "Мысли, разборы и наблюдения о продуктах, growth, цифровых системах и создании полезных продуктов.",
  pathname: "/articles",
});

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SectionHero
        eyebrow="Articles"
        title="Статьи"
        description="Здесь появляются мысли, разборы и наблюдения о продуктах, growth, цифровых системах и всём, что помогает лучше понимать создание полезных и живых продуктов."
      />

      <EditorialScope
        items={[
          "Продуктовое мышление без шума и быстрых рецептов.",
          "Книги, идеи и концепции, которые помогают думать точнее.",
          "Growth-подходы, метрики и механики роста.",
          "Наблюдения о цифровых продуктах, командах и системах.",
        ]}
      />

      <ContentGrid
        eyebrow="Все статьи"
        title="Материалы для спокойного чтения"
        description="Здесь появляются мысли, разборы и наблюдения о продуктах, growth, цифровых системах и всём, что помогает лучше понимать создание полезных и живых продуктов."
        items={articles}
        hrefPrefix="/articles"
      />
    </main>
  );
}
