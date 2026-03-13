import Link from "next/link";
import { HeroSlider } from "@/components/home/hero-slider";
import { ProductCard } from "@/components/catalog/product-card";
import { categories } from "@/data/categories";
import { getCatalogPreview } from "@/lib/product-utils";

export default function HomePage() {
  const catalogPreview = getCatalogPreview(14);

  return (
    <div>
      <HeroSlider />

      <section className="container mx-auto px-4 py-8">
        <h2 className="mb-4 font-accent text-2xl font-bold">Категории</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((c, i) => (
            <Link
              key={c.id}
              href={`/shop?category=${c.slug}`}
              className="group relative aspect-[3/4] overflow-hidden border bg-muted"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundImage: `url(https://picsum.photos/seed/cat${i}/400/300)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute bottom-0 left-0 right-0 p-3 font-sans text-sm font-semibold tracking-wide text-white md:text-base">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-accent text-2xl font-bold">Каталог</h2>
          <Link
            href="/shop"
            className="inline-flex h-9 items-center gap-2 rounded-none border-2 border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Смотреть дальше
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {catalogPreview.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            href="/shop"
            className="inline-flex h-10 items-center gap-2 rounded-none border-2 border-primary bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Смотреть дальше
          </Link>
        </div>
      </section>
      <section className="container mx-auto px-4 py-10">
        <h2 className="mb-8 text-center font-accent text-2xl font-bold">
          Почему именно WhyBao?
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3 rounded-2xl border bg-card/60 p-4 shadow-sm backdrop-blur-sm">
            <div className="inline-flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="text-lg" aria-hidden>
                💳
              </span>
            </div>
            <p className="text-sm font-semibold">
              Большой ассортимент от различных брендов
            </p>
            <p className="text-xs text-muted-foreground">
              От нишевых китайских марок до популярных брендов, подобранных вручную.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border bg-card/60 p-4 shadow-sm backdrop-blur-sm">
            <div className="inline-flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <span className="text-lg" aria-hidden>
                💬
              </span>
            </div>
            <p className="text-sm font-semibold">
              Прямая связь с менеджером для любых вопросов
            </p>
            <p className="text-xs text-muted-foreground">
              Поможем с размером, выкупом по ссылке и статусом доставки.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border bg-card/60 p-4 shadow-sm backdrop-blur-sm">
            <div className="inline-flex size-10 items-center justify-center rounded-full bg-rose-100 text-rose-700">
              <span className="text-lg" aria-hidden>
                %
              </span>
            </div>
            <p className="text-sm font-semibold">Новинки каждую неделю</p>
            <p className="text-xs text-muted-foreground">
              Регулярно добавляем свежие коллекции прямо с китайских маркетплейсов.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border bg-card/60 p-4 shadow-sm backdrop-blur-sm">
            <div className="inline-flex size-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <span className="text-lg" aria-hidden>
                🛍️
              </span>
            </div>
            <p className="text-sm font-semibold">
              Международная логистика уже оплачена
            </p>
            <p className="text-xs text-muted-foreground">
              В цене учтена доставка из Китая в Россию — останется только отправка из Москвы.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
