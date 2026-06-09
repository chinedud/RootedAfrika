import Link from "next/link";
import { PackageOpen } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

type GridColumns = 2 | 3 | 4;

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  /** Default: 4 columns on xl */
  columns?: GridColumns;
  className?: string;
  /** Show skeleton placeholders instead of products */
  isLoading?: boolean;
  /** Skeleton card count when `isLoading` is true */
  skeletonCount?: number;
}

const columnClasses: Record<GridColumns, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export function ProductGrid({
  products,
  emptyMessage = "No products found.",
  columns = 4,
  className,
  isLoading = false,
  skeletonCount = 8,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <ProductGridSkeleton
        count={skeletonCount}
        columns={columns}
        className={className}
      />
    );
  }

  if (products.length === 0) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/15 bg-black/[0.02] px-6 py-20 text-center",
          className
        )}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-black/5">
          <PackageOpen
            className="h-7 w-7 text-brand-gold/70"
            strokeWidth={1.5}
            aria-hidden
          />
        </span>
        <p className="mt-5 max-w-sm text-base text-black/60">{emptyMessage}</p>
        <Link href="/products" className="mt-6">
          <Button variant="outline" size="md">
            Browse all products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:gap-7",
        columnClasses[columns],
        className
      )}
      role="list"
    >
      {products.map((product) => (
        <div key={product.id} role="listitem">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
