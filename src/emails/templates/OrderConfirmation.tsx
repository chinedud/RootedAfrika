const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);

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

export const OrderConfirmation = ({
  name,
  email,
  orderId,
  items,
  totalAmount,
  shippingAddress,
  estimatedDelivery,
}: OrderConfirmationProps) => (
  <div style={rootStyle}>
    <div style={cardStyle}>
      <div style={headerStyle}>
        <h1 style={logoStyle}>ROOTED AFRIKA</h1>
        <span style={badgeStyle}>Order Confirmed</span>
      </div>

      <div style={bodyStyle}>
        <p style={greetingStyle}>Thank you, {name}!</p>
        <p style={pStyle}>
          Your order has been placed and is being prepared. We will notify you
          when it ships.
        </p>

        <div style={orderIdBoxStyle}>
          <p style={labelStyle}>Order Reference</p>
          <p style={orderIdStyle}>{orderId}</p>
        </div>

        <hr style={hrStyle} />

        <h3 style={h3Style}>Order Summary</h3>

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thLeftStyle}>Item</th>
              <th style={thCenterStyle}>Qty</th>
              <th style={thRightStyle}>Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td style={tdStyle}>{item.name}</td>
                <td style={{ ...tdStyle, textAlign: "center" as const }}>{item.quantity}</td>
                <td style={{ ...tdStyle, textAlign: "right" as const }}>
                  {formatPrice(item.unit_price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={totalRowStyle}>
          <span style={totalLabelStyle}>Total</span>
          <span style={totalValueStyle}>{formatPrice(totalAmount)}</span>
        </div>

        <hr style={hrStyle} />

        <h3 style={h3Style}>Delivery Details</h3>
        <p style={pStyle}>{shippingAddress}</p>
        <p style={pStyle}>
          Estimated delivery: <strong>{estimatedDelivery}</strong>
        </p>

        <div style={ctaWrapStyle}>
          <a href="https://rootedafrika.com/account" style={buttonStyle}>
            View Order
          </a>
        </div>
      </div>

      <div style={footerStyle}>
        <p style={footerTextStyle}>
          &copy; {new Date().getFullYear()} Rooted Afrika. All rights reserved.
        </p>
        <p style={footerTextStyle}>
          This email was sent to {email} for order {orderId}.
        </p>
      </div>
    </div>
  </div>
);

const rootStyle = {
  backgroundColor: "#0a0a0a",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  margin: 0,
  padding: "32px 16px",
};

const cardStyle = {
  maxWidth: "560px",
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

const badgeStyle = {
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

const bodyStyle = {
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

const orderIdBoxStyle = {
  backgroundColor: "#fafafa",
  border: "1px solid #e5e5e5",
  borderRadius: "6px",
  padding: "12px 16px",
  margin: "16px 0",
  textAlign: "center" as const,
};

const labelStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  color: "#a3a3a3",
  margin: 0,
};

const orderIdStyle = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#ec4899",
  fontFamily: "monospace",
  margin: "4px 0 0 0",
};

const hrStyle = {
  border: "none",
  borderTop: "1px solid #e5e5e5",
  margin: "24px 0",
};

const h3Style = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#171717",
  margin: "0 0 8px 0",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const thLeftStyle = {
  padding: "8px 0",
  borderBottom: "2px solid #171717",
  fontSize: "12px",
  fontWeight: "600",
  letterSpacing: "1px",
  textTransform: "uppercase" as const,
  color: "#737373",
  textAlign: "left" as const,
};

const thCenterStyle = {
  padding: "8px 0",
  borderBottom: "2px solid #171717",
  fontSize: "12px",
  fontWeight: "600",
  letterSpacing: "1px",
  textTransform: "uppercase" as const,
  color: "#737373",
  textAlign: "center" as const,
};

const thRightStyle = {
  padding: "8px 0",
  borderBottom: "2px solid #171717",
  fontSize: "12px",
  fontWeight: "600",
  letterSpacing: "1px",
  textTransform: "uppercase" as const,
  color: "#737373",
  textAlign: "right" as const,
};

const tdStyle = {
  padding: "10px 0",
  borderBottom: "1px solid #e5e5e5",
  color: "#525252",
  fontSize: "14px",
};

const totalRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 0",
};

const totalLabelStyle = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#171717",
};

const totalValueStyle = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#ec4899",
};

const ctaWrapStyle = {
  textAlign: "center" as const,
  padding: "24px 0 0 0",
};

const buttonStyle = {
  display: "inline-block",
  backgroundColor: "#ec4899",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "600",
  padding: "12px 32px",
  borderRadius: "6px",
  textDecoration: "none",
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
