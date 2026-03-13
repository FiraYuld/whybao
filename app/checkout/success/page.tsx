import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16">
      <CheckCircle className="size-16 text-accent" />
      <h1 className="mt-4 text-2xl font-bold">Заказ отправлен!</h1>
      <p className="mt-2 text-center text-muted-foreground">
        Менеджер свяжется с вами в Telegram для подтверждения заказа.
      </p>
      <Link
        href="/shop"
        className="mt-8 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 font-medium text-primary-foreground hover:bg-primary/90"
      >
        Продолжить покупки
      </Link>
    </div>
  );
}
