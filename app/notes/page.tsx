import ContentGrid from "@/components/ContentGrid";
import EditorialScope from "@/components/EditorialScope";
import SectionHero from "@/components/SectionHero";
import { notes } from "@/data/notes";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: "Заметки",
  description:
    "Короткие мысли, наблюдения, цитаты и фрагменты идей, которые появляются по мере обучения, работы и повседневных размышлений.",
  pathname: "/notes",
});

export default function NotesPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SectionHero
        eyebrow="Notes"
        title="Заметки"
        description="Короткие мысли, наблюдения, цитаты и фрагменты идей, которые появляются по мере обучения, работы и повседневных размышлений."
      />

      <EditorialScope
        items={[
          "Наблюдения, которые еще не стали статьями.",
          "Инсайты из книг, работы и разговоров.",
          "Короткие формулировки для будущих исследований.",
          "Фрагменты обучения, практики и личного product journal.",
        ]}
      />

      <ContentGrid
        eyebrow="Все заметки"
        title="Короткие мысли и фрагменты"
        description="Короткие мысли, наблюдения, цитаты и фрагменты идей, которые появляются по мере обучения, работы и повседневных размышлений."
        items={notes}
        compact
      />
    </main>
  );
}
