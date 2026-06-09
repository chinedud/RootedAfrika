"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { CategoryFilter } from "@/components/products/CategoryFilter";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Product } from "@/types/product";

interface ProductsPageContentProps {
  allProducts: Product[];
}

export function ProductsPageContent({
  allProducts,
}: ProductsPageContentProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const query = searchParams.get("q")?.toLowerCase().trim();

  const filtered = useMemo(() => {
    let result = allProducts;

    if (category && category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (query) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [allProducts, category, query]);

  return (
    <div className="space-y-8">
      <CategoryFilter />
      {query && (
          <p className="text-sm text-black/60">
          Showing results for &quot;{query}&quot; ({filtered.length} products)
        </p>
      )}
      <ProductGrid
        products={filtered}
        emptyMessage="No products match your filters. Try a different category or search term."
      />
    </div>
  );
}
