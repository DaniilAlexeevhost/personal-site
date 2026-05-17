import Link from "next/link";
import { createTagRoute, formatContentDate } from "@/data/content";
import { getAllContentItems } from "@/lib/content";
import { createPageMetadata, siteConfig } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  pathname: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  const latestContent = getAllContentItems().slice(0, 6);
  const sections = [
    {
      title: "Статьи",
      description:
        "Мысли, разборы и наблюдения о продуктах, идеях, цифровых системах и всём, что помогает лучше понимать создание полезных продуктов.",
      href: "/articles",
    },
    {
      title: "Кейсы",
      description:
        "Практические ситуации, решения, гипотезы и выводы из проектов, рабочих процессов и опыта, который постепенно помогает лучше понимать продукты и людей.",
      href: "/cases",
    },
    {
      title: "Исследования",
      description:
        "Исследования, идеи и гипотезы вокруг продуктов, поведения пользователей, AI и цифровых моделей, которые кажутся интересными для изучения и развития.",
      href: "/research",
    },
    {
      title: "Заметки",
      description:
        "Короткие мысли, идеи и наблюдения, которые появляются по мере обучения, работы и повседневных размышлений.",
      href: "/notes",
    },
  ];

  return (
    <main className="min-h-screen bg-white pt-16 text-zinc-950">
      <div className="mx-auto max-w-6xl">
        <section className="px-5 pt-2 pb-2 text-center sm:px-6 sm:pt-3 sm:pb-3 lg:pt-4">
          <div className="mx-auto max-w-[58rem]">
            <h1 className="font-semibold text-[1.32rem] leading-[1.18] tracking-tight sm:text-[1.55rem] md:whitespace-nowrap md:text-[1.68rem] lg:text-[1.78rem]">
              Исследую, разбираю и учусь строить хорошие продукты
            </h1>

            <p className="mx-auto mt-1 max-w-[38rem] text-[1.12rem] leading-7 text-zinc-600 sm:text-[1.28rem] sm:leading-8">
              Пишу о продуктах, идеях, исследованиях и цифровых проектах
            </p>
          </div>
        </section>

        <section className="border-t border-zinc-100 bg-white px-5 py-7 sm:px-6 sm:py-10 lg:py-12">
          <div className="mb-6 text-center sm:mb-8">
            <h2 className="text-[1.45rem] font-semibold leading-tight tracking-tight text-zinc-950 sm:text-[1.75rem]">
              Новые материалы
            </h2>
          </div>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {latestContent.map((item) => (
              <article
                key={`${item.section}-${item.slug}`}
                className="group relative flex min-h-[15rem] cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-zinc-100 bg-zinc-50/70 p-5 transition duration-300 hover:border-zinc-200 hover:bg-white sm:min-h-[16rem] sm:p-6"
              >
                <Link
                  href={item.route}
                  aria-label={item.title}
                  className="absolute inset-0 rounded-[2rem] outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
                />

                <div className="relative z-10 mb-5 flex flex-wrap gap-2 text-xs leading-5 text-zinc-500 sm:mb-6">
                  <Link
                    href={createTagRoute(item.category)}
                    className="rounded-full border border-zinc-200/70 bg-white/75 px-3 py-1 leading-5 transition hover:border-zinc-300 hover:bg-white hover:text-zinc-950"
                  >
                      {item.category}
                  </Link>
                  {item.tags.slice(0, 1).map((tag) => (
                    <Link
                      key={tag}
                      href={createTagRoute(tag)}
                      className="rounded-full border border-zinc-200/70 bg-white/75 px-3 py-1 leading-5 transition hover:border-zinc-300 hover:bg-white hover:text-zinc-950"
                    >
                        {tag}
                    </Link>
                  ))}
                </div>

                <h3 className="pointer-events-none relative z-10 mb-3.5 text-[1.35rem] font-semibold leading-snug tracking-tight text-zinc-950 transition-colors group-hover:text-zinc-800 sm:text-[1.45rem]">
                  {item.title}
                </h3>

                <p className="pointer-events-none relative z-10 mb-8 text-[0.98rem] leading-7 text-zinc-600">
                  {item.description}
                </p>

                <div className="pointer-events-none relative z-10 mt-auto flex flex-wrap items-center justify-between gap-3 pt-5 text-xs leading-5 text-zinc-500">
                  <span>{formatContentDate(item.publishedAt)}</span>

                  <span className="text-lg transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex justify-center sm:mt-13">
            <Link
              href="/articles"
              className="inline-flex items-center rounded-full px-3 py-1.5 text-xl font-semibold leading-8 tracking-tight text-zinc-800 underline decoration-zinc-300 underline-offset-6 transition hover:bg-zinc-50 hover:text-zinc-950 hover:decoration-zinc-600 hover:opacity-90 focus-visible:bg-zinc-50 focus-visible:text-zinc-950 sm:text-2xl"
            >
              📰 Смотреть все статьи
            </Link>
          </div>
        </section>

        <section className="border-t border-zinc-100 bg-zinc-50/70 px-5 py-9 sm:px-6 sm:py-12 lg:py-14">
          <div className="grid gap-7 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-10">
            <div className="rounded-[2rem] bg-white p-5 sm:p-7">
              <p className="mb-3 text-sm font-semibold leading-6 text-zinc-500">
                О сайте
              </p>
              <h2 className="text-[1.55rem] font-semibold leading-tight tracking-tight text-zinc-950 sm:text-3xl">
                Место, где я собираю и делюсь мыслями о цифровых продуктах
              </h2>
              <div className="mt-5 space-y-4 text-base leading-8 text-zinc-600">
                <p>
                  Я изучаю продакт менеджмент, цифровые продукты и то, как люди
                  взаимодействуют с интерфейсами, идеями и технологиями.
                </p>
                <p>
                  Здесь я собираю мысли, исследования, кейсы, гипотезы и
                  заметки по мере того, как учусь, работаю и расту в этой
                  сфере.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {sections.map((section) => (
                <Link
                  key={section.title}
                  href={section.href}
                  className="group rounded-[1.5rem] border border-zinc-200/70 bg-white p-5 outline-none transition-colors hover:border-zinc-300 focus-visible:border-zinc-400"
                >
                  <h3 className="mb-2.5 text-lg font-semibold leading-snug tracking-tight text-zinc-950">
                    {section.title}
                  </h3>
                  <p className="text-sm leading-6 text-zinc-600">
                    {section.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
