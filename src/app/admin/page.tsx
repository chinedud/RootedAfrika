import Image from "next/image";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { RecentOrders } from "@/components/admin/RecentOrders";
import { getProducts } from "@/actions/products";
import { getAllOrders } from "@/actions/orders";
import { getUsers } from "@/actions/users";
import { formatPrice } from "@/lib/format";

export default async function AdminDashboard() {
  const [dbProducts, dbOrders, dbProfiles] = await Promise.all([
    getProducts(),
    getAllOrders(),
    getUsers(),
  ]);

  const totalRevenue = dbOrders
    .filter((o: { status: string }) => o.status !== "cancelled")
    .reduce((sum: number, o: { total_amount: number }) => sum + o.total_amount, 0);

  const orderStats = {
    total: dbOrders.length,
    pending: dbOrders.filter((o: { status: string }) => o.status === "pending").length,
    processing: dbOrders.filter((o: { status: string }) => o.status === "processing").length,
    shipped: dbOrders.filter((o: { status: string }) => o.status === "shipped").length,
    delivered: dbOrders.filter((o: { status: string }) => o.status === "delivered").length,
    cancelled: dbOrders.filter((o: { status: string }) => o.status === "cancelled").length,
    revenue: totalRevenue,
  };

  const userStats = {
    total: dbProfiles.length,
    active: dbProfiles.filter((p: { status: string | null }) => p.status === "active").length,
    suspended: dbProfiles.filter((p: { status: string | null }) => p.status === "suspended").length,
    admins: dbProfiles.filter((p: { role: string }) => p.role === "admin").length,
    customers: dbProfiles.filter((p: { role: string }) => p.role === "customer").length,
  };

  const productCount = dbProducts.length;

  const topProductMap: Record<string, number> = {};
  for (const o of dbOrders) {
    if (o.status === "cancelled") continue;
    for (const item of (o.order_items || [])) {
      topProductMap[item.product_id] = (topProductMap[item.product_id] || 0) + item.quantity;
    }
  }
  const topProductList = Object.entries(topProductMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([id, quantity]) => {
      const product = dbProducts.find((p: { id: string }) => p.id === id);
      return { id, name: product?.name || "Unknown", quantity, image: product?.image_url || "" };
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">Dashboard</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Overview of your store performance
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={formatPrice(orderStats.revenue)}
          icon={DollarSign}
          change="12.5%"
          changeDirection="up"
        />
        <StatsCard
          title="Total Orders"
          value={orderStats.total}
          icon={ShoppingCart}
          change="8.2%"
          changeDirection="up"
        />
        <StatsCard
          title="Total Products"
          value={productCount}
          icon={Package}
        />
        <StatsCard
          title="Total Users"
          value={userStats.total}
          icon={Users}
          change="16.7%"
          changeDirection="up"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>

        <div className="rounded-xl border border-white/10 bg-neutral-900 p-5">
          <h3 className="text-sm font-semibold text-white">Top Selling Products</h3>
          <p className="text-xs text-white/50">By units sold</p>
          <ul className="mt-4 space-y-3">
            {topProductList.map((product, i) => (
              <li key={product.id} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pink-500/20 text-xs font-bold text-pink-400">
                  {i + 1}
                </span>
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white/10">
                  <Image src={product.image} alt={product.name} fill className="object-cover" sizes="40px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{product.name}</p>
                  <p className="text-xs text-white/50">{product.quantity} sold</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <RecentOrders />
    </div>
  );
}
