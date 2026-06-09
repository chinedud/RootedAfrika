import { UsersTable } from "@/components/admin/UsersTable";
import { getUsers } from "@/actions/users";
import type { User } from "@/data/users";

export const metadata = {
  title: "Users | Admin",
};

export default async function AdminUsersPage() {
  const dbProfiles = await getUsers();

  const users: User[] = (dbProfiles || []).map((p: { id: string; full_name: string | null; avatar_url: string | null; role: string; created_at: string; status: string | null }) => ({
    id: p.id,
    name: p.full_name || "Unknown",
    email: "",
    avatar: p.avatar_url || "",
    role: p.role as "customer" | "admin",
    totalOrders: 0,
    totalSpent: 0,
    joinedAt: p.created_at,
    status: (p.status || "active") as "active" | "suspended",
    suspended: p.status === "suspended",
  }));

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    suspended: users.filter((u) => u.status === "suspended").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">Users</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Manage customer accounts
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Total Users</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">{stats.total}</p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Active</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">{stats.active}</p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Suspended</p>
          <p className="mt-1 text-2xl font-bold text-red-500">{stats.suspended}</p>
        </div>
      </div>

      <UsersTable allUsers={users} />
    </div>
  );
}
