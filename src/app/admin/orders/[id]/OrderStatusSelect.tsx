"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateOrderStatus } from "@/actions/orders";
import { statusLabels, type OrderStatus } from "@/data/orders";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  orderId: string;
  currentStatus: string;
}

export function OrderStatusSelect({ orderId, currentStatus }: Props) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  async function handleChange(value: string | null) {
    if (!value) return;
    setUpdating(true);
    try {
      await updateOrderStatus(orderId, value);
      router.refresh();
    } catch {
      alert("Failed to update status");
    } finally {
      setUpdating(false);
    }
  }

  return (
    <Select
      value={currentStatus}
      onValueChange={handleChange}
      disabled={updating}
    >
      <SelectTrigger className="w-36">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {(
          [
            "pending",
            "processing",
            "shipped",
            "delivered",
            "cancelled",
          ] as OrderStatus[]
        ).map((s) => (
          <SelectItem key={s} value={s}>
            {statusLabels[s]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
