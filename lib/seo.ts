import type { Metadata } from "next";
import type { ContentItem } from "@/data/types";

function getSiteUrl() {
  const configuredUrl =
    process.env.SITE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.URL ??
    process.env.DEPLOY_PRIME_URL ??
    process.env.DEPLOY_URL ??
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
  ogImage: "/favicon.ico",
};

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, siteConfig.url).toString();
}

function createRobots(index: boolean): Metadata["robots"] {
  if (!index) {
    return {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export function createPageMetadata({
  title,
  description = siteConfig.description,
  pathname = "/",
  type = "website",
  image,
  index = true,
  absoluteTitle = false,
}: {
  title: string;
  description?: string;
  pathname?: string;
  type?: "website" | "article";
  image?: string;
  index?: boolean;
  absoluteTitle?: boolean;
}): Metadata {
  const url = absoluteUrl(pathname);
  const ogImage = absoluteUrl(image ?? siteConfig.ogImage);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
    },
    robots: createRobots(index),
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function createContentMetadata(item: ContentItem): Metadata {
  return createPageMetadata({
    title: item.seo.title,
    description: item.seo.description,
    pathname: item.route,
    type: "article",
    image: item.seo.image,
    index: item.status === "published",
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
