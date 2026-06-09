import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

interface ProductCardSkeletonProps {
  className?: string;
}

/** Loading placeholder matching {@link ProductCard} layout */
export function ProductCardSkeleton({ className }: ProductCardSkeletonProps) {
  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface-raised/80",
        className
      )}
      aria-hidden
    >
      {/* Image */}
      <Skeleton className="aspect-square w-full rounded-none" />

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Title */}
        <Skeleton className="h-5 w-[85%]" />
        <Skeleton className="mt-2 h-5 w-[60%]" />

        {/* Stars */}
        <div className="mt-3 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-3.5 w-3.5 rounded-sm" />
          ))}
          <Skeleton className="ml-1 h-3 w-8" />
        </div>

        {/* Description */}
        <Skeleton className="mt-3 h-3.5 w-full" />
        <Skeleton className="mt-2 h-3.5 w-[92%]" />

        {/* Price row */}
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <Skeleton className="h-6 w-16" />
        </div>

        {/* Button */}
        <Skeleton className="mt-3 h-9 w-full rounded-md sm:mt-4" />
      </div>
    </article>
  );
}
