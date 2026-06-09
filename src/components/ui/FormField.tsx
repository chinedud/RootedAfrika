import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  className?: string;
}

export function FormField({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  placeholder,
  autoComplete,
  error,
  className,
}: FormFieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-black/70"
      >
        {label}
        {required && (
          <span className="ml-0.5 text-brand-gold" aria-hidden>
            *
          </span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(
          "w-full rounded-lg border bg-black/5 px-4 py-2.5 text-brand-black placeholder:text-black/30 transition-colors",
          "focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold",
          error ? "border-red-400/50" : "border-black/20"
        )}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
