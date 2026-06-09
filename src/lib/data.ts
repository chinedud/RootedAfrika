/**
 * Mock product catalog for Rooted Afrika.
 * Replace with API/database calls when the backend is ready.
 */

import type { Product, ProductCategory } from "@/types";

export const products: Product[] = [
  // —— Fresh Produce (4) ——
  {
    id: "fp-001",
    name: "Organic Hass Avocados",
    slug: "organic-hass-avocados",
    price: 4.99,
    category: "fresh-produce",
    description:
      "Creamy, nutrient-rich Hass avocados from sustainable West African farms. Ideal for guacamole, salads, or toast.",
    image:
      "https://images.unsplash.com/photo-1547514701-42782101795e?w=800&q=80",
    rating: 4.8,
    featured: true,
    inStock: true,
  },
  {
    id: "fp-002",
    name: "Sweet Ripe Plantains",
    slug: "sweet-ripe-plantains",
    price: 3.49,
    category: "fresh-produce",
    description:
      "Golden ripe plantains with natural sweetness — perfect for frying, baking, or traditional African sides.",
    image:
      "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=800&q=80",
    rating: 4.7,
    featured: true,
    inStock: true,
  },
  {
    id: "fp-003",
    name: "Kent Mangoes",
    slug: "kent-mangoes",
    price: 5.99,
    category: "fresh-produce",
    description:
      "Juicy Kent mangoes hand-picked at peak ripeness. Vibrant orange flesh with tropical sweetness.",
    image:
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&q=80",
    rating: 4.9,
    featured: true,
    inStock: true,
  },
  {
    id: "fp-004",
    name: "Golden Pineapple",
    slug: "golden-pineapple",
    price: 3.99,
    category: "fresh-produce",
    description:
      "Whole tropical pineapples with the perfect balance of sweet and tart. Great fresh or juiced.",
    image:
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800&q=80",
    rating: 4.6,
    inStock: true,
  },
  {
    id: "fp-005",
    name: "Fresh Okra",
    slug: "fresh-okra",
    price: 2.99,
    category: "fresh-produce",
    description:
      "Tender green okra pods for soups, stews, and grilling. Picked fresh for maximum crunch.",
    image:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80",
    rating: 4.5,
    featured: true,
    inStock: true,
  },
  {
    id: "fp-006",
    name: "African Eggplant",
    slug: "african-eggplant",
    price: 3.29,
    category: "fresh-produce",
    description:
      "Mild, creamy white African eggplants for traditional stews and grilling — less bitter than common varieties.",
    image:
      "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=800&q=80",
    rating: 4.4,
    featured: true,
    inStock: true,
  },
  {
    id: "fp-007",
    name: "Collard Greens (Bunch)",
    slug: "collard-greens",
    price: 2.49,
    category: "fresh-produce",
    description:
      "Hearty collard greens packed with nutrients. Excellent for slow-cooked dishes and classic sides.",
    image:
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800&q=80",
    rating: 4.3,
    inStock: true,
  },
  {
    id: "fp-008",
    name: "Ghana Yams",
    slug: "ghana-yams",
    price: 6.99,
    category: "fresh-produce",
    description:
      "Premium Ghana yams with firm, starchy flesh. Essential for pounded yam, roasting, and hearty meals.",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    rating: 4.8,
    featured: true,
    inStock: true,
  },

  // —— Pantry Grains & Staples (3) ——
  {
    id: "pantry-001",
    name: "Rooted Afrika™ Egusi Seeds",
    slug: "rooted-afrika-egusi-seeds",
    price: 9.49,
    category: "pantry",
    description:
      "Finely ground egusi seeds for rich, nutty West African soups. A pantry essential for authentic egusi stew.",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80",
    rating: 4.6,
    inStock: true,
  },
  {
    id: "pantry-002",
    name: "Rooted Afrika™ Garri (Cassava Flakes)",
    slug: "rooted-afrika-garri",
    price: 7.99,
    category: "pantry",
    description:
      "Premium quality garri made from cassava. Perfect for eba, soakings, or as a light meal.",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80",
    rating: 4.7,
    featured: true,
    inStock: true,
  },
  {
    id: "pantry-003",
    name: "Rooted Afrika™ Yam Flour",
    slug: "rooted-afrika-yam-flour",
    price: 8.99,
    category: "pantry",
    description:
      "Smooth yam flour for making authentic pounded yam. A West African kitchen staple.",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    rating: 4.8,
    featured: true,
    inStock: true,
  },

  // —— Organic Spices, Seasonings & Oils (4) ——
  {
    id: "spice-001",
    name: "Scotch Bonnet Peppers",
    slug: "scotch-bonnet-peppers",
    price: 3.99,
    category: "spices",
    description:
      "Fiery Scotch bonnet peppers with fruity heat — the authentic choice for jerk seasoning and pepper sauces.",
    image:
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&q=80",
    rating: 4.7,
    featured: true,
    inStock: true,
  },
  {
    id: "spice-002",
    name: "Suya Spice Blend",
    slug: "suya-spice-blend",
    price: 7.49,
    category: "spices",
    description:
      "Authentic Nigerian suya mix with ground peanuts, ginger, and chilli. Rub on meat before grilling.",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80",
    rating: 4.9,
    inStock: true,
  },
  {
    id: "spice-003",
    name: "Berbere Seasoning",
    slug: "berbere-seasoning",
    price: 8.99,
    category: "spices",
    description:
      "Ethiopian berbere blend with paprika, fenugreek, and warming spices for stews, lentils, and vegetables.",
    image:
      "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&q=80",
    rating: 4.8,
    inStock: true,
  },
  {
    id: "spice-004",
    name: "Red Palm Oil",
    slug: "red-palm-oil",
    price: 11.99,
    category: "spices",
    description:
      "Rich, unrefined red palm oil from West Africa. Essential for authentic stews, soups, and traditional cooking.",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80",
    rating: 4.6,
    featured: true,
    inStock: true,
  },
];

/** Look up a single product by URL slug */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Look up a single product by ID (used by the cart store) */
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** Products flagged for homepage / featured sections */
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

/** Filter catalog by category slug; pass `null` or `"all"` for the full list */
export function getProductsByCategory(
  category: ProductCategory | "all" | null
): Product[] {
  if (!category || category === "all") return products;
  return products.filter((p) => p.category === category);
}

/** Related products: same category first, then others (excludes current) */
export function getRelatedProducts(
  current: Product,
  limit = 4
): Product[] {
  const sameCategory = products.filter(
    (p) => p.id !== current.id && p.category === current.category
  );
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const others = products.filter(
    (p) => p.id !== current.id && p.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, limit);
}

/** Search products by name or description (case-insensitive) */
export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}
