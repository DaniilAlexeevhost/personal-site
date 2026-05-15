import Link from "next/link";
import { articles } from "@/data/articles";
import { formatContentDate } from "@/data/content";
import { createPageMetadata, siteConfig } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  pathname: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  const sections = [
    {
      title: "Статьи",
      description:
        "Мысли, разборы и наблюдения о продуктах, идеях, цифровых системах и всём, что помогает лучше понимать создание полезных продуктов.",
      href: "/articles",
    },
    {
      title: "Кейсы",
      description:
        "Практические ситуации, решения, гипотезы и выводы из проектов, рабочих процессов и опыта, который постепенно помогает лучше понимать продукты и людей.",
      href: "/cases",
    },
    {
      title: "Исследования",
      description:
        "Исследования, идеи и гипотезы вокруг продуктов, поведения пользователей, AI и цифровых моделей, которые кажутся интересными для изучения и развития.",
      href: "/research",
    },
    {
      title: "Заметки",
      description:
        "Короткие мысли, наблюдения, цитаты и фрагменты идей, которые появляются по мере обучения, работы и повседневных размышлений.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-30 sm:pt-36 md:pt-40 pb-14 sm:pb-22 lg:pb-26">
        <div className="max-w-[52rem]">
          <h1 className="font-semibold text-[2.35rem] sm:text-5xl md:text-[3.65rem] xl:text-[4.35rem] leading-[1.07] sm:leading-[1.05] tracking-tight mb-6 sm:mb-8">
            Исследую, разбираю и учусь строить хорошие продукты
          </h1>

          <p className="text-[1.05rem] sm:text-xl md:text-[1.4rem] leading-8 md:leading-9 text-zinc-600 max-w-[42rem]">
            Пишу о продуктах, идеях, исследованиях и цифровых проектах
          </p>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-12 sm:py-20 lg:py-24">
          <div className="grid gap-7 sm:gap-12 lg:grid-cols-[0.76fr_1.4fr] lg:gap-20">
            <div>
              <h2 className="text-[1.85rem] sm:text-4xl md:text-[2.85rem] font-semibold leading-tight tracking-tight text-zinc-950">
                О сайте
              </h2>
            </div>

            <div className="max-w-[46rem] space-y-5 sm:space-y-6 text-[1.05rem] sm:text-lg leading-8 sm:leading-9 text-zinc-600">
              <p>
                Я создаю этот сайт как публичную базу своего пути в product
                management и цифровых продуктах.
              </p>
              <p>
                Здесь я собираю мысли, исследования, кейсы, гипотезы и заметки
                по мере того, как учусь, работаю и расту в этой сфере.
              </p>
              <p>
                Это не медиа ради охватов и не блог про “успешный успех”.
                Скорее - спокойное пространство для размышлений, практики и
                обмена идеями с людьми, которым действительно интересны
                продукты, бизнес и цифровые системы.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-12 sm:py-20 lg:py-24">
          <div className="grid gap-5 md:grid-cols-2">
            {sections.map((section) => {
              const content = (
                <article className="h-full rounded-2xl sm:rounded-3xl border border-zinc-200/80 bg-white p-5 sm:p-6 lg:p-7 transition-colors group-hover:border-zinc-300">
                  <h2 className="mb-3.5 sm:mb-4 text-[1.35rem] sm:text-2xl font-semibold leading-tight tracking-tight text-zinc-950">
                    {section.title}
                  </h2>
                  <p className="max-w-[34rem] text-base leading-7 text-zinc-600">
                    {section.description}
                  </p>
                </article>
              );

              if (!section.href) {
                return <div key={section.title}>{content}</div>;
              }

              return (
                <Link key={section.title} href={section.href} className="group">
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-zinc-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-12 sm:py-20 lg:py-24">
          <div className="max-w-[46rem] mb-8 sm:mb-14">
            <p className="text-xs sm:text-sm uppercase tracking-[0.16em] sm:tracking-[0.24em] text-zinc-500 mb-3.5 sm:mb-4">
              Последние заметки и статьи
            </p>
            <h2 className="text-[1.85rem] sm:text-4xl md:text-[2.85rem] font-semibold leading-tight tracking-tight text-zinc-950">
              Статьи, заметки и исследования
            </h2>
            <p className="mt-5 text-base sm:text-lg leading-7 sm:leading-8 text-zinc-600">
              Разборы книг, идей, продуктовых концепций, growth-подходов и
              собственных наблюдений.
            </p>
          </div>

          <div className="grid gap-5 sm:gap-6 lg:gap-8 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group outline-none focus-visible:[&>article]:border-zinc-400"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-200/80 bg-white p-5 sm:p-6 lg:p-7 shadow-[0_12px_40px_rgba(15,23,42,0.035)] transition duration-300 hover:border-zinc-300 hover:shadow-[0_20px_64px_rgba(15,23,42,0.06)]">
                  <div className="mb-5 sm:mb-6 flex flex-wrap gap-2 text-xs leading-5 text-zinc-500">
                    <span className="rounded-full border border-zinc-200/80 bg-zinc-50/60 px-3 py-1 leading-5">
                      {article.category}
                    </span>
                    {article.tags.slice(0, 1).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-zinc-200/80 bg-zinc-50/60 px-3 py-1 leading-5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl lg:text-[1.45rem] font-semibold leading-snug tracking-tight text-zinc-950 mb-4 group-hover:text-zinc-800 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-base leading-7 text-zinc-600 mb-9">
                    {article.description}
                  </p>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-5 text-sm leading-6 text-zinc-400">
                    <span>{formatContentDate(article.publishedAt)}</span>

                    <span className="text-xl transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
