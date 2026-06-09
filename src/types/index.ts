/**
 * Rooted Afrika — shared domain types.
 * Import from `@/types` across the app.
 */

/** Product category slugs used in URLs and filters */
export type ProductCategory =
  | "fresh-produce"
  | "pantry"
  | "spices"
  | "snacks";

/** Human-readable category labels for UI */
export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  "fresh-produce": "Fresh Produce",
  pantry: "Pantry Grains & Staples",
  spices: "Organic Spices, Seasonings & Oils",
  snacks: "Snacks & Groceries",
};

/**
 * Core product model for catalog, detail pages, and cart operations.
 */
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: ProductCategory;
  description: string;
  /** Public path or URL to the product image */
  image: string;
  /** Average customer rating (1–5) */
  rating: number;
  /** Optional gallery for product detail pages */
  images?: string[];
  /** Highlight on homepage and featured sections */
  featured?: boolean;
  /** Whether the item can be added to cart */
  inStock?: boolean;
}

/**
 * A line item in the shopping cart with resolved product data.
 */
export interface CartItem {
  product: Product;
  quantity: number;
}

/** Persisted cart line (product reference + quantity only) */
export interface CartLine {
  productId: string;
  quantity: number;
  name?: string;
  price?: number;
  image_url?: string | null;
  category?: string | null;
}
