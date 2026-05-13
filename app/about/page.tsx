import SectionHero from "@/components/SectionHero";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "О проекте",
  description:
    "О проекте Daniil Alexeev: продуктовые исследования, статьи, кейсы и заметки о цифровых продуктах.",
  pathname: "/about",
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SectionHero
        eyebrow="About"
        title="О проекте"
        description="Здесь собраны статьи, кейсы и исследовательские заметки о продуктах, UX, growth и цифровой стратегии."
      />

      <section className="border-t border-zinc-200 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14 sm:py-20 lg:py-24">
          <div className="max-w-3xl space-y-6 text-lg leading-8 text-zinc-600">
            <p>
              Этот сайт устроен как личная продуктовая библиотека: короткие
              наблюдения, более глубокие статьи, практические кейсы и
              исследования пользовательского поведения.
            </p>
            <p>
              Фокус проекта - ясное мышление о цифровых продуктах: как люди
              принимают решения, где возникает трение и какие решения помогают
              продукту расти устойчиво.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
