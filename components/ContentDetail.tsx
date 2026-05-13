import Link from "next/link";
import ReactMarkdown from "react-markdown";
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
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-3 sm:py-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] sm:tracking-[0.28em] text-zinc-500">
            <span>{item.category}</span>
            <span>•</span>
            <span>{item.tags[0]}</span>
          </div>

          <Link
            href={backHref}
            className="text-sm text-zinc-500 transition hover:text-zinc-950"
          >
            ← {backLabel}
          </Link>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-12 sm:pt-20 md:pt-24 pb-20 sm:pb-28">
        <header className="max-w-3xl">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
            <span className="rounded-full border border-zinc-200 px-3 py-1">
              {item.category}
            </span>
            {item.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-200 px-3 py-1"
              >
                {tag}
              </span>
            ))}
            <span className="text-zinc-400">
              {formatContentDate(item.publishedAt)}
            </span>
          </div>

          <h1 className="text-[2.35rem] sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.08] text-zinc-950 mb-6 sm:mb-8">
            {item.title}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl leading-8 md:leading-9 text-zinc-600 max-w-2xl">
            {item.description}
          </p>
        </header>

        <article className="mx-auto mt-12 sm:mt-16 md:mt-20 max-w-3xl text-zinc-900">
          <div className="prose prose-zinc prose-base sm:prose-lg max-w-none prose-headings:text-zinc-950 prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-zinc-700 prose-p:leading-8 prose-a:text-zinc-950 prose-a:underline-offset-4 prose-a:decoration-zinc-300 prose-a:transition prose-a:hover:decoration-zinc-500 prose-pre:overflow-x-auto prose-pre:rounded-2xl prose-pre:bg-zinc-950 prose-pre:p-5 prose-code:break-words prose-code:text-sm prose-blockquote:border-l-4 prose-blockquote:border-zinc-200 prose-blockquote:bg-zinc-50 prose-blockquote:px-5 sm:prose-blockquote:px-6 prose-blockquote:py-3 prose-blockquote:text-zinc-700 prose-blockquote:italic prose-li:my-2 prose-strong:text-zinc-950">
            <ReactMarkdown>{item.content}</ReactMarkdown>
          </div>
        </article>
      </section>
    </main>
  );
}
