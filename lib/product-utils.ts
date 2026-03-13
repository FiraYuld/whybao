import { products, type Product } from "@/data/products";
import { useFilterStore } from "@/lib/store/filter-store";

const VISIBLE_PRODUCTS = products.filter((p) => p.category !== "shoes");
const LETTER_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"];
const normalizeSize = (s: string) => s.toUpperCase();

export function getFilteredProducts(
  filters: {
    priceMin: number | null;
    priceMax: number | null;
    brands: string[];
    categories: string[];
    sizes: string[];
    colors: string[];
    sortBy: string;
  },
  searchQuery?: string
): Product[] {
  let result = [...VISIBLE_PRODUCTS];

  if (searchQuery?.trim()) {
    const q = searchQuery.trim().toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (filters.priceMin != null) {
    result = result.filter((p) => p.price >= filters.priceMin!);
  }
  if (filters.priceMax != null) {
    result = result.filter((p) => p.price <= filters.priceMax!);
  }
  if (filters.brands.length > 0) {
    result = result.filter((p) => filters.brands.includes(p.brand));
  }
  if (filters.categories.length > 0) {
    result = result.filter((p) => filters.categories.includes(p.category));
  }
  if (filters.sizes.length > 0) {
    const selected = filters.sizes.map(normalizeSize);
    result = result.filter((p) =>
      p.sizes.some((s) => selected.includes(normalizeSize(s)))
    );
  }
  if (filters.colors.length > 0) {
    result = result.filter((p) =>
      p.colors.some((c) => filters.colors.includes(c.name))
    );
  }

  switch (filters.sortBy) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      result.sort((a, b) =>
        (a.isNew ? 1 : 0) > (b.isNew ? 1 : 0) ? -1 : 1
      );
      break;
    case "popular":
      result.sort((a, b) =>
        (a.isBestseller ? 1 : 0) > (b.isBestseller ? 1 : 0) ? -1 : 1
      );
      break;
    default:
      break;
  }

  return result;
}

export function getProductBySlug(slug: string): Product | undefined {
  return VISIBLE_PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByBrand(brandSlug: string): Product[] {
  return VISIBLE_PRODUCTS.filter((p) => p.brand === brandSlug);
}

export function getNewProducts(limit = 8): Product[] {
  return VISIBLE_PRODUCTS.filter((p) => p.isNew).slice(0, limit);
}

export function getBestsellers(limit = 8): Product[] {
  return VISIBLE_PRODUCTS.filter((p) => p.isBestseller).slice(0, limit);
}

export function getCatalogPreview(limit = 8): Product[] {
  return VISIBLE_PRODUCTS.slice(0, limit);
}
