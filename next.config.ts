import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.daniilalexeev.com",
          },
        ],
        destination: "https://daniilalexeev.com/:path*",
        permanent: true,
      },
      {
        source: "/research/ai-product-workflows",
        destination: "/research",
        permanent: true,
      },
      {
        source: "/research/decision-quality",
        destination: "/research",
        permanent: true,
      },
      {
        source: "/research/friction-in-products",
        destination: "/research",
        permanent: true,
      },
      {
        source: "/cases",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/cases/retention-growth",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/cases/growth-hypotheses",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/cases/ux-patterns",
        destination: "/articles",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ["remark-frontmatter"],
  },
});

export default withMDX(nextConfig);
