export interface OrderItem {
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  telegram: string;
  address: string;
  comment: string;
  promoDisplay?: string;
}

const rub = (n: number) => n.toLocaleString("ru-RU") + " ₽";

export function formatOrderMessage(
  orderId: string,
  items: OrderItem[],
  total: number,
  customer: OrderCustomer
): string {
  const tg = customer.telegram.replace(/^@/, "");
  const lines: string[] = [];

  lines.push("═══════════════════════");
  lines.push("  НОВЫЙ ЗАКАЗ  " + orderId);
  lines.push("═══════════════════════");
  lines.push("");

  lines.push("👤 КОНТАКТЫ КЛИЕНТА");
  lines.push("ФИО: " + customer.name);
  lines.push("Телефон: " + customer.phone);
  lines.push("Telegram: @" + tg);
  if (customer.address.trim()) {
    lines.push("Город: " + customer.address.trim());
  }
  lines.push("");

  lines.push("📦 ТОВАРЫ");
  items.forEach((i, idx) => {
    const sum = i.price * i.quantity;
    lines.push(
      `${idx + 1}. ${i.name}`
    );
    const variant = [i.size, i.color].filter(Boolean).join(", ");
    lines.push(
      variant
        ? `   ${variant} · ${rub(i.price)} × ${i.quantity} = ${rub(sum)}`
        : `   ${rub(i.price)} × ${i.quantity} = ${rub(sum)}`
    );
  });
  lines.push("");

  if (customer.promoDisplay) {
    lines.push("🏷 Промокод: " + customer.promoDisplay);
    lines.push("");
  }

  lines.push("───────────────────────");
  lines.push("💰 ИТОГО: " + rub(total));
  lines.push("───────────────────────");

  if (customer.comment.trim()) {
    lines.push("");
    lines.push("💬 Комментарий клиента:");
    lines.push(customer.comment.trim());
  }

  return lines.join("\n");
}
