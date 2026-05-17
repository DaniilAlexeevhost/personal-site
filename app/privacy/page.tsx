import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Политика конфиденциальности",
  description:
    "Информация о том, какие данные может получать сайт Daniil Alexeev и как они используются.",
  pathname: "/privacy",
});

const sections = [
  {
    title: "Общая информация",
    paragraphs: [
      "Этот сайт является публичным личным пространством с материалами о product management, цифровых продуктах, исследованиях, кейсах и заметках.",
      "На сайте нет регистрации, личных кабинетов, платежей, комментариев и форм, через которые посетители намеренно передают персональные данные.",
    ],
  },
  {
    title: "Какие данные могут собираться",
    paragraphs: [
      "Сайт не собирает персональные данные пользователей намеренно. При обычном посещении могут обрабатываться базовые технические данные, необходимые для работы сайта: IP-адрес, тип браузера, устройство, язык, время запроса и открытые страницы.",
      "Такие данные обычно используются сервером, хостингом или техническими сервисами для стабильной работы, безопасности и понимания общей посещаемости сайта.",
    ],
  },
  {
    title: "Cookies и аналитика",
    paragraphs: [
      "На сайте могут использоваться технические cookies или базовая аналитика, если они необходимы для корректной работы, измерения посещаемости или улучшения структуры материалов.",
      "Такая аналитика не предназначена для идентификации конкретного человека и используется только в обобщенном виде.",
    ],
  },
  {
    title: "Внешние ссылки",
    paragraphs: [
      "Материалы сайта могут содержать ссылки на внешние ресурсы, сервисы, статьи, инструменты или профили.",
      "Переходя по таким ссылкам, пользователь самостоятельно решает открыть внешний сайт. На внешние ресурсы распространяются их собственные правила и политики конфиденциальности.",
    ],
  },
  {
    title: "Изменения политики",
    paragraphs: [
      "Политика конфиденциальности может обновляться по мере развития сайта, появления новых разделов или изменения технической инфраструктуры.",
      "Актуальная версия всегда публикуется на этой странице.",
    ],
  },
  {
    title: "Контакты",
    paragraphs: [
      "По вопросам, связанным с этой политикой или работой сайта, можно обратиться через страницу контактов.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="max-w-6xl mx-auto px-5 pt-20 pb-7 sm:px-6 sm:pt-22 sm:pb-8">
        <div className="mx-auto max-w-[46rem] text-center">
          <p className="mb-2.5 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-zinc-500 sm:text-xs">
            Правовая информация
          </p>

          <h1 className="mx-auto max-w-[40rem] text-[1.55rem] font-semibold leading-[1.12] tracking-tight text-zinc-950 sm:text-[1.9rem] md:text-[2.15rem]">
            Политика конфиденциальности
          </h1>

          <p className="mx-auto mt-3 max-w-[34rem] text-[0.95rem] leading-7 text-zinc-600 sm:text-[1rem]">
            Информация о том, какие данные может получать сайт и как они
            используются.
          </p>
        </div>
      </section>

      <section className="border-t border-zinc-200/80 bg-white">
        <div className="max-w-6xl mx-auto px-5 py-7 sm:px-6 sm:py-9 lg:py-10">
          <article className="mx-auto max-w-[44rem] space-y-8 text-[1rem] leading-8 text-zinc-600 sm:text-[1.05rem]">
            {sections.map((section) => (
              <section key={section.title} className="space-y-3">
                <h2 className="text-[1.1rem] font-semibold leading-snug tracking-tight text-zinc-950 sm:text-[1.2rem]">
                  {section.title}
                </h2>

                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}

            <p className="pt-2 text-sm leading-6 text-zinc-500">
              Последнее обновление: май 2026
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
