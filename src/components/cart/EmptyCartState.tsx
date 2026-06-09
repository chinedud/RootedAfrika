import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { categoryNavLinks } from "@/components/layout/nav-config";

interface EmptyCartStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyCartState({
  title = "Your cart is empty",
  description = "Discover fresh African produce and authentic spices — add something delicious to get started.",
  actionLabel = "Browse Products",
  actionHref = "/products",
}: EmptyCartStateProps) {
  return (
    <div className="mx-auto max-w-lg py-16 text-center sm:py-20">
      <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-brand-gold/30 bg-brand-gold/10">
        <ShoppingBag
          className="h-10 w-10 text-brand-gold"
          strokeWidth={1.5}
          aria-hidden
        />
      </span>
      <h1 className="mt-6 font-display text-3xl font-bold text-brand-black">
        {title}
      </h1>
      <p className="mt-3 text-black/60">{description}</p>
      <Link href={actionHref} className="mt-8 inline-block">
        <Button variant="primary" size="lg" className="group">
          {actionLabel}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Button>
      </Link>
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {categoryNavLinks.map((cat) => (
          <Link
            key={cat.category}
            href={cat.href}
            className="rounded-full border border-black/15 px-4 py-2 text-sm text-black/70 transition-colors hover:border-brand-gold/50 hover:text-brand-gold"
          >
            {cat.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
