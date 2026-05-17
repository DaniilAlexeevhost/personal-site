import Link from "next/link";

type PaginationProps = {
  ariaLabel: string;
  currentPage: number;
  totalPages: number;
  getPageHref: (page: number) => string;
  className?: string;
};

function getPaginationRange(currentPage: number, totalPages: number) {
  const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
  const orderedPages = Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((first, second) => first - second);

  return orderedPages.reduce<(number | "ellipsis")[]>((range, page, index) => {
    const previousPage = orderedPages[index - 1];

    if (previousPage && page - previousPage > 1) {
      range.push("ellipsis");
    }

    range.push(page);
    return range;
  }, []);
}

export default function Pagination({
  ariaLabel,
  className = "",
  currentPage,
  getPageHref,
  totalPages,
}: PaginationProps) {
  const safeTotalPages = Math.max(1, totalPages);
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), safeTotalPages);
  const paginationRange = getPaginationRange(safeCurrentPage, safeTotalPages);

  return (
    <nav
      aria-label={ariaLabel}
      className={`flex flex-col items-center justify-between gap-4 border-t border-zinc-200/80 pt-6 text-sm font-medium leading-6 text-zinc-600 sm:flex-row ${className}`}
    >
      {safeCurrentPage > 1 ? (
        <Link
          href={getPageHref(safeCurrentPage - 1)}
          className="rounded-full px-3 py-1.5 transition hover:bg-white hover:text-zinc-950 hover:opacity-90 focus-visible:bg-white focus-visible:text-zinc-950"
        >
          ← Назад
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="cursor-not-allowed rounded-full px-3 py-1.5 text-zinc-400"
        >
          ← Назад
        </span>
      )}

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {paginationRange.map((page, index) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 py-1.5 text-zinc-400"
            >
              ...
            </span>
          ) : (
            <Link
              key={page}
              href={getPageHref(page)}
              aria-current={page === safeCurrentPage ? "page" : undefined}
              className={`rounded-full px-3 py-1.5 transition ${
                page === safeCurrentPage
                  ? "bg-white text-zinc-950 shadow-[0_1px_0_rgba(39,39,42,0.06)]"
                  : "hover:bg-white hover:text-zinc-950 hover:opacity-90 focus-visible:bg-white focus-visible:text-zinc-950"
              }`}
            >
              {page}
            </Link>
          ),
        )}
      </div>

      {safeCurrentPage < safeTotalPages ? (
        <Link
          href={getPageHref(safeCurrentPage + 1)}
          className="rounded-full px-3 py-1.5 transition hover:bg-white hover:text-zinc-950 hover:opacity-90 focus-visible:bg-white focus-visible:text-zinc-950"
        >
          Вперед →
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="cursor-not-allowed rounded-full px-3 py-1.5 text-zinc-400"
        >
          Вперед →
        </span>
      )}
    </nav>
  );
}
