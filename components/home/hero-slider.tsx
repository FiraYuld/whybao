"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

/** Слайды: арты из public/hero (hero_1.webp, hero_2.webp, hero_3.webp) */
const slides = [
  {
    id: 1,
    title: "Весенний дроп",
    subtitle: "Чтобы не отморозить попи и быть в прайме",
    image: "/hero/hero_1.webp",
    cta: "Куртки и пальто",
    href: "/shop?category=coats",
  },
  {
    id: 2,
    title: "GRWM на учёбу",
    subtitle: "",
    image: "/hero/hero_2.webp",
    cta: "Блузки и рубашки",
    href: "/shop?category=shirts-blouses",
  },
  {
    id: 3,
    title: "Новинки сезона",
    subtitle: "Только в нашем каталоге по самым низким ценам",
    image: "/hero/hero_3.webp",
    cta: "В каталог",
    href: "/shop",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((c) => (c + 1) % slides.length),
      7000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden aspect-square md:aspect-video">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-cover md:bg-contain"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          <div className="absolute inset-0 flex flex-col justify-end items-start pb-6 pl-4 md:pb-8 md:pl-8 lg:pl-16">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-xl rounded-lg bg-black/40 px-4 py-3 backdrop-blur-sm md:px-5 md:py-4"
            >
              <h1 className="font-accent text-3xl font-bold tracking-tight text-white drop-shadow-md md:text-4xl lg:text-5xl">
                {slides[current].title}
              </h1>
              {slides[current].subtitle ? (
                <p className="mt-2 text-lg text-white/95 drop-shadow md:text-xl">
                  {slides[current].subtitle}
                </p>
              ) : null}
              <Link
                href={slides[current].href}
                className="mt-4 inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-primary px-4 font-medium text-primary-foreground hover:bg-primary/90"
              >
                {slides[current].cta}
                <ChevronRight className="size-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-6 bg-primary" : "w-2 bg-muted-foreground/50"
            }`}
            aria-label={`Слайд ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
