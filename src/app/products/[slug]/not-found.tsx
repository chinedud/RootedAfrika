import Link from "next/link";
import { PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ProductNotFound() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-black/10 bg-black/5">
          <PackageOpen
            className="h-8 w-8 text-brand-gold/70"
            strokeWidth={1.5}
            aria-hidden
          />
        </span>
        <h1 className="mt-6 font-display text-2xl font-bold text-brand-black sm:text-3xl">
          Product not found
        </h1>
        <p className="mt-3 text-black/60">
          This item may have been removed or the link is incorrect.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/products">
            <Button variant="primary" size="lg">
              Browse Products
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
