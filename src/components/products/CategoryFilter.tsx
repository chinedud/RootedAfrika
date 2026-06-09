"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProductCategory } from "@/types/product";
import { CATEGORY_LABELS } from "@/types/product";

const categories: (ProductCategory | "all")[] = [
  "all",
  "fresh-produce",
  "pantry",
  "spices",
  "snacks",
];

interface CategoryFilterProps {
  basePath?: string;
}

export function CategoryFilter({ basePath = "/products" }: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const current = searchParams.get("category") ?? "all";
  const query = searchParams.get("q");

  const buildHref = (category: string) => {
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (query) params.set("q", query);
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const label = cat === "all" ? "All" : CATEGORY_LABELS[cat];
        const isActive = current === cat;
        return (
          <Link
            key={cat}
            href={buildHref(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-brand-gold text-brand-black"
                : "border border-black/20 text-black/70 hover:border-brand-gold hover:text-brand-gold"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
