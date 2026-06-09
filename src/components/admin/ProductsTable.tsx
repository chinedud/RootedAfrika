"use client";

import Image from "next/image";
import Link from "next/link";
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
import { ArrowUpDown, Edit, Search, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/actions/products";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/Button";

import { CATEGORY_LABELS, type Product } from "@/types";
import { formatPrice } from "@/lib/format";

const columnHelper = createColumnHelper<Product>();

interface ProductsTableProps {
  allProducts?: Product[];
}

export function ProductsTable({ allProducts }: ProductsTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  async function handleDelete(productId: string, productName: string) {
    if (!window.confirm(`Delete "${productName}"? This cannot be undone.`)) return;
    setDeletingId(productId);
    try {
      await deleteProduct(productId);
      router.refresh();
    } catch {
      alert("Failed to delete product. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  const columns = [
    columnHelper.accessor("image", {
      header: "",
      cell: (info) => (
        <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-white/10">
          <Image src={info.getValue()} alt="" fill className="object-cover" sizes="40px" />
        </div>
      ),
    }),
    columnHelper.accessor("name", {
      header: ({ column }) => (
        <button
          type="button"
          className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-neutral-500"
          onClick={() => column.toggleSorting()}
        >
          Product
          <ArrowUpDown className="h-3 w-3" />
        </button>
      ),
      cell: (info) => (
        <p className="text-sm font-medium text-neutral-900">{info.getValue()}</p>
      ),
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: (info) => (
        <span className="text-sm text-neutral-500">
          {CATEGORY_LABELS[info.getValue()]}
        </span>
      ),
    }),
    columnHelper.accessor("price", {
      header: ({ column }) => (
        <button
          type="button"
          className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-neutral-500"
          onClick={() => column.toggleSorting()}
        >
          Price
          <ArrowUpDown className="h-3 w-3" />
        </button>
      ),
      cell: (info) => (
        <span className="text-sm font-medium text-neutral-900">
          {formatPrice(info.getValue())}
        </span>
      ),
    }),
    columnHelper.accessor("inStock", {
      header: "Stock",
      cell: (info) => (
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
            info.getValue()
              ? "bg-emerald-500/20 text-emerald-500"
              : "bg-red-500/20 text-red-500"
          }`}
        >
          {info.getValue() ? "In Stock" : "Out of Stock"}
        </span>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "",
      cell: (info) => (
        <div className="flex justify-end gap-1">
          <Link
            href={`/admin/products/edit/${info.row.original.id}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-pink-500/10 hover:text-pink-500"
          >
            <Edit className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            disabled={deletingId === info.row.original.id}
            onClick={() => handleDelete(info.row.original.id, info.row.original.name)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-red-500/10 hover:text-red-500 disabled:opacity-50"
          >
            {deletingId === info.row.original.id ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      ),
    }),
  ];

  const tableData = allProducts ?? [];

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
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
