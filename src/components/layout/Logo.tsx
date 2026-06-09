import Link from "next/link";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Show "Market" tagline under the brand name */
  showTagline?: boolean;
  /** Compact mode for tight mobile headers */
  compact?: boolean;
  /** Called when the logo link is clicked (e.g. close mobile menu) */
  onNavigate?: () => void;
}

export function Logo({
  className,
  showTagline = true,
  compact = false,
  onNavigate,
}: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className={cn(
        "group flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90",
        className
      )}
      aria-label="Rooted Afrika — Home"
    >
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-gold bg-brand-gold/10 transition-colors group-hover:bg-brand-gold/20">
        <Leaf
          className="h-5 w-5 text-brand-gold"
          strokeWidth={2}
          aria-hidden
        />
      </span>
      {!compact && (
        <div className="hidden min-w-0 sm:block">
          <span className="font-display text-lg font-semibold leading-tight tracking-wide text-brand-black">
            Rooted Afrika
          </span>
          {showTagline && (
            <span className="block text-[0.65rem] font-medium uppercase tracking-[0.25em] text-brand-gold">
              Premium African Produce
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
