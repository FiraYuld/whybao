/**
 * Цели Яндекс.Метрики. Вызывать только на клиенте после согласия на cookie.
 * В интерфейсе Метрики создайте цели с идентификаторами: add_to_cart, add_to_wishlist, purchase
 */

const YANDEX_METRIKA_ID = 107709081;

declare global {
  interface Window {
    ym?: (id: number, action: string, params?: Record<string, unknown> | string) => void;
  }
}

export function reachGoal(goalName: string): void {
  if (typeof window === "undefined") return;
  if (window.ym) {
    window.ym(YANDEX_METRIKA_ID, "reachGoal", goalName);
  }
}
