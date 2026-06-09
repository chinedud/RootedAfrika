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

interface WelcomeEmailProps {
  name: string;
  email: string;
}

export const WelcomeEmail = ({ name, email }: WelcomeEmailProps) => (
  <Html>
    <Body style={bodyStyle}>
      <Container style={containerStyle}>
        <Section style={headerStyle}>
          <Heading style={logoStyle}>ROOTED AFRIKA</Heading>
          <Text style={taglineStyle}>Premium African & Caribbean Produce</Text>
        </Section>

        <Section style={contentStyle}>
          <Heading style={h1Style}>Welcome to the Family, {name}!</Heading>

          <Text style={pStyle}>
            Thank you for creating an account with Rooted Afrika. You now have
            access to premium African and Caribbean staples sourced directly
            from trusted growers across West Africa, East Africa, and the
            Caribbean diaspora.
          </Text>

          <Text style={pStyle}>
            From farm-fresh yams and plantains to our signature suya spice
            blends — every product is hand-selected for quality and
            authenticity.
          </Text>

          <Section style={ctaSectionStyle}>
            <Button href="https://rootedafrika.com/products" style={buttonStyle}>
              Start Shopping
            </Button>
          </Section>

          <Hr style={hrStyle} />

          <Text style={pStyle}>
            Got questions? We are here to help. Just reply to this email or
            visit our{" "}
            <Link href="https://rootedafrika.com/contact" style={linkStyle}>
              contact page
            </Link>
            .
          </Text>
        </Section>

        <Section style={footerStyle}>
          <Text style={footerTextStyle}>
            © {new Date().getFullYear()} Rooted Afrika. All rights reserved.
          </Text>
          <Text style={footerTextStyle}>
            This email was sent to {email}. You received this because you
            created an account on rootedafrika.com.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

WelcomeEmail.PreviewProps = {
  name: "Chinedu",
  email: "customer@rooted-afrika.com",
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
  margin: 0,
};

const taglineStyle = {
  fontSize: "12px",
  letterSpacing: "2px",
  color: "#a3a3a3",
  margin: "4px 0 0 0",
  textTransform: "uppercase" as const,
};

const contentStyle = {
  padding: "40px 32px",
};

const h1Style = {
  fontSize: "22px",
  fontWeight: "700",
  color: "#171717",
  margin: "0 0 16px 0",
};

const pStyle = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#525252",
  margin: "0 0 12px 0",
};

const ctaSectionStyle = {
  textAlign: "center" as const,
  padding: "24px 0",
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

const linkStyle = {
  color: "#ec4899",
  textDecoration: "underline",
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
