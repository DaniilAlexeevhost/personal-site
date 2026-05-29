import Link from "next/link";
import { notFound } from "next/navigation";
import Pagination from "@/components/Pagination";
import { createTagRoute, formatContentDate, getDisplayTags } from "@/data/content";
import { getPublishedCases } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Кейсы",
  description:
    "Практические ситуации, решения, гипотезы и выводы из проектов, рабочих процессов и опыта.",
  pathname: "/cases",
});

const ARCHIVE_PAGE_SIZE = 12;
const ARCHIVE_BASE_PATH = "/cases";
const archiveTags = [
  "Продукт",
  "Исследование",
  "Удержание",
  "Поведение",
];

function getPaginatedItems<T>(items: T[], currentPage: number, pageSize: number) {
  const start = (currentPage - 1) * pageSize;

  return items.slice(start, start + pageSize);
}

function createArchivePageHref(basePath: string, page: number) {
  return page <= 1 ? basePath : `${basePath}?page=${page}`;
}

type ArchiveSearchParams = Promise<{
  page?: string | string[];
}>;

function getArchivePage(searchParams: { page?: string | string[] }, totalPages: number) {
  const rawPage = Array.isArray(searchParams.page)
    ? searchParams.page[0]
    : searchParams.page;
  const parsedPage = Number.parseInt(rawPage ?? "1", 10);

  if (Number.isNaN(parsedPage)) {
    return 1;
  }

  return Math.min(Math.max(parsedPage, 1), totalPages);
}

export default async function CasesPage({
  searchParams,
}: {
  searchParams: ArchiveSearchParams;
}) {
  notFound();

  const cases = getPublishedCases();
  const totalPages = Math.max(1, Math.ceil(cases.length / ARCHIVE_PAGE_SIZE));
  const currentPage = getArchivePage(await searchParams, totalPages);
  const paginatedCases = getPaginatedItems(cases, currentPage, ARCHIVE_PAGE_SIZE);

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="max-w-6xl mx-auto px-5 pt-20 pb-8 sm:px-6 sm:pt-22 sm:pb-9">
        <div className="mx-auto max-w-[46rem] text-center">
          <h1 className="mb-2 font-semibold text-[1.35rem] leading-[1.16] tracking-tight sm:text-[1.62rem] md:text-[1.85rem]">
            Кейсы
          </h1>

          <p className="mx-auto max-w-[38rem] text-[0.95rem] leading-7 text-zinc-600 sm:text-[1rem]">
            Практические выводы, гипотезы и опыт из цифровых продуктов
          </p>
        </div>

        <nav
          aria-label="Темы кейсов"
          className="mx-auto mt-4 flex max-w-[46rem] flex-wrap items-center justify-center gap-2"
        >
          {archiveTags.map((tag) => (
            <Link
              key={tag}
              href={createTagRoute(tag)}
              className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium leading-5 text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 hover:opacity-90 focus-visible:border-zinc-400 focus-visible:text-zinc-950"
            >
              {tag}
            </Link>
          ))}
        </nav>
      </section>

      <section className="bg-zinc-50">
        <div className="max-w-6xl mx-auto px-5 pt-6 pb-10 sm:px-6 sm:pt-8 sm:pb-12 lg:pt-9 lg:pb-14">
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {paginatedCases.map((item) => {
              const displayTags = getDisplayTags(item.category, item.tags, 1);

              return (
                <article
                  key={item.slug}
                  className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[32px] border border-zinc-200/80 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_96px_rgba(15,23,42,0.12)]"
                >
                <Link
                  href={item.route}
                  aria-label={item.title}
                  className="absolute inset-0 rounded-[32px] outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
                />

                <div className="pointer-events-none relative z-10 mb-6 flex flex-wrap gap-3 text-sm text-zinc-500">
                  <Link
                    href={createTagRoute(item.category)}
                    className="pointer-events-auto rounded-full border border-zinc-200 px-3 py-1 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950"
                  >
                      {item.category}
                  </Link>
                  {displayTags[0] && (
                    <Link
                      href={createTagRoute(displayTags[0])}
                      className="pointer-events-auto rounded-full border border-zinc-200 px-3 py-1 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950"
                    >
                        {displayTags[0]}
                    </Link>
                  )}
                </div>

                <h3 className="pointer-events-none relative z-10 mb-4 text-2xl font-semibold leading-tight tracking-tight text-zinc-950 transition-colors group-hover:text-zinc-800">
                  {item.title}
                </h3>

                <p className="pointer-events-none relative z-10 mb-8 text-base leading-8 text-zinc-600">
                  {item.description}
                </p>

                <div className="pointer-events-none relative z-10 mt-auto flex items-center justify-between text-sm text-zinc-400">
                  <span>{formatContentDate(item.publishedAt)}</span>
                  <div className="flex items-center gap-2">
                    <span>{item.readingTime} мин чтения</span>
                    <span className="text-xl transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
                </article>
              );
            })}
          </div>

          <Pagination
            ariaLabel="Пагинация архива кейсов"
            className="mt-9 sm:mt-10"
            currentPage={currentPage}
            totalPages={totalPages}
            getPageHref={(page) => createArchivePageHref(ARCHIVE_BASE_PATH, page)}
          />
        </div>
      </section>
    </main>
  );
}
