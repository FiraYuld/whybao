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

export function formatOrderMessage(
  orderId: string,
  items: OrderItem[],
  total: number,
  customer: OrderCustomer
): string {
  const lines = [
    "🛒 Заказ " + orderId,
    "",
    "📦 Товары:",
    ...items.map(
      (i) =>
        `• ${i.name} (${i.size}, ${i.color}) — ${i.price.toLocaleString("ru-RU")} ₽ × ${i.quantity}`
    ),
    "",
    ...(customer.promoDisplay ? [`Промокод: ${customer.promoDisplay}`] : []),
    "💰 Итого: " + total.toLocaleString("ru-RU") + " ₽",
    "",
    "👤 Клиент:",
    `ФИО: ${customer.name}`,
    `Телефон: ${customer.phone}`,
    `Telegram: @${customer.telegram.replace(/^@/, "")}`,
    `Город: ${customer.address}`,
    customer.comment ? `Комментарий: ${customer.comment}` : null,
  ].filter(Boolean);

  return lines.join("\n");
}
