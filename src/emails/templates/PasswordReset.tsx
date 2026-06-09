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

interface PasswordResetProps {
  name: string;
  email: string;
  resetLink: string;
}

export const PasswordReset = ({
  name,
  email,
  resetLink,
}: PasswordResetProps) => (
  <Html>
    <Body style={bodyStyle}>
      <Container style={containerStyle}>
        <Section style={headerStyle}>
          <Heading style={logoStyle}>ROOTED AFRIKA</Heading>
        </Section>

        <Section style={contentStyle}>
          <Heading style={h1Style}>Reset your password</Heading>

          <Text style={pStyle}>Hi {name},</Text>
          <Text style={pStyle}>
            We received a request to reset the password for your Rooted Afrika
            account. Click the button below to create a new password. This link
            expires in 1 hour.
          </Text>

          <Section style={ctaSectionStyle}>
            <Button href={resetLink} style={buttonStyle}>
              Reset Password
            </Button>
          </Section>

          <Text style={pStyle}>
            If you did not request a password reset, you can safely ignore this
            email. Your account remains secure.
          </Text>

          <Hr style={hrStyle} />

          <Text style={fallbackStyle}>
            If the button above does not work, copy and paste this link into
            your browser:
          </Text>
          <Link href={resetLink} style={linkStyle}>
            {resetLink}
          </Link>
        </Section>

        <Section style={footerStyle}>
          <Text style={footerTextStyle}>
            © {new Date().getFullYear()} Rooted Afrika. All rights reserved.
          </Text>
          <Text style={footerTextStyle}>
            This email was sent to {email} in response to a password reset
            request.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

PasswordReset.PreviewProps = {
  name: "Chinedu",
  email: "customer@rooted-afrika.com",
  resetLink: "https://rootedafrika.com/reset-password?token=abc123",
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

const fallbackStyle = {
  fontSize: "13px",
  color: "#a3a3a3",
  margin: "0 0 4px 0",
  lineHeight: "1.5",
};

const linkStyle = {
  color: "#ec4899",
  fontSize: "13px",
  wordBreak: "break-all" as const,
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
