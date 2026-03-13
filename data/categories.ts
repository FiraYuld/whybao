export const categories = [
  { id: "hoodies", name: "Свитшоты / Hoodies", slug: "hoodies" },
  { id: "tshirts", name: "Футболки", slug: "tshirts" },
  { id: "pants", name: "Брюки", slug: "pants" },
  { id: "jeans", name: "Джинсы", slug: "jeans" },
  { id: "shorts", name: "Шорты", slug: "shorts" },
  { id: "jackets", name: "Куртки", slug: "jackets" },
  { id: "accessories", name: "Аксессуары", slug: "accessories" },
  { id: "shoes", name: "Обувь", slug: "shoes" },
  { id: "plus-size", name: "Plus size", slug: "plus-size" },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];
