import Link from "next/link";
import { ProductGrid } from "@/components/products/ProductGrid";
import type { Product } from "@/types";

export function FeaturedProducts({ products }: { products: Product[] }) {
  const featured = products.slice(0, 6);

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold text-brand-black sm:text-4xl">
              Featured Products
            </h2>
            <p className="mt-2 text-black/60">
              Our most loved picks, fresh and ready for your table.
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-brand-gold transition-colors hover:text-brand-gold-light"
          >
            View all →
          </Link>
        </div>
        <div className="mt-10">
          <ProductGrid products={featured} columns={3} />
        </div>
      </div>
    </section>
  );
}
