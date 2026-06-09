import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HeroBanner } from "@/components/home/HeroBanner";
import { getProducts } from "@/actions/products";
import type { Product, ProductCategory } from "@/types";
import Link from "next/link";

export default async function HomePage() {
  const dbProducts = await getProducts();
  const products: Product[] = (dbProducts ?? []).map((p) => ({
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
    <>
      <HeroBanner products={products} />
      <FeaturedProducts products={products} />
      <section className="border-t border-black/10 bg-gradient-to-b from-white to-neutral-900 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-brand-black sm:text-3xl">
            Why Rooted Afrika?
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                title: "Farm Fresh",
                desc: "Sourced from trusted growers across Africa and delivered at peak quality.",
              },
              {
                title: "Authentic Spices",
                desc: "Traditional blends and seasonings for genuine home-cooked flavour.",
              },
              {
                title: "Fast Delivery",
                desc: "Carefully packed and shipped so your produce arrives in perfect condition.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-black/10 bg-black/5 p-6"
              >
                <h3 className="text-lg font-semibold text-brand-gold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-black/60">{item.desc}</p>
              </div>
            ))}
          </div>
          <Link
            href="/products"
            className="mt-10 inline-block text-sm font-semibold text-brand-gold hover:text-brand-gold-light"
          >
            Browse the full collection →
          </Link>
        </div>
      </section>
    </>
  );
}
