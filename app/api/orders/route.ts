import { NextResponse } from "next/server";
import { formatOrderMessage, type OrderItem, type OrderCustomer } from "@/lib/format-order-message";

const TELEGRAM_API = "https://api.telegram.org";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 минут
const RATE_LIMIT_MAX = 10; // макс. заявок с одного IP за окно

const rateLimitStore = new Map<
  string,
  { count: number; resetAt: number }
>();

function getClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() ?? "unknown";
  const xri = request.headers.get("x-real-ip");
  return xri ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  let entry = rateLimitStore.get(ip);
  if (!entry) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (now >= entry.resetAt) {
    entry = { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
    rateLimitStore.set(ip, entry);
    return false;
  }
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) return true;
  return false;
}

function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [key, val] of rateLimitStore.entries()) {
    if (now >= val.resetAt) rateLimitStore.delete(key);
  }
}

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
  const nameStr = (c.name as string).trim();
  if (typeof c.name !== "string" || !nameStr || nameStr.length > 200) return false;
  const phoneStr = (c.phone as string).replace(/\D/g, "");
  if (typeof c.phone !== "string" || !(c.phone as string).trim() || phoneStr.length < 10 || phoneStr.length > 11) return false;
  const telegramStr = (c.telegram as string).trim();
  if (typeof c.telegram !== "string" || !telegramStr || telegramStr.length > 100) return false;
  if (typeof c.address !== "string" || (c.address as string).length > 300) return false;
  if (typeof c.comment !== "string" || (c.comment as string).length > 500) return false;
  if (c.promoDisplay !== undefined && typeof c.promoDisplay !== "string") return false;
  return true;
}

export async function POST(request: Request) {
  cleanupRateLimitStore();
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Слишком много заявок. Попробуйте позже (лимит: 10 за 15 минут)." },
      { status: 429 }
    );
  }

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
      { error: "Неверные данные: проверьте формат телефона и длину полей" },
      { status: 400 }
    );
  }

  if (body.total < 5000) {
    return NextResponse.json(
      { error: "Минимальная сумма заказа - 5 000 ₽" },
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
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: undefined,
      }),
      signal: controller.signal,
    });
  } catch {
    clearTimeout(timeoutId);
    return NextResponse.json(
      { error: "Не удалось отправить заказ в Telegram" },
      { status: 500 }
    );
  }
  clearTimeout(timeoutId);

  if (!res.ok) {
    console.error("Telegram API error:", res.status);
    return NextResponse.json(
      { error: "Не удалось отправить заказ в Telegram" },
      { status: 500 }
    );
  }

  return NextResponse.json({ orderId: body.orderId });
}
