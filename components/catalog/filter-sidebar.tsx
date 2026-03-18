"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFilterStore, type SortOption } from "@/lib/store/filter-store";
import { brands } from "@/data/brands";
import { getCategoriesWithProducts } from "@/lib/product-utils";
import { X, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "По умолчанию" },
  { value: "price-asc", label: "Сначала дешевле" },
  { value: "price-desc", label: "Сначала дороже" },
];

const LETTER_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"];

const allSizes = LETTER_SIZES;

interface FilterSidebarProps {
  open?: boolean;
  onClose?: () => void;
  className?: string;
}

export function FilterSidebar({
  open = true,
  onClose,
  className,
}: FilterSidebarProps) {
  const {
    priceMin,
    priceMax,
    brands: selectedBrands,
    categories: selectedCategories,
    sizes: selectedSizes,
    colors: selectedColors,
    sortBy,
    setPriceRange,
    toggleBrand,
    toggleCategory,
    toggleSize,
    toggleColor,
    setSortBy,
    resetFilters,
  } = useFilterStore();

  const [localPriceMin, setLocalPriceMin] = useState(
    priceMin?.toString() ?? ""
  );
  const [localPriceMax, setLocalPriceMax] = useState(
    priceMax?.toString() ?? ""
  );
  const [priceError, setPriceError] = useState("");

  const applyPrice = () => {
    const min = localPriceMin ? parseInt(localPriceMin, 10) : null;
    const max = localPriceMax ? parseInt(localPriceMax, 10) : null;
    if (min != null && max != null && min > max) {
      setPriceError("Минимальная цена не может быть больше максимальной");
      return;
    }
    setPriceError("");
    setPriceRange(min, max);
  };

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Фильтры</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="text-muted-foreground"
        >
          <RotateCcw className="mr-1 size-3" />
          Сбросить
        </Button>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium">Цена, ₽</h4>
        <div className="flex gap-2">
          <Input
            id="filter-price-min"
            type="number"
            placeholder="От"
            value={localPriceMin}
            onChange={(e) => setLocalPriceMin(e.target.value)}
            onBlur={applyPrice}
            className="h-8"
            aria-invalid={!!priceError}
          />
          <Input
            id="filter-price-max"
            type="number"
            placeholder="До"
            value={localPriceMax}
            onChange={(e) => setLocalPriceMax(e.target.value)}
            onBlur={applyPrice}
            className="h-8"
            aria-invalid={!!priceError}
          />
        </div>
        {priceError && (
          <p className="mt-1 text-xs text-destructive" role="alert">
            {priceError}
          </p>
        )}
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium">Сортировка</h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium">Бренд</h4>
        <div className="max-h-40 space-y-1.5 overflow-y-auto">
          {brands.map((b) => (
            <label
              key={b.id}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(b.slug)}
                onChange={() => toggleBrand(b.slug)}
                className="rounded border-input"
              />
              <span className="text-sm">{b.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium">Категория</h4>
        <div className="max-h-40 space-y-1.5 overflow-y-auto">
          {getCategoriesWithProducts().map((c) => (
            <label
              key={c.id}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(c.slug)}
                onChange={() => toggleCategory(c.slug)}
                className="rounded border-input"
              />
              <span className="text-sm">{c.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium">Размер</h4>
        <div className="flex flex-wrap gap-1.5">
          {allSizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggleSize(s)}
              className={cn(
                "rounded-md border px-2 py-1 text-xs transition-colors",
                selectedSizes.includes(s)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input hover:bg-muted"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

    </div>
  );

  if (onClose) {
    return (
      <>
        <div
          className={cn(
            "fixed inset-0 z-40 bg-black/50 lg:hidden",
            open ? "block" : "hidden"
          )}
          onClick={onClose}
          aria-hidden
        />
        <aside
          className={cn(
            "fixed left-0 top-0 z-50 h-full w-72 overflow-y-auto border-r bg-background p-4 transition-transform lg:static lg:z-auto lg:block lg:translate-x-0 lg:border-0 lg:p-0",
            open ? "translate-x-0" : "-translate-x-full",
            className
          )}
        >
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <h2 className="font-semibold">Фильтры</h2>
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Закрыть фильтры">
              <X className="size-5" />
            </Button>
          </div>
          {content}
        </aside>
      </>
    );
  }

  return (
    <aside
      className={cn(
        "hidden w-64 shrink-0 lg:block",
        className
      )}
    >
      {content}
    </aside>
  );
}
