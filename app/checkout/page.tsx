"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TELEGRAM_USERNAME = "FiraYuld";

function generateOrderId() {
  return `WB-${Date.now().toString(36).toUpperCase()}`;
}

function buildTelegramMessage(
  orderId: string,
  items: { name: string; size: string; color: string; price: number; quantity: number }[],
  total: number,
  customer: { name: string; phone: string; address: string; comment: string }
) {
  const lines = [
    "🛒 Заказ " + orderId,
    "",
    "📦 Товары:",
    ...items.map(
      (i) =>
        `• ${i.name} (${i.size}, ${i.color}) — ${i.price.toLocaleString("ru-RU")} ₽ × ${i.quantity}`
    ),
    "",
    "💰 Итого: " + total.toLocaleString("ru-RU") + " ₽",
    "",
    "👤 Клиент:",
    `Имя: ${customer.name}`,
    `Телефон: ${customer.phone}`,
    `Адрес: ${customer.address}`,
    customer.comment ? `Комментарий: ${customer.comment}` : null,
  ].filter(Boolean);

  return lines.join("\n");
}

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const clearCart = useCartStore((s) => s.clearCart);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState<"name" | "phone" | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState("");

  if (items.length === 0) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16">
        <h1 className="text-2xl font-bold">Корзина пуста</h1>
        <Link
          href="/shop"
          className="mt-6 inline-flex h-9 items-center justify-center bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          В каталог
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setErrorField(null);

    if (!name.trim()) {
      setError("Укажите имя");
      setErrorField("name");
      return;
    }
    if (!phone.trim()) {
      setError("Укажите телефон");
      setErrorField("phone");
      return;
    }

    if (isSending) return;
    setIsSending(true);

    const orderId = generateOrderId();
    const message = buildTelegramMessage(
      orderId,
      items.map((i) => ({
        name: i.name,
        size: i.size,
        color: i.color,
        price: i.price,
        quantity: i.quantity,
      })),
      totalPrice,
      { name: name.trim(), phone: phone.trim(), address: address.trim(), comment: comment.trim() }
    );

    const url = `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    setToast("Мы открыли чат в Telegram. Если окно не появилось — проверь вкладки браузера.");
    setTimeout(() => {
      setToast("");
      setIsSending(false);
      clearCart();
      router.push("/checkout/success");
    }, 2000);
  };

  return (
    <div className="container mx-auto max-w-xl px-4 py-8">
      <h1 className="mb-8 font-accent text-2xl font-bold">Оформление заказа</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Имя *
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как к вам обращаться"
            className={`mt-1 ${errorField === "name" ? "border-destructive" : ""}`}
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">
            Телефон *
          </label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
              let formatted = digits;
              if (formatted.startsWith("8")) formatted = "7" + formatted.slice(1);
              if (!formatted.startsWith("7")) formatted = "7" + formatted;
              const parts = [
                formatted.slice(0, 1),
                formatted.slice(1, 4),
                formatted.slice(4, 7),
                formatted.slice(7, 9),
                formatted.slice(9, 11),
              ];
              const view =
                parts[0] && parts[1]
                  ? `+${parts[0]} (${parts[1]}${parts[1].length === 3 ? "" : ""})` +
                    (parts[2] ? ` ${parts[2]}` : "") +
                    (parts[3] ? `-${parts[3]}` : "") +
                    (parts[4] ? `-${parts[4]}` : "")
                  : e.target.value;
              setPhone(view);
            }}
            placeholder="+7 (999) 123-45-67"
            className={`mt-1 ${errorField === "phone" ? "border-destructive" : ""}`}
            required
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Формат: +7 (999) 123-45-67
          </p>
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium">
            Город / Адрес
          </label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Город, улица, дом, квартира"
            className="mt-1"
          />
        </div>
        <div>
          <label htmlFor="comment" className="block text-sm font-medium">
            Комментарий
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Пожелания к заказу"
            className="mt-1 flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            rows={3}
          />
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="font-semibold">
            Итого: {totalPrice.toLocaleString("ru-RU")} ₽
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {items.length} {items.length === 1 ? "товар" : items.length < 5 ? "товара" : "товаров"}
          </p>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSending}>
          {isSending ? "Отправляем..." : "Отправить менеджеру в Telegram"}
        </Button>
      </form>

      <Link
        href="/cart"
        className="mt-6 block text-center text-sm text-muted-foreground hover:text-foreground"
      >
        ← Вернуться в корзину
      </Link>

      {toast && (
        <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
          <div className="max-w-md rounded-md bg-card px-4 py-3 text-sm text-muted-foreground shadow-lg">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
