import Link from "next/link";
import { getAllOrders } from "@/actions/orders";
import { formatPrice } from "@/lib/format";

const statusColors: Record<string, string> = {
  pending: "bg-pink-500/20 text-pink-500",
  processing: "bg-blue-500/20 text-blue-500",
  shipped: "bg-pink-500/20 text-pink-400",
  delivered: "bg-emerald-500/20 text-emerald-500",
  cancelled: "bg-red-500/20 text-red-500",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export async function RecentOrders() {
  const dbOrders = await getAllOrders();
  const recent = dbOrders
    .sort((a: { created_at: string }, b: { created_at: string }) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return (
    <div className="rounded-xl border border-white/10 bg-neutral-900">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <h3 className="text-sm font-semibold text-white">Recent Orders</h3>
        <Link
          href="/admin/orders"
          className="text-xs font-medium text-pink-400 hover:text-pink-300"
        >
          View all
        </Link>
      </div>
      <div className="divide-y divide-white/10">
        {recent.map((order: { id: string; profiles: { full_name: string } | null; status: string; total_amount: number }, idx: number) => (
          <Link
            key={order.id}
            href={`/admin/orders/${order.id}`}
            className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-white/5"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {order.profiles?.full_name || "Unknown"}
              </p>
              <p className="text-xs text-white/50">#{idx + 1}</p>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusColors[order.status]}`}
              >
                {statusLabels[order.status]}
              </span>
              <span className="text-sm font-medium text-white">
                {formatPrice(order.total_amount)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
