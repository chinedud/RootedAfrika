import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "sm" | "md" | "lg" | "icon" | "icon-sm";
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-gold text-brand-black hover:bg-brand-gold-light focus-visible:ring-brand-gold",
  secondary:
    "bg-black text-white hover:bg-neutral-800 focus-visible:ring-black",
  outline:
    "border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white focus-visible:ring-brand-gold",
  ghost:
    "text-brand-black hover:bg-black/5 focus-visible:ring-black/30",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
  icon: "h-9 w-9",
  "icon-sm": "h-8 w-8",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      fullWidth,
      children,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";
