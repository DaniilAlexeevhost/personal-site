import ContentGrid from "@/components/ContentGrid";
import SectionHero from "@/components/SectionHero";
import { cases } from "@/data/cases";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Кейсы",
  description:
    "Продуктовые кейсы о growth, retention, UX и исследованиях цифровых продуктов.",
  pathname: "/cases",
});

export default function CasesPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SectionHero
        eyebrow="Product cases · growth · UX"
        title="Кейсы"
        description="Разборы продуктовых решений, growth-гипотез и исследовательских подходов, которые помогают находить устойчивый рост."
      />

      <ContentGrid
        eyebrow="Все кейсы"
        title="Разборы продуктовых решений"
        description="Короткие и практичные материалы о retention, UX, аналитике и поиске работающих продуктовых механик."
        items={cases}
        hrefPrefix="/cases"
      />
    </main>
  );
}
