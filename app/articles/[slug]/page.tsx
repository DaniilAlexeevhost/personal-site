import Link from "next/link";
import { notFound } from "next/navigation";
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
          <div className="max-w-6xl mx-auto px-5 sm:px-6 py-3 sm:py-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] sm:tracking-[0.28em] text-zinc-500">
              <span>{article.category}</span>
              <span>•</span>
              <span>{article.tags[0]}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500">
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

        <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-12 sm:pt-20 md:pt-24 pb-20 sm:pb-28">
          <header className="max-w-3xl">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
              <span className="rounded-full border border-zinc-200 px-3 py-1">
                {article.category}
              </span>
              {article.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-zinc-200 px-3 py-1"
                >
                  {tag}
                </span>
              ))}
              <span className="text-zinc-400">
                {formatContentDate(article.publishedAt)}
              </span>
            </div>

            <h1 className="text-[2.35rem] sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.08] text-zinc-950 mb-6 sm:mb-8">
              {article.title}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl leading-8 md:leading-9 text-zinc-600 max-w-2xl">
              {article.description}
            </p>
          </header>

          <article className="mx-auto mt-12 sm:mt-16 md:mt-20 max-w-3xl text-zinc-900">
            <div className="prose prose-zinc prose-base sm:prose-lg max-w-none prose-headings:text-zinc-950 prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-zinc-700 prose-p:leading-8 prose-lead:text-zinc-700 prose-lead:text-xl prose-a:text-zinc-950 prose-a:underline-offset-4 prose-a:decoration-zinc-300 prose-a:transition prose-a:hover:text-zinc-900 prose-a:hover:decoration-zinc-500 prose-img:rounded-2xl sm:prose-img:rounded-3xl prose-img:shadow-lg prose-pre:overflow-x-auto prose-pre:rounded-2xl prose-pre:bg-zinc-950 prose-pre:p-5 prose-code:break-words prose-code:text-sm prose-blockquote:border-l-4 prose-blockquote:border-zinc-200 prose-blockquote:bg-zinc-50 prose-blockquote:px-5 sm:prose-blockquote:px-6 prose-blockquote:py-3 prose-blockquote:text-zinc-700 prose-blockquote:italic prose-li:my-2 prose-strong:text-zinc-950">
              <ArticleContent />
            </div>
          </article>

          <nav className="mx-auto mt-14 sm:mt-20 grid max-w-3xl gap-4 sm:grid-cols-2">
            {previous ? (
              <Link
                href={previous.route}
                className="group rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6 transition hover:border-zinc-300 hover:shadow-[0_24px_80px_rgba(15,23,42,0.06)]"
              >
                <p className="mb-3 text-sm text-zinc-500">← Новее</p>
                <p className="font-semibold leading-6 text-zinc-950 group-hover:text-zinc-700">
                  {previous.title}
                </p>
              </Link>
            ) : (
              <div />
            )}

            {next && (
              <Link
                href={next.route}
                className="group rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-5 text-left transition hover:border-zinc-300 hover:shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-6 sm:text-right"
              >
                <p className="mb-3 text-sm text-zinc-500">Старее →</p>
                <p className="font-semibold leading-6 text-zinc-950 group-hover:text-zinc-700">
                  {next.title}
                </p>
              </Link>
            )}
          </nav>
        </section>

        {relatedArticles.length > 0 && (
          <section className="border-t border-zinc-200 bg-zinc-50">
            <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14 sm:py-20 lg:py-24">
              <div className="mb-10 max-w-3xl">
                <p className="mb-3 text-xs sm:text-sm uppercase tracking-[0.24em] text-zinc-500">
                  Related reading
                </p>
                <h2 className="text-[2rem] sm:text-4xl font-semibold leading-tight tracking-tight text-zinc-950">
                  Похожие материалы
                </h2>
              </div>

              <div className="grid gap-4 sm:gap-6 lg:gap-8 md:grid-cols-3">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.slug}
                    href={relatedArticle.route}
                    className="group"
                  >
                    <article className="flex h-full flex-col rounded-2xl sm:rounded-3xl border border-zinc-200/80 bg-white p-5 sm:p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
                      <div className="mb-5 flex flex-wrap gap-2 text-xs text-zinc-500">
                        <span className="rounded-full border border-zinc-200 px-3 py-1">
                          {relatedArticle.category}
                        </span>
                        <span className="rounded-full border border-zinc-200 px-3 py-1">
                          {relatedArticle.tags[0]}
                        </span>
                      </div>

                      <h3 className="mb-4 text-xl font-semibold leading-tight tracking-tight text-zinc-950 group-hover:text-zinc-700">
                        {relatedArticle.title}
                      </h3>

                      <p className="mb-8 text-base leading-7 text-zinc-600">
                        {relatedArticle.description}
                      </p>

                      <div className="mt-auto flex items-center justify-between text-sm text-zinc-400">
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
