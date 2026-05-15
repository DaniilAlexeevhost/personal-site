import Link from "next/link";
import { notFound } from "next/navigation";
import EditorialProse from "@/components/EditorialProse";
import {
  getArticleBySlug,
  getArticleNavigation,
  getPublishedArticles,
  getRelatedArticles,
} from "@/data/articles";
import { formatContentDate } from "@/data/content";
import { createContentMetadata } from "@/lib/seo";
import type { Metadata } from "next";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublishedArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Статья не найдена",
    };
  }

  return createContentMetadata(article);
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const ArticleContent = article.Component;
  const { previous, next } = getArticleNavigation(article);
  const relatedArticles = getRelatedArticles(article);

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <div className="relative">
        <div className="border-b border-zinc-200/70 bg-white/95 backdrop-blur-xl sm:sticky sm:top-20 sm:z-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 py-3.5 sm:py-4 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.7rem] uppercase tracking-[0.16em] sm:text-xs sm:tracking-[0.22em] text-zinc-500">
              <span>{article.category}</span>
              <span>•</span>
              <span>{article.tags[0]}</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm leading-6 text-zinc-500">
              <span>{article.readingTime} мин чтения</span>
              <span>•</span>
              <Link
                href="/articles"
                className="hover:text-zinc-900 transition"
              >
                Все статьи
              </Link>
            </div>
          </div>
        </div>

        <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-10 sm:pt-20 md:pt-24 pb-14 sm:pb-24">
          <header className="max-w-[52rem]">
            <div className="mb-6 sm:mb-7 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-sm leading-6 text-zinc-500">
              <span className="rounded-full border border-zinc-200 px-3 py-1 leading-5">
                {article.category}
              </span>
              {article.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-zinc-200 px-3 py-1 leading-5"
                >
                  {tag}
                </span>
              ))}
              <span className="text-zinc-400">
                {formatContentDate(article.publishedAt)}
              </span>
              <span className="text-zinc-300">•</span>
              <span className="text-zinc-400">
                {article.readingTime} мин чтения
              </span>
            </div>

            <h1 className="text-[2.15rem] sm:text-5xl md:text-[3.45rem] font-semibold tracking-tight leading-[1.1] sm:leading-[1.08] text-zinc-950 mb-6 sm:mb-8">
              {article.title}
            </h1>

            <p className="text-[1.05rem] sm:text-xl md:text-[1.35rem] leading-8 md:leading-9 text-zinc-600 max-w-[46rem]">
              {article.description}
            </p>
          </header>

          <article className="mx-auto mt-10 sm:mt-14 md:mt-16 max-w-[50rem] text-zinc-900">
            <EditorialProse>
              <ArticleContent />
            </EditorialProse>
          </article>

          <nav className="mx-auto mt-12 sm:mt-20 grid max-w-[50rem] gap-4 sm:grid-cols-2">
            {previous ? (
              <Link
                href={previous.route}
                className="group rounded-2xl sm:rounded-3xl border border-zinc-200/80 bg-white p-5 sm:p-6 shadow-[0_12px_40px_rgba(15,23,42,0.03)] transition hover:border-zinc-300 hover:shadow-[0_20px_64px_rgba(15,23,42,0.055)]"
              >
                <p className="mb-3 text-sm leading-6 text-zinc-500">← Новее</p>
                <p className="font-semibold leading-7 text-zinc-950 group-hover:text-zinc-700">
                  {previous.title}
                </p>
              </Link>
            ) : (
              <div />
            )}

            {next && (
              <Link
                href={next.route}
                className="group rounded-2xl sm:rounded-3xl border border-zinc-200/80 bg-white p-5 text-left shadow-[0_12px_40px_rgba(15,23,42,0.03)] transition hover:border-zinc-300 hover:shadow-[0_20px_64px_rgba(15,23,42,0.055)] sm:p-6 sm:text-right"
              >
                <p className="mb-3 text-sm leading-6 text-zinc-500">Старее →</p>
                <p className="font-semibold leading-7 text-zinc-950 group-hover:text-zinc-700">
                  {next.title}
                </p>
              </Link>
            )}
          </nav>
        </section>

        {relatedArticles.length > 0 && (
          <section className="border-t border-zinc-200 bg-zinc-50">
            <div className="max-w-6xl mx-auto px-5 sm:px-6 py-12 sm:py-20 lg:py-24">
              <div className="mb-8 sm:mb-12 max-w-3xl">
                <p className="mb-4 text-xs sm:text-sm uppercase tracking-[0.2em] text-zinc-500">
                  Related reading
                </p>
                <h2 className="text-[1.85rem] sm:text-4xl md:text-[2.65rem] font-semibold leading-tight tracking-tight text-zinc-950">
                  Похожие материалы
                </h2>
              </div>

              <div className="grid gap-5 sm:gap-6 lg:gap-8 md:grid-cols-3">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.slug}
                    href={relatedArticle.route}
                    className="group outline-none focus-visible:[&>article]:border-zinc-400"
                  >
                    <article className="flex h-full flex-col rounded-2xl sm:rounded-3xl border border-zinc-200/80 bg-white p-5 sm:p-6 shadow-[0_12px_40px_rgba(15,23,42,0.035)] transition hover:border-zinc-300 hover:shadow-[0_20px_64px_rgba(15,23,42,0.06)]">
                      <div className="mb-5 flex flex-wrap gap-2 text-xs leading-5 text-zinc-500">
                        <span className="rounded-full border border-zinc-200/80 bg-zinc-50/60 px-3 py-1">
                          {relatedArticle.category}
                        </span>
                        <span className="rounded-full border border-zinc-200/80 bg-zinc-50/60 px-3 py-1">
                          {relatedArticle.tags[0]}
                        </span>
                      </div>

                      <h3 className="mb-4 text-xl font-semibold leading-snug tracking-tight text-zinc-950 group-hover:text-zinc-700">
                        {relatedArticle.title}
                      </h3>

                      <p className="mb-8 text-base leading-7 text-zinc-600">
                        {relatedArticle.description}
                      </p>

                      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-5 text-sm leading-6 text-zinc-400">
                        <span>
                          {formatContentDate(relatedArticle.publishedAt)}
                        </span>
                        <span className="text-xl transition group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
