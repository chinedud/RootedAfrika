import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

/** Shimmer placeholder block — use for loading states */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("skeleton-shimmer rounded-md bg-white/5", className)}
      aria-hidden
    />
  );
}
