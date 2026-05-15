import Link from "next/link";
import SectionHero from "@/components/SectionHero";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Контакты",
  description:
    "Контакты Daniil Alexeev для продуктовых проектов, исследований и сотрудничества.",
  pathname: "/contacts",
});

export default function ContactsPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SectionHero
        eyebrow="Contacts"
        title="Контакты"
        description="Для продуктовых проектов, исследований, консультаций и аккуратных разговоров о цифровом опыте."
      />

      <section className="border-t border-zinc-200 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-12 sm:py-20 lg:py-24">
          <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
            <Link
              href="mailto:hello@daniilalexeev.com"
              className="rounded-2xl sm:rounded-3xl border border-zinc-200/80 bg-white p-5 sm:p-7 shadow-[0_12px_40px_rgba(15,23,42,0.035)] outline-none transition hover:border-zinc-300 hover:shadow-[0_20px_64px_rgba(15,23,42,0.06)] focus-visible:border-zinc-400"
            >
              <p className="mb-3 text-sm leading-6 text-zinc-500">Email</p>
              <p className="text-xl font-semibold leading-snug tracking-tight text-zinc-950">
                hello@daniilalexeev.com
              </p>
            </Link>

            <Link
              href="/rss.xml"
              className="rounded-2xl sm:rounded-3xl border border-zinc-200/80 bg-white p-5 sm:p-7 shadow-[0_12px_40px_rgba(15,23,42,0.035)] outline-none transition hover:border-zinc-300 hover:shadow-[0_20px_64px_rgba(15,23,42,0.06)] focus-visible:border-zinc-400"
            >
              <p className="mb-3 text-sm leading-6 text-zinc-500">RSS</p>
              <p className="text-xl font-semibold leading-snug tracking-tight text-zinc-950">
                Следить за новыми статьями
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
