import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, CartLine, Product, ProductCategory } from "@/types";
import * as cartActions from "@/actions/cart";

interface CartState {
  items: CartLine[];
  isSynced: boolean;

  addToCart: (product: Product, quantity?: number) => void;
  addItem: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
  getCartItems: () => CartItem[];

  syncCartWithDatabase: (userId: string) => Promise<void>;
  setIsSynced: (val: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isSynced: false,

      addToCart: (product, quantity = 1) => {
        if (product.inStock === false) return;
        if (quantity < 1) return;

        if (get().isSynced) {
          cartActions.addToCart(product.id, quantity).catch(() => {});
        }

        set((state) => {
          const existing = state.items.find(
            (line) => line.productId === product.id,
          );

          if (existing) {
            return {
              items: state.items.map((line) =>
                line.productId === product.id
                  ? { ...line, quantity: line.quantity + quantity }
                  : line,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                quantity,
                name: product.name,
                price: product.price,
                image_url: product.image,
                category: product.category,
              },
            ],
          };
        });
      },

      addItem(product, quantity) {
        get().addToCart(product, quantity);
      },

      removeFromCart: (productId) => {
        if (get().isSynced) {
          (async () => {
            const cart = await cartActions.getCartItems();
            const dbItem = cart?.find((c: { product_id: string }) => c.product_id === productId);
            if (dbItem) {
              cartActions.removeFromCart(dbItem.id).catch(() => {});
            }
          })();
        }

        set((state) => ({
          items: state.items.filter((line) => line.productId !== productId),
        }));
      },

      removeItem(productId) {
        get().removeFromCart(productId);
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) {
          get().removeFromCart(productId);
          return;
        }

        if (get().isSynced) {
          (async () => {
            const cart = await cartActions.getCartItems();
            const dbItem = cart?.find((c: { product_id: string }) => c.product_id === productId);
            if (dbItem) {
              cartActions
                .updateCartItemQuantity(dbItem.id, quantity)
                .catch(() => {});
            }
          })();
        }

        set((state) => ({
          items: state.items.map((line) =>
            line.productId === productId ? { ...line, quantity } : line,
          ),
        }));
      },

      clearCart: () => {
        if (get().isSynced) {
          cartActions.clearCart().catch(() => {});
        }

        set({ items: [] });
      },

      getItemCount: () =>
        get().items.reduce((sum, line) => sum + line.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce((sum, line) => {
          return sum + (line.price ?? 0) * line.quantity;
        }, 0),

      getCartItems: () =>
        get()
          .items.map((line): CartItem | null => {
            if (!line.name) return null;
            return {
              product: {
                id: line.productId,
                name: line.name,
                slug: line.name.toLowerCase().replace(/\s+/g, "-"),
                price: line.price ?? 0,
                category: (line.category as ProductCategory) || "fruits",
                description: "",
                image: line.image_url ?? "",
                rating: 0,
                inStock: true,
              },
              quantity: line.quantity,
            };
          })
          .filter((item): item is CartItem => item !== null),

      syncCartWithDatabase: async () => {
        try {
          const dbCart = await cartActions.getCartItems();
          if (dbCart && dbCart.length > 0) {
            const lines: CartLine[] = dbCart.map((item: { product_id: string; quantity: number; products: { name: string; price: number; image_url: string | null; category: string | null } | null }) => ({
              productId: item.product_id,
              quantity: item.quantity,
              name: item.products?.name || "",
              price: item.products?.price || 0,
              image_url: item.products?.image_url || null,
              category: item.products?.category || null,
            }));
            set({ items: lines, isSynced: true });
          } else {
            const localItems = get().items;
            for (const line of localItems) {
              try {
                await cartActions.addToCart(line.productId, line.quantity);
              } catch {
                // skip
              }
            }
            set({ isSynced: true });
          }
        } catch {
          set({ isSynced: false });
        }
      },

      setIsSynced: (val) => set({ isSynced: val }),
    }),
    {
      name: "afrifresh-cart",
      version: 2,
      partialize: (state) => ({
        items: state.items.map((line) => ({
          productId: line.productId,
          quantity: line.quantity,
          name: line.name,
          price: line.price,
          image_url: line.image_url,
          category: line.category,
        })),
      }),
    },
  ),
);
