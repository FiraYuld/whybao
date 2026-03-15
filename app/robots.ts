import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://whybao.ru";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/checkout", "/checkout/", "/cart", "/account", "/test"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
