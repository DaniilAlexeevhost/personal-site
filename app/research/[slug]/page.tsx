import { notFound } from "next/navigation";
import ContentDetail from "@/components/ContentDetail";
import {
  getPublishedResearch,
  getResearchBySlug,
} from "@/data/research-content";
import { createContentMetadata } from "@/lib/seo";
import type { Metadata } from "next";

type ResearchPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublishedResearch().map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: ResearchPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getResearchBySlug(slug);

  if (!item) {
    return {
      title: "Исследование не найдено",
    };
  }

  return createContentMetadata(item);
}

export default async function ResearchDetailPage({ params }: ResearchPageProps) {
  const { slug } = await params;
  const item = getResearchBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <ContentDetail
      item={item}
      backHref="/research"
      backLabel="Все исследования"
    />
  );
}
