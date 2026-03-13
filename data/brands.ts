export const brands = [
  { id: "neonpanda", name: "NeonPanda", slug: "neonpanda" },
  { id: "silkdragon", name: "SilkDragon", slug: "silkdragon" },
  { id: "urbanqilin", name: "UrbanQilin", slug: "urbanqilin" },
  { id: "baostreet", name: "BaoStreet", slug: "baostreet" },
  { id: "ghostlotus", name: "GhostLotus", slug: "ghostlotus" },
  { id: "crimsonwave", name: "CrimsonWave", slug: "crimsonwave" },
  { id: "echosilk", name: "EchoSilk", slug: "echosilk" },
  { id: "tokyobao", name: "TokyoBao", slug: "tokyobao" },
  { id: "lotusvibe", name: "LotusVibe", slug: "lotusvibe" },
  { id: "dragonthread", name: "DragonThread", slug: "dragonthread" },
] as const;

export type BrandSlug = (typeof brands)[number]["slug"];
