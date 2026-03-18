import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  slug: string;
  title: string;
  price: number;
  isFree: boolean;
  thumbnailUrl?: string | null;
  instructor: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        if (!get().isInCart(item.id)) {
          set((state) => ({ items: [...state.items, item] }));
        }
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
      },

      clearCart: () => set({ items: [] }),

      isInCart: (id) => get().items.some((i) => i.id === id),

      total: () => get().items.reduce((sum, item) => sum + item.price, 0),
    }),
    { name: "coursidllm-cart" }
  )
);
