import { AddProductForm } from "@/components/admin/AddProductForm";

export const metadata = {
  title: "Add Product | Admin",
};

export default function NewProductPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-shad-foreground sm:text-2xl">Add Product</h1>
        <p className="mt-1 text-sm text-shad-muted-foreground">
          Add a new product to your catalog
        </p>
      </div>
      <AddProductForm />
    </div>
  );
}
