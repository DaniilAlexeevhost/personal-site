"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigationItems = [
  { href: "/", label: "🏠 Главная" },
  { href: "/articles", label: "📰 Статьи" },
  { href: "/research", label: "🔎 Исследования" },
  { href: "/notes", label: "📝 Заметки" },
  { href: "/about", label: "👤 О проекте" },
  { href: "/contacts", label: "📬 Контакты" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function MobileHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex min-h-16 items-center justify-between py-2.5 sm:hidden">
      <Link
        href="/"
        className="rounded-full px-2.5 py-1.5 text-sm font-semibold leading-6 text-zinc-800 outline-none transition active:bg-zinc-100/80 active:text-zinc-950 focus-visible:bg-zinc-100/80 focus-visible:text-zinc-950"
      >
        🏠 Главная
      </Link>

      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200/80 bg-white text-zinc-700 outline-none transition active:bg-zinc-100/80 active:text-zinc-950 focus-visible:border-zinc-400 focus-visible:text-zinc-950"
      >
        <span className="sr-only">Открыть навигацию</span>
        <span className="flex flex-col gap-1">
          <span className="h-px w-4 bg-current" />
          <span className="h-px w-4 bg-current" />
        </span>
      </button>

      {isOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Мобильная навигация"
          className="absolute left-0 right-0 top-full mt-2 rounded-[24px] border border-zinc-200/80 bg-white p-2 text-sm font-semibold leading-6 text-zinc-700 shadow-[0_18px_52px_rgba(15,23,42,0.08)]"
        >
          {navigationItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center rounded-2xl px-3 py-2.5 outline-none transition active:bg-zinc-100 active:text-zinc-950 focus-visible:bg-zinc-100 focus-visible:text-zinc-950 ${
                  active
                    ? "bg-zinc-50 text-zinc-950"
                    : "text-zinc-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
