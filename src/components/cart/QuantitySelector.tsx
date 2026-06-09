import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function QuantitySelector({
  quantity,
  onDecrease,
  onIncrease,
  min = 1,
  max = 99,
  disabled = false,
  size = "md",
  className,
}: QuantitySelectorProps) {
  const btnClass =
    size === "sm"
      ? "h-8 w-8"
      : "h-9 w-9";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-black/20 bg-black/5",
        disabled && "opacity-50",
        className
      )}
    >
      <button
        type="button"
        onClick={onDecrease}
        disabled={disabled || quantity <= min}
        className={cn(
          "flex items-center justify-center text-brand-black transition-colors hover:bg-black/10 disabled:cursor-not-allowed disabled:opacity-40",
          btnClass
        )}
        aria-label="Decrease quantity"
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={2} />
      </button>
      <span
        className="min-w-[2.25rem] text-center text-sm font-semibold tabular-nums text-brand-black"
        aria-live="polite"
        aria-label={`Quantity: ${quantity}`}
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={disabled || quantity >= max}
        className={cn(
          "flex items-center justify-center text-brand-black transition-colors hover:bg-black/10 disabled:cursor-not-allowed disabled:opacity-40",
          btnClass
        )}
        aria-label="Increase quantity"
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={2} />
      </button>
    </div>
  );
}
