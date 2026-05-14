import ContentGrid from "@/components/ContentGrid";
import EditorialScope from "@/components/EditorialScope";
import SectionHero from "@/components/SectionHero";
import { cases } from "@/data/cases";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Кейсы",
  description:
    "Кейсы о практическом опыте, решениях, гипотезах, уроках и системном мышлении.",
  pathname: "/cases",
});

export default function CasesPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SectionHero
        eyebrow="Cases"
        title="Кейсы"
        description="Практические разборы опыта, решений, гипотез и выводов из реальных проектов и рабочих ситуаций."
      />

      <EditorialScope
        items={[
          "Решения и компромиссы, которые появляются в работе.",
          "Гипотезы, проверки и выводы после практики.",
          "Уроки из продуктовых, UX и growth-ситуаций.",
          "Системное мышление вместо набора разрозненных тактик.",
        ]}
      />

      <ContentGrid
        eyebrow="Все кейсы"
        title="Практический опыт и выводы"
        description="Практический опыт, решения, гипотезы и выводы из реальных проектов и рабочих ситуаций."
        items={cases}
        hrefPrefix="/cases"
      />
    </main>
  );
}
