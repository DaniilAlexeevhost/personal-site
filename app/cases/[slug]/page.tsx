import { notFound } from "next/navigation";
import ContentDetail from "@/components/ContentDetail";
import { getCaseBySlug, getPublishedCases } from "@/data/cases-content";
import { createContentMetadata } from "@/lib/seo";
import type { Metadata } from "next";

type CasePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublishedCases().map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getCaseBySlug(slug);

  if (!item) {
    return {
      title: "Кейс не найден",
    };
  }

  return createContentMetadata(item);
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const item = getCaseBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <ContentDetail item={item} backHref="/cases" backLabel="Все кейсы" />
  );
}
