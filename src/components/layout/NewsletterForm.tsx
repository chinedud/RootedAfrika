"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  if (submitted) {
    return (
      <p
        className={cn(
          "flex items-center gap-2 text-sm text-brand-gold",
          className
        )}
      >
        <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
        Thanks — you&apos;re on the list!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-2", className)}>
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <div className="flex gap-2">
        <input
          id="footer-email"
          type="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-black/15 bg-black/5 px-3 py-2.5 text-sm text-brand-black placeholder:text-black/35 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
        />
        <button
          type="submit"
          className="flex shrink-0 items-center justify-center rounded-lg bg-brand-gold px-3 py-2.5 text-brand-black transition-colors hover:bg-brand-gold-light"
          aria-label="Subscribe to newsletter"
        >
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
      <p className="text-xs text-black/40">
        Fresh deals &amp; seasonal picks. Unsubscribe anytime.
      </p>
    </form>
  );
}
