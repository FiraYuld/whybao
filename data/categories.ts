export const categories = [
  { id: "hoodies", name: "Свитшоты / худи", slug: "hoodies" },
  { id: "tshirts", name: "Футболки", slug: "tshirts" },
  { id: "longsleeves", name: "Лонгсливы", slug: "longsleeves" },
  { id: "shirts-blouses", name: "Рубашки / блузки", slug: "shirts-blouses" },
  { id: "pants", name: "Джинсы / брюки", slug: "pants" },
  { id: "shorts", name: "Шорты", slug: "shorts" },
  { id: "skirts", name: "Юбки", slug: "skirts" },
  { id: "coats", name: "Пальто / куртки", slug: "coats" },
  { id: "accessories", name: "Аксессуары", slug: "accessories" },
  { id: "shoes", name: "Обувь", slug: "shoes" },
  { id: "plus-size", name: "Plus size", slug: "plus-size" },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];
