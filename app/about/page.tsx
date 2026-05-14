import SectionHero from "@/components/SectionHero";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "О проекте",
  description:
    "Публичная база размышлений, исследований и практики вокруг продуктов, digital-систем, growth и пользовательского поведения.",
  pathname: "/about",
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SectionHero
        eyebrow="About"
        title="О проекте"
        description="Этот сайт - моя публичная база размышлений, исследований и практики вокруг продуктов, digital-систем, growth и пользовательского поведения. Я веду его по мере того, как учусь, работаю, пробую, собираю опыт и постепенно строю свой путь в продуктовой среде."
      />

      <section className="border-t border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-12 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.4fr] lg:gap-20">
            <aside className="text-sm leading-7 text-zinc-500">
              <p className="sticky top-28 max-w-xs">
                О продуктах, digital-системах, growth, пользовательском
                поведении, обучении и практике.
              </p>
            </aside>

            <article className="space-y-6 sm:space-y-8 text-[1.05rem] sm:text-lg leading-8 text-zinc-600">
              <p>
                Этот сайт - моя публичная база размышлений, исследований и
                практики вокруг продуктов, digital-систем, growth и
                пользовательского поведения. Я веду его по мере того, как
                учусь, работаю, пробую, собираю опыт и постепенно строю свой
                путь в продуктовой среде.
              </p>
              <p>
                Здесь нет цели постоянно производить контент ради внимания или
                охватов. Скорее, это спокойное пространство для длинного
                мышления, заметок, исследований и постепенного формирования
                собственного взгляда на продукты, системы и цифровую среду.
              </p>
              <p>
                Здесь постепенно будут появляться статьи, кейсы,
                исследовательские заметки и короткие мысли - всё, что помогает
                мне лучше понимать продукты, цифровые системы, поведение людей
                и сам процесс создания чего-то действительно полезного.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
