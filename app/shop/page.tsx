import { Suspense } from "react";
import { ShopContent } from "./shop-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WhyBao — Каталог",
  description:
    "Каталог WhyBao: streetwear и casual с китайским вайбом. Футболки, худи, брюки, обувь и аксессуары.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopFallback />}>
      <ShopContent />
    </Suspense>
  );
}

function ShopFallback() {
  return (
    <div className="container mx-auto flex gap-6 px-4 py-6">
      <div className="flex-1">
        <div className="mb-4 h-10 animate-pulse bg-muted" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] animate-pulse bg-muted" />
          ))}
        </div>
      </div>
    </div>
  );
}
