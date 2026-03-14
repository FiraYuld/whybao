"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

/** Слайды: пока только градиенты; чтобы добавить фото, положите 1.webp, 2.webp, 3.webp в public/hero/ и задайте image в каждом слайде */
const slides = [
  {
    id: 1,
    title: "Why not Bao?",
    subtitle: "Тренды из Китая для тебя",
    image: undefined as string | undefined,
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    cta: "Смотреть новинки",
    href: "/shop?sort=newest",
  },
  {
    id: 2,
    title: "Streetwear с китайским вайбом",
    subtitle: "Уникальные вещи для Gen Z",
    image: undefined as string | undefined,
    background: "linear-gradient(135deg, #2d1b4e 0%, #1a0a2e 50%, #0d0221 100%)",
    cta: "В каталог",
    href: "/shop",
  },
  {
    id: 3,
    title: "Новая коллекция Girlyhalo",
    subtitle: "Куртки и пальто на каждый день",
    image: undefined as string | undefined,
    background: "linear-gradient(135deg, #1e3a5f 0%, #0d2137 50%, #051a2d 100%)",
    cta: "Смотреть бренд",
    href: "/brands/girlyhalo",
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
    <section className="relative h-[50vh] min-h-[320px] overflow-hidden md:h-[60vh] lg:h-[70vh]">
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
            className="absolute inset-0 bg-cover bg-center"
            style={
              slides[current].image
                ? { backgroundImage: `url(${slides[current].image})` }
                : { background: slides[current].background }
            }
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
          <div className="relative flex h-full flex-col justify-center px-4 md:px-8 lg:px-16">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-xl"
            >
              <h1 className="font-accent text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                {slides[current].title}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground md:text-xl">
                {slides[current].subtitle}
              </p>
              <Link
                href={slides[current].href}
                className="mt-6 inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-primary px-4 font-medium text-primary-foreground hover:bg-primary/90"
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
