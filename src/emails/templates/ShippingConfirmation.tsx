interface ShippingConfirmationProps {
  name: string;
  email: string;
  orderId: string;
  trackingNumber?: string;
  carrier?: string;
}

export const ShippingConfirmation = ({
  name,
  email,
  orderId,
  trackingNumber,
  carrier,
}: ShippingConfirmationProps) => (
  <div style={rootStyle}>
    <div style={cardStyle}>
      <div style={headerStyle}>
        <h1 style={logoStyle}>ROOTED AFRIKA</h1>
        <span style={badgeStyle}>On Its Way!</span>
      </div>

      <div style={bodyStyle}>
        <p style={greetingStyle}>Hi {name},</p>
        <p style={pStyle}>
          Great news — your order is on the move! Here is everything you need
          to track it.
        </p>

        <div style={infoBoxStyle}>
          <p style={labelStyle}>Order Reference</p>
          <p style={codeStyle}>{orderId}</p>
        </div>

        {trackingNumber && (
          <div style={trackingBoxStyle}>
            <p style={labelStyle}>
              {carrier ? `${carrier} Tracking` : "Tracking Number"}
            </p>
            <p style={trackingValueStyle}>{trackingNumber}</p>
          </div>
        )}

        <div style={ctaWrapStyle}>
          <a href="https://rootedafrika.com/account" style={buttonStyle}>
            Track Your Order
          </a>
        </div>

        <hr style={hrStyle} />

        <p style={pStyle}>
          Your fresh produce and pantry staples are carefully packed and on
          their way to your kitchen. We will send you another update once your
          order arrives at its destination.
        </p>
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

const infoBoxStyle = {
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

const codeStyle = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#ec4899",
  fontFamily: "monospace",
  margin: "4px 0 0 0",
};

const trackingBoxStyle = {
  backgroundColor: "#fff1f7",
  border: "1px solid #fbcfe8",
  borderRadius: "6px",
  padding: "16px",
  margin: "16px 0",
  textAlign: "center" as const,
};

const trackingValueStyle = {
  fontSize: "15px",
  fontWeight: "700",
  color: "#171717",
  fontFamily: "monospace",
  letterSpacing: "1px",
  margin: "4px 0 0 0",
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

const hrStyle = {
  border: "none",
  borderTop: "1px solid #e5e5e5",
  margin: "24px 0",
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
