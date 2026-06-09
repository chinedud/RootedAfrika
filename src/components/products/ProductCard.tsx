"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Eye, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { CATEGORY_LABELS, type Product } from "@/types";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addToCart = useCartStore((s) => s.addToCart);
  const [justAdded, setJustAdded] = useState(false);

  const inStock = product.inStock !== false;

  const handleAddToCart = () => {
    if (!inStock) return;
    addToCart(product);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white transition-all duration-300",
        "hover:border-brand-gold/40 hover:shadow-xl hover:shadow-brand-gold/10",
        !inStock && "opacity-75",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <Link
          href={`/products/${product.slug}`}
          className="block h-full w-full"
          aria-label={`View ${product.name}`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {/* Badges */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          <span className="w-fit rounded-full border border-black/10 bg-black/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-gold backdrop-blur-sm">
            {CATEGORY_LABELS[product.category]}
          </span>
          {product.featured && (
            <span className="w-fit rounded-full bg-brand-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              Featured
            </span>
          )}
        </div>

        {!inStock && (
          <span className="absolute right-3 top-3 rounded-full bg-black/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-black/70 backdrop-blur-sm">
            Sold out
          </span>
        )}

        {/* Hover overlay — desktop */}
        <div
          className={cn(
            "absolute inset-0 flex items-end justify-center gap-2 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4",
            "opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            "max-sm:opacity-100 max-sm:bg-gradient-to-t max-sm:from-black/60 max-sm:via-transparent"
          )}
        >
          <Link
            href={`/products/${product.slug}`}
            className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/10 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-brand-gold hover:text-brand-gold"
          >
            <Eye className="h-4 w-4" aria-hidden />
            Details
          </Link>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!inStock || justAdded}
            className={cn(
              "flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg text-sm font-semibold transition-colors",
              justAdded
                ? "bg-emerald-600/90 text-white"
                : "bg-brand-gold text-white hover:bg-brand-gold-light",
              !inStock && "cursor-not-allowed opacity-50"
            )}
            aria-label={justAdded ? "Added to cart" : `Add ${product.name} to cart`}
          >
            {justAdded ? (
              <>
                <Check className="h-4 w-4" aria-hidden />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" aria-hidden />
                Add
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="line-clamp-2 font-semibold leading-snug text-brand-black transition-colors group-hover:text-brand-gold">
            {product.name}
          </h3>
        </Link>

        <StarRating rating={product.rating} className="mt-2" />

        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-black/50">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-black/10 pt-4">
          <p className="text-lg font-bold text-brand-gold">
            {formatPrice(product.price)}
          </p>
          <Link
            href={`/products/${product.slug}`}
            className="text-xs font-medium text-black/50 transition-colors hover:text-brand-gold sm:hidden"
          >
            View &rarr;
          </Link>
        </div>

        <Button
          variant="primary"
          size="sm"
          fullWidth
          className="mt-3 sm:mt-4"
          onClick={handleAddToCart}
          disabled={!inStock || justAdded}
        >
          {justAdded ? (
            <>
              <Check className="h-4 w-4" aria-hidden />
              Added to Cart
            </>
          ) : !inStock ? (
            "Out of Stock"
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" aria-hidden />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    </article>
  );
}
