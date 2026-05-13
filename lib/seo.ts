import type { Metadata } from "next";
import type { ContentItem } from "@/data/types";

function getSiteUrl() {
  const configuredUrl =
    process.env.SITE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    "https://daniilalexeev.com";

  if (configuredUrl.startsWith("http://") || configuredUrl.startsWith("https://")) {
    return configuredUrl;
  }

  return `https://${configuredUrl}`;
}

export const siteConfig = {
  name: "Daniil Alexeev",
  url: getSiteUrl(),
  description:
    "Product, growth, UX и digital исследования от Daniil Alexeev.",
  locale: "ru_RU",
};

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, siteConfig.url).toString();
}

export function createPageMetadata({
  title,
  description = siteConfig.description,
  pathname = "/",
  type = "website",
  image,
}: {
  title: string;
  description?: string;
  pathname?: string;
  type?: "website" | "article";
  image?: string;
}): Metadata {
  const url = absoluteUrl(pathname);
  const ogImage = image ? absoluteUrl(image) : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export function createContentMetadata(item: ContentItem): Metadata {
  return createPageMetadata({
    title: item.seo?.title ?? item.title,
    description: item.seo?.description ?? item.description,
    pathname: item.route,
    type: item.section === "articles" ? "article" : "website",
    image: item.seo?.image,
  });
}

export function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
