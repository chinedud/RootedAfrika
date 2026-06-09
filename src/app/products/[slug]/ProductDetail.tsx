"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Leaf,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { QuantitySelector } from "@/components/cart/QuantitySelector";
import { ProductImageGallery } from "@/components/products/ProductImageGallery";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/cartStore";
import { CATEGORY_LABELS, type Product } from "@/types";

interface ProductDetailProps {
  product: Product;
}

const trustPoints = [
  { icon: Leaf, text: "Farm-fresh quality" },
  { icon: Truck, text: "Careful packaging" },
  { icon: ShieldCheck, text: "Satisfaction guaranteed" },
] as const;

export function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter();
  const addToCart = useCartStore((s) => s.addToCart);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const inStock = product.inStock !== false;
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const lineTotal = product.price * quantity;
  const categoryLabel = CATEGORY_LABELS[product.category];
  const categoryHref = `/products?category=${product.category}`;

  const handleAddToCart = () => {
    if (!inStock) return;
    addToCart(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2500);
  };

  const handleBuyNow = () => {
    if (!inStock) return;
    addToCart(product, quantity);
    router.push("/checkout");
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-black/10 bg-surface-default/40">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm">
            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-black/50 transition-colors hover:text-brand-gold"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to shop
            </Link>
            <ChevronRight className="h-4 w-4 text-black/30" aria-hidden />
            <Link
              href={categoryHref}
              className="text-black/50 transition-colors hover:text-brand-gold"
            >
              {categoryLabel}
            </Link>
            <ChevronRight className="h-4 w-4 text-black/30" aria-hidden />
            <span className="truncate text-brand-black">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <ProductImageGallery images={images} productName={product.name} />

          {/* Product info */}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={categoryHref}
                className="rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-gold transition-colors hover:bg-brand-gold/20"
              >
                {categoryLabel}
              </Link>
              {product.featured && (
                <span className="rounded-full bg-brand-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-black">
                  Featured
                </span>
              )}
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-brand-black sm:text-4xl lg:text-[2.75rem]">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <StarRating rating={product.rating} size="md" />
              <span className="text-sm text-black/40">|</span>
              <span className="text-sm text-black/50">
                SKU: {product.id.toUpperCase()}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              <p className="text-3xl font-bold text-brand-gold sm:text-4xl">
                {formatPrice(product.price)}
              </p>
              {quantity > 1 && (
                <p className="text-sm text-black/50">
                  {formatPrice(lineTotal)} for {quantity} items
                </p>
              )}
            </div>

            <p className="mt-6 text-base leading-relaxed text-black/70 sm:text-lg">
              {product.description}
            </p>

            {/* Stock */}
            <div className="mt-6">
              {inStock ? (
                <p className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  In stock — ready to ship
                </p>
              ) : (
                <p className="inline-flex items-center gap-2 rounded-lg border border-black/20 bg-black/5 px-3 py-2 text-sm text-black/60">
                  Currently unavailable
                </p>
              )}
            </div>

            {/* Quantity + actions */}
            <div className="mt-8 space-y-4 rounded-2xl border border-black/10 bg-surface-raised/50 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <label className="text-sm font-medium text-black/70">
                  Quantity
                </label>
                <QuantitySelector
                  quantity={quantity}
                  onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                  onIncrease={() => setQuantity((q) => Math.min(99, q + 1))}
                  disabled={!inStock}
                  size="md"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="group sm:flex-1"
                  onClick={handleAddToCart}
                  disabled={!inStock || added}
                >
                  {added ? (
                    <>
                      <Check className="h-5 w-5" aria-hidden />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" aria-hidden />
                      Add to Cart
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  className="group sm:flex-1"
                  onClick={handleBuyNow}
                  disabled={!inStock}
                >
                  <Zap className="h-5 w-5" aria-hidden />
                  Buy Now
                </Button>
              </div>

              <Link
                href="/cart"
                className="block text-center text-sm text-brand-gold transition-colors hover:text-brand-gold-light"
              >
                View cart →
              </Link>
            </div>

            {/* Delivery note */}
            <p className="mt-4 text-sm text-black/50">
              Free delivery on orders over{" "}
              <span className="font-medium text-brand-gold">
                {formatPrice(FREE_SHIPPING_THRESHOLD)}
              </span>
              . Standard delivery &#8358;5,000.
            </p>

            {/* Trust */}
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {trustPoints.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-2.5 rounded-xl border border-black/10 bg-black/[0.02] px-3 py-3 text-sm text-black/60"
                >
                  <Icon
                    className="h-4 w-4 shrink-0 text-brand-gold"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Details tabs / accordion-style sections */}
        <div className="mt-16 grid gap-6 border-t border-black/10 pt-16 lg:grid-cols-3">
          <DetailBlock title="Product details">
            <ul className="space-y-2 text-sm text-black/60">
              <li>
                <span className="text-black/40">Category:</span>{" "}
                <Link
                  href={categoryHref}
                  className="text-brand-gold hover:underline"
                >
                  {categoryLabel}
                </Link>
              </li>
              <li>
                <span className="text-black/40">Origin:</span> Sourced from
                trusted African growers
              </li>
              <li>
                <span className="text-black/40">Storage:</span> Keep cool and
                consume within recommended window
              </li>
            </ul>
          </DetailBlock>
          <DetailBlock title="Delivery">
            <p className="text-sm leading-relaxed text-black/60">
              Orders are packed with care to preserve freshness. Standard
              delivery 3–5 business days; express available at checkout.
            </p>
          </DetailBlock>
          <DetailBlock title="Returns">
            <p className="text-sm leading-relaxed text-black/60">
              Not satisfied? Contact us within 48 hours of delivery for fresh
              produce quality issues. Demo store — policies for illustration.
            </p>
          </DetailBlock>
        </div>
      </div>
    </div>
  );
}

function DetailBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-surface-raised/30 p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
