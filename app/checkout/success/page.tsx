import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const TELEGRAM_MANAGER_USERNAME = "whybaoceo";

function telegramChatUrl(text: string) {
  return `https://t.me/${TELEGRAM_MANAGER_USERNAME}?text=${encodeURIComponent(text)}`;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order: orderId } = await searchParams;
  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16">
      <CheckCircle className="size-16 text-accent" />
      <h1 className="mt-4 text-2xl font-bold">Заказ отправлен!</h1>
      <p className="mt-2 text-center text-muted-foreground">
        {typeof orderId === "string" && orderId.trim()
          ? `Заказ ${orderId} передан менеджеру. Он свяжется с вами в Telegram для подтверждения.`
          : "Менеджер свяжется с вами в Telegram для подтверждения заказа."}
      </p>
      {typeof orderId === "string" && orderId.trim() && (
        <a
          href={telegramChatUrl(
            `Тук-тук~
Хочу подтвердить заказик ${orderId} и уточнить детали.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6"
        >
          <Button variant="outline" size="lg">
            Написать менеджеру в Telegram
          </Button>
        </a>
      )}
      <Link
        href="/shop"
        className="mt-8 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 font-medium text-primary-foreground hover:bg-primary/90"
      >
        Продолжить покупки
      </Link>
    </div>
  );
}
