"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/lib/store/cart-store";
import { ShoppingBag, Trash2 } from "lucide-react";

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);

  useEffect(() => setMounted(true), []);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const totalItems = useCartStore((s) => s.totalItems());
  const totalPrice = useCartStore((s) => s.totalPrice());

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="relative p-2 text-foreground hover:text-primary"
        aria-label="Корзина"
      >
        <ShoppingBag className="size-5" />
        {mounted && totalItems > 0 && (
          <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-full max-w-sm flex-col p-0"
      >
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="border-b p-4">
            <h2 className="font-accent text-lg font-bold">Корзина</h2>
            <p className="text-sm text-muted-foreground">
              {totalItems} {totalItems === 1 ? "товар" : totalItems < 5 ? "товара" : "товаров"}
            </p>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center gap-4 py-8">
                <p className="text-center text-muted-foreground">Корзина пуста</p>
                <Link
                  href="/shop"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 items-center justify-center bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  В каталог
                </Link>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={`${item.productId}-${item.size}-${item.color}`}
                    className="flex gap-3"
                  >
                    <div className="relative size-16 shrink-0 overflow-hidden bg-muted">
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
                        onClick={() => setOpen(false)}
                        className="line-clamp-2 text-sm font-medium hover:underline"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {item.color ? `${item.size}, ${item.color}` : item.size}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
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
                          className="h-6 w-12 rounded border border-input bg-background text-xs"
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
                    <div className="shrink-0 text-sm font-bold">
                      {(item.price * item.quantity).toLocaleString("ru-RU")} ₽
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="border-t p-4">
            <div className="mb-3 flex justify-between text-sm">
              <span>Итого</span>
              <span className="font-bold">
                {totalPrice.toLocaleString("ru-RU")} ₽
              </span>
            </div>
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center rounded-lg bg-primary py-2 font-medium text-primary-foreground hover:bg-primary/90"
            >
              Перейти в корзину
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
