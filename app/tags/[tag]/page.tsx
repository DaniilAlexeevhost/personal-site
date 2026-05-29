import Link from "next/link";
import { notFound } from "next/navigation";
import Pagination from "@/components/Pagination";
import { createTagRoute, formatContentDate, getDisplayTags } from "@/data/content";
import {
  getPublishedContentByTag,
  getPublishedTags,
  getTagBySlug,
} from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

type TagPageProps = {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{
    page?: string | string[];
  }>;
};

const TAG_PAGE_SIZE = 12;

function getPageFromSearchParams(
  searchParams: { page?: string | string[] },
  totalPages: number,
) {
  const rawPage = Array.isArray(searchParams.page)
    ? searchParams.page[0]
    : searchParams.page;
  const parsedPage = Number.parseInt(rawPage ?? "1", 10);

  if (Number.isNaN(parsedPage)) {
    return 1;
  }

  return Math.min(Math.max(parsedPage, 1), totalPages);
}

function getPaginatedItems<T>(items: T[], currentPage: number, pageSize: number) {
  const start = (currentPage - 1) * pageSize;

  return items.slice(start, start + pageSize);
}

function createTagPageHref(route: string, page: number) {
  return page <= 1 ? route : `${route}?page=${page}`;
}

export function generateStaticParams() {
  return getPublishedTags().map((tag) => ({
    tag: tag.slug,
  }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const tagSlug = decodeURIComponent((await params).tag);
  const tag = getTagBySlug(tagSlug);

  if (!tag) {
    return {
      title: "Тег не найден",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return createPageMetadata({
    title: tag.label,
    description: `Материалы по теме ${tag.label}: статьи, исследования и заметки.`,
    pathname: tag.route,
    type: "website",
  });
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const tagSlug = decodeURIComponent((await params).tag);
  const tag = getTagBySlug(tagSlug);

  if (!tag) {
    notFound();
  }

  const items = getPublishedContentByTag(tag.slug);
  const totalPages = Math.max(1, Math.ceil(items.length / TAG_PAGE_SIZE));
  const currentPage = getPageFromSearchParams(await searchParams, totalPages);
  const paginatedItems = getPaginatedItems(items, currentPage, TAG_PAGE_SIZE);

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="mx-auto max-w-6xl px-5 pb-5 pt-16 sm:px-6 sm:pb-6 sm:pt-18">
        <div className="mx-auto max-w-[46rem] text-center">
          <h1 className="mb-2 text-[1.45rem] font-semibold leading-[1.16] tracking-tight text-zinc-950 sm:text-[1.75rem] md:text-[1.95rem]">
            {tag.label}
          </h1>

          <p className="mx-auto max-w-[38rem] text-[0.95rem] leading-7 text-zinc-600 sm:text-[1rem]">
            Материалы по теме {tag.label}: статьи, исследования и заметки.
          </p>
        </div>
      </section>

      <section className="bg-zinc-50">
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-6 sm:px-6 sm:pb-12 sm:pt-8 lg:pb-14 lg:pt-9">
          <div className="mx-auto mb-6 max-w-[44rem] text-center sm:mb-7">
            <h2 className="text-[1.35rem] font-semibold leading-tight tracking-tight text-zinc-950 sm:text-[1.62rem]">
              Подборка материалов
            </h2>
          </div>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {paginatedItems.map((item) => {
              const displayTags = getDisplayTags(item.category, item.tags, 1);

              return (
                <article
                  key={item.route}
                  className="group relative flex h-full cursor-pointer flex-col rounded-[26px] border border-zinc-200/80 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.035)] transition hover:border-zinc-300 hover:shadow-[0_20px_64px_rgba(15,23,42,0.06)] sm:rounded-[30px] sm:p-6"
                >
                <Link
                  href={item.route}
                  aria-label={item.title}
                  className="absolute inset-0 rounded-[26px] outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 sm:rounded-[30px]"
                />

                <div className="pointer-events-none relative z-10 mb-5 flex flex-wrap gap-2 text-xs leading-5 text-zinc-500">
                  <Link
                    href={createTagRoute(item.category)}
                    className="pointer-events-auto rounded-full border border-zinc-200/80 bg-zinc-50/60 px-3 py-1 transition hover:border-zinc-300 hover:bg-white hover:text-zinc-950"
                  >
                    {item.category}
                  </Link>
                  {displayTags[0] ? (
                    <Link
                      href={createTagRoute(displayTags[0])}
                      className="pointer-events-auto rounded-full border border-zinc-200/80 bg-zinc-50/60 px-3 py-1 transition hover:border-zinc-300 hover:bg-white hover:text-zinc-950"
                    >
                      {displayTags[0]}
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
              );
            })}
          </div>

          <Pagination
            ariaLabel={`Пагинация материалов по теме ${tag.label}`}
            className="mt-9 sm:mt-10"
            currentPage={currentPage}
            totalPages={totalPages}
            getPageHref={(page) => createTagPageHref(tag.route, page)}
          />
        </div>
      </section>
    </main>
  );
}
