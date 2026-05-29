import Link from "next/link";
import { createTagRoute, getDisplayTags } from "@/data/content";
import { createPageMetadata } from "@/lib/seo";
import { getPublishedArticles } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "О проекте",
  description:
    "Публичная база размышлений, исследований и практики вокруг продуктов, цифровых систем, обучения и пользовательского поведения.",
  pathname: "/about",
});

const keywords = [
  "Продукт",
  "Команда",
  "Исследования",
  "Обучение",
  "Потребитель",
  "Ценности",
  "Поведение",
];

export default function AboutPage() {
  const recommendedArticles = getPublishedArticles().slice(0, 3);

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="max-w-6xl mx-auto px-5 pt-20 pb-7 sm:px-6 sm:pt-22 sm:pb-8">
        <div className="mx-auto max-w-[46rem] text-center">
          <h1 className="mx-auto max-w-[40rem] text-[1.55rem] font-semibold leading-[1.12] tracking-tight text-zinc-950 sm:text-[1.9rem] md:text-[2.15rem]">
            О проекте
          </h1>

          <p className="mx-auto mt-3 max-w-[34rem] text-[0.95rem] leading-7 text-zinc-600 sm:text-[1rem]">
            Пространство для мыслей, заметок и исследований о цифровых
            продуктах, системах, поведении пользователей и процессе обучения
          </p>
        </div>

        <nav
          aria-label="Темы проекта"
          className="mx-auto mt-4 flex max-w-[46rem] flex-wrap items-center justify-center gap-2"
        >
          {keywords.map((keyword) => (
            <Link
              key={keyword}
              href={createTagRoute(keyword)}
              className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium leading-5 text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 hover:opacity-90 focus-visible:border-zinc-400 focus-visible:text-zinc-950"
            >
              {keyword}
            </Link>
          ))}
        </nav>
      </section>

      <section className="border-t border-zinc-200/80 bg-white">
        <div className="max-w-6xl mx-auto px-5 py-7 sm:px-6 sm:py-9 lg:py-10">
          <div>
            <article className="mx-auto max-w-[44rem] space-y-5 text-[1rem] leading-8 text-zinc-600 sm:text-[1.05rem]">
              <p>
                Этот сайт место, где я могу спокойно собирать и
                структурировать всё, что изучаю, замечаю и постепенно начинаю
                понимать о цифровых продуктах.
              </p>

              <p>
                Здесь появляются заметки, статьи, исследования, гипотезы и
                наблюдения - по мере обучения, работы, чтения, практики и
                попыток глубже разобраться в том, как устроены продукты,
                системы и пользовательское поведение.
              </p>

              <p>
                Мне интересно разбираться, почему одни продукты работают, а
                другие - нет. Создавать хорошие продукты для пользователей -
                это по-настоящему меня питает.
              </p>

              <p>
                Этот проект не про громкие выводы, быстрые советы или попытку
                выглядеть экспертом. Скорее, это долгий процесс обучения,
                мышления и постепенного формирования собственного взгляда на
                продукты и цифровые системы.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200/80 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-5 py-7 sm:px-6 sm:py-9 lg:py-10">
          <div className="mx-auto mb-6 max-w-[38rem] text-center sm:mb-7">
            <h2 className="text-[1.45rem] font-semibold leading-tight tracking-tight text-zinc-950 sm:text-[1.8rem]">
              С чего начать
            </h2>
          </div>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {recommendedArticles.map((article) => {
              const displayTags = getDisplayTags(article.category, article.tags, 1);

              return (
                <article
                  key={article.slug}
                  className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[26px] border border-zinc-200/80 bg-white p-5 shadow-[0_14px_48px_rgba(15,23,42,0.035)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_64px_rgba(15,23,42,0.07)]"
                >
                <Link
                  href={article.route}
                  aria-label={article.title}
                  className="absolute inset-0 rounded-[26px] outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
                />

                <div className="pointer-events-none relative z-10 mb-4 flex flex-wrap gap-2 text-xs leading-5 text-zinc-500">
                  <Link
                    href={createTagRoute(article.category)}
                    className="pointer-events-auto rounded-full border border-zinc-200 bg-white px-3 py-1 font-medium text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 hover:opacity-90"
                  >
                    {article.category}
                  </Link>
                  {displayTags[0] && (
                    <Link
                      href={createTagRoute(displayTags[0])}
                      className="pointer-events-auto rounded-full border border-zinc-200 bg-white px-3 py-1 font-medium text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 hover:opacity-90"
                    >
                        {displayTags[0]}
                    </Link>
                  )}
                </div>

                <h3 className="pointer-events-none relative z-10 mb-2.5 text-[1.12rem] font-semibold leading-tight tracking-tight text-zinc-950 transition-colors group-hover:text-zinc-800">
                  {article.title}
                </h3>

                <p className="pointer-events-none relative z-10 mb-6 text-sm leading-6 text-zinc-600">
                  {article.description}
                </p>

                <span className="pointer-events-none relative z-10 mt-auto text-lg text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-zinc-700">
                    →
                </span>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/articles"
              className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium leading-6 text-zinc-600 transition hover:bg-white hover:text-zinc-950 hover:opacity-90"
            >
              📰 Смотреть все статьи
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
