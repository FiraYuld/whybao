"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/lib/product-utils";
import { brands } from "@/data/brands";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(
    product?.colors[0]?.name ?? ""
  );
  const [imageIndex, setImageIndex] = useState(0);

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const inWishlist = useWishlistStore((s) => s.has(slug));

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

  const handleAddToCart = () => {
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
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/shop"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Каталог
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.images[imageIndex]}
              alt={product.name}
              fill
              unoptimized
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setImageIndex(i)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
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

        <div>
          <p className="text-sm text-muted-foreground">{brandName}</p>
          <h1 className="mt-1 font-accent text-2xl font-bold md:text-3xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-bold text-primary">
            {product.price.toLocaleString("ru-RU")} ₽
          </p>

          {product.sizes.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium">Размер</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`rounded-md border px-4 py-2 text-sm transition-colors ${
                      selectedSize === s
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input hover:bg-muted"
                    }`}
                  >
                    {s}
                  </button>
                ))}
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
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 size-5" />
              В корзину
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => toggleWishlist(slug)}
              className={inWishlist ? "border-primary bg-primary/10" : ""}
            >
              <Heart
                className={`size-5 ${inWishlist ? "fill-current" : ""}`}
              />
            </Button>
          </div>

          <div className="mt-8 border-t pt-8">
            <h3 className="font-medium">Описание</h3>
            <p className="mt-2 text-muted-foreground">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
