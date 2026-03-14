"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatOrderMessage } from "@/lib/format-order-message";

const TELEGRAM_MANAGER_USERNAME = "whybao_s2m";
const MIN_ORDER_SUM = 5000;

const PROMO_CODES: { code: string; discountPercent: number }[] = [
  { code: "сонный", discountPercent: 5 },
];

function generateOrderId() {
  return `why_${Date.now().toString(36).toLowerCase()}`;
}

function telegramChatUrl(text: string) {
  return `https://t.me/${TELEGRAM_MANAGER_USERNAME}?text=${encodeURIComponent(text)}`;
}

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const clearCart = useCartStore((s) => s.clearCart);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [telegram, setTelegram] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(null);
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState<"name" | "phone" | "telegram" | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState("");

  const discountPercent = appliedPromo?.discountPercent ?? 0;
  const finalTotal = Math.round(totalPrice * (1 - discountPercent / 100));

  const applyPromo = () => {
    const normalized = promoInput.trim().toLowerCase();
    const promo = PROMO_CODES.find((p) => p.code.toLowerCase() === normalized);
    if (promo) {
      setAppliedPromo(promo);
      setError("");
    } else {
      setAppliedPromo(null);
      setError("Промокод не найден");
    }
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setErrorField(null);

    if (finalTotal < MIN_ORDER_SUM) {
      setError(`Минимальная сумма заказа — ${MIN_ORDER_SUM.toLocaleString("ru-RU")} ₽`);
      setErrorField(null);
      return;
    }
    if (!name.trim()) {
      setError("Укажите ФИО");
      setErrorField("name");
      return;
    }
    if (!phone.trim()) {
      setError("Укажите телефон");
      setErrorField("phone");
      return;
    }
    const telegramTrimmed = telegram.replace(/^@/, "").trim();
    if (!telegramTrimmed) {
      setError("Укажите Telegram (ник без @)");
      setErrorField("telegram");
      return;
    }

    if (isSending) return;
    setIsSending(true);

    const orderId = generateOrderId();
    const payload = {
      orderId,
      items: items.map((i) => ({
        name: i.name,
        size: i.size,
        color: i.color,
        price: i.price,
        quantity: i.quantity,
      })),
      total: finalTotal,
      customer: {
        name: name.trim(),
        phone: phone.trim(),
        telegram: telegramTrimmed,
        address: address.trim(),
        comment: comment.trim(),
        promoDisplay: appliedPromo ? `${appliedPromo.code} (−${appliedPromo.discountPercent}%)` : undefined,
      },
    };
    const fullMessage = formatOrderMessage(
      orderId,
      payload.items,
      payload.total,
      payload.customer
    );

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        clearCart();
        const shortMessage = `Здравствуйте! Оформил заказ ${orderId} на сайте — готов подтвердить.`;
        window.open(telegramChatUrl(shortMessage), "_blank");
        router.push(`/checkout/success?order=${encodeURIComponent(orderId)}`);
        return;
      }
    } catch {
      // network or other error
    }

    // Fallback: open full order in Telegram so user can send manually
    window.open(telegramChatUrl(fullMessage), "_blank");
    setToast(
      "Не удалось отправить автоматически. Открыт чат — отправьте сообщение вручную."
    );
    setTimeout(() => setToast(""), 5000);
    setIsSending(false);
  };

  return (
    <div className="container mx-auto max-w-xl px-4 py-8">
      <h1 className="mb-8 font-accent text-2xl font-bold">Оформление заказа</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            ФИО *
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Фамилия Имя Отчество"
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
        </div>
        <div>
          <label htmlFor="telegram" className="block text-sm font-medium">
            Telegram *
          </label>
          <Input
            id="telegram"
            type="text"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value.replace(/\s/g, ""))}
            placeholder="@username"
            className={`mt-1 ${errorField === "telegram" ? "border-destructive" : ""}`}
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium">
            Город
          </label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Город доставки"
            className="mt-1"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Подробный адрес обсудим в чате с менеджером
          </p>
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

        <div>
          <label htmlFor="promo" className="block text-sm font-medium">
            Промокод
          </label>
          <div className="mt-1 flex gap-2">
            <Input
              id="promo"
              type="text"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              placeholder="Введите промокод"
              className="flex-1"
            />
            <Button type="button" variant="outline" onClick={applyPromo}>
              Применить
            </Button>
          </div>
          {appliedPromo && (
            <p className="mt-1 text-sm text-muted-foreground">
              Промокод «{appliedPromo.code}»: скидка {appliedPromo.discountPercent}%
            </p>
          )}
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <div className="rounded-lg border bg-muted/50 p-4">
          {appliedPromo ? (
            <>
              <p className="text-sm text-muted-foreground">
                Сумма: {totalPrice.toLocaleString("ru-RU")} ₽ · Промокод {appliedPromo.code}: −{appliedPromo.discountPercent}%
              </p>
              <p className="mt-1 font-semibold">
                Итого: {finalTotal.toLocaleString("ru-RU")} ₽
              </p>
            </>
          ) : (
            <p className="font-semibold">
              Итого: {totalPrice.toLocaleString("ru-RU")} ₽
            </p>
          )}
          <p className="mt-1 text-sm text-muted-foreground">
            {items.length} {items.length === 1 ? "товар" : items.length < 5 ? "товара" : "товаров"}
            {finalTotal < MIN_ORDER_SUM && (
              <> · Минимум заказа {MIN_ORDER_SUM.toLocaleString("ru-RU")} ₽</>
            )}
          </p>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isSending || finalTotal < MIN_ORDER_SUM}
        >
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
