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
  <div style={rootStyle}>
    <div style={cardStyle}>
      <div style={headerStyle}>
        <h1 style={logoStyle}>ROOTED AFRIKA</h1>
      </div>

      <div style={bodyStyle}>
        <h2 style={h2Style}>Reset your password</h2>

        <p style={pStyle}>Hi {name},</p>
        <p style={pStyle}>
          We received a request to reset the password for your Rooted Afrika
          account. Click the button below to create a new password. This link
          expires in 1 hour.
        </p>

        <div style={ctaWrapStyle}>
          <a href={resetLink} style={buttonStyle}>
            Reset Password
          </a>
        </div>

        <p style={pStyle}>
          If you did not request a password reset, you can safely ignore this
          email. Your account remains secure.
        </p>

        <hr style={hrStyle} />

        <p style={fallbackStyle}>
          If the button above does not work, copy and paste this link into your
          browser:
        </p>
        <a href={resetLink} style={linkStyle}>
          {resetLink}
        </a>
      </div>

      <div style={footerStyle}>
        <p style={footerTextStyle}>
          &copy; {new Date().getFullYear()} Rooted Afrika. All rights reserved.
        </p>
        <p style={footerTextStyle}>
          This email was sent to {email} in response to a password reset
          request.
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
  margin: 0,
};

const bodyStyle = {
  padding: "40px 32px",
};

const h2Style = {
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

const ctaWrapStyle = {
  textAlign: "center" as const,
  padding: "24px 0",
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

const linkStyle = {
  color: "#ec4899",
  fontSize: "13px",
  wordBreak: "break-all" as const,
  textDecoration: "underline",
};

const fallbackStyle = {
  fontSize: "13px",
  color: "#a3a3a3",
  margin: "0 0 4px 0",
  lineHeight: "1.5",
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
