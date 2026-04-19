"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@/lib/products";

export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  color: string;
  quantity: number;
};

type CartState = {
  items: CartLine[];
  addItem: (product: Product, color: string, quantity?: number) => void;
  removeItem: (productId: string, color: string) => void;
  updateQuantity: (productId: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
};

function lineKey(productId: string, color: string) {
  return `${productId}::${color}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, color, quantity = 1) => {
        set((state) => {
          const existing = state.items.find(
            (i) => lineKey(i.productId, i.color) === lineKey(product.id, color),
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                lineKey(i.productId, i.color) === lineKey(product.id, color)
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                slug: product.slug,
                name: product.name,
                image: product.images[0] ?? "",
                price: product.price,
                color,
                quantity,
              },
            ],
          };
        });
      },
      removeItem: (productId, color) => {
        set((state) => ({
          items: state.items.filter(
            (i) => lineKey(i.productId, i.color) !== lineKey(productId, color),
          ),
        }));
      },
      updateQuantity: (productId, color, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId, color);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            lineKey(i.productId, i.color) === lineKey(productId, color)
              ? { ...i, quantity }
              : i,
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: "polarebikes-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
