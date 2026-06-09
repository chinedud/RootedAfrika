import { notFound } from "next/navigation";
import { AddProductForm } from "@/components/admin/AddProductForm";
import { getProducts, getProductById } from "@/actions/products";
import type { ProductCategory } from "@/types";

export async function generateStaticParams() {
  try {
    const dbProducts = await getProducts();
    return dbProducts.map((p) => ({ id: p.id }));
  } catch {
    return [];
  }
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">Edit Product</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Editing: {product.name}
        </p>
      </div>
      <AddProductForm
        initialData={{
          id: product.id,
          name: product.name,
          price: product.price,
          category: (product.category as ProductCategory) || "fruits",
          description: product.description || "",
          image: product.image_url || "",
          rating: 0,
          featured: false,
          inStock: product.is_in_stock,
          stockQuantity: product.stock_quantity,
        }}
      />
    </div>
  );
}
