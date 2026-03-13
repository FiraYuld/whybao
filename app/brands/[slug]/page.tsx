import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/catalog/product-card";
import { brands } from "@/data/brands";
import { getProductsByBrand } from "@/lib/product-utils";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const brand = brands.find((b) => b.slug === slug);
  if (!brand) {
    return {
      title: "Бренд не найден — WhyBao",
    };
  }
  return {
    title: `${brand.name} — бренд в WhyBao`,
    description: `Товары бренда ${brand.name} в магазине WhyBao: streetwear и casual с азиатским вайбом.`,
    openGraph: {
      title: `${brand.name} — бренд в WhyBao`,
      description: `Подборка вещей бренда ${brand.name} на WhyBao.`,
      images: ["/og-default.png"],
    },
  };
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const brand = brands.find((b) => b.slug === slug);
  if (!brand) notFound();

  const products = getProductsByBrand(slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/shop", label: "Каталог" },
            { label: brand.name },
          ]}
        />
        <h1 className="mt-2 font-accent text-3xl font-bold">{brand.name}</h1>
        <p className="mt-1 text-muted-foreground">
          {products.length} товаров
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>

      {products.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">
          В этой категории пока нет товаров.
        </p>
      )}
    </div>
  );
}
