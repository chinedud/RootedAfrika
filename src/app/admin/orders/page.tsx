import { OrdersTable } from "@/components/admin/OrdersTable";
import { getAllOrders } from "@/actions/orders";
import type { Order as DataOrder, OrderItem, OrderStatus, PaymentStatus } from "@/data/orders";

export const metadata = {
  title: "Orders | Admin",
};

export default async function AdminOrdersPage() {
  const dbOrders = await getAllOrders();

  interface OrderItemRaw {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
    unit_price: number;
  }

  interface OrderRaw {
    id: string;
    user_id: string;
    status: string;
    payment_status: string;
    total_amount: number;
    shipping_address: Record<string, unknown> | null;
    created_at: string;
    updated_at: string;
    profiles: { full_name: string } | null;
    order_items: OrderItemRaw[];
  }

  const orders: DataOrder[] = (dbOrders || []).map((o: OrderRaw, idx: number) => ({
    id: o.id,
    customerId: o.user_id,
    orderNumber: `AFM-${String(idx + 1).padStart(3, "0")}`,
    customerName: o.profiles?.full_name || "Unknown",
    customerEmail: "",
    status: o.status as OrderStatus,
    paymentStatus: o.payment_status as PaymentStatus,
    totalAmount: o.total_amount,
    shippingAddress: typeof o.shipping_address === "string" ? o.shipping_address : JSON.stringify(o.shipping_address),
    createdAt: o.created_at,
    items: (o.order_items || []).map((oi: OrderItemRaw): OrderItem => ({
      productId: oi.product_id,
      name: "",
      price: oi.unit_price,
      quantity: oi.quantity,
      image: "",
    })),
  }));

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">Orders</h1>
          <span className="inline-flex items-center rounded-full bg-pink-500 px-2.5 py-0.5 text-xs font-semibold text-white">
            {orders.length} total
          </span>
        </div>
        <p className="mt-1 text-sm text-neutral-500">
          View and manage customer orders
        </p>
      </div>
      <OrdersTable allOrders={orders} />
    </div>
  );
}
