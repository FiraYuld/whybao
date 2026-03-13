"use client";

import { useMemo } from "react";
import { ProductCard } from "@/components/catalog/product-card";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { getProductBySlug } from "@/lib/product-utils";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const products = useMemo(
    () => items.map((slug) => getProductBySlug(slug)).filter(Boolean),
    [items]
  );

  if (products.length === 0) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16">
        <h1 className="text-2xl font-bold">Избранное пусто</h1>
        <p className="mt-2 text-muted-foreground">
          Добавьте товары из каталога в избранное
        </p>
        <a
          href="/shop"
          className="mt-6 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          В каталог
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 font-accent text-2xl font-bold">Избранное</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard key={p!.id} product={p!} index={i} />
        ))}
      </div>
    </div>
  );
}
