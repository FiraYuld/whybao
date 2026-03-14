"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, Menu, X } from "lucide-react";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Закрыть выпадающие меню при клике вне навбара (важно для iPad/тач)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setCategoriesOpen(false);
        setBrandsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?q=${encodeURIComponent(searchQuery.trim())}`;
    }
    setSearchOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="container mx-auto flex h-14 w-full max-w-full items-center justify-between gap-3 px-4 md:h-16">
        <Link
          href="/"
          className="flex items-center gap-1.5 font-accent text-xl font-bold italic md:text-2xl"
        >
          <span className="relative h-8 w-8 md:h-10 md:w-10">
            <Image
              src="/logo.webp?v=2"
              alt="WhyBao"
              fill
              sizes="40px"
              className="object-contain"
              priority
            />
          </span>
          <span className="tracking-tight">WhyBao</span>
        </Link>

        {/* Desktop: Search */}
        <form
          onSubmit={handleSearch}
          className="hidden flex-1 max-w-md items-center gap-2 md:flex"
        >
          <Input
            type="search"
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9"
          />
          <Button type="submit" size="sm" variant="secondary">
            <Search className="size-4" />
          </Button>
        </form>

        {/* Desktop: Nav links */}
        <nav ref={navRef} className="hidden items-center gap-1 lg:flex">
          <div className="relative group">
            <button
              type="button"
              onClick={() => {
                setCategoriesOpen((v) => !v);
                setBrandsOpen(false);
              }}
              aria-expanded={categoriesOpen}
              aria-haspopup="true"
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              Категории
              <span className="text-xs">▼</span>
            </button>
            <div
              className={cn(
                "absolute left-0 top-full min-w-[200px] rounded-md border bg-popover p-2 shadow-lg",
                categoriesOpen ? "block" : "hidden group-hover:block"
              )}
            >
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/shop?category=${c.slug}`}
                  className="block rounded px-2 py-1.5 text-sm hover:bg-muted"
                  onClick={() => setCategoriesOpen(false)}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="relative group">
            <button
              type="button"
              onClick={() => {
                setBrandsOpen((v) => !v);
                setCategoriesOpen(false);
              }}
              aria-expanded={brandsOpen}
              aria-haspopup="true"
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              Бренды
              <span className="text-xs">▼</span>
            </button>
            <div
              className={cn(
                "absolute left-0 top-full min-w-[200px] rounded-md border bg-popover p-2 shadow-lg",
                brandsOpen ? "block" : "hidden group-hover:block"
              )}
            >
              {brands.map((b) => (
                <Link
                  key={b.id}
                  href={`/brands/${b.slug}`}
                  className="block rounded px-2 py-1.5 text-sm hover:bg-muted"
                  onClick={() => setBrandsOpen(false)}
                >
                  {b.name}
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="/shop"
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium hover:bg-muted",
              pathname === "/shop" && "bg-muted"
            )}
          >
            Каталог
          </Link>
          <Link
            href="/contacts"
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium hover:bg-muted",
              pathname === "/contacts" && "bg-muted"
            )}
          >
            Контакты
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Поиск"
          >
            <Search className="size-5" />
          </Button>
          <Link href="/wishlist" className="p-2 text-foreground hover:text-primary" aria-label="Избранное">
            <Heart className="size-5" />
          </Link>
          <CartDrawer />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Меню"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile search */}
      {searchOpen && (
        <div className="border-t px-4 py-3 md:hidden">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="search"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
              autoFocus
            />
            <Button type="submit">Найти</Button>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t lg:hidden">
          <nav className="flex flex-col gap-1 p-4">
            <div className="mb-1 flex items-center justify-between">
              <Link
                href="/shop"
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 font-medium hover:bg-muted"
              >
                Каталог
              </Link>
              <Link
                href="/contacts"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Контакты
              </Link>
            </div>
            <div className="border-t pt-2">
              <p className="px-3 py-1 text-xs font-semibold text-muted-foreground">
                Категории
              </p>
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/shop?category=${c.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                >
                  {c.name}
                </Link>
              ))}
            </div>
            <div className="border-t pt-2">
              <p className="px-3 py-1 text-xs font-semibold text-muted-foreground">
                Бренды
              </p>
              {brands.map((b) => (
                <Link
                  key={b.id}
                  href={`/brands/${b.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                >
                  {b.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
