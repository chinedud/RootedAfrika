import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getOrdersByUser } from "@/actions/orders";
import { formatPrice } from "@/lib/format";
import { ProfileForm } from "./ProfileForm";

export const metadata = {
  title: "My Account",
};

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) notFound();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const orders = (await getOrdersByUser(user.id)) || [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-brand-black sm:text-3xl">
        My Account
      </h1>
      <p className="mt-1 text-black/60">
        Manage your profile and view your orders.
      </p>

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-xl border border-black/10 bg-white p-6">
            <h2 className="text-lg font-semibold text-brand-black">Profile</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-black/50">Name</dt>
                <dd className="font-medium text-brand-black">
                  {profile?.full_name || user.email}
                </dd>
              </div>
              <div>
                <dt className="text-black/50">Email</dt>
                <dd className="font-medium text-brand-black">{user.email}</dd>
              </div>
              <div>
                <dt className="text-black/50">Joined</dt>
                <dd className="font-medium text-brand-black">
                  {new Date(user.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-black/10 bg-white p-6">
            <h2 className="text-lg font-semibold text-brand-black">
              Edit Profile
            </h2>
            <ProfileForm
              currentName={profile?.full_name || ""}
              currentAvatar={profile?.avatar_url || ""}
            />
          </div>
        </div>

        <div className="rounded-xl border border-black/10 bg-white p-6">
          <h2 className="text-lg font-semibold text-brand-black">
            Recent Orders ({orders.length})
          </h2>
          {orders.length === 0 ? (
            <p className="mt-4 text-sm text-black/50">No orders yet.</p>
          ) : (
            <ul className="mt-4 divide-y divide-black/10">
              {(orders as Array<{ id: string; created_at: string; total_amount: number; status: string }>).slice(0, 10).map((order) => (
                <li key={order.id} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-brand-black">
                        {order.id.slice(0, 8)}...
                      </p>
                      <p className="text-xs text-black/50">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-brand-black">
                      {formatPrice(order.total_amount)}
                    </span>
                  </div>
                  <span
                    className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      order.status === "delivered"
                        ? "bg-green-500/20 text-green-600"
                        : order.status === "cancelled"
                          ? "bg-red-500/20 text-red-500"
                          : "bg-yellow-500/20 text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
