import { notFound } from "next/navigation";
import ContentDetail from "@/components/ContentDetail";
import {
  getArticleBySlug,
  getPublishedArticles,
} from "@/data/articles";
import { createContentMetadata } from "@/lib/seo";
import type { Metadata } from "next";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublishedArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Статья не найдена",
    };
  }

  return createContentMetadata(article);
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const ArticleContent = article.Component;

  return (
    <ContentDetail item={article} backHref="/articles" backLabel="Все статьи">
      <ArticleContent />
    </ContentDetail>
  );
}
