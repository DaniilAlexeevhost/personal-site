import "./globals.css";
import Link from "next/link";
import Script from "next/script";
import MobileHeader from "@/components/MobileHeader";
import type { Metadata } from "next";
import { absoluteUrl, createPageMetadata, siteConfig } from "@/lib/seo";

const YANDEX_METRICA_ID = 109561554;

const yandexMetricaInit = `
  (function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) {
        return;
      }
    }
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
  })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

  ym(${YANDEX_METRICA_ID}, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true
  });
`;

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
        <Script
          id="yandex-metrica"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: yandexMetricaInit }}
        />

        <noscript>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://mc.yandex.ru/watch/${YANDEX_METRICA_ID}`}
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>

        <header className="fixed top-0 left-0 w-full z-50 border-b border-zinc-200/80 bg-white sm:bg-white/95 sm:backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            <MobileHeader />

            <div className="hidden min-h-17 items-center justify-center py-2.5 sm:flex sm:h-17 sm:min-h-0 sm:py-0">
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

            <div className="flex flex-col items-start gap-y-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
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
