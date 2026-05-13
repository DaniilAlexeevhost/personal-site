import Link from "next/link";
import { articles } from "@/data/articles";
import { formatContentDate } from "@/data/content";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-36 sm:pt-32 md:pt-36 pb-14 sm:pb-20">
        <div className="max-w-3xl">
          <p className="text-xs sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.28em] text-zinc-500 mb-4 sm:mb-6">
            Product thinking · research · essays
          </p>

          <h1 className="font-semibold text-[2.55rem] sm:text-5xl md:text-6xl xl:text-7xl leading-[1.05] tracking-tight mb-6 sm:mb-8">
            Исследую, разбираю и учусь строить хорошие продукты
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl leading-8 md:leading-9 text-zinc-600 max-w-2xl">
            Пишу о продуктах, идеях, исследованиях и цифровых проектах, чтобы
            превращать стратегию в понятный опыт и продуманные решения.
          </p>
        </div>
      </section>

      <section className="bg-zinc-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14 sm:py-20 lg:py-24">
          <div className="max-w-3xl mb-9 sm:mb-12 lg:mb-14">
            <p className="text-xs sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.26em] text-zinc-500 mb-3">
              Последние материалы
            </p>
            <h2 className="text-[2rem] sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-zinc-950">
              Статьи, заметки и исследования
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-zinc-600">
              Актуальные рассуждения о growth, UX, AI и продуктовой стратегии в
              цифровых проектах.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 lg:gap-8 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-200/80 bg-white p-5 sm:p-7 lg:p-8 shadow-[0_18px_56px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_96px_rgba(15,23,42,0.12)]">
                  <div className="mb-5 sm:mb-6 flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-500">
                    <span className="rounded-full border border-zinc-200 px-3 py-1">
                      {article.category}
                    </span>
                    {article.tags.slice(0, 1).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-zinc-200 px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl lg:text-2xl font-semibold leading-tight tracking-tight text-zinc-950 mb-4 group-hover:text-zinc-800 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-base leading-7 text-zinc-600 mb-8">
                    {article.description}
                  </p>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-400">
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
