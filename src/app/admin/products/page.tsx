import Link from "next/link";
import { Plus } from "lucide-react";
import { ProductsTable } from "@/components/admin/ProductsTable";
import { Button } from "@/components/ui/Button";
import { getProducts } from "@/actions/products";
import type { Product, ProductCategory } from "@/types";

export const metadata = {
  title: "Products | Admin",
};

export default async function AdminProductsPage() {
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-shad-foreground sm:text-2xl">Products</h1>
          <p className="mt-1 text-sm text-shad-muted-foreground">
            Manage your product catalog
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button variant="primary" className="gap-2 bg-pink-500 hover:bg-pink-600 text-white border-none">
            <Plus className="h-4 w-4" />
            Add New Product
          </Button>
        </Link>
      </div>
      <ProductsTable allProducts={products} />
    </div>
  );
}
