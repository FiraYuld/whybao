import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Политика конфиденциальности WhyBao: какие данные мы собираем, как используем и храним персональные данные.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { label: "Политика конфиденциальности" },
        ]}
      />
      <h1 className="mt-6 font-accent text-2xl font-bold md:text-3xl">
        Политика конфиденциальности
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Последнее обновление: {new Date().toLocaleDateString("ru-RU")}
      </p>

      <div className="prose prose-sm mt-8 max-w-none prose-p:text-muted-foreground prose-p:leading-relaxed prose-headings:font-accent prose-headings:font-bold prose-a:text-primary prose-a:underline prose-a:underline-offset-2">
        <section>
          <h2 className="font-accent text-lg font-bold text-foreground">1. Кто мы</h2>
          <p>
            WhyBao — байер-сервис: мы помогаем оформлять заказы на товары с китайских маркетплейсов,
            выкупаем их и организуем доставку в Россию. Мы не являемся магазином и не храним товары
            на собственном складе до момента отправки из Москвы.
          </p>
        </section>

        <section>
          <h2 className="font-accent text-lg font-bold text-foreground">2. Какие данные мы получаем</h2>
          <p>
            При оформлении заказа вы указываете: ФИО, номер телефона, ник в Telegram, город или адрес
            доставки и при необходимости комментарий к заказу. Эти данные нужны для связи с вами,
            подтверждения заказа и организации доставки.
          </p>
          <p>
            На сайте используется Яндекс.Метрика для анализа посещаемости (в том числе с согласия
            через баннер о cookie). Метрика может сохранять обезличенные данные о просмотрах страниц
            и действиях на сайте.
          </p>
        </section>

        <section>
          <h2 className="font-accent text-lg font-bold text-foreground">3. Как мы используем данные</h2>
          <p>
            Данные заказа передаются менеджеру в Telegram для обработки заказа и связи с вами.
            Реквизиты для оплаты и детали доставки обсуждаются в чате. Мы не передаём ваши персональные
            данные третьим лицам в маркетинговых целях. Данные могут передаваться службам доставки
            (СДЭК, Почта России, Яндекс и др.) только для отправки заказа.
          </p>
        </section>

        <section>
          <h2 className="font-accent text-lg font-bold text-foreground">4. Хранение</h2>
          <p>
            Данные заказа хранятся в переписке с менеджером в Telegram и при необходимости в наших
            внутренних учётных системах в течение срока, необходимого для исполнения заказа и решения
            возможных вопросов. После этого мы не используем ваши данные для рассылок, если вы
            сами не обратитесь к нам снова.
          </p>
        </section>

        <section>
          <h2 className="font-accent text-lg font-bold text-foreground">5. Ваши права</h2>
          <p>
            Вы можете запросить удаление или уточнение своих данных, направив обращение в наш
            Telegram-канал или менеджеру. Мы рассмотрим запрос в разумные сроки.
          </p>
        </section>

        <section>
          <h2 className="font-accent text-lg font-bold text-foreground">6. Изменения</h2>
          <p>
            Мы можем обновлять эту политику. Актуальная версия всегда доступна на этой странице.
            Продолжая пользоваться сайтом после изменений, вы соглашаетесь с обновлённой политикой.
          </p>
        </section>

        <section>
          <h2 className="font-accent text-lg font-bold text-foreground">7. Контакты</h2>
          <p>
            По вопросам персональных данных и конфиденциальности:{" "}
            <Link href="/contacts">Контакты WhyBao</Link>.
          </p>
        </section>
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        <Link href="/" className="text-primary underline underline-offset-2 hover:no-underline">
          ← На главную
        </Link>
      </p>
    </div>
  );
}
