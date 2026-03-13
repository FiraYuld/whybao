"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Heart, ShoppingCart, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/lib/product-utils";
import { brands } from "@/data/brands";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { AnimatePresence, motion } from "framer-motion";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(
    product?.colors[0]?.name ?? ""
  );
  const [imageIndex, setImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadedLongIndexes, setLoadedLongIndexes] = useState<Set<number>>(new Set());
  const [showScrollTop, setShowScrollTop] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const inWishlist = useWishlistStore((s) => s.has(slug));

  const unavailableSizes =
    product?.outOfStock?.find((o) => o.color === selectedColor)?.sizes ?? [];

  useEffect(() => {
    if (!product) return;
    const unavailable =
      product.outOfStock?.find((o) => o.color === selectedColor)?.sizes ?? [];
    if (unavailable.includes(selectedSize)) {
      const firstAvailable = product.sizes.find((s) => !unavailable.includes(s));
      setSelectedSize(firstAvailable ?? product.sizes[0] ?? "");
    }
  }, [product, selectedColor]);

  useEffect(() => {
    if (!product || product.images.length <= 1) return;
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % product.images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [product]);

  // Сбрасываем «загружено» при смене слайда, чтобы показать скелетон
  useEffect(() => {
    setImageLoaded(false);
  }, [imageIndex]);

  // Предзагрузка следующего и предыдущего фото для плавного автоскролла
  useEffect(() => {
    if (!product?.images?.length) return;
    const n = product.images.length;
    const nextSrc = product.images[(imageIndex + 1) % n];
    const prevSrc = product.images[(imageIndex - 1 + n) % n];
    const preload = (src: string) => {
      if (typeof window === "undefined") return;
      const img = new window.Image();
      img.src = src;
    };
    preload(nextSrc);
    if (n > 1) preload(prevSrc);
  }, [product, imageIndex]);

  // Предзагрузка первых longImages при открытии страницы
  useEffect(() => {
    if (!product?.longImages?.length || typeof window === "undefined") return;
    product.longImages.slice(0, 4).forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [product?.longImages]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Товар не найден</h1>
        <Link href="/shop" className="mt-4 inline-block text-primary hover:underline">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  const brandName = brands.find((b) => b.slug === product.brand)?.name ?? product.brand;

  const canAddToCart = !unavailableSizes.includes(selectedSize);

  const handleAddToCart = () => {
    if (!canAddToCart) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
    });
  };

  return (
    <div className="min-w-0 w-full max-w-full overflow-x-hidden">
      <div className="container mx-auto px-4 py-8 w-full max-w-full">
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/shop", label: "Каталог" },
          { href: `/brands/${product.brand}`, label: brandName },
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid min-w-0 gap-8 lg:grid-cols-2">
        <div className="min-w-0 space-y-4 md:max-w-xl md:mx-auto">
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
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onLoad={() => setImageLoaded(true)}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setImageIndex(i)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden border-2 transition-colors ${
                  imageIndex === i ? "border-primary" : "border-transparent"
                }`}
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="min-w-0 md:max-w-xl md:mx-auto">
          <Link
            href={`/brands/${product.brand}`}
            className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground"
          >
            <span>{brandName}</span>
            <span className="text-[10px]">&gt;</span>
          </Link>
          <h1 className="mt-1 font-accent text-2xl font-bold md:text-3xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-bold text-primary">
            {product.price.toLocaleString("ru-RU")} ₽
          </p>

          {product.sizes.some((s) =>
            ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"].includes(s.toUpperCase())
          ) && (
            <div className="mt-6">
              <h3 className="text-sm font-medium">Размер</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes
                  .filter((s) =>
                    ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"].includes(
                      s.toUpperCase()
                    )
                  )
                  .map((s) => {
                    const outOfStock = unavailableSizes.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        disabled={outOfStock}
                        onClick={() => !outOfStock && setSelectedSize(s)}
                        className={`rounded-md border px-4 py-2 text-sm transition-colors ${
                          outOfStock
                            ? "cursor-not-allowed border-input bg-muted text-muted-foreground opacity-60"
                            : selectedSize === s
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-input hover:bg-muted"
                        }`}
                        title={outOfStock ? "Нет в наличии" : undefined}
                      >
                        {s}
                        {outOfStock && (
                          <span className="ml-1 text-[10px]">(нет)</span>
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>
          )}

          {product.colors.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium">Цвет</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors ${
                      selectedColor === c.name
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-input hover:bg-muted"
                    }`}
                  >
                    <span
                      className="size-4 rounded-full border"
                      style={{ backgroundColor: c.hex }}
                    />
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            <Button
              size="lg"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={!canAddToCart}
            >
              <ShoppingCart className="mr-2 size-5" />
              {canAddToCart ? "В корзину" : "Выберите размер"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => toggleWishlist(slug)}
              className={inWishlist ? "flex-1 border-primary bg-primary/10" : "flex-1"}
            >
              <Heart
                className={`size-5 ${inWishlist ? "fill-current" : ""}`}
              />
            </Button>
          </div>

          <div className="mt-8 border-t pt-8">
            <h3 className="font-medium">Описание</h3>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground md:text-base md:leading-relaxed">
              {product.description}
            </p>
          </div>

          {product.longImages && product.longImages.length > 0 && (
            <div className="mt-8 w-full max-w-full space-y-0 md:max-w-2xl md:mx-auto">
              {product.longImages.map((src, i) => (
                <div key={i} className="relative w-full max-w-full overflow-hidden min-h-[200px]">
                  {!loadedLongIndexes.has(i) && (
                    <div
                      className="absolute inset-0 min-h-[200px] animate-pulse bg-muted-foreground/10"
                      aria-hidden
                    />
                  )}
                  <Image
                    src={src}
                    alt={`${product.name} детальное фото ${i + 1}`}
                    width={800}
                    height={1200}
                    unoptimized
                    className="h-auto max-w-full w-full object-cover"
                    onLoad={() =>
                      setLoadedLongIndexes((prev) => new Set(prev).add(i))
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showScrollTop && (
        <button
          type="button"
          onClick={handleScrollTop}
          className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-background/95 text-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-muted"
          aria-label="Наверх"
        >
          <ArrowUp className="size-5" />
        </button>
      )}
      </div>
    </div>
  );
}
