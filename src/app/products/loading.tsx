import { ProductsPageSkeleton } from "@/components/products/ProductsPageSkeleton";

export default function ProductsLoading() {
  return (
    <div className="bg-white">
      <div className="border-b border-black/10 bg-neutral-900/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-9 w-64 max-w-full animate-pulse rounded-lg bg-black/10 sm:h-10" />
          <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded bg-black/10" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <ProductsPageSkeleton />
      </div>
    </div>
  );
}
