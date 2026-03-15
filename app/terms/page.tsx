import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

const TELEGRAM_MANAGER = "https://t.me/m/KNZpfBqbMTU1";

export const metadata: Metadata = {
  title: "Пользовательское соглашение (оферта)",
  description:
    "Условия использования сайта WhyBao и оформления заказов: доставка, оплата, возвраты.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { label: "Пользовательское соглашение" },
        ]}
      />
      <h1 className="mt-6 font-accent text-2xl font-bold md:text-3xl">
        Пользовательское соглашение (оферта)
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Использование сайта whybao.ru означает согласие с этими условиями.
      </p>

      <div className="prose prose-sm mt-8 max-w-none prose-p:text-muted-foreground prose-p:leading-relaxed prose-headings:font-accent prose-headings:font-bold prose-a:text-primary prose-a:underline prose-a:underline-offset-2">
        <section>
          <h2 className="font-accent text-lg font-bold text-foreground">1. О сервисе</h2>
          <p>
            WhyBao — байер-сервис. Мы не являемся интернет-магазином: не храним товары на складе
            до вашего заказа и выступаем посредниками между вами и продавцами на китайских
            маркетплейсах. Мы принимаем заявки на выкуп товаров, выкупаем их, доставляем до Москвы
            и далее — до вас выбранным способом.
          </p>
        </section>

        <section>
          <h2 className="font-accent text-lg font-bold text-foreground">2. Оформление заказа</h2>
          <p>
            Оформляя заказ на сайте, вы направляете заявку менеджеру. Минимальная сумма заказа
            указана на сайте (на момент публикации — 5 000 ₽). После отправки заказа менеджер
            свяжется с вами в Telegram для подтверждения, уточнения деталей и передачи реквизитов
            для оплаты. Оплата на сайте в данный момент недоступна.
          </p>
        </section>

        <section>
          <h2 className="font-accent text-lg font-bold text-foreground">3. Доставка</h2>
          <p>
            Доставка из Китая до нашего склада в Москве для вас бесплатная. Срок доставки до
            покупателя с момента оплаты заказа — от 30 до 60 дней. Доставку до вашего адреса
            организуем через сторонние службы (СДЭК, Почта России, Яндекс и др.). За работу
            служб доставки мы ответственности не несём. Способ и адрес доставки согласовываются
            с менеджером после упаковки заказа в Москве.
          </p>
        </section>

        <section>
          <h2 className="font-accent text-lg font-bold text-foreground">4. Качество и брак</h2>
          <p>
            Мы не несём ответственности за брак или несоответствие качества товара: товар приходит
            в том виде, в котором его отправил продавец. Мы не проверяем каждую единицу на
            производственный брак и не гарантируем соответствие ожиданиям по качеству материалов
            и пошива. По вопросам дефектов и претензий к качеству мы не можем выступать посредником
            между вами и продавцом в объёме, превышающем нашу возможность помочь в переписке.
          </p>
        </section>

        <section>
          <h2 className="font-accent text-lg font-bold text-foreground">5. Возвраты и отмена</h2>
          <p>
            Отказаться от заказа или изменить его можно только до момента выкупа товара на
            маркетплейсе. После того как мы оплатили ваши товары, возврат и отмена заказа
            невозможны. Если какой-то товар из заказа окажется недоступен к выкупу, мы вернём
            вам полную стоимость этого товара; от остальных позиций заказа отказаться в таком
            случае нельзя, если они могут быть выкуплены. Если вы передумали, товар не подошёл
            или вы хотите вернуть деньги по иной причине после выкупа — возврат мы не делаем.
          </p>
        </section>

        <section>
          <h2 className="font-accent text-lg font-bold text-foreground">6. Персональные данные</h2>
          <p>
            Обработка персональных данных осуществляется в соответствии с нашей{" "}
            <Link href="/privacy">Политикой конфиденциальности</Link>. Оформляя заказ, вы даёте
            согласие на обработку указанных данных для исполнения заказа.
          </p>
        </section>

        <section>
          <h2 className="font-accent text-lg font-bold text-foreground">7. Контакты</h2>
          <p>
            Вопросы по заказам, доставке и условиям:{" "}
            <a href={TELEGRAM_MANAGER} target="_blank" rel="noopener noreferrer">
              Telegram менеджера
            </a>
            {" "}и{" "}
            <Link href="/contacts">страница Контакты</Link>.
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
