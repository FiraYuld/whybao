import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/catalog/product-card";
import { brands } from "@/data/brands";
import { getProductsByBrand } from "@/lib/product-utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const brand = brands.find((b) => b.slug === slug);
  if (!brand) notFound();

  const products = getProductsByBrand(slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/shop"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Каталог
        </Link>
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
