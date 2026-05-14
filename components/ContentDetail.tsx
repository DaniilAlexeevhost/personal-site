import Link from "next/link";
import ReactMarkdown from "react-markdown";
import EditorialProse from "@/components/EditorialProse";
import { formatContentDate } from "@/data/content";
import type { CaseStudy, ResearchNote } from "@/data/types";

type DetailItem = CaseStudy | ResearchNote;

type ContentDetailProps = {
  item: DetailItem;
  backHref: string;
  backLabel: string;
};

export default function ContentDetail({
  item,
  backHref,
  backLabel,
}: ContentDetailProps) {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <div className="border-b border-zinc-200/70 bg-white/95 backdrop-blur-xl sm:sticky sm:top-20 sm:z-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-3.5 sm:py-4 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.7rem] uppercase tracking-[0.16em] sm:text-xs sm:tracking-[0.22em] text-zinc-500">
            <span>{item.category}</span>
            <span>•</span>
            <span>{item.tags[0]}</span>
          </div>

          <Link
            href={backHref}
            className="text-sm leading-6 text-zinc-500 transition hover:text-zinc-950"
          >
            ← {backLabel}
          </Link>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-10 sm:pt-20 md:pt-24 pb-14 sm:pb-28">
        <header className="max-w-[52rem]">
          <div className="mb-6 sm:mb-7 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-sm leading-6 text-zinc-500">
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
            <span className="text-zinc-400">
              {formatContentDate(item.publishedAt)}
            </span>
            <span className="text-zinc-300">•</span>
            <span className="text-zinc-400">
              {item.readingTime} мин чтения
            </span>
          </div>

          <h1 className="text-[2.15rem] sm:text-5xl md:text-[3.55rem] font-semibold tracking-tight leading-[1.1] sm:leading-[1.08] text-zinc-950 mb-6 sm:mb-8">
            {item.title}
          </h1>

          <p className="text-[1.05rem] sm:text-xl md:text-[1.42rem] leading-8 md:leading-9 text-zinc-600 max-w-[46rem]">
            {item.description}
          </p>
        </header>

        <article className="mx-auto mt-10 sm:mt-14 md:mt-16 max-w-[50rem] text-zinc-900">
          <EditorialProse>
            <ReactMarkdown>{item.content}</ReactMarkdown>
          </EditorialProse>
        </article>
      </section>
    </main>
  );
}
