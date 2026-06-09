"use client";

import { useRouter } from "next/navigation";
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
import { ArrowUpDown, Search } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Order, OrderStatus, PaymentStatus } from "@/data/orders";

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
import { formatPrice } from "@/lib/format";

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor("orderNumber", {
    header: ({ column }) => (
      <button
        type="button"
        className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-neutral-500"
        onClick={() => column.toggleSorting()}
      >
        Order
        <ArrowUpDown className="h-3 w-3" />
      </button>
    ),
    cell: (info) => (
      <span className="font-mono text-sm font-medium text-neutral-900">
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("customerName", {
    header: "Customer",
    cell: (info) => (
      <div>
        <p className="text-sm font-medium text-neutral-900">{info.getValue()}</p>
        <p className="text-xs text-neutral-500">
          {info.row.original.customerEmail}
        </p>
      </div>
    ),
  }),
  columnHelper.accessor("createdAt", {
    header: ({ column }) => (
      <button
        type="button"
        className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-neutral-500"
        onClick={() => column.toggleSorting()}
      >
        Date
        <ArrowUpDown className="h-3 w-3" />
      </button>
    ),
    cell: (info) => (
      <span className="text-sm text-neutral-500">
        {new Date(info.getValue()).toLocaleDateString()}
      </span>
    ),
  }),
  columnHelper.accessor("totalAmount", {
    header: ({ column }) => (
      <button
        type="button"
        className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-neutral-500"
        onClick={() => column.toggleSorting()}
      >
        Total
        <ArrowUpDown className="h-3 w-3" />
      </button>
    ),
    cell: (info) => (
      <span className="text-sm font-medium text-neutral-900">
        {formatPrice(info.getValue())}
      </span>
    ),
  }),
  columnHelper.accessor("paymentStatus", {
    header: "Payment",
    cell: (info) => (
      <span
        className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
          info.getValue() === "paid"
            ? "bg-emerald-500/20 text-emerald-500"
            : "bg-pink-500/20 text-pink-400"
        }`}
      >
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => (
      <span
        className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusColors[info.getValue()]}`}
      >
        {statusLabels[info.getValue()]}
      </span>
    ),
  }),
];

interface OrdersTableProps {
  allOrders?: Order[];
}

export function OrdersTable({ allOrders }: OrdersTableProps) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const tableData = allOrders ?? [];

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
      const orderNum = String(row.original.orderNumber).toLowerCase();
      const customer = row.original.customerName.toLowerCase();
      const search = String(value).toLowerCase();
      return orderNum.includes(search) || customer.includes(search);
    },
    initialState: { pagination: { pageSize: 8 } },
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by order or customer..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="h-9 w-full rounded-lg border border-neutral-300 bg-white pl-9 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400"
          />
        </div>

        <Select
          value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
          onValueChange={(value) =>
            table.getColumn("status")?.setFilterValue(value || undefined)
          }
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All statuses</SelectItem>
            {(["pending", "processing", "shipped", "delivered", "cancelled"] as OrderStatus[]).map(
              (s) => (
                <SelectItem key={s} value={s}>
                  {statusLabels[s]}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>

        <Select
          value={(table.getColumn("paymentStatus")?.getFilterValue() as string) ?? ""}
          onValueChange={(value) =>
            table.getColumn("paymentStatus")?.setFilterValue(value || undefined)
          }
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="All payments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All payments</SelectItem>
            {(["paid", "unpaid"] as PaymentStatus[]).map((s) => (
              <SelectItem key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
              <TableRow
                key={row.id}
                className="cursor-pointer"
                onClick={() => router.push(`/admin/orders/${row.original.id}`)}
              >
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
