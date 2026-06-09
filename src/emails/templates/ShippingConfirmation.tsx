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
  <Html>
    <Body style={bodyStyle}>
      <Container style={containerStyle}>
        <Section style={headerStyle}>
          <Heading style={logoStyle}>ROOTED AFRIKA</Heading>
          <Text style={badgeStyle}>On Its Way!</Text>
        </Section>

        <Section style={contentStyle}>
          <Text style={greetingStyle}>Hi {name},</Text>
          <Text style={pStyle}>
            Great news — your order is on the move! Here is everything you need
            to track it.
          </Text>

          <Section style={orderIdSectionStyle}>
            <Text style={orderIdLabelStyle}>Order Reference</Text>
            <Text style={orderIdValueStyle}>{orderId}</Text>
          </Section>

          {trackingNumber && (
            <Section style={trackingSectionStyle}>
              <Text style={trackingLabelStyle}>
                {carrier ? `${carrier} Tracking` : "Tracking Number"}
              </Text>
              <Text style={trackingValueStyle}>{trackingNumber}</Text>
            </Section>
          )}

          <Section style={ctaSectionStyle}>
            <Button
              href={
                trackingNumber
                  ? `https://rootedafrika.com/account`
                  : `https://rootedafrika.com/account`
              }
              style={buttonStyle}
            >
              Track Your Order
            </Button>
          </Section>

          <Hr style={hrStyle} />

          <Text style={pStyle}>
            Your fresh produce and pantry staples are carefully packed and on
            their way to your kitchen. We will send you another update once
            your order arrives at its destination.
          </Text>
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

ShippingConfirmation.PreviewProps = {
  name: "Chinedu",
  email: "customer@rooted-afrika.com",
  orderId: "AFM-GH8XK2M1",
  trackingNumber: "RA-1Z999AA10123456784",
  carrier: "DHL",
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

const trackingSectionStyle = {
  backgroundColor: "#fff1f7",
  border: "1px solid #fbcfe8",
  borderRadius: "6px",
  padding: "16px",
  margin: "16px 0",
  textAlign: "center" as const,
};

const trackingLabelStyle = {
  fontSize: "11px",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  color: "#a3a3a3",
  margin: 0,
};

const trackingValueStyle = {
  fontSize: "15px",
  fontWeight: "700",
  color: "#171717",
  fontFamily: "monospace",
  letterSpacing: "1px",
  margin: "4px 0 0 0",
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

const hrStyle = {
  borderColor: "#e5e5e5",
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
