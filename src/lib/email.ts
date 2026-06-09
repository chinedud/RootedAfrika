import { resend } from "@/emails/resend";
import { WelcomeEmail } from "@/emails/templates/WelcomeEmail";
import { OrderConfirmation } from "@/emails/templates/OrderConfirmation";
import { ShippingConfirmation } from "@/emails/templates/ShippingConfirmation";
import { PasswordReset } from "@/emails/templates/PasswordReset";

const FROM = "Rooted Afrika <noreply@rootedafrika.com>";

export async function sendWelcomeEmail(name: string, email: string) {
  return resend.emails.send({
    from: FROM,
    to: email,
    subject: "Welcome to Rooted Afrika!",
    react: WelcomeEmail({ name, email }),
  });
}

export async function sendOrderConfirmationEmail(params: {
  name: string;
  email: string;
  orderId: string;
  items: { name: string; quantity: number; unit_price: number }[];
  totalAmount: number;
  shippingAddress: string;
  estimatedDelivery: string;
}) {
  const { name, email, orderId, items, totalAmount, shippingAddress, estimatedDelivery } = params;
  return resend.emails.send({
    from: FROM,
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
}

export async function sendShippingConfirmationEmail(params: {
  name: string;
  email: string;
  orderId: string;
  trackingNumber?: string;
  carrier?: string;
}) {
  const { name, email, orderId, trackingNumber, carrier } = params;
  return resend.emails.send({
    from: FROM,
    to: email,
    subject: `Your Rooted Afrika Order Has Shipped — ${orderId}`,
    react: ShippingConfirmation({ name, email, orderId, trackingNumber, carrier }),
  });
}

export async function sendPasswordResetEmail(params: {
  name: string;
  email: string;
  resetLink: string;
}) {
  const { name, email, resetLink } = params;
  return resend.emails.send({
    from: FROM,
    to: email,
    subject: "Reset your Rooted Afrika password",
    react: PasswordReset({ name, email, resetLink }),
  });
}
