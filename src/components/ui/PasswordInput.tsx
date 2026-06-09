"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  id: string;
  name: string;
  required?: boolean;
  minLength?: number;
  placeholder?: string;
  className?: string;
}

export function PasswordInput({
  id,
  name,
  required,
  minLength,
  placeholder,
  className = "",
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        required={required}
        minLength={minLength}
        placeholder={placeholder}
        className={`w-full rounded-lg border border-neutral-300 px-4 py-2.5 pr-10 text-sm text-brand-black placeholder:text-black/30 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold ${className}`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 hover:text-black/70"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}
