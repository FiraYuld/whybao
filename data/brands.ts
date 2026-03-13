export const brands = [
  { id: "girlyhalo", name: "Girlyhalo", slug: "girlyhalo" },
  { id: "zizifei", name: "ziziFei", slug: "zizifei" },
] as const;

export type BrandSlug = (typeof brands)[number]["slug"];
