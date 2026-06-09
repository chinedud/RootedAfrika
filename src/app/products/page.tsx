import { Suspense } from "react";
import { ProductsPageSkeleton } from "@/components/products/ProductsPageSkeleton";
import { getProducts } from "@/actions/products";
import { ProductsPageContent } from "./ProductsPageContent";
import type { Product, ProductCategory } from "@/types";

export const metadata = {
  title: "Shop",
};

export default async function ProductsPage() {
  const dbProducts = await getProducts();

  const products: Product[] = dbProducts.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.name.toLowerCase().replace(/\s+/g, "-"),
    price: p.price,
    category: (p.category as ProductCategory) || "fruits",
    description: p.description || "",
    image: p.image_url || "",
    rating: 0,
    inStock: p.is_in_stock,
  }));

  return (
    <div className="bg-white">
      <div className="border-b border-black/10 bg-neutral-900/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-brand-black sm:text-4xl">
            Shop All Products
          </h1>
          <p className="mt-2 text-black/60">
            Browse our full range of fruits, vegetables, and spices.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Suspense fallback={<ProductsPageSkeleton />}>
          <ProductsPageContent allProducts={products} />
        </Suspense>
      </div>
    </div>
  );
}
