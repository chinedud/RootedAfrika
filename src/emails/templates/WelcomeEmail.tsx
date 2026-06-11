interface WelcomeEmailProps {
  name: string;
  email: string;
}

export const WelcomeEmail = ({ name, email }: WelcomeEmailProps) => (
  <div style={rootStyle}>
    <div style={cardStyle}>
      <div style={headerStyle}>
        <h1 style={logoStyle}>ROOTED AFRIKA</h1>
        <p style={taglineStyle}>Premium African & Caribbean Produce</p>
      </div>

      <div style={bodyStyle}>
        <h2 style={h2Style}>Welcome to the Family, {name}!</h2>

        <p style={pStyle}>
          Thank you for creating an account with Rooted Afrika. You now have
          access to premium African and Caribbean staples sourced directly from
          trusted growers across West Africa, East Africa, and the Caribbean
          diaspora.
        </p>

        <p style={pStyle}>
          From farm-fresh yams and plantains to our signature suya spice blends
          — every product is hand-selected for quality and authenticity.
        </p>

        <div style={ctaWrapStyle}>
          <a href="https://rootedafrika.com/products" style={buttonStyle}>
            Start Shopping
          </a>
        </div>

        <hr style={hrStyle} />

        <p style={pStyle}>
          Got questions? We are here to help. Just reply to this email or visit
          our{" "}
          <a href="https://rootedafrika.com/contact" style={linkStyle}>
            contact page
          </a>
          .
        </p>
      </div>

      <div style={footerStyle}>
        <p style={footerTextStyle}>
          &copy; {new Date().getFullYear()} Rooted Afrika. All rights reserved.
        </p>
        <p style={footerTextStyle}>
          This email was sent to {email}. You received this because you created
          an account on rootedafrika.com.
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

const taglineStyle = {
  fontSize: "12px",
  letterSpacing: "2px",
  color: "#a3a3a3",
  margin: "4px 0 0 0",
  textTransform: "uppercase" as const,
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
