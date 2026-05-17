import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, createPageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...createPageMetadata({
    title: siteConfig.name,
    description: siteConfig.description,
    pathname: "/",
    absoluteTitle: true,
  }),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  alternates: {
    canonical: absoluteUrl("/"),
    types: {
      "application/rss+xml": absoluteUrl("/rss.xml"),
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <header className="fixed top-0 left-0 w-full z-50 border-b border-zinc-200/80 bg-white/95 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            <div className="flex min-h-17 items-center justify-center py-2.5 sm:h-17 sm:min-h-0 sm:py-0">
              <nav className="-mx-5 flex min-w-0 items-center gap-1.5 overflow-x-auto whitespace-nowrap px-5 pb-1 text-[0.84rem] font-semibold leading-6 text-zinc-700 [scrollbar-width:none] sm:mx-0 sm:justify-center sm:gap-2 sm:px-0 sm:pb-0 md:gap-3 [&::-webkit-scrollbar]:hidden">
                <Link
                  href="/"
                  className="rounded-full px-2.5 py-1.5 outline-none transition hover:bg-zinc-100/80 hover:text-zinc-950 hover:opacity-90 focus-visible:bg-zinc-100/80 focus-visible:text-zinc-950"
                >
                  🏠 Главная
                </Link>

                <Link
                  href="/articles"
                  className="rounded-full px-2.5 py-1.5 outline-none transition hover:bg-zinc-100/80 hover:text-zinc-950 hover:opacity-90 focus-visible:bg-zinc-100/80 focus-visible:text-zinc-950"
                >
                  📰 Статьи
                </Link>

                <Link
                  href="/cases"
                  className="rounded-full px-2.5 py-1.5 outline-none transition hover:bg-zinc-100/80 hover:text-zinc-950 hover:opacity-90 focus-visible:bg-zinc-100/80 focus-visible:text-zinc-950"
                >
                  🛠 Кейсы
                </Link>

                <Link
                  href="/research"
                  className="rounded-full px-2.5 py-1.5 outline-none transition hover:bg-zinc-100/80 hover:text-zinc-950 hover:opacity-90 focus-visible:bg-zinc-100/80 focus-visible:text-zinc-950"
                >
                  🔎 Исследования
                </Link>

                <Link
                  href="/notes"
                  className="rounded-full px-2.5 py-1.5 outline-none transition hover:bg-zinc-100/80 hover:text-zinc-950 hover:opacity-90 focus-visible:bg-zinc-100/80 focus-visible:text-zinc-950"
                >
                  📝 Заметки
                </Link>

                <Link
                  href="/about"
                  className="rounded-full px-2.5 py-1.5 outline-none transition hover:bg-zinc-100/80 hover:text-zinc-950 hover:opacity-90 focus-visible:bg-zinc-100/80 focus-visible:text-zinc-950"
                >
                  👤 О проекте
                </Link>

                <Link
                  href="/contacts"
                  className="rounded-full px-2.5 py-1.5 outline-none transition hover:bg-zinc-100/80 hover:text-zinc-950 hover:opacity-90 focus-visible:bg-zinc-100/80 focus-visible:text-zinc-950"
                >
                  📬 Контакты
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {children}

        <footer className="border-t border-zinc-200/80 bg-white py-5 sm:py-6">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 flex flex-col gap-4 text-sm font-semibold leading-6 text-zinc-800 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Daniil Alexeev</p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-7">
              <Link
                href="/contacts"
                className="outline-none transition hover:text-zinc-950 hover:opacity-75 focus-visible:text-zinc-950"
              >
                📩 Email
              </Link>
              <Link
                href="/contacts"
                className="outline-none transition hover:text-zinc-950 hover:opacity-75 focus-visible:text-zinc-950"
              >
                💬 Telegram
              </Link>
              <Link
                href="/privacy"
                className="outline-none transition hover:text-zinc-950 hover:opacity-75 focus-visible:text-zinc-950"
              >
                📄 Политика конфиденциальности
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
