import Link from "next/link";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import EditorialProse from "@/components/EditorialProse";
import Pagination from "@/components/Pagination";
import { createTagRoute, formatContentDate } from "@/data/content";
import { getContentNavigation, getRelatedContentItems } from "@/lib/content";
import type { ContentItem } from "@/data/types";

type DetailItem = ContentItem & {
  content?: string;
};

type ContentDetailProps = {
  item: DetailItem;
  backHref: string;
  backLabel: string;
  children?: ReactNode;
};

export default function ContentDetail({
  children,
  item,
  backHref,
  backLabel,
}: ContentDetailProps) {
  const { previous, next } = getContentNavigation(item);
  const navigationRoutes = new Set([previous?.route, next?.route]);
  const relatedItems = getRelatedContentItems(item, 6)
    .filter((relatedItem) => !navigationRoutes.has(relatedItem.route))
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <div className="border-b border-zinc-200/70 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5 text-sm leading-6 text-zinc-500">
            <Link
              href={createTagRoute(item.category)}
              className="transition hover:text-zinc-900"
            >
              {item.category}
            </Link>
            {item.tags[0] ? (
              <>
                <span className="text-zinc-300">•</span>
                <Link
                  href={createTagRoute(item.tags[0])}
                  className="transition hover:text-zinc-900"
                >
                  {item.tags[0]}
                </Link>
              </>
            ) : null}
          </div>

          <Link
            href={backHref}
            className="text-sm leading-6 text-zinc-500 transition hover:text-zinc-950 sm:shrink-0"
          >
            ← {backLabel}
          </Link>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-5 pb-6 pt-5 sm:px-6 sm:pb-8 sm:pt-7">
        <header className="mx-auto max-w-[38rem]">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[0.7rem] leading-5 text-zinc-500">
            <Link
              href={createTagRoute(item.category)}
              className="rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 font-medium text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 hover:opacity-90 focus-visible:border-zinc-400 focus-visible:text-zinc-950"
            >
              {item.category}
            </Link>
            {item.tags.map((tag) => (
              <Link
                key={tag}
                href={createTagRoute(tag)}
                className="rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 font-medium text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 hover:opacity-90 focus-visible:border-zinc-400 focus-visible:text-zinc-950"
              >
                {tag}
              </Link>
            ))}
          </div>

          <div className="mb-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.82rem] leading-5 text-zinc-400">
            <span className="text-zinc-400">
              {formatContentDate(item.publishedAt)}
            </span>
            <span className="text-zinc-300">•</span>
            <span className="text-zinc-400">
              {item.readingTime} мин чтения
            </span>
          </div>

          <h1 className="mb-3 text-[1.34rem] font-semibold leading-[1.22] tracking-tight text-zinc-950 sm:text-[1.62rem] md:text-[1.78rem]">
            {item.title}
          </h1>

          <p className="max-w-[34rem] text-[0.9rem] leading-[1.62] text-zinc-600 sm:text-[0.94rem] sm:leading-[1.66]">
            {item.description}
          </p>
        </header>

        <article className="mx-auto mt-6 max-w-[38rem] text-zinc-900 sm:mt-7 [&_.prose]:text-[0.91rem] [&_.prose]:leading-[1.68] sm:[&_.prose]:text-[0.94rem] [&_.prose_h2]:mt-5 [&_.prose_h2]:mb-2 [&_.prose_h2]:text-[1.04rem] sm:[&_.prose_h2]:text-[1.16rem] [&_.prose_h3]:mt-4.5 [&_.prose_h3]:mb-1.5 [&_.prose_h3]:text-[0.98rem] sm:[&_.prose_h3]:text-[1.04rem] [&_.prose_p]:my-2 [&_.prose_ul]:my-2 [&_.prose_ol]:my-2 [&_.prose_li]:my-0.5 [&_.prose_blockquote]:my-4 [&_.prose_pre]:my-4">
          <EditorialProse>
            {children ??
              (item.content ? <ReactMarkdown>{item.content}</ReactMarkdown> : null)}
          </EditorialProse>
        </article>
      </section>

      {(previous || next || relatedItems.length > 0) && (
        <section
          id="related-materials"
          className="border-t border-zinc-200/80 bg-zinc-50"
        >
          <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 sm:py-9 lg:py-10">
            {(previous || next) && (
              <nav
                className={`mx-auto mb-8 grid max-w-[38rem] gap-4 sm:mb-10 ${
                  previous && next ? "sm:grid-cols-2" : ""
                }`}
              >
                {previous ? (
                  <Link
                    href={previous.route}
                    className="group rounded-[26px] border border-zinc-200/80 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.035)] transition hover:border-zinc-300 hover:shadow-[0_20px_64px_rgba(15,23,42,0.06)]"
                  >
                    <p className="mb-2 text-sm leading-6 text-zinc-500">
                      ← Назад
                    </p>
                    <p className="font-semibold leading-7 text-zinc-950 group-hover:text-zinc-700">
                      {previous.title}
                    </p>
                  </Link>
                ) : null}

                {next ? (
                  <Link
                    href={next.route}
                    className="group rounded-[26px] border border-zinc-200/80 bg-white p-5 text-left shadow-[0_12px_40px_rgba(15,23,42,0.035)] transition hover:border-zinc-300 hover:shadow-[0_20px_64px_rgba(15,23,42,0.06)] sm:text-right"
                  >
                    <p className="mb-2 text-sm leading-6 text-zinc-500">
                      Вперед →
                    </p>
                    <p className="font-semibold leading-7 text-zinc-950 group-hover:text-zinc-700">
                      {next.title}
                    </p>
                  </Link>
                ) : null}
              </nav>
            )}

            {relatedItems.length > 0 && (
              <RecommendationSection
                eyebrow="СВЯЗАННЫЕ МАТЕРИАЛЫ"
                title="Похожие материалы"
                items={relatedItems}
              />
            )}
          </div>
        </section>
      )}
    </main>
  );
}

function RecommendationSection({
  eyebrow,
  items,
  title,
}: {
  eyebrow: string;
  items: ContentItem[];
  title: string;
}) {
  return (
    <div>
      <div className="mx-auto mb-6 max-w-[38rem] text-center sm:mb-7">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
          {eyebrow}
        </p>
        <h2 className="text-[1.45rem] font-semibold leading-tight tracking-tight text-zinc-950 sm:text-[1.8rem]">
          {title}
        </h2>
      </div>

      <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.route}
            className="group relative flex h-full cursor-pointer flex-col rounded-[26px] border border-zinc-200/80 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.035)] transition hover:border-zinc-300 hover:shadow-[0_20px_64px_rgba(15,23,42,0.06)] sm:rounded-[30px] sm:p-6"
          >
            <Link
              href={item.route}
              aria-label={item.title}
              className="absolute inset-0 rounded-[26px] outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 sm:rounded-[30px]"
            />

            <div className="relative z-10 mb-5 flex flex-wrap gap-2 text-xs leading-5 text-zinc-500">
              <Link
                href={createTagRoute(item.category)}
                className="rounded-full border border-zinc-200/80 bg-zinc-50/60 px-3 py-1 transition hover:border-zinc-300 hover:bg-white hover:text-zinc-950"
              >
                {item.category}
              </Link>
              {item.tags[0] ? (
                <Link
                  href={createTagRoute(item.tags[0])}
                  className="rounded-full border border-zinc-200/80 bg-zinc-50/60 px-3 py-1 transition hover:border-zinc-300 hover:bg-white hover:text-zinc-950"
                >
                  {item.tags[0]}
                </Link>
              ) : null}
            </div>

            <h3 className="pointer-events-none relative z-10 mb-4 text-xl font-semibold leading-snug tracking-tight text-zinc-950 transition-colors group-hover:text-zinc-700">
              {item.title}
            </h3>

            <p className="pointer-events-none relative z-10 mb-8 text-base leading-7 text-zinc-600">
              {item.description}
            </p>

            <div className="pointer-events-none relative z-10 mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-5 text-sm leading-6 text-zinc-400">
              <span>{formatContentDate(item.publishedAt)}</span>
              <span className="text-xl transition group-hover:translate-x-1 group-hover:text-zinc-700">
                →
              </span>
            </div>
          </article>
        ))}
      </div>

      <Pagination
        ariaLabel="Пагинация связанных материалов"
        className="mt-6 sm:mt-7"
        currentPage={1}
        totalPages={1}
        getPageHref={() => "#related-materials"}
      />
    </div>
  );
}
