"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createOrder(
  userId: string,
  cartItems: { product_id: string; quantity: number; unit_price: number }[],
  shippingAddress: Record<string, unknown>,
  totalAmount: number,
) {
  const supabase = await createClient();

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: userId,
      status: "pending",
      payment_status: "unpaid",
      total_amount: totalAmount,
      shipping_address: shippingAddress,
    })
    .select()
    .single();

  if (orderError) throw new Error(orderError.message);

  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    unit_price: item.unit_price,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) throw new Error(itemsError.message);

  await supabase.from("cart_items").delete().eq("user_id", userId);

  revalidatePath("/orders");
  return order;
}

export async function getOrdersByUser(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function getAllOrders() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, profiles(full_name, avatar_url), order_items(*)")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function updateOrderStatus(orderId: string, status: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") throw new Error("Unauthorized");

  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/orders");
}

export async function getOrderById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, profiles(full_name, avatar_url), order_items(*)")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}
