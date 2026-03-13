"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import type { Product } from "@/data/products";
import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onQuickAdd?: (product: Product) => void;
  index?: number;
}

export function ProductCard({ product, onQuickAdd, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const inWishlist = useWishlistStore((s) => s.has(product.slug));

  const brandName = brands.find((b) => b.slug === product.brand)?.name ?? product.brand;
  const categoryName =
    categories.find((c) => c.slug === product.category)?.name ?? product.category;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    const size = product.sizes[0];
    const color = product.colors[0]?.name ?? "Чёрный";
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size,
      color,
    });
    onQuickAdd?.(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.slug);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            unoptimized
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
          <button
            type="button"
            onClick={handleWishlist}
            className={cn(
              "absolute right-2 top-2 p-2 transition-colors",
              inWishlist
                ? "text-primary"
                : "text-foreground/80 hover:text-foreground"
            )}
            aria-label={inWishlist ? "Удалить из избранного" : "В избранное"}
          >
            <Heart
              className={cn("size-4", inWishlist && "fill-current")}
            />
          </button>
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-background/95 p-2 transition-transform duration-300 group-hover:translate-y-0">
            <Button
              size="sm"
              className="w-full"
              onClick={handleQuickAdd}
            >
              <ShoppingCart className="mr-1 size-4" />
              В корзину
            </Button>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <p className="font-accent text-lg font-bold text-primary">
            {product.price.toLocaleString("ru-RU")} ₽
          </p>
          <p className="text-sm font-semibold">{brandName}</p>
          <p className="text-xs text-muted-foreground">{categoryName}</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span>Размеры:</span>
            {product.sizes.slice(0, 6).map((s) => (
              <span key={s} className="text-foreground/80">
                {s}
              </span>
            ))}
            {product.sizes.length > 6 && <span>…</span>}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
