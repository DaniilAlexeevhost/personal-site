import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { createTagRoute, formatContentDate } from "@/data/content";
import {
  getNoteBySlug,
  getPublishedNotes,
  getRelatedLongFormForNote,
} from "@/lib/content";
import { createContentMetadata } from "@/lib/seo";
import type { Metadata } from "next";

type NotePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublishedNotes().map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getNoteBySlug(slug);

  if (!item) {
    return {
      title: "Заметка не найдена",
    };
  }

  return createContentMetadata(item);
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const item = getNoteBySlug(slug);

  if (!item) {
    notFound();
  }

  const relatedItems = getRelatedLongFormForNote(item, 3);

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="max-w-3xl mx-auto px-5 pt-24 pb-14 sm:px-6 sm:pt-28 sm:pb-20">
        <Link
          href="/notes"
          className="mb-8 inline-flex text-sm font-medium leading-6 text-zinc-500 transition hover:text-zinc-950"
        >
          ← Все заметки
        </Link>

        <header>
          <div className="mb-5 flex flex-wrap items-center gap-2 text-xs leading-5 text-zinc-500">
            <Link
              href={createTagRoute(item.category)}
              className="rounded-full border border-zinc-200 px-3 py-1 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950"
            >
              {item.category}
            </Link>
            {item.tags.slice(0, 2).map((tag) => (
              <Link
                key={tag}
                href={createTagRoute(tag)}
                className="rounded-full border border-zinc-200 px-3 py-1 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950"
              >
                {tag}
              </Link>
            ))}
            <span className="text-zinc-400">
              {formatContentDate(item.publishedAt)}
            </span>
          </div>

          <h1 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-zinc-950 sm:text-[2.15rem]">
            {item.title}
          </h1>

          <p className="mt-4 max-w-[42rem] text-base leading-7 text-zinc-600 sm:text-[1.05rem]">
            {item.description}
          </p>
        </header>

        <article className="mt-9 max-w-[40rem] text-[1.05rem] leading-8 text-zinc-800 [&_p+p]:mt-5">
          <ReactMarkdown>{item.content}</ReactMarkdown>
        </article>
      </section>

      {relatedItems.length > 0 && (
        <section className="border-t border-zinc-200/80 bg-zinc-50">
          <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 sm:py-9 lg:py-10">
            <div className="mx-auto mb-6 max-w-[38rem] text-center sm:mb-7">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                Продолжить изучение
              </p>
              <h2 className="text-[1.45rem] font-semibold leading-tight tracking-tight text-zinc-950 sm:text-[1.8rem]">
                Материалы по теме
              </h2>
            </div>

            <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
              {relatedItems.map((relatedItem) => (
                <article
                  key={relatedItem.route}
                  className="group relative flex h-full cursor-pointer flex-col rounded-[26px] border border-zinc-200/80 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.035)] transition hover:border-zinc-300 hover:shadow-[0_20px_64px_rgba(15,23,42,0.06)] sm:rounded-[30px] sm:p-6"
                >
                  <Link
                    href={relatedItem.route}
                    aria-label={relatedItem.title}
                    className="absolute inset-0 rounded-[26px] outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 sm:rounded-[30px]"
                  />

                  <div className="relative z-10 mb-5 flex flex-wrap gap-2 text-xs leading-5 text-zinc-500">
                    <Link
                      href={createTagRoute(relatedItem.category)}
                      className="rounded-full border border-zinc-200/80 bg-zinc-50/60 px-3 py-1 transition hover:border-zinc-300 hover:bg-white hover:text-zinc-950"
                    >
                      {relatedItem.category}
                    </Link>
                    {relatedItem.tags[0] ? (
                      <Link
                        href={createTagRoute(relatedItem.tags[0])}
                        className="rounded-full border border-zinc-200/80 bg-zinc-50/60 px-3 py-1 transition hover:border-zinc-300 hover:bg-white hover:text-zinc-950"
                      >
                        {relatedItem.tags[0]}
                      </Link>
                    ) : null}
                  </div>

                  <h3 className="pointer-events-none relative z-10 mb-4 text-xl font-semibold leading-snug tracking-tight text-zinc-950 transition-colors group-hover:text-zinc-700">
                    {relatedItem.title}
                  </h3>

                  <p className="pointer-events-none relative z-10 mb-8 text-base leading-7 text-zinc-600">
                    {relatedItem.description}
                  </p>

                  <div className="pointer-events-none relative z-10 mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-5 text-sm leading-6 text-zinc-400">
                    <span>{formatContentDate(relatedItem.publishedAt)}</span>
                    <span className="text-xl transition group-hover:translate-x-1 group-hover:text-zinc-700">
                      →
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
