import { ProductGridSkeleton } from "@/components/products/ProductGridSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";

interface ProductsPageSkeletonProps {
  gridCount?: number;
  columns?: 2 | 3 | 4;
}

/** Full shop content skeleton: category pills + product grid */
export function ProductsPageSkeleton({
  gridCount = 8,
  columns = 4,
}: ProductsPageSkeletonProps) {
  return (
    <div className="space-y-8" aria-busy="true" aria-label="Loading shop">
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-10 w-14 rounded-full" />
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-28 rounded-full" />
        ))}
      </div>

      {/* Optional results line */}
      <Skeleton className="h-4 w-48" />

      <ProductGridSkeleton count={gridCount} columns={columns} />
    </div>
  );
}
