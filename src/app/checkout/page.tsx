"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  CreditCard,
  Home,
  Package,
  ShoppingBag,
} from "lucide-react";
import { CheckoutSteps } from "@/components/cart/CheckoutSteps";
import { EmptyCartState } from "@/components/cart/EmptyCartState";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { useCart } from "@/hooks/use-cart";
import { generateOrderId, STANDARD_SHIPPING_COST } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

type DeliveryOption = "standard" | "express";

const EXPRESS_SURCHARGE = 2.99;

export default function CheckoutPage() {
  const router = useRouter();
  const {
    lines,
    subtotal,
    shipping,
    total,
    itemCount,
    clearCart,
    isEmpty,
  } = useCart();

  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [delivery, setDelivery] = useState<DeliveryOption>("standard");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const expressShipping =
    delivery === "express" && subtotal > 0
      ? shipping + EXPRESS_SURCHARGE
      : shipping;
  const orderTotal =
    delivery === "express" && subtotal > 0
      ? subtotal + expressShipping
      : total;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network delay for a more realistic flow
    await new Promise((r) => setTimeout(r, 800));

    setOrderId(generateOrderId());
    setSubmitted(true);
    clearCart();
    setIsSubmitting(false);
  };

  if (isEmpty && !submitted) {
    return (
      <div className="bg-white">
        <div className="border-b border-black/10 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <CheckoutSteps current="checkout" />
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <EmptyCartState
            title="Nothing to checkout"
            description="Your cart is empty. Add some products before completing your order."
            actionLabel="Shop Products"
          />
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-white">
        <div className="border-b border-black/10 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <CheckoutSteps current="confirmation" />
          </div>
        </div>
        <div className="mx-auto max-w-lg px-4 py-16 sm:px-6 sm:py-20">
          <div className="rounded-2xl border border-brand-gold/30 bg-surface-raised p-8 text-center sm:p-10">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold/15">
              <CheckCircle2
                className="h-9 w-9 text-brand-gold"
                strokeWidth={1.75}
              />
            </span>
            <h1 className="mt-6 font-display text-2xl font-bold text-brand-black sm:text-3xl">
              Order confirmed
            </h1>
            <p className="mt-2 text-sm text-black/50">
              Order reference
            </p>
            <p className="mt-1 font-mono text-lg font-semibold text-brand-gold">
              {orderId}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-black/60">
              Thank you for shopping with Rooted Afrika. This is a demo
              checkout — no payment was processed. You&apos;ll receive a
              confirmation email in a real deployment.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                variant="primary"
                size="lg"
                className="group"
                onClick={() => router.push("/products")}
              >
                <ShoppingBag className="h-4 w-4" aria-hidden />
                Continue Shopping
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/")}
              >
                <Home className="h-4 w-4" aria-hidden />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="border-b border-black/10 bg-surface-default/50 py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CheckoutSteps current="checkout" className="mb-8" />
          <h1 className="font-display text-3xl font-bold text-brand-black sm:text-4xl">
            Checkout
          </h1>
          <p className="mt-2 text-black/60">
            Complete your details to place your order
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="grid gap-10 lg:grid-cols-5 lg:gap-12"
        >
          <div className="space-y-8 lg:col-span-3">
            {/* Shipping */}
            <section className="rounded-2xl border border-black/10 bg-surface-raised/50 p-6 sm:p-8">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-brand-gold">
                <Package className="h-5 w-5" aria-hidden />
                Shipping information
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <FormField
                  label="First name"
                  name="firstName"
                  required
                  autoComplete="given-name"
                />
                <FormField
                  label="Last name"
                  name="lastName"
                  required
                  autoComplete="family-name"
                />
              </div>
              <div className="mt-4 grid gap-4">
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@email.com"
                />
                <FormField
                  label="Phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+44 7XXX XXXXXX"
                />
                <FormField
                  label="Address"
                  name="address"
                  required
                  autoComplete="street-address"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    label="City"
                    name="city"
                    required
                    autoComplete="address-level2"
                  />
                  <FormField
                    label="Postcode"
                    name="postcode"
                    required
                    autoComplete="postal-code"
                  />
                </div>
                <FormField
                  label="Country"
                  name="country"
                  defaultValue="United Kingdom"
                  required
                  autoComplete="country-name"
                />
                <FormField
                  label="Delivery notes (optional)"
                  name="notes"
                  placeholder="Gate code, leave at door, etc."
                />
              </div>
            </section>

            {/* Delivery method */}
            <section className="rounded-2xl border border-black/10 bg-surface-raised/50 p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-brand-gold">
                Delivery method
              </h2>
              <div className="mt-4 space-y-3">
                <DeliveryOptionCard
                  id="standard"
                  name="delivery"
                  label="Standard delivery"
                  description="3–5 business days"
                  price={
                    shipping === 0 ? "Free" : formatPrice(STANDARD_SHIPPING_COST)
                  }
                  checked={delivery === "standard"}
                  onChange={() => setDelivery("standard")}
                />
                <DeliveryOptionCard
                  id="express"
                  name="delivery"
                  label="Express delivery"
                  description="1–2 business days"
                  price={
                    shipping === 0
                      ? formatPrice(EXPRESS_SURCHARGE)
                      : formatPrice(STANDARD_SHIPPING_COST + EXPRESS_SURCHARGE)
                  }
                  checked={delivery === "express"}
                  onChange={() => setDelivery("express")}
                />
              </div>
            </section>

            {/* Payment demo */}
            <section className="rounded-2xl border border-black/10 bg-surface-raised/50 p-6 sm:p-8">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-brand-gold">
                <CreditCard className="h-5 w-5" aria-hidden />
                Payment
              </h2>
              <p className="mt-2 text-sm text-black/50">
                Demo mode — no card will be charged. In production, connect
                Stripe or your payment provider here.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <FormField
                  label="Card number"
                  name="cardNumber"
                  placeholder="4242 4242 4242 4242"
                  defaultValue="4242 4242 4242 4242"
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Expiry"
                    name="expiry"
                    placeholder="MM/YY"
                    defaultValue="12/28"
                  />
                  <FormField
                    label="CVC"
                    name="cvc"
                    placeholder="123"
                    defaultValue="123"
                  />
                </div>
              </div>
            </section>

            <div className="lg:hidden">
              <CheckoutOrderReview lines={lines} />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Placing order…"
                : `Place order — ${formatPrice(orderTotal)}`}
            </Button>
            <p className="text-center text-xs text-black/40 lg:hidden">
              By placing your order you agree to our demo terms. No payment
              processed.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="hidden lg:block">
              <CheckoutOrderReview lines={lines} />
            </div>
            <OrderSummary
              lines={lines}
              subtotal={subtotal}
              shipping={expressShipping}
              total={orderTotal}
              itemCount={itemCount}
              variant="checkout"
              className="mt-6"
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              className="mt-6 hidden lg:flex"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Placing order…"
                : `Place order — ${formatPrice(orderTotal)}`}
            </Button>
            <p className="mt-3 hidden text-center text-xs text-black/40 lg:block">
              Secure demo checkout · No payment processed
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

function CheckoutOrderReview({
  lines,
}: {
  lines: ReturnType<typeof useCart>["lines"];
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-black/[0.03] p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-black/50">
        Your items
      </h3>
      <ul className="mt-4 space-y-4">
        {lines.map(({ product, quantity, lineTotal }) => (
          <li key={product.id} className="flex gap-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-brand-black">
                {product.name}
              </p>
              <p className="text-xs text-black/50">Qty {quantity}</p>
            </div>
            <p className="shrink-0 text-sm font-semibold text-brand-gold">
              {formatPrice(lineTotal)}
            </p>
          </li>
        ))}
      </ul>
      <Link
        href="/cart"
        className="mt-4 inline-block text-sm text-brand-gold hover:text-brand-gold-light"
      >
        ← Back to cart
      </Link>
    </div>
  );
}

function DeliveryOptionCard({
  id,
  name,
  label,
  description,
  price,
  checked,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  description: string;
  price: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors",
        checked
          ? "border-brand-gold/50 bg-brand-gold/10"
          : "border-black/10 bg-black/[0.02] hover:border-black/20"
      )}
    >
      <input
        type="radio"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-brand-gold"
      />
      <div className="min-w-0 flex-1">
        <span className="font-medium text-brand-black">{label}</span>
        <p className="text-sm text-black/50">{description}</p>
      </div>
      <span className="shrink-0 text-sm font-semibold text-brand-gold">
        {price}
      </span>
    </label>
  );
}
