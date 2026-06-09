import Link from "next/link";
import { ProductGrid } from "@/components/products/ProductGrid";
import type { Product } from "@/types";

interface RelatedProductsProps {
  products: Product[];
  categoryLabel: string;
}

export function RelatedProducts({
  products,
  categoryLabel,
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="border-t border-black/10 bg-surface-default/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-2xl font-bold text-brand-black sm:text-3xl">
              You may also like
            </h2>
            <p className="mt-2 text-black/60">
              More from {categoryLabel} and our collection
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-brand-gold transition-colors hover:text-brand-gold-light"
          >
            View all products →
          </Link>
        </div>
        <div className="mt-10">
          <ProductGrid products={products} columns={4} />
        </div>
      </div>
    </section>
  );
}
