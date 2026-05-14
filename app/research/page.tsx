import ContentGrid from "@/components/ContentGrid";
import EditorialScope from "@/components/EditorialScope";
import SectionHero from "@/components/SectionHero";
import { research } from "@/data/research";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Исследования",
  description:
    "Исследования, идеи и гипотезы вокруг продуктов, поведения пользователей, AI, UX и цифровых моделей.",
  pathname: "/research",
});

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SectionHero
        eyebrow="Research"
        title="Исследования"
        description="Исследования, идеи и гипотезы вокруг продуктов, поведения пользователей, AI, UX и цифровых моделей, которые кажутся интересными для изучения и развития."
      />

      <EditorialScope
        items={[
          "Идеи продуктов и сценарии, которые хочется разобрать глубже.",
          "Поведение пользователей, мотивация и точки трения.",
          "AI, UX и новые способы взаимодействия с цифровыми системами.",
          "Бизнес-модели, гипотезы и вопросы перед проверкой.",
        ]}
      />

      <ContentGrid
        eyebrow="Все исследования"
        title="Идеи, поведение и гипотезы"
        description="Исследования, идеи и гипотезы вокруг продуктов, поведения пользователей, AI, UX и цифровых моделей, которые кажутся интересными для изучения и развития."
        items={research}
        hrefPrefix="/research"
      />
    </main>
  );
}
