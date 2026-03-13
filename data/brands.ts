export const brands = [
  { id: "girlyhalo", name: "Girlyhalo", slug: "girlyhalo" },
  { id: "zizifei", name: "ziziFei", slug: "zizifei" },
  { id: "napsnaps", name: "NAPSNAPS", slug: "napsnaps" },
  { id: "jikoo", name: "JIKOO", slug: "jikoo" },
] as const;

export type BrandSlug = (typeof brands)[number]["slug"];
