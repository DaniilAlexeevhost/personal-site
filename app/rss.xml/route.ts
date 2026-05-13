import { getPublishedArticles } from "@/data/articles";
import { absoluteUrl, escapeXml, siteConfig } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const articles = getPublishedArticles();
  const latestDate = articles[0]?.publishedAt ?? new Date().toISOString();

  const items = articles
    .map(
      (article) => `
        <item>
          <title>${escapeXml(article.title)}</title>
          <link>${escapeXml(absoluteUrl(article.route))}</link>
          <guid>${escapeXml(absoluteUrl(article.route))}</guid>
          <description>${escapeXml(article.description)}</description>
          <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
        </item>`,
    )
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(siteConfig.name)}</title>
        <link>${escapeXml(siteConfig.url)}</link>
        <description>${escapeXml(siteConfig.description)}</description>
        <language>ru</language>
        <lastBuildDate>${new Date(latestDate).toUTCString()}</lastBuildDate>
        ${items}
      </channel>
    </rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
