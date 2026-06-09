import {
  Html,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Link,
  Button,
  Hr,
} from "@react-email/components";

interface OrderItem {
  name: string;
  quantity: number;
  unit_price: number;
}

interface OrderConfirmationProps {
  name: string;
  email: string;
  orderId: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: string;
  estimatedDelivery: string;
}

const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);

const itemRow = (item: OrderItem) => `
  <tr>
    <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; color: #525252; font-size: 14px;">${item.name}</td>
    <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; color: #525252; font-size: 14px; text-align: center;">${item.quantity}</td>
    <td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; color: #525252; font-size: 14px; text-align: right;">${formatPrice(item.unit_price)}</td>
  </tr>`;

export const OrderConfirmation = ({
  name,
  email,
  orderId,
  items,
  totalAmount,
  shippingAddress,
  estimatedDelivery,
}: OrderConfirmationProps) => (
  <Html>
    <Body style={bodyStyle}>
      <Container style={containerStyle}>
        <Section style={headerStyle}>
          <Heading style={logoStyle}>ROOTED AFRIKA</Heading>
          <Text style={orderBadgeStyle}>Order Confirmed</Text>
        </Section>

        <Section style={contentStyle}>
          <Text style={greetingStyle}>Thank you, {name}!</Text>
          <Text style={pStyle}>
            Your order has been placed and is being prepared. We will notify you
            when it ships.
          </Text>

          <Section style={orderIdSectionStyle}>
            <Text style={orderIdLabelStyle}>Order Reference</Text>
            <Text style={orderIdValueStyle}>{orderId}</Text>
          </Section>

          <Hr style={hrStyle} />

          <Heading style={h2Style}>Order Summary</Heading>

          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Item</th>
                <th style={{ ...thStyle, textAlign: "center" }}>Qty</th>
                <th style={{ ...thStyle, textAlign: "right" }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i}>
                  <td style={tdStyle}>{item.name}</td>
                  <td style={{ ...tdStyle, textAlign: "center" }}>{item.quantity}</td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>
                    {formatPrice(item.unit_price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Section style={totalSectionStyle}>
            <Text style={totalLabelStyle}>Total</Text>
            <Text style={totalValueStyle}>{formatPrice(totalAmount)}</Text>
          </Section>

          <Hr style={hrStyle} />

          <Heading style={h2Style}>Delivery Details</Heading>
          <Text style={pStyle}>{shippingAddress}</Text>
          <Text style={pStyle}>
            Estimated delivery: <strong>{estimatedDelivery}</strong>
          </Text>

          <Section style={ctaSectionStyle}>
            <Button href={`https://rootedafrika.com/account`} style={buttonStyle}>
              View Order
            </Button>
          </Section>
        </Section>

        <Section style={footerStyle}>
          <Text style={footerTextStyle}>
            © {new Date().getFullYear()} Rooted Afrika. All rights reserved.
          </Text>
          <Text style={footerTextStyle}>
            This email was sent to {email} for order {orderId}.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

OrderConfirmation.PreviewProps = {
  name: "Chinedu",
  email: "customer@rooted-afrika.com",
  orderId: "AFM-GH8XK2M1",
  items: [
    { name: "Premium Ijebu Garri", quantity: 2, unit_price: 3500 },
    { name: "Suya Spice Blend", quantity: 1, unit_price: 2500 },
    { name: "Yam Flour (Amala)", quantity: 1, unit_price: 4000 },
  ],
  totalAmount: 13500,
  shippingAddress: "42 Heritage Street, Lagos, Nigeria",
  estimatedDelivery: "3-5 business days",
};

const bodyStyle = {
  backgroundColor: "#0a0a0a",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  margin: 0,
  padding: 0,
};

const containerStyle = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  overflow: "hidden",
};

const headerStyle = {
  backgroundColor: "#171717",
  padding: "32px 24px",
  textAlign: "center" as const,
};

const logoStyle = {
  fontSize: "24px",
  fontWeight: "700",
  letterSpacing: "4px",
  color: "#ec4899",
  margin: "0 0 8px 0",
};

const orderBadgeStyle = {
  display: "inline-block",
  backgroundColor: "#ec4899",
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: "600",
  letterSpacing: "2px",
  padding: "4px 16px",
  borderRadius: "12px",
  textTransform: "uppercase" as const,
};

const contentStyle = {
  padding: "40px 32px",
};

const greetingStyle = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#171717",
  margin: "0 0 8px 0",
};

const pStyle = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#525252",
  margin: "0 0 12px 0",
};

const orderIdSectionStyle = {
  backgroundColor: "#fafafa",
  border: "1px solid #e5e5e5",
  borderRadius: "6px",
  padding: "12px 16px",
  margin: "16px 0",
  textAlign: "center" as const,
};

const orderIdLabelStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  color: "#a3a3a3",
  margin: 0,
};

const orderIdValueStyle = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#ec4899",
  fontFamily: "monospace",
  margin: "4px 0 0 0",
};

const hrStyle = {
  borderColor: "#e5e5e5",
  margin: "24px 0",
};

const h2Style = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#171717",
  margin: "0 0 8px 0",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const thStyle = {
  padding: "8px 0",
  borderBottom: "2px solid #171717",
  fontSize: "12px",
  fontWeight: "600",
  letterSpacing: "1px",
  textTransform: "uppercase" as const,
  color: "#737373",
  textAlign: "left" as const,
};

const tdStyle = {
  padding: "10px 0",
  borderBottom: "1px solid #e5e5e5",
  color: "#525252",
  fontSize: "14px",
};

const totalSectionStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 0",
};

const totalLabelStyle = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#171717",
  margin: 0,
};

const totalValueStyle = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#ec4899",
  margin: 0,
};

const ctaSectionStyle = {
  textAlign: "center" as const,
  padding: "24px 0 0 0",
};

const buttonStyle = {
  backgroundColor: "#ec4899",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "600",
  padding: "12px 32px",
  borderRadius: "6px",
  textDecoration: "none",
  display: "inline-block",
};

const footerStyle = {
  backgroundColor: "#fafafa",
  padding: "24px 32px",
};

const footerTextStyle = {
  fontSize: "12px",
  color: "#a3a3a3",
  margin: "0 0 4px 0",
  lineHeight: "1.5",
};
