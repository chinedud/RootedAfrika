import { NextResponse } from "next/server";
import { resend } from "@/emails/resend";
import { ShippingConfirmation } from "@/emails/templates/ShippingConfirmation";

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      name: string;
      email: string;
      orderId: string;
      trackingNumber?: string;
      carrier?: string;
    };

    const { name, email, orderId, trackingNumber, carrier } = body;

    if (!name || !email || !orderId) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, orderId" },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Rooted Afrika <noreply@rootedafrika.com>",
      to: email,
      subject: `Your Rooted Afrika Order Has Shipped — ${orderId}`,
      react: ShippingConfirmation({ name, email, orderId, trackingNumber, carrier }),
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
