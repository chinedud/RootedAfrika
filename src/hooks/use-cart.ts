"use client";

import { useMemo } from "react";
import {
  getOrderTotal,
  getShippingCost,
  getFreeShippingRemaining,
} from "@/lib/cart";
import { useCartStore } from "@/store/cartStore";
import type { Product, ProductCategory } from "@/types";

export interface CartLineWithProduct {
  product: Product;
  quantity: number;
  lineTotal: number;
}

export function useCart() {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const getItemCount = useCartStore((s) => s.getItemCount);

  const lines = useMemo((): CartLineWithProduct[] => {
    return items.map((line) => {
      const product: Product = {
        id: line.productId,
        name: line.name ?? "Unknown Product",
        slug: (line.name ?? "unknown-product").toLowerCase().replace(/\s+/g, "-"),
        price: line.price ?? 0,
        category: (line.category as ProductCategory) || "fruits",
        description: "",
        image: line.image_url ?? "",
        rating: 0,
        inStock: true,
      };
      return {
        product,
        quantity: line.quantity,
        lineTotal: product.price * line.quantity,
      };
    });
  }, [items]);

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.lineTotal, 0),
    [lines]
  );

  const shipping = useMemo(() => getShippingCost(subtotal), [subtotal]);

  const total = useMemo(() => getOrderTotal(subtotal), [subtotal]);

  const freeShippingRemaining = useMemo(
    () => getFreeShippingRemaining(subtotal),
    [subtotal]
  );

  const itemCount = getItemCount();

  return {
    lines,
    subtotal,
    shipping,
    total,
    freeShippingRemaining,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isEmpty: lines.length === 0,
  };
}
