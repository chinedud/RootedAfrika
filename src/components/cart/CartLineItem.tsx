import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { QuantitySelector } from "@/components/cart/QuantitySelector";
import { CATEGORY_LABELS } from "@/types";
import { formatPrice } from "@/lib/format";
import type { CartLineWithProduct } from "@/hooks/use-cart";

interface CartLineItemProps {
  line: CartLineWithProduct;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export function CartLineItem({
  line,
  onUpdateQuantity,
  onRemove,
}: CartLineItemProps) {
  const { product, quantity, lineTotal } = line;

  return (
    <article className="flex gap-4 rounded-2xl border border-black/10 bg-surface-raised/60 p-4 transition-colors hover:border-black/15 sm:gap-5 sm:p-5">
      <Link
        href={`/products/${product.slug}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-28"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="112px"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-gold/80">
              {CATEGORY_LABELS[product.category]}
            </p>
            <Link
              href={`/products/${product.slug}`}
              className="mt-0.5 block font-semibold text-brand-black transition-colors hover:text-brand-gold line-clamp-2"
            >
              {product.name}
            </Link>
            <p className="mt-1 text-sm text-black/50">
              {formatPrice(product.price)} each
            </p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(product.id)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-black/40 transition-colors hover:bg-red-500/10 hover:text-red-400"
            aria-label={`Remove ${product.name} from cart`}
          >
            <Trash2 className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <QuantitySelector
            quantity={quantity}
            onDecrease={() => onUpdateQuantity(product.id, quantity - 1)}
            onIncrease={() => onUpdateQuantity(product.id, quantity + 1)}
          />
          <p className="text-lg font-bold tabular-nums text-brand-gold">
            {formatPrice(lineTotal)}
          </p>
        </div>
      </div>
    </article>
  );
}
