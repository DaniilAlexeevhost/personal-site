import ContentGrid from "@/components/ContentGrid";
import SectionHero from "@/components/SectionHero";
import { articles } from "@/data/articles";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Статьи",
  description:
    "Продуктовые статьи о growth, UX, AI, retention и цифровых проектах.",
  pathname: "/articles",
});

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SectionHero
        eyebrow="Product thinking · research · essays"
        title="Статьи и исследования"
        description="Глубокие размышления о продуктах, growth, UX, AI и цифровых проектах для тех, кто строит понятный пользовательский опыт."
      />

      <ContentGrid
        eyebrow="Все статьи"
        title="Статьи и заметки"
        description="Актуальные рассуждения о growth, UX, AI и продуктовой стратегии в цифровых проектах."
        items={articles}
        hrefPrefix="/articles"
      />
    </main>
  );
}
