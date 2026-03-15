import type { Metadata } from "next";
import { getProductBySlug, getAllProductSlugs } from "@/lib/product-utils";
import { brands } from "@/data/brands";

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: "Товар не найден - WhyBao" };
  }
  const brandName = brands.find((b) => b.slug === product.brand)?.name ?? product.brand;
  const title = `${product.name} - ${brandName} | WhyBao`;
  const description =
    product.description.slice(0, 155).replace(/\n/g, " ").trim() + (product.description.length > 155 ? "…" : "");
  const ogImage = product.images[0]
    ? { url: product.images[0], width: 1200, height: 1600, alt: product.name }
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      ...(ogImage && { images: [ogImage] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage.url] }),
    },
  };
}

export default function ProductLayout({ children }: Props) {
  return <>{children}</>;
}
