import Link from "next/link";
import ContactCopyCard from "@/components/ContactCopyCard";
import { createTagRoute } from "@/data/content";
import { getPublishedArticles } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Контакты",
  description:
    "Контакты Daniil Alexeev для продуктовых проектов, исследований и сотрудничества.",
  pathname: "/contacts",
});

export default function ContactsPage() {
  const recommendedArticles = getPublishedArticles().slice(0, 3);

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="max-w-6xl mx-auto px-5 pt-20 pb-7 sm:px-6 sm:pt-22 sm:pb-8">
        <div className="mx-auto max-w-[46rem] text-center">
          <h1 className="mx-auto max-w-[40rem] text-[1.55rem] font-semibold leading-[1.12] tracking-tight text-zinc-950 sm:text-[1.9rem] md:text-[2.15rem]">
            Контакты
          </h1>

          <p className="mx-auto mt-3 max-w-[34rem] text-[0.72rem] leading-7 text-zinc-600 sm:text-[0.76rem]">
            Открыт для общения, совместных проектов и разговоров о цифровых
            продуктах
          </p>
        </div>
      </section>

      <section className="border-t border-zinc-200/80 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-5 py-7 sm:px-6 sm:py-9 lg:py-10">
          <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
            <ContactCopyCard
              label="📩 Email"
              value="hello@daniilalexeev.com"
            />

            <ContactCopyCard
              label="💬 Telegram"
              value="@Young1AD"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200/80 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-5 py-7 sm:px-6 sm:py-9 lg:py-10">
          <div className="mx-auto mb-6 max-w-[38rem] text-center sm:mb-7">
            <h2 className="text-[1.45rem] font-semibold leading-tight tracking-tight text-zinc-950 sm:text-[1.8rem]">
              Полезные материалы
            </h2>
          </div>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {recommendedArticles.map((article) => (
              <article
                key={article.slug}
                className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[26px] border border-zinc-200/80 bg-white p-5 shadow-[0_14px_48px_rgba(15,23,42,0.035)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_64px_rgba(15,23,42,0.07)]"
              >
                <Link
                  href={article.route}
                  aria-label={article.title}
                  className="absolute inset-0 rounded-[26px] outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
                />

                <div className="relative z-10 mb-4 flex flex-wrap gap-2 text-xs leading-5 text-zinc-500">
                  <Link
                    href={createTagRoute(article.category)}
                    className="rounded-full border border-zinc-200 bg-white px-3 py-1 font-medium text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 hover:opacity-90"
                  >
                      {article.category}
                  </Link>
                  {article.tags.length > 0 && (
                    <Link
                      href={createTagRoute(article.tags[0])}
                      className="rounded-full border border-zinc-200 bg-white px-3 py-1 font-medium text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 hover:opacity-90"
                    >
                        {article.tags[0]}
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
            ))}
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
