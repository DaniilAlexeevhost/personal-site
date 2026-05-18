import Link from "next/link";
import Pagination from "@/components/Pagination";
import { createTagRoute, formatContentDate } from "@/data/content";
import { getPublishedNotes } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Заметки",
  description:
    "Короткие мысли, наблюдения, цитаты и фрагменты идей, которые появляются по мере обучения, работы и повседневных размышлений.",
  pathname: "/notes",
});

const ARCHIVE_PAGE_SIZE = 12;
const ARCHIVE_BASE_PATH = "/notes";
const archiveTags = [
  "Thinking",
  "Learning",
  "Product",
  "Reflection",
  "Systems",
  "Questions",
  "Discovery",
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

export default async function NotesPage({
  searchParams,
}: {
  searchParams: ArchiveSearchParams;
}) {
  const notes = getPublishedNotes();
  const totalPages = Math.max(1, Math.ceil(notes.length / ARCHIVE_PAGE_SIZE));
  const currentPage = getArchivePage(await searchParams, totalPages);
  const paginatedNotes = getPaginatedItems(notes, currentPage, ARCHIVE_PAGE_SIZE);

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="max-w-6xl mx-auto px-5 pt-20 pb-8 sm:px-6 sm:pt-22 sm:pb-9">
        <div className="mx-auto max-w-[46rem] text-center">
          <h1 className="mb-2 font-semibold text-[1.35rem] leading-[1.16] tracking-tight sm:text-[1.62rem] md:text-[1.85rem]">
            Заметки
          </h1>

          <p className="mx-auto max-w-[38rem] text-[0.9rem] leading-7 text-zinc-600 sm:text-[0.95rem]">
            Короткие мысли, идеи и наблюдения, которые появляются по мере обучения и работы
          </p>
        </div>

        <nav
          aria-label="Темы заметок"
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
            {paginatedNotes.map((item) => (
              <article
                key={item.slug}
                className="group relative flex h-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-[32px] border border-zinc-200/80 bg-white p-7 shadow-[0_24px_80px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_96px_rgba(15,23,42,0.12)] sm:p-8"
              >
                <Link
                  href={item.route}
                  aria-label={item.title}
                  className="absolute inset-0 rounded-[32px] outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
                />

                <div className="flex h-full w-full max-w-[88%] min-w-0 flex-col items-start overflow-wrap-anywhere">
                  <div className="relative z-10 mb-5 flex min-w-0 flex-wrap gap-2.5 text-xs text-zinc-500">
                    <Link
                      href={createTagRoute(item.category)}
                      className="max-w-full rounded-full border border-zinc-200 px-3 py-1 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950"
                    >
                        {item.category}
                    </Link>
                    {item.tags.length > 0 && (
                      <Link
                        href={createTagRoute(item.tags[0])}
                        className="max-w-full rounded-full border border-zinc-200 px-3 py-1 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950"
                      >
                          {item.tags[0]}
                      </Link>
                    )}
                  </div>

                  <h3 className="pointer-events-none relative z-10 mb-4 max-w-full break-words text-xl font-semibold leading-tight tracking-tight text-zinc-950 transition-colors group-hover:text-zinc-800">
                    {item.title}
                  </h3>

                  <p className="pointer-events-none relative z-10 mb-7 max-w-full break-words text-[0.92rem] leading-6 text-zinc-600">
                    {item.description}
                  </p>

                  <div className="pointer-events-none relative z-10 mt-auto flex w-full min-w-0 items-center justify-between gap-3 text-xs text-zinc-400">
                    <span className="min-w-0 break-words">
                      {formatContentDate(item.publishedAt)}
                    </span>
                    <span className="text-lg transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <Pagination
            ariaLabel="Пагинация архива заметок"
            className="mt-10 sm:mt-12"
            currentPage={currentPage}
            totalPages={totalPages}
            getPageHref={(page) => createArchivePageHref(ARCHIVE_BASE_PATH, page)}
          />
        </div>
      </section>
    </main>
  );
}
