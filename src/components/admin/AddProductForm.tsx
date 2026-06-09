"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FormEvent, useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Upload, ImageIcon } from "lucide-react";
import { CATEGORY_LABELS, type ProductCategory } from "@/types";

interface AddProductFormProps {
  initialData?: {
    id?: string;
    name: string;
    price: number;
    category: ProductCategory;
    description: string;
    image: string;
    rating: number;
    featured: boolean;
    inStock: boolean;
    stockQuantity: number;
  };
}

export function AddProductForm({ initialData }: AddProductFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [imageUrl, setImageUrl] = useState(initialData?.image || "");
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const uploadData = new FormData();
      uploadData.set("file", file);
      const { uploadProductImage } = await import("@/actions/products");
      const url = await uploadProductImage(uploadData);
      setImageUrl(url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const fields = ["name", "price", "description", "category", "stockQuantity"];
    const newErrors: Record<string, boolean> = {};
    let hasError = false;
    for (const field of fields) {
      if (!data.get(field)) {
        newErrors[field] = true;
        hasError = true;
      }
    }
    if (!imageUrl) newErrors.image = true;
    setErrors(newErrors);
    if (hasError) return;

    setSaving(true);

    try {
      const submitData = new FormData();
      submitData.set("name", data.get("name") as string);
      submitData.set("description", data.get("description") as string);
      submitData.set("price", data.get("price") as string);
      submitData.set("category", data.get("category") as string);
      submitData.set("image_url", imageUrl);
      submitData.set("stock_quantity", data.get("stockQuantity") as string);
      submitData.set("is_in_stock", data.get("inStock") === "on" ? "true" : "false");

      if (initialData?.id) {
        const { updateProduct } = await import("@/actions/products");
        await updateProduct(initialData.id, submitData);
      } else {
        const { createProduct } = await import("@/actions/products");
        await createProduct(submitData);
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Product name</Label>
          <input
            id="name"
            name="name"
            required
            defaultValue={initialData?.name}
            className={`flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 ${
              errors.name ? "border-red-400 ring-red-400" : "border-neutral-300 focus:border-pink-400 focus:ring-pink-400"
            }`}
            placeholder="e.g. Organic Honey"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (&#8358;)</Label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            required
            defaultValue={initialData?.price}
            className={`flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 ${
              errors.price ? "border-red-400 ring-red-400" : "border-neutral-300 focus:border-pink-400 focus:ring-pink-400"
            }`}
            placeholder="4.99"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select defaultValue={initialData?.category ?? "fruits"} name="category">
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {(Object.entries(CATEGORY_LABELS) as [ProductCategory, string][]).map(
                ([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="stockQuantity">Stock quantity</Label>
          <input
            id="stockQuantity"
            name="stockQuantity"
            type="number"
            min="0"
            required
            defaultValue={initialData?.stockQuantity ?? 50}
            className={`flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 ${
              errors.stockQuantity ? "border-red-400 ring-red-400" : "border-neutral-300 focus:border-pink-400 focus:ring-pink-400"
            }`}
            placeholder="50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Product Image</Label>
          <div
            className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 text-center transition-colors ${
              errors.image ? "border-red-400 bg-red-50" : imageUrl ? "border-green-400 bg-green-50" : "border-neutral-300 bg-white hover:border-pink-400"
            }`}
          >
            {imageUrl ? (
              <div className="w-full">
                <Image src={imageUrl} alt="Preview" width={200} height={128} className="mx-auto max-h-32 rounded object-cover" unoptimized />
                <button
                  type="button"
                  onClick={() => { setImageUrl(""); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                  className="mt-2 text-xs text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ) : (
              <>
                <ImageIcon className="mb-2 h-8 w-8 text-neutral-400" />
                <p className="text-xs text-neutral-500">Click to upload a product image</p>
              </>
            )}
            <input
              ref={fileInputRef}
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {!imageUrl && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-50"
              >
                <Upload className="h-3.5 w-3.5" />
                {uploading ? "Uploading..." : "Choose File"}
              </button>
            )}
          </div>
          {uploadError && <p className="text-xs text-red-500">{uploadError}</p>}
          {errors.image && !imageUrl && <p className="text-xs text-red-500">Please upload an image</p>}
        </div>

        <div className="flex items-end gap-6 pb-2">
          <div className="flex items-center gap-3">
            <Switch id="inStock" name="inStock" defaultChecked={initialData?.inStock ?? true} />
            <Label htmlFor="inStock">In stock</Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={initialData?.description}
          placeholder="Describe the product..."
          className={`min-h-[120px] ${errors.description ? "border-red-400 ring-red-400" : ""}`}
        />
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          variant="primary"
          disabled={saving}
          className="bg-pink-500 hover:bg-pink-600 text-white border-none"
        >
          {saving ? "Saving\u2026" : initialData ? "Update Product" : "Add Product"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
