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
  { id: "domilab", name: "DomiLab", slug: "domilab" },
  { id: "vanwalk", name: "VANWALK", slug: "vanwalk" },
  { id: "onetime", name: "onetime", slug: "onetime" },
  { id: "girlsheart", name: "GIRLS' HEART", slug: "girlsheart" },
] as const;

export type BrandSlug = (typeof brands)[number]["slug"];
