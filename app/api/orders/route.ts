import { NextResponse } from "next/server";
import { formatOrderMessage, type OrderItem, type OrderCustomer } from "@/lib/format-order-message";

const TELEGRAM_API = "https://api.telegram.org";

export interface OrderPayload {
  orderId: string;
  items: OrderItem[];
  total: number;
  customer: OrderCustomer;
}

function validatePayload(body: unknown): body is OrderPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  if (typeof b.orderId !== "string" || !b.orderId.trim()) return false;
  if (!Array.isArray(b.items) || b.items.length === 0) return false;
  for (const item of b.items) {
    if (
      !item ||
      typeof item !== "object" ||
      typeof (item as OrderItem).name !== "string" ||
      typeof (item as OrderItem).size !== "string" ||
      typeof (item as OrderItem).color !== "string" ||
      typeof (item as OrderItem).price !== "number" ||
      typeof (item as OrderItem).quantity !== "number"
    )
      return false;
  }
  if (typeof b.total !== "number") return false;
  if (!b.customer || typeof b.customer !== "object") return false;
  const c = b.customer as Record<string, unknown>;
  if (typeof c.name !== "string" || !(c.name as string).trim()) return false;
  if (typeof c.phone !== "string" || !(c.phone as string).trim()) return false;
  if (typeof c.telegram !== "string" || !(c.telegram as string).trim()) return false;
  if (typeof c.address !== "string") return false;
  if (typeof c.comment !== "string") return false;
  if (c.promoDisplay !== undefined && typeof c.promoDisplay !== "string") return false;
  return true;
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ORDER_CHAT_ID;

  if (!token?.trim() || !chatId?.trim()) {
    return NextResponse.json(
      { error: "Интеграция с Telegram не настроена" },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Неверный формат запроса" },
      { status: 400 }
    );
  }

  if (!validatePayload(body)) {
    return NextResponse.json(
      { error: "Не указаны имя, телефон, Telegram или товары" },
      { status: 400 }
    );
  }

  if (body.total < 5000) {
    return NextResponse.json(
      { error: "Минимальная сумма заказа — 5 000 ₽" },
      { status: 400 }
    );
  }

  const text = formatOrderMessage(
    body.orderId,
    body.items,
    body.total,
    body.customer
  );

  const url = `${TELEGRAM_API}/bot${token}/sendMessage`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: undefined,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Telegram API error:", res.status, err);
    return NextResponse.json(
      { error: "Не удалось отправить заказ в Telegram" },
      { status: 500 }
    );
  }

  return NextResponse.json({ orderId: body.orderId });
}
