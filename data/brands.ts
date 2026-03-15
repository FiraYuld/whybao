export const brands = [
  { id: "girlyhalo", name: "Girlyhalo", slug: "girlyhalo" },
  { id: "zizifei", name: "ziziFei", slug: "zizifei" },
  { id: "napsnaps", name: "NAPSNAPS", slug: "napsnaps" },
  { id: "jikoo", name: "JIKOO", slug: "jikoo" },
  { id: "betweenand", name: "BETWEENAND", slug: "betweenand" },
  { id: "unifree", name: "UNIFREE", slug: "unifree" },
  { id: "weekendhub", name: "weekendhub", slug: "weekendhub" },
  { id: "oldorder", name: "OLDORDER", slug: "oldorder" },
  { id: "echosta", name: "ECHOSTA", slug: "echosta" },
  { id: "ariseism", name: "Ariseism", slug: "ariseism" },
  { id: "cheeseday", name: "CHEESEDAY", slug: "cheeseday" },
] as const;

export type BrandSlug = (typeof brands)[number]["slug"];
