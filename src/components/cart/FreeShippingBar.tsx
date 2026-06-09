import { Truck } from "lucide-react";
import { formatPrice } from "@/lib/format";
import {
  FREE_SHIPPING_THRESHOLD,
  getFreeShippingRemaining,
} from "@/lib/cart";
import { cn } from "@/lib/utils";

interface FreeShippingBarProps {
  subtotal: number;
  className?: string;
}

export function FreeShippingBar({ subtotal, className }: FreeShippingBarProps) {
  const remaining = getFreeShippingRemaining(subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const qualified = remaining === 0;

  return (
    <div
      className={cn(
        "rounded-xl border border-black/10 bg-black/[0.03] p-4",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Truck
          className={cn(
            "mt-0.5 h-5 w-5 shrink-0",
            qualified ? "text-brand-gold" : "text-black/50"
          )}
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm text-brand-black">
            {qualified ? (
              <>
                You&apos;ve unlocked{" "}
                <span className="font-semibold text-brand-gold">
                  free delivery
                </span>
                !
              </>
            ) : (
              <>
                Add{" "}
                <span className="font-semibold text-brand-gold">
                  {formatPrice(remaining)}
                </span>{" "}
                more for free delivery
              </>
            )}
          </p>
          <div
            className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/10"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progress toward free delivery"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-gold-dark to-brand-gold transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
