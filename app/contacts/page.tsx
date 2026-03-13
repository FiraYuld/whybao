import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Контакты — WhyBao",
  description:
    "Связь с WhyBao: Telegram-канал, менеджер. Информация о доставке из Китая в Россию.",
};

const TELEGRAM_CHANNEL = "https://t.me/whybao";
const TELEGRAM_MANAGER = "https://t.me/whybao_manager";

export default function ContactsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { label: "Контакты" },
        ]}
      />

      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
          <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
            <Image
              src="/logo.webp"
              alt="WhyBao"
              fill
              className="object-contain"
              sizes="112px"
            />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="font-accent text-2xl font-bold md:text-3xl">
              Контакты
            </h1>
            <p className="mt-1 text-muted-foreground">
              Тренды из Китая для тебя. Свяжитесь с нами по любым вопросам.
            </p>
          </div>
        </div>

        <div className="space-y-6 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
          <div className="flex flex-wrap gap-3">
            <Link
              href={TELEGRAM_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#0088cc] px-4 py-2.5 font-medium text-white hover:bg-[#0077b5]"
            >
              <MessageCircle className="size-5" />
              Наш Telegram-канал
            </Link>
            <Link
              href={TELEGRAM_MANAGER}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-4 py-2.5 font-medium text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <MessageCircle className="size-5" />
              Связаться с менеджером
            </Link>
          </div>

          <section>
            <h2 className="font-accent text-lg font-bold">О нас</h2>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
              {`WhyBao — это окно в мир небольших китайских брендов, которые не выходят на иностранную аудиторию. Мы покупаем и доставляем самые горячие новинки из Китая в Россию. Для вашего удобства вся международная логистика уже включена в стоимость товаров. Дополнительно нужно оплатить только доставку из Москвы до вашего города.\n\nМы также можем выкупить для вас любую вещь с китайских маркетплейсов по индивидуальному запросу. Для этого свяжитесь с нашим менеджером для консультации.`}
            </p>
          </section>

          <section>
            <h2 className="font-accent text-lg font-bold">
              Важная информация
            </h2>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
              {`WhyBao НЕ является магазином. Мы занимаемся выкупом товаров и выступаем в роли посредников. В нашу зону ответственности входит оформление заказа, выкуп и организация доставки до покупателя. Также мы не несём ответственности за брак или качество товара. Это включает в себя: незначительные повреждения, царапины, потертости или другие следы эксплуатации, которые могут присутствовать на товарах, приобретаемых в онлайн-магазинах. Товар приходит к вам в том виде, в котором его отправляет продавец.`}
            </p>
          </section>

          <section>
            <h3 className="font-semibold">Сроки доставки</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              От 30 до 60 дней.
            </p>
          </section>

          <section>
            <h3 className="font-semibold">Методы доставки</h3>
            <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">
              {`Обратите внимание, что мы используем сторонние сервисы доставки (СДЭК, Почта России, Яндекс), за качество работы которых не несём ответственности. Оформить доставку до своего адреса удобным способом можно, когда менеджер уведомит вас о том, что ваш заказ уже упакован в Москве.`}
            </p>
          </section>

          <section>
            <h3 className="font-semibold">Возврат</h3>
            <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">
              {`В момент выкупа может оказаться, что какой-то из товаров недоступен к заказу. В таком случае полная стоимость недостающего товара будет возвращена покупателю. Если заказ состоял из нескольких позиций и одна из них не может быть выкуплена, от других позиций отказаться нельзя, если они могут быть выкуплены. Отказаться от заказа или скорректировать его можно только до момента его выкупа. Когда мы уже оплатили ваши товары, возврат сделать НЕЛЬЗЯ. Если вы передумали / не понравился товар / хотите вернуть деньги по любой другой причине, увы, это будет невозможно сделать. По вопросам дефектов и брака — см. выше, мы не можем урегулировать такие ситуации.`}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
