import { type LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeDirection?: "up" | "down";
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  change,
  changeDirection,
}: StatsCardProps) {
  return (
    <div className="rounded-xl border-t-4 border-pink-500 bg-neutral-900 p-5 text-white transition-colors hover:bg-neutral-800">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-white/50">{title}</p>
          <p className="mt-1 text-2xl font-bold">{value}</p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-pink-500/20 text-pink-400">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      {change && changeDirection && (
        <div className="mt-3 flex items-center gap-1.5">
          <span
            className={
              changeDirection === "up" ? "text-pink-400" : "text-red-400"
            }
          >
            {changeDirection === "up" ? "\u2191" : "\u2193"} {change}
          </span>
          <span className="text-xs text-white/40">vs last month</span>
        </div>
      )}
    </div>
  );
}
