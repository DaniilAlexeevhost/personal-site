import Link from "next/link";
import {
  formatContentDate,
  sortByDate,
} from "@/data/content";
import type { ContentItem } from "@/data/types";

type ContentGridProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: ContentItem[];
  hrefPrefix?: string;
  compact?: boolean;
};

export default function ContentGrid({
  eyebrow,
  title,
  description,
  items,
  hrefPrefix,
  compact = false,
}: ContentGridProps) {
  const sortedItems = sortByDate(items).filter(
    (item) => item.status === "published",
  );

  return (
    <section className="bg-zinc-50">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-12 sm:py-20 lg:py-24">
        <div className="max-w-3xl mb-8 sm:mb-12 lg:mb-14">
          <p className="text-xs sm:text-sm uppercase tracking-[0.16em] sm:tracking-[0.26em] text-zinc-500 mb-3">
            {eyebrow}
          </p>
          <h2 className="text-[1.85rem] sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-zinc-950">
            {title}
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-zinc-600">
            {description}
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {sortedItems.map((item) => {
            const card = (
              <article className="flex h-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-200/80 bg-white p-5 sm:p-7 lg:p-8 shadow-[0_18px_56px_rgba(15,23,42,0.05)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_32px_96px_rgba(15,23,42,0.12)]">
                <div className="mb-5 sm:mb-6 flex flex-wrap gap-2 sm:gap-3 text-xs leading-5 sm:text-sm text-zinc-500">
                  <span className="rounded-full border border-zinc-200 px-3 py-1 leading-5">
                    {item.category}
                  </span>
                  {item.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-200 px-3 py-1 leading-5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl lg:text-2xl font-semibold leading-snug tracking-tight text-zinc-950 mb-4 transition-colors group-hover:text-zinc-800">
                  {item.title}
                </h3>

                <p className="text-base leading-7 text-zinc-600 mb-8">
                  {item.description}
                </p>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-400">
                  <span>{formatContentDate(item.publishedAt)}</span>
                  <span className="flex items-center gap-2 text-right">
                    {item.section === "articles" && !compact && (
                      <span>{item.readingTime} мин чтения</span>
                    )}
                    {hrefPrefix && (
                      <span className="text-xl transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    )}
                  </span>
                </div>
              </article>
            );

            if (!hrefPrefix) {
              return (
                <div key={item.id} className="group">
                  {card}
                </div>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.route}
                className="group"
              >
                {card}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
