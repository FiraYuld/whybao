import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (
    productId: string,
    size: string,
    color: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

const findItemIndex = (
  items: CartItem[],
  productId: string,
  size: string,
  color: string
) =>
  items.findIndex(
    (i) => i.productId === productId && i.size === size && i.color === color
  );

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, quantity = 1) =>
        set((state) => {
          const idx = findItemIndex(
            state.items,
            item.productId,
            item.size,
            item.color
          );
          const newItems =
            idx >= 0
              ? state.items.map((i, iIdx) =>
                  iIdx === idx
                    ? { ...i, quantity: i.quantity + quantity }
                    : i
                )
              : [...state.items, { ...item, quantity }];
          return { items: newItems };
        }),
      removeItem: (productId, size, color) =>
        set((state) => ({
          items: state.items.filter(
            (i) =>
              !(i.productId === productId && i.size === size && i.color === color)
          ),
        })),
      updateQuantity: (productId, size, color, quantity) =>
        set((state) => {
          const idx = findItemIndex(state.items, productId, size, color);
          if (idx < 0) return state;
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (i) =>
                  !(
                    i.productId === productId &&
                    i.size === size &&
                    i.color === color
                  )
              ),
            };
          }
          return {
            items: state.items.map((i, iIdx) =>
              iIdx === idx ? { ...i, quantity } : i
            ),
          };
        }),
      clearCart: () => set({ items: [] }),
      totalItems: () =>
        get().items.reduce((acc, i) => acc + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),
    }),
    { name: "whybao-cart" }
  )
);
