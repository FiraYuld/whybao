import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistStore {
  items: string[];
  add: (slug: string) => void;
  remove: (slug: string) => void;
  toggle: (slug: string) => void;
  has: (slug: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (slug) =>
        set((state) =>
          state.items.includes(slug)
            ? state
            : { items: [...state.items, slug] }
        ),
      remove: (slug) =>
        set((state) => ({
          items: state.items.filter((s) => s !== slug),
        })),
      toggle: (slug) =>
        set((state) =>
          state.items.includes(slug)
            ? { items: state.items.filter((s) => s !== slug) }
            : { items: [...state.items, slug] }
        ),
      has: (slug) => get().items.includes(slug),
    }),
    { name: "whybao-wishlist" }
  )
);
