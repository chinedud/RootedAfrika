import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  className?: string;
  /** Show numeric rating e.g. (4.8) */
  showValue?: boolean;
  size?: "sm" | "md";
}

export function StarRating({
  rating,
  className,
  showValue = true,
  size = "sm",
}: StarRatingProps) {
  const rounded = Math.round(rating);
  const starClass = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            starClass,
            i < rounded
              ? "fill-brand-gold text-brand-gold"
              : "text-black/20"
          )}
          aria-hidden
        />
      ))}
      {showValue && (
        <span className="ml-1 text-xs text-black/50">({rating.toFixed(1)})</span>
      )}
    </div>
  );
}
