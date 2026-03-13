import type { MetadataRoute } from "next";
import { getAllProductSlugs } from "@/lib/product-utils";
import { brands } from "@/data/brands";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://whybao.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const productSlugs = getAllProductSlugs();
  const productEntries: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${baseUrl}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const brandEntries: MetadataRoute.Sitemap = brands.map((b) => ({
    url: `${baseUrl}/brands/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/cart`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contacts`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...brandEntries,
    ...productEntries,
  ];
}
