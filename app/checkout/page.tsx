"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatOrderMessage } from "@/lib/format-order-message";

const TELEGRAM_MANAGER_USERNAME = "whybaoceo";
const MIN_ORDER_SUM = 5000;
const CHECKOUT_STORAGE_KEY = "whybao-checkout-form";

type CheckoutFormCache = {
  name: string;
  phone: string;
  telegram: string;
  address: string;
  comment: string;
};

function loadCheckoutCache(): Partial<CheckoutFormCache> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(CHECKOUT_STORAGE_KEY);
    if (!raw) return {};
    const data = JSON.parse(raw) as Partial<CheckoutFormCache>;
    return {
      name: typeof data.name === "string" ? data.name : "",
      phone: typeof data.phone === "string" ? data.phone : "",
      telegram: typeof data.telegram === "string" ? data.telegram : "",
      address: typeof data.address === "string" ? data.address : "",
      comment: typeof data.comment === "string" ? data.comment : "",
    };
  } catch {
    return {};
  }
}

function saveCheckoutCache(data: CheckoutFormCache) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore quota or private mode
  }
}

const PROMO_CODES: { code: string; discountPercent: number; maxDiscount?: number }[] = [
  { code: "сонный", discountPercent: 5, maxDiscount: 500 },
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
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discountPercent: number;
    maxDiscount?: number;
  } | null>(null);
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState<"name" | "phone" | "telegram" | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState("");
  const [cacheLoaded, setCacheLoaded] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmData, setConfirmData] = useState<{
    orderId: string;
    payload: {
      orderId: string;
      items: { name: string; size: string; color: string; price: number; quantity: number }[];
      total: number;
      customer: { name: string; phone: string; telegram: string; address: string; comment: string; promoDisplay?: string };
    };
    fullMessage: string;
  } | null>(null);

  // Восстановление данных из localStorage при открытии страницы
  useEffect(() => {
    const cached = loadCheckoutCache();
    if (cached.name !== undefined) setName(cached.name);
    if (cached.phone !== undefined) setPhone(cached.phone);
    if (cached.telegram !== undefined) setTelegram(cached.telegram);
    if (cached.address !== undefined) setAddress(cached.address);
    if (cached.comment !== undefined) setComment(cached.comment);
    setCacheLoaded(true);
  }, []);

  // Сохранение в localStorage при изменении полей (после первой загрузки)
  useEffect(() => {
    if (!cacheLoaded) return;
    saveCheckoutCache({ name, phone, telegram, address, comment });
  }, [cacheLoaded, name, phone, telegram, address, comment]);

  const discountAmount = appliedPromo
    ? Math.min(
        Math.round(totalPrice * (appliedPromo.discountPercent / 100)),
        appliedPromo.maxDiscount ?? Infinity
      )
    : 0;
  const finalTotal = totalPrice - discountAmount;

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
      setError(`Минимальная сумма заказа - ${MIN_ORDER_SUM.toLocaleString("ru-RU")} ₽`);
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
        promoDisplay: appliedPromo ? `${appliedPromo.code} (−${discountAmount.toLocaleString("ru-RU")} ₽)` : undefined,
      },
    };
    const fullMessage = formatOrderMessage(
      orderId,
      payload.items,
      payload.total,
      payload.customer
    );
    setConfirmData({ orderId, payload, fullMessage });
    setConfirmOpen(true);
  };

  const confirmAndSend = async () => {
    if (!confirmData) return;
    setIsSending(true);
    setError("");
    const { orderId, payload, fullMessage } = confirmData;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        clearCart();
        try {
          window.localStorage.removeItem(CHECKOUT_STORAGE_KEY);
        } catch {
          /* ignore */
        }
        setConfirmOpen(false);
        setConfirmData(null);
        const shortMessage = `Тук-тук~
Хочу подтвердить заказик ${orderId} и уточнить детали.`;
        window.open(telegramChatUrl(shortMessage), "_blank");
        router.push(`/checkout/success?order=${encodeURIComponent(orderId)}`);
        return;
      }

      let errMsg = "Не удалось отправить заказ. Попробуйте позже.";
      try {
        const data = await res.json();
        if (typeof data?.error === "string") errMsg = data.error;
      } catch {
        /* ignore */
      }
      setError(errMsg);
    } catch (e) {
      clearTimeout(timeoutId);
      const isAbort = e instanceof Error && e.name === "AbortError";
      setError(
        isAbort
          ? "Превышено время ожидания. Проверьте интернет и попробуйте снова."
          : "Ошибка сети. Проверьте подключение и попробуйте снова."
      );
    }

    setIsSending(false);
    setConfirmOpen(false);
    setConfirmData(null);
    const maxTextLen = 500;
    const textForUrl = fullMessage.length > maxTextLen
      ? fullMessage.slice(0, maxTextLen) + "\n\n... (полный текст заказа отправьте менеджеру вручную)"
      : fullMessage;
    window.open(telegramChatUrl(textForUrl), "_blank");
    setToast("Открыт чат - при необходимости отправьте сообщение вручную.");
    setTimeout(() => setToast(""), 5000);
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
            maxLength={200}
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
            maxLength={100}
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
            maxLength={300}
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
            maxLength={500}
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
            <Button type="button" onClick={applyPromo}>
              Применить
            </Button>
          </div>
          {appliedPromo && (
            <p className="mt-1 text-sm text-muted-foreground">
              Промокод «{appliedPromo.code}»: −{discountAmount.toLocaleString("ru-RU")} ₽
            </p>
          )}
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <p className="text-xs text-muted-foreground">
          Оформляя заказ, вы соглашаетесь с{" "}
          <Link href="/privacy" className="text-primary underline underline-offset-2 hover:no-underline">
            Политикой конфиденциальности
          </Link>{" "}
          и{" "}
          <Link href="/terms" className="text-primary underline underline-offset-2 hover:no-underline">
            Пользовательским соглашением
          </Link>.
        </p>

        <div className="rounded-lg border bg-muted/50 p-4">
          {appliedPromo ? (
            <>
              <p className="text-sm text-muted-foreground">
                Сумма: {totalPrice.toLocaleString("ru-RU")} ₽ · Промокод {appliedPromo.code}: −{discountAmount.toLocaleString("ru-RU")} ₽
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

      {confirmOpen && confirmData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-order-title"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => { setConfirmOpen(false); setConfirmData(null); }}
            aria-hidden
          />
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border bg-background p-6 shadow-xl">
            <h2 id="confirm-order-title" className="font-accent text-xl font-bold">
              Проверьте данные заказа
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Убедитесь, что всё верно, и нажмите «Подтвердить и отправить».
            </p>
            <dl className="mt-6 space-y-2 text-sm">
              <div>
                <dt className="font-medium text-muted-foreground">ФИО</dt>
                <dd>{confirmData.payload.customer.name}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Телефон</dt>
                <dd>{confirmData.payload.customer.phone}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Telegram</dt>
                <dd>@{confirmData.payload.customer.telegram}</dd>
              </div>
              {confirmData.payload.customer.address && (
                <div>
                  <dt className="font-medium text-muted-foreground">Город</dt>
                  <dd>{confirmData.payload.customer.address}</dd>
                </div>
              )}
              {confirmData.payload.customer.comment && (
                <div>
                  <dt className="font-medium text-muted-foreground">Комментарий</dt>
                  <dd className="whitespace-pre-wrap">{confirmData.payload.customer.comment}</dd>
                </div>
              )}
            </dl>
            <div className="mt-4 border-t pt-4">
              <dt className="font-medium text-muted-foreground">Товары</dt>
              <ul className="mt-1 space-y-1 text-sm">
                {confirmData.payload.items.map((i, idx) => (
                  <li key={idx}>
                    {i.name} ({i.color ? `${i.size}, ${i.color}` : i.size}) - {i.price.toLocaleString("ru-RU")} ₽ × {i.quantity}
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-semibold">
                Итого: {confirmData.payload.total.toLocaleString("ru-RU")} ₽
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => { setConfirmOpen(false); setConfirmData(null); }}
                disabled={isSending}
              >
                Вернуться к правкам
              </Button>
              <Button
                type="button"
                onClick={confirmAndSend}
                disabled={isSending}
              >
                {isSending ? "Отправляем..." : "Подтвердить и отправить"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
