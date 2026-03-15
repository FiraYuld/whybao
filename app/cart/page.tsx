"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart-store";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const totalPrice = useCartStore((s) => s.totalPrice());

  if (items.length === 0) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16">
        <h1 className="text-2xl font-bold">Корзина пуста</h1>
        <p className="mt-2 text-muted-foreground">
          Добавьте товары из каталога
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex h-9 items-center justify-center bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          В каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 font-accent text-2xl font-bold">Корзина</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={`${item.productId}-${item.size}-${item.color}`}
                className="flex gap-4 rounded-lg border p-4"
              >
                <div className="relative size-24 shrink-0 overflow-hidden rounded-md bg-muted">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/products/${item.slug}`}
                    className="font-medium hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {item.color ? `${item.size}, ${item.color}` : item.size}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item.productId,
                          item.size,
                          item.color,
                          parseInt(e.target.value, 10)
                        )
                      }
                      className="rounded border border-input bg-background px-2 py-1 text-sm"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() =>
                        removeItem(item.productId, item.size, item.color)
                      }
                      className="text-muted-foreground hover:text-destructive"
                      aria-label="Удалить"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-bold">
                    {(item.price * item.quantity).toLocaleString("ru-RU")} ₽
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.price.toLocaleString("ru-RU")} ₽ / шт
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-lg border bg-card p-6">
            <h2 className="font-semibold">Итого</h2>
            <p className="mt-2 text-2xl font-bold">
              {totalPrice.toLocaleString("ru-RU")} ₽
            </p>
            <Link
              href="/checkout"
              className="mt-4 flex h-10 w-full items-center justify-center rounded-lg bg-primary font-medium text-primary-foreground hover:bg-primary/90"
            >
              Оформить заказ
            </Link>
            <Link
              href="/shop"
              className="mt-4 block text-center text-sm text-muted-foreground hover:text-foreground"
            >
              Продолжить покупки
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
