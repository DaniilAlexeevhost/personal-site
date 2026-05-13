import ContentGrid from "@/components/ContentGrid";
import SectionHero from "@/components/SectionHero";
import { research } from "@/data/research";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Исследования",
  description:
    "Исследования о продуктах, UX, AI, пользовательском поведении и качестве решений.",
  pathname: "/research",
});

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SectionHero
        eyebrow="Research · behavior · discovery"
        title="Исследования"
        description="Наблюдения, разборы и исследовательские заметки о том, как люди принимают решения и взаимодействуют с цифровыми продуктами."
      />

      <ContentGrid
        eyebrow="Все исследования"
        title="Исследовательские заметки"
        description="Материалы о discovery, пользовательском поведении, AI-интерфейсах и продуктовой неопределенности."
        items={research}
        hrefPrefix="/research"
      />
    </main>
  );
}
