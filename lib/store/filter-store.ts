import { create } from "zustand";

export type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "popular";

interface FilterStore {
  priceMin: number | null;
  priceMax: number | null;
  brands: string[];
  categories: string[];
  sizes: string[];
  colors: string[];
  sortBy: SortOption;
  setPriceRange: (min: number | null, max: number | null) => void;
  toggleBrand: (brand: string) => void;
  toggleCategory: (category: string) => void;
  toggleSize: (size: string) => void;
  toggleColor: (color: string) => void;
  setSortBy: (sort: SortOption) => void;
  resetFilters: () => void;
}

const initialState = {
  priceMin: null as number | null,
  priceMax: null as number | null,
  brands: [] as string[],
  categories: [] as string[],
  sizes: [] as string[],
  colors: [] as string[],
  sortBy: "default" as SortOption,
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialState,
  setPriceRange: (priceMin, priceMax) => set({ priceMin, priceMax }),
  toggleBrand: (brand) =>
    set((state) => ({
      brands: state.brands.includes(brand)
        ? state.brands.filter((b) => b !== brand)
        : [...state.brands, brand],
    })),
  toggleCategory: (category) =>
    set((state) => ({
      categories: state.categories.includes(category)
        ? state.categories.filter((c) => c !== category)
        : [...state.categories, category],
    })),
  toggleSize: (size) =>
    set((state) => ({
      sizes: state.sizes.includes(size)
        ? state.sizes.filter((s) => s !== size)
        : [...state.sizes, size],
    })),
  toggleColor: (color) =>
    set((state) => ({
      colors: state.colors.includes(color)
        ? state.colors.filter((c) => c !== color)
        : [...state.colors, color],
    })),
  setSortBy: (sortBy) => set({ sortBy }),
  resetFilters: () => set(initialState),
}));
