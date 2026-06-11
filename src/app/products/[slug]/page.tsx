import { notFound } from "next/navigation";
import { ProductDetail } from "./ProductDetail";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { getProducts } from "@/actions/products";
import { slugify } from "@/lib/slugify";
import { CATEGORY_LABELS, type Product, type ProductCategory } from "@/types";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

interface DBProduct {
  id: string;
  name: string;
  price: number;
  category: string | null;
  description: string | null;
  image_url: string | null;
  is_in_stock: boolean;
}

function mapToLocal(dbProduct: DBProduct): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    slug: slugify(dbProduct.name),
    price: dbProduct.price,
    category: (dbProduct.category as ProductCategory) || "fruits",
    description: dbProduct.description || "",
    image: dbProduct.image_url || "",
    rating: 0,
    inStock: dbProduct.is_in_stock,
  };
}

export async function generateStaticParams() {
  try {
    const dbProducts = await getProducts();
    return dbProducts.map((p) => ({ slug: slugify(p.name) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const dbProducts = await getProducts();
  const dbProduct = dbProducts.find((p) => slugify(p.name) === slug);
  if (!dbProduct) return { title: "Product Not Found" };

  return {
    title: dbProduct.name,
    description: dbProduct.description,
    openGraph: {
      title: `${dbProduct.name} | Rooted Afrika`,
      description: dbProduct.description,
      images: [{ url: dbProduct.image_url, alt: dbProduct.name }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const dbProducts = await getProducts();
  const dbProduct = dbProducts.find((p) => slugify(p.name) === slug);

  if (!dbProduct) notFound();

  const product = mapToLocal(dbProduct);

  const related = dbProducts
    .filter((p) => p.category === dbProduct.category && p.id !== dbProduct.id)
    .slice(0, 4)
    .map(mapToLocal);

  return (
    <>
      <ProductDetail product={product} />
      <RelatedProducts
        products={related}
        categoryLabel={CATEGORY_LABELS[product.category]}
      />
    </>
  );
}
