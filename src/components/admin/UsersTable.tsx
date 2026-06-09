"use client";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { suspendUser } from "@/actions/users";
import { ArrowUpDown, Search, Eye, UserX, UserCheck } from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatPrice } from "@/lib/format";
import type { User } from "@/data/users";

interface UsersTableProps {
  allUsers?: User[];
}

export function UsersTable({ allUsers }: UsersTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const tableData = allUsers ?? [];

  const columnHelper = createColumnHelper<User>();

  const columns = [
    columnHelper.accessor("avatar", {
      header: "",
      cell: (info) => (
        <Avatar className="h-8 w-8">
          <AvatarImage src={info.getValue()} />
          <AvatarFallback className="bg-pink-500 text-white text-xs font-bold">
            {info.row.original.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
      ),
    }),
    columnHelper.accessor("name", {
      header: ({ column }) => (
        <button
          type="button"
          className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-neutral-500"
          onClick={() => column.toggleSorting()}
        >
          Name
          <ArrowUpDown className="h-3 w-3" />
        </button>
      ),
      cell: (info) => (
        <div>
          <p className="text-sm font-medium text-neutral-900">{info.getValue()}</p>
          <p className="text-xs text-neutral-500">{info.row.original.email}</p>
        </div>
      ),
    }),
    columnHelper.accessor("role", {
      header: "Role",
      cell: (info) => (
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
            info.getValue() === "admin"
              ? "bg-pink-500/20 text-pink-600"
              : "bg-neutral-100 text-neutral-600"
          }`}
        >
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("totalOrders", {
      header: "Orders",
      cell: (info) => (
        <span className="text-sm text-neutral-500">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("totalSpent", {
      header: ({ column }) => (
        <button
          type="button"
          className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-neutral-500"
          onClick={() => column.toggleSorting()}
        >
          Spent
          <ArrowUpDown className="h-3 w-3" />
        </button>
      ),
      cell: (info) => (
        <span className="text-sm font-medium text-neutral-900">
          {formatPrice(info.getValue())}
        </span>
      ),
    }),
    columnHelper.accessor("joinedAt", {
      header: "Joined",
      cell: (info) => (
        <span className="text-sm text-neutral-500">
          {new Date(info.getValue()).toLocaleDateString()}
        </span>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
            info.getValue() === "active"
              ? "bg-emerald-500/20 text-emerald-500"
              : "bg-red-500/20 text-red-500"
          }`}
        >
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "",
      cell: (info) => (
        <SuspendButton
          userId={info.row.original.id}
          currentStatus={info.row.original.status}
        />
      ),
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, _, value) => {
      const name = row.original.name.toLowerCase();
      const email = row.original.email.toLowerCase();
      const search = String(value).toLowerCase();
      return name.includes(search) || email.includes(search);
    },
    initialState: { pagination: { pageSize: 8 } },
  });

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="h-9 w-full rounded-lg border border-neutral-300 bg-white pl-9 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400"
        />
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-neutral-500">
        <p>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

function SuspendButton({
  userId,
  currentStatus,
}: {
  userId: string;
  currentStatus: string;
}) {
  const [loading, setLoading] = useState(false);
  const suspended = currentStatus === "suspended";

  async function handleToggle() {
    setLoading(true);
    try {
      await suspendUser(userId, !suspended);
      window.location.reload();
    } catch {
      alert("Failed to update user status");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-end gap-1">
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-pink-500/10 hover:text-pink-500"
        title="View details"
      >
        <Eye className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        disabled={loading}
        onClick={handleToggle}
        className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
          !suspended
            ? "text-neutral-400 hover:bg-red-500/10 hover:text-red-500"
            : "text-neutral-400 hover:bg-emerald-500/10 hover:text-emerald-500"
        }`}
        title={!suspended ? "Suspend" : "Activate"}
      >
        {!suspended ? (
          <UserX className="h-3.5 w-3.5" />
        ) : (
          <UserCheck className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}
