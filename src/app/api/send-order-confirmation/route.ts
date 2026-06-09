import { NextResponse } from "next/server";
import { resend } from "@/emails/resend";
import { OrderConfirmation } from "@/emails/templates/OrderConfirmation";

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      name: string;
      email: string;
      orderId: string;
      items: { name: string; quantity: number; unit_price: number }[];
      totalAmount: number;
      shippingAddress: string;
      estimatedDelivery: string;
    };

    const { name, email, orderId, items, totalAmount, shippingAddress, estimatedDelivery } = body;

    if (!name || !email || !orderId || !items?.length) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, orderId, items" },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Rooted Afrika <noreply@rootedafrika.com>",
      to: email,
      subject: `Order Confirmed — ${orderId}`,
      react: OrderConfirmation({
        name,
        email,
        orderId,
        items,
        totalAmount,
        shippingAddress,
        estimatedDelivery,
      }),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 },
    );
  }
}
