import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FreeShippingBar } from "@/components/cart/FreeShippingBar";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CartLineWithProduct } from "@/hooks/use-cart";

interface OrderSummaryProps {
  lines: CartLineWithProduct[];
  subtotal: number;
  shipping: number;
  total: number;
  itemCount: number;
  variant?: "cart" | "checkout";
  onClearCart?: () => void;
  className?: string;
}

export function OrderSummary({
  lines,
  subtotal,
  shipping,
  total,
  itemCount,
  variant = "cart",
  onClearCart,
  className,
}: OrderSummaryProps) {
  const lineCount = lines.length;

  return (
    <aside
      className={cn(
        "h-fit rounded-2xl border border-brand-gold/25 bg-surface-raised/90 p-6 shadow-xl shadow-black/20 lg:sticky lg:top-24",
        className
      )}
    >
      <h2 className="text-lg font-semibold text-brand-black">Order Summary</h2>
      <p className="mt-1 text-sm text-black/50">
        {itemCount} item{itemCount !== 1 ? "s" : ""} · {lineCount} product
        {lineCount !== 1 ? "s" : ""}
      </p>

      {variant === "cart" && subtotal > 0 && (
        <FreeShippingBar subtotal={subtotal} className="mt-4" />
      )}

      <dl className="mt-5 space-y-3 border-b border-black/10 pb-5">
        <div className="flex justify-between text-sm">
          <dt className="text-black/60">Subtotal</dt>
          <dd className="font-medium text-brand-black">
            {formatPrice(subtotal)}
          </dd>
        </div>
        <div className="flex justify-between text-sm">
          <dt className="text-black/60">Delivery</dt>
          <dd className="font-medium text-brand-black">
            {shipping === 0 ? (
              <span className="text-brand-gold">Free</span>
            ) : (
              formatPrice(shipping)
            )}
          </dd>
        </div>
      </dl>

      <div className="mt-4 flex justify-between text-lg font-bold">
        <span className="text-brand-black">Total</span>
        <span className="text-brand-gold">{formatPrice(total)}</span>
      </div>

      {variant === "cart" ? (
        <>
          <Link href="/checkout" className="mt-6 block">
            <Button variant="primary" size="lg" fullWidth className="group">
              Proceed to Checkout
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Button>
          </Link>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-black/40">
            <Lock className="h-3 w-3" aria-hidden />
            Secure demo checkout
          </p>
          <Link
            href="/products"
            className="mt-3 block text-center text-sm text-brand-gold transition-colors hover:text-brand-gold-light"
          >
            Continue Shopping
          </Link>
          {onClearCart && lineCount > 0 && (
            <button
              type="button"
              onClick={onClearCart}
              className="mt-4 w-full text-center text-xs text-black/40 transition-colors hover:text-red-400"
            >
              Clear cart
            </button>
          )}
        </>
      ) : (
        <div className="mt-5 space-y-2 border-t border-black/10 pt-5">
          <p className="text-xs font-medium uppercase tracking-wider text-black/40">
            Items ({itemCount})
          </p>
          <ul className="max-h-48 space-y-3 overflow-y-auto pr-1">
            {lines.map(({ product, quantity, lineTotal }) => (
              <li
                key={product.id}
                className="flex justify-between gap-2 text-sm"
              >
                <span className="min-w-0 truncate text-black/70">
                  {product.name}{" "}
                  <span className="text-black/40">×{quantity}</span>
                </span>
                <span className="shrink-0 font-medium text-brand-gold">
                  {formatPrice(lineTotal)}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/cart"
            className="block text-center text-sm text-brand-gold hover:text-brand-gold-light"
          >
            Edit cart
          </Link>
        </div>
      )}
    </aside>
  );
}
