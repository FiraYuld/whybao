"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
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
  const letterSizes = product.sizes
    .map((s) => s.toUpperCase())
    .filter((s) => ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"].includes(s));

  const [imageIndex, setImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (product.images.length <= 1) return;
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % product.images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [product.images.length]);

  useEffect(() => {
    setImageLoaded(false);
  }, [imageIndex]);

  // Предзагрузка следующего и предыдущего фото
  useEffect(() => {
    if (product.images.length <= 1 || typeof window === "undefined") return;
    const n = product.images.length;
    const nextSrc = product.images[(imageIndex + 1) % n];
    const prevSrc = product.images[(imageIndex - 1 + n) % n];
    const preload = (src: string) => {
      const img = new window.Image();
      img.src = src;
    };
    preload(nextSrc);
    preload(prevSrc);
  }, [product.images, imageIndex]);

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
          {!imageLoaded && (
            <div
              className="absolute inset-0 animate-pulse bg-muted-foreground/10"
              aria-hidden
            />
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={imageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[imageIndex]}
                alt={product.name}
                fill
                unoptimized
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
                onLoad={() => setImageLoaded(true)}
              />
            </motion.div>
          </AnimatePresence>
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
        <div className="mt-2 space-y-0.5 md:mt-3 md:space-y-1">
          <p className="font-accent text-base font-bold text-primary md:text-lg">
            {product.price.toLocaleString("ru-RU")} ₽
          </p>
          <p className="text-xs font-semibold md:text-sm">{brandName}</p>
          <p className="text-[11px] text-muted-foreground md:text-xs">
            {categoryName}
          </p>
          {letterSizes.length > 0 && (
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-muted-foreground md:text-xs">
              <span className="hidden sm:inline">Размеры:</span>
              {letterSizes.slice(0, 6).map((s) => (
                <span key={s} className="text-foreground/80">
                  {s}
                </span>
              ))}
              {letterSizes.length > 6 && <span>…</span>}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
