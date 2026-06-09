import Link from "next/link";
import { cn } from "@/lib/utils";

export type CheckoutStep = "cart" | "checkout" | "confirmation";

const steps: { id: CheckoutStep; label: string; href?: string }[] = [
  { id: "cart", label: "Cart", href: "/cart" },
  { id: "checkout", label: "Checkout", href: "/checkout" },
  { id: "confirmation", label: "Confirmation" },
];

interface CheckoutStepsProps {
  current: CheckoutStep;
  className?: string;
}

export function CheckoutSteps({ current, className }: CheckoutStepsProps) {
  const currentIndex = steps.findIndex((s) => s.id === current);

  return (
    <nav
      aria-label="Checkout progress"
      className={cn("flex items-center justify-center gap-2 sm:gap-4", className)}
    >
      {steps.map((step, index) => {
        const isComplete = index < currentIndex;
        const isCurrent = step.id === current;
        const isUpcoming = index > currentIndex;

        const content = (
          <>
            <span
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors sm:h-9 sm:w-9 sm:text-sm",
                isComplete && "bg-brand-gold text-brand-black",
                isCurrent &&
                  "border-2 border-brand-gold bg-brand-gold/20 text-brand-gold",
                isUpcoming && "border border-black/20 bg-black/5 text-black/40"
              )}
            >
              {isComplete ? "✓" : index + 1}
            </span>
            <span
              className={cn(
                "hidden text-sm font-medium sm:inline",
                isCurrent && "text-brand-gold",
                isComplete && "text-brand-black",
                isUpcoming && "text-black/40"
              )}
            >
              {step.label}
            </span>
          </>
        );

        return (
          <div key={step.id} className="flex items-center gap-2 sm:gap-4">
            {step.href && !isUpcoming ? (
              <Link
                href={step.href}
                className="flex items-center gap-2 transition-opacity hover:opacity-80"
                aria-current={isCurrent ? "step" : undefined}
              >
                {content}
              </Link>
            ) : (
              <div
                className="flex items-center gap-2"
                aria-current={isCurrent ? "step" : undefined}
              >
                {content}
              </div>
            )}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-px w-6 sm:w-12",
                  index < currentIndex ? "bg-brand-gold/60" : "bg-black/15"
                )}
                aria-hidden
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
