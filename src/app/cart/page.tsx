"use client";

import { CartLineItem } from "@/components/cart/CartLineItem";
import { CheckoutSteps } from "@/components/cart/CheckoutSteps";
import { EmptyCartState } from "@/components/cart/EmptyCartState";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { useCart } from "@/hooks/use-cart";

export default function CartPage() {
  const {
    lines,
    subtotal,
    shipping,
    total,
    itemCount,
    updateQuantity,
    removeItem,
    clearCart,
    isEmpty,
  } = useCart();

  const handleClearCart = () => {
    if (
      window.confirm(
        "Remove all items from your cart? This cannot be undone."
      )
    ) {
      clearCart();
    }
  };

  if (isEmpty) {
    return (
      <div className="bg-white">
        <div className="border-b border-black/10 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <CheckoutSteps current="cart" />
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <EmptyCartState />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="border-b border-black/10 bg-surface-default/50 py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CheckoutSteps current="cart" className="mb-8" />
          <h1 className="font-display text-3xl font-bold text-brand-black sm:text-4xl">
            Your Cart
          </h1>
          <p className="mt-2 text-black/60">
            Review your items before checkout
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          <ul className="space-y-4 lg:col-span-2">
            {lines.map((line) => (
              <li key={line.product.id}>
                <CartLineItem
                  line={line}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              </li>
            ))}
          </ul>

          <OrderSummary
            lines={lines}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            itemCount={itemCount}
            variant="cart"
            onClearCart={handleClearCart}
          />
        </div>
      </div>
    </div>
  );
}
