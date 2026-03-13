import Link from "next/link";
import { HeroSlider } from "@/components/home/hero-slider";
import { ProductCard } from "@/components/catalog/product-card";
import { categories } from "@/data/categories";
import { getNewProducts } from "@/lib/product-utils";

export default function HomePage() {
  const newProducts = getNewProducts(8);

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
          <h2 className="font-accent text-2xl font-bold">Новинки</h2>
          <Link
            href="/shop?sort=newest"
            className="text-sm font-medium text-primary hover:underline"
          >
            Смотреть все
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {newProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
      <section className="container mx-auto px-4 py-10">
        <h2 className="mb-8 text-center font-accent text-2xl font-bold">
          Почему именно WhyBao?
        </h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="grid size-24 place-items-center rounded-full bg-blue-100 text-blue-600">
              <span className="text-3xl" aria-hidden>
                💳
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Доступные цены</p>
          </div>
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="grid size-24 place-items-center rounded-full bg-green-100 text-green-700">
              <span className="text-3xl" aria-hidden>
                💬
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Консультация с менеджером
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="grid size-24 place-items-center rounded-full bg-rose-100 text-rose-700">
              <span className="text-3xl" aria-hidden>
                %
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Регулярные скидки, бонусы и подарки
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="grid size-24 place-items-center rounded-full bg-yellow-100 text-yellow-800">
              <span className="text-3xl" aria-hidden>
                🛍️
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Комплексный уход одной линейки продукции
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
