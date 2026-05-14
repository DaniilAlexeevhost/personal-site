import type { MetadataRoute } from "next";
import { getAllContentItems } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

const staticRoutes = [
  {
    pathname: "/",
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    pathname: "/articles",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    pathname: "/cases",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    pathname: "/research",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    pathname: "/notes",
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    pathname: "/about",
    changeFrequency: "yearly",
    priority: 0.5,
  },
  {
    pathname: "/contacts",
    changeFrequency: "yearly",
    priority: 0.5,
  },
] satisfies Array<{
  pathname: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}>;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = staticRoutes.map((route) => ({
    url: absoluteUrl(route.pathname),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const content = Array.from(
    new Map(
      getAllContentItems().map((item) => [
        item.route,
        {
          url: absoluteUrl(item.route),
          lastModified: new Date(item.updatedAt ?? item.publishedAt),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        },
      ]),
    ).values(),
  );

  return [...pages, ...content];
}
