import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Package, Truck } from "lucide-react";
import { getOrderById } from "@/actions/orders";
import { statusColors, statusLabels, type OrderStatus } from "@/data/orders";
import { formatPrice } from "@/lib/format";
import { OrderStatusSelect } from "./OrderStatusSelect";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Orders
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">
            Order {id.slice(0, 8)}
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Placed on{" "}
            {new Date(order.created_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[order.status as OrderStatus]}`}
          >
            {statusLabels[order.status as OrderStatus]}
          </span>
          <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-neutral-500">Payment:</span>
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
            order.payment_status === "paid"
              ? "bg-emerald-500/20 text-emerald-500"
              : "bg-pink-500/20 text-pink-400"
          }`}
        >
          {order.payment_status === "paid" ? "Paid" : "Unpaid"}
        </span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-neutral-200 bg-white p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
            <Package className="h-4 w-4 text-pink-500" />
            Items ({(order.order_items || []).length})
          </h2>
          <ul className="divide-y divide-neutral-100">
            {(order.order_items || []).map((item: { id: string; product_id: string; quantity: number; unit_price: number }) => (
              <li
                key={item.id}
                className="flex gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-xs text-neutral-400">
                  {item.product_id?.slice(0, 6)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-neutral-900">
                    Product ID: {item.product_id.slice(0, 8)}...
                  </p>
                  <p className="text-xs text-neutral-500">
                    {formatPrice(item.unit_price)} &times; {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-medium text-neutral-900">
                  {formatPrice(item.unit_price * item.quantity)}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
              <MapPin className="h-4 w-4 text-pink-500" />
              Delivery
            </h2>
            <p className="mt-3 whitespace-pre-line text-sm text-neutral-500">
              {order.shipping_address
                ? JSON.stringify(order.shipping_address, null, 2)
                : "No address on file"}
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-neutral-500">
              <Truck className="h-4 w-4 text-pink-500" />
              Standard delivery
            </p>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-neutral-900">
              Order Summary
            </h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-neutral-500">Total</dt>
                <dd className="font-semibold text-neutral-900">
                  {formatPrice(order.total_amount)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
