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
        <header className="fixed top-0 left-0 w-full z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            <div className="flex min-h-20 flex-col justify-center gap-2.5 py-3 sm:h-20 sm:min-h-0 sm:flex-row sm:items-center sm:gap-6 sm:py-0">
              <Link
                href="/"
                className="shrink-0 text-lg sm:text-xl font-bold tracking-tight leading-6"
              >
                Daniil Alexeev
              </Link>

              <nav className="-mx-5 flex min-w-0 items-center gap-1 overflow-x-auto whitespace-nowrap px-5 pb-1 text-sm font-medium text-zinc-600 [scrollbar-width:none] sm:mx-0 sm:ml-auto sm:gap-8 sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
                <Link
                  href="/"
                  className="rounded-full px-2.5 py-1.5 hover:text-black transition-colors sm:rounded-none sm:px-0 sm:py-0"
                >
                  Главная
                </Link>

                <Link
                  href="/articles"
                  className="rounded-full px-2.5 py-1.5 hover:text-black transition-colors sm:rounded-none sm:px-0 sm:py-0"
                >
                  Статьи
                </Link>

                <Link
                  href="/cases"
                  className="rounded-full px-2.5 py-1.5 hover:text-black transition-colors sm:rounded-none sm:px-0 sm:py-0"
                >
                  Кейсы
                </Link>

                <Link
                  href="/research"
                  className="rounded-full px-2.5 py-1.5 hover:text-black transition-colors sm:rounded-none sm:px-0 sm:py-0"
                >
                  Исследования
                </Link>

                <Link
                  href="/notes"
                  className="rounded-full px-2.5 py-1.5 hover:text-black transition-colors sm:rounded-none sm:px-0 sm:py-0"
                >
                  Заметки
                </Link>

                <Link
                  href="/about"
                  className="rounded-full px-2.5 py-1.5 hover:text-black transition-colors sm:rounded-none sm:px-0 sm:py-0"
                >
                  О проекте
                </Link>

                <Link
                  href="/contacts"
                  className="rounded-full px-2.5 py-1.5 hover:text-black transition-colors sm:rounded-none sm:px-0 sm:py-0"
                >
                  Контакты
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {children}

        <footer className="border-t border-zinc-200 bg-white py-9 sm:py-12">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm leading-6 text-zinc-500">
              © 2026 Daniil Alexeev
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm leading-6 text-zinc-500 sm:gap-x-6">
              <Link href="/rss.xml">RSS</Link>
              <Link href="/contacts">Email</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
