import { notFound } from "next/navigation";
import ContentGrid from "@/components/ContentGrid";
import SectionHero from "@/components/SectionHero";
import {
  getPublishedContentByTag,
  getPublishedTags,
  getTagBySlug,
} from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

type TagPageProps = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  return getPublishedTags().map((tag) => ({
    tag: tag.slug,
  }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tag = getTagBySlug(tagSlug);

  if (!tag) {
    return {
      title: "Тег не найден",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return createPageMetadata({
    title: tag.label,
    description: `Материалы по теме ${tag.label}: статьи, кейсы, исследования и заметки.`,
    pathname: tag.route,
    type: "website",
  });
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: tagSlug } = await params;
  const tag = getTagBySlug(tagSlug);

  if (!tag) {
    notFound();
  }

  const items = getPublishedContentByTag(tag.slug);

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SectionHero
        eyebrow="Tag"
        title={tag.label}
        description={`Материалы по теме ${tag.label}: статьи, кейсы, исследования и заметки.`}
      />

      <ContentGrid
        eyebrow="Материалы по тегу"
        title={tag.label}
        description="Связанные опубликованные материалы из разных разделов сайта."
        items={items}
        hrefPrefix="/tags"
      />
    </main>
  );
}
