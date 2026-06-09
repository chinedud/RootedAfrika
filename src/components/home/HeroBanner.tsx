import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Leaf,
  Sparkles,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { categoryNavLinks } from "@/components/layout/nav-config";

import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1920&q=85";

const trustBadges = [
  { icon: Leaf, label: "Farm Fresh" },
  { icon: Truck, label: "Fast Delivery" },
  { icon: Award, label: "Premium Quality" },
] as const;

export function HeroBanner({ products }: { products: Product[] }) {
  const spotlight = products[0] ?? null;

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-neutral-50">
      {/* Background */}
      <Image
        src={HERO_IMAGE}
        alt="Colourful fresh African fruits and vegetables"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-white/65" />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/30" />

      {/* Pink accent lines */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
      <div className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-brand-gold/8 blur-3xl" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div className="max-w-xl">
            <p className="animate-hero-fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Premium African Produce
            </p>

            <h1 className="animate-hero-fade-up-delay-1 font-display text-4xl font-bold leading-[1.1] tracking-tight text-brand-black sm:text-5xl lg:text-6xl">
              Fresh flavours from{" "}
              <span className="relative inline-block text-brand-gold">
                across Africa
                <span
                  className="absolute -bottom-1 left-0 h-0.5 w-full bg-brand-gold/60"
                  aria-hidden
                />
              </span>
            </h1>

            <p className="animate-hero-fade-up-delay-2 mt-6 text-base leading-relaxed text-black/60 sm:text-lg">
              Hand-picked fruits, vegetables, and organic spices &mdash; sourced with
              care and delivered so your kitchen tastes like home.
            </p>

            <div className="animate-hero-fade-up-delay-3 mt-10 flex flex-wrap gap-4">
              <Link href="/products">
                <Button variant="primary" size="lg" className="group">
                  Shop Now
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Button>
              </Link>
              <Link href="/products?category=spices">
                <Button variant="outline" size="lg">
                  Explore Spices
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <ul className="animate-hero-fade-up-delay-3 mt-10 flex flex-wrap gap-6 border-t border-black/10 pt-8">
              {trustBadges.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-sm text-black/50"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-gold/25 bg-brand-gold/10">
                    <Icon
                      className="h-4 w-4 text-brand-gold"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Spotlight product card — desktop */}
          {spotlight && (
            <div className="hidden lg:block">
              <HeroSpotlightCard product={spotlight} />
            </div>
          )}
        </div>

        {/* Category shortcuts */}
        <div className="animate-hero-fade-up-delay-3 mt-14 lg:mt-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-black/40">
            Shop by category
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Link
              href="/products"
              className="rounded-full border border-brand-gold bg-brand-gold px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-gold-light"
            >
              All Products
            </Link>
            {categoryNavLinks.map((cat) => (
              <Link
                key={cat.category}
                href={cat.href}
                className="rounded-full border border-black/15 bg-black/5 px-4 py-2 text-sm font-medium text-black/70 transition-colors hover:border-brand-gold/50 hover:text-brand-gold"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile spotlight — below fold on small screens */}
      {spotlight && (
        <div className="relative border-t border-black/10 bg-white/80 px-4 py-8 backdrop-blur-sm lg:hidden">
          <div className="mx-auto max-w-md">
            <HeroSpotlightCard product={spotlight} compact />
          </div>
        </div>
      )}
    </section>
  );
}

function HeroSpotlightCard({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        "group block animate-hero-float overflow-hidden rounded-2xl border border-black/10 bg-white/90 shadow-2xl shadow-black/10 backdrop-blur-md transition-colors hover:border-brand-gold/40",
        compact ? "" : "max-w-md lg:ml-auto"
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 420px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-brand-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Featured
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-semibold text-brand-black group-hover:text-brand-gold">
              {product.name}
            </h2>
            <StarRating rating={product.rating} className="mt-2" size="md" />
          </div>
          <p className="shrink-0 text-lg font-bold text-brand-gold">
            {formatPrice(product.price)}
          </p>
        </div>
        <p className="mt-3 line-clamp-2 text-sm text-black/50">
          {product.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-gold">
          View product
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
