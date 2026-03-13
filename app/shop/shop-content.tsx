"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/catalog/product-card";
import { FilterSidebar } from "@/components/catalog/filter-sidebar";
import { useShallow } from "zustand/react/shallow";
import { useFilterStore } from "@/lib/store/filter-store";
import { getFilteredProducts } from "@/lib/product-utils";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

const ITEMS_PER_PAGE = 12;

export function ShopContent() {
  const searchParams = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);

  const filters = useFilterStore(
    useShallow((s) => ({
      priceMin: s.priceMin,
      priceMax: s.priceMax,
      brands: s.brands,
      categories: s.categories,
      sizes: s.sizes,
      colors: s.colors,
      sortBy: s.sortBy,
    }))
  );

  const searchQuery = searchParams.get("q") ?? undefined;
  const categoryParam = searchParams.get("category");
  const sortParam = searchParams.get("sort");

  useEffect(() => {
    if (categoryParam) {
      useFilterStore.getState().toggleCategory(categoryParam);
    }
    if (sortParam) {
      useFilterStore.getState().setSortBy(sortParam as typeof filters.sortBy);
    }
  }, [categoryParam, sortParam]);

  const filteredProducts = useMemo(
    () => getFilteredProducts(filters, searchQuery),
    [filters, searchQuery]
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setPage(1);
  }, [filters, searchQuery]);

  return (
    <div className="container mx-auto flex flex-col gap-4 px-4 py-6 lg:flex-row">
      <FilterSidebar
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        className="lg:!block"
      />

      <div className="flex-1">
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { label: "Каталог" },
          ]}
        />
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <Button
            variant="outline"
            className="lg:hidden"
            onClick={() => setFilterOpen(true)}
          >
            <Filter className="mr-2 size-4" />
            Фильтры
          </Button>
          <p className="text-sm text-muted-foreground">
            Найдено: {filteredProducts.length} товаров
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {paginatedProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="py-12 text-center text-muted-foreground">
            Товары не найдены. Попробуйте изменить фильтры.
          </p>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            <Button
              variant="outline"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Назад
            </Button>
            <span className="flex items-center px-4 text-sm">
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Вперёд
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
