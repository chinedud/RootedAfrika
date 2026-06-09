import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-2xl font-bold text-brand-black">
        Terms of Service for Rooted Afrika
      </h1>
      <p className="mb-8 text-sm text-neutral-500">Last Updated: June 2026</p>

      <div className="space-y-6 text-sm leading-relaxed text-neutral-700">
        <p>
          Welcome to <strong>Rooted Afrika</strong>. These Terms of Service
          (&ldquo;Terms&rdquo;) govern your use of our website, mobile platforms,
          and purchasing services (collectively, the &ldquo;Services&rdquo;). By
          accessing our site or purchasing our products — including our
          proprietary <em>Rooted Afrika™</em> line and fresh regional agricultural
          goods — you agree to be bound by these Terms.
        </p>
        <p>
          Please read them carefully before placing an order. If you do not agree
          to all of these Terms, you may not access our website or use our
          services.
        </p>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-brand-black">
            1. Account Creation &amp; Eligibility
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Age Requirement:</strong> By using this site, you represent
              that you are at least the age of majority in your state, province,
              or country of residence.
            </li>
            <li>
              <strong>Account Security:</strong> When you create an account, you
              must provide accurate, complete information. You are entirely
              responsible for maintaining the confidentiality of your password.
              Rooted Afrika is not liable for any loss or damage arising from
              your failure to protect your login credentials.
            </li>
            <li>
              <strong>Account Termination:</strong> We reserve the right to
              refuse service, terminate accounts, or cancel orders at our sole
              discretion if we suspect fraudulent, abusive, or unauthorized
              commercial activity.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-brand-black">
            2. Product Availability &amp; Accuracy
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Agricultural Variations:</strong> Because we partner
              directly with trusted growers across West Africa, East Africa, and
              the Caribbean diaspora, our raw produce (such as yams, plantains,
              and avocados) is subject to natural seasonal variances in size,
              shape, and availability.
            </li>
            <li>
              <strong>Descriptions and Pricing:</strong> We strive to ensure all
              descriptions of products (including <em>Rooted Afrika</em> flours,
              grains, and signature suya blends) and prices are accurate.
              However, we reserve the right to correct any typographical errors,
              inaccuracies, or omissions, and to change or update information or
              cancel orders if any information on the website is inaccurate at
              any time without prior notice.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-brand-black">
            3. Pricing, Payments, &amp; Billing
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Payment Authorization:</strong> By submitting an order, you
              authorize Rooted Afrika (and our secure third-party payment
              processors) to charge the designated payment method for the total
              amount of your purchase, including any applicable taxes and
              shipping fees.
            </li>
            <li>
              <strong>Wholesale &amp; B2B Billing:</strong> For verified retail,
              restaurant, or catering partners utilizing our B2B wholesale supply
              services, payments must be settled according to the specific
              invoicing terms agreed upon during onboarding.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-brand-black">
            4. Shipping, Freshness, &amp; Local Delivery
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Perishable Goods Policy:</strong> To ensure your produce
              arrives at peak freshness, we utilize localized shipping networks.
            </li>
            <li>
              <strong>Delivery Windows:</strong> Customers are responsible for
              providing an accurate shipping address and ensuring someone is
              available to receive perishable items during the designated
              delivery window. Rooted Afrika is not responsible for spoiled
              produce resulting from incorrect address inputs or packages left
              unattended for extended periods.
            </li>
            <li>
              <strong>Fulfillment Delays:</strong> While we strive to meet
              delivery windows, customs processes or international freight
              delays impacting our direct diaspora supply chain may occasionally
              cause delays. We will communicate any major disruptions promptly.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-brand-black">
            5. Returns, Refunds, and Damaged Goods
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Perishable Items:</strong> Due to the organic nature of raw
              produce, fresh agricultural goods are generally non-returnable. If
              your produce arrives damaged, spoiled, or structurally compromised,
              you must contact our support team at{" "}
              <a
                href="mailto:support@rooted-afrika.com"
                className="text-brand-gold hover:underline"
              >
                support@rooted-afrika.com
              </a>{" "}
              within <strong>24 hours of delivery</strong> with photographic
              proof to qualify for a replacement or refund.
            </li>
            <li>
              <strong>Packaged Goods (<em>Rooted Afrika™</em>):</strong> Unopened,
              sealed packages of <em>Rooted Afrika</em> flours, grains, or spice
              blends may be returned within 14 days of receipt for a refund or
              store credit, minus shipping fees.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-brand-black">
            6. Intellectual Property
          </h2>
          <p>
            All content included on this site — including text, graphics, logos,
            product names (including <em>Rooted Afrika</em>), and images — is the
            property of Rooted Afrika or its content suppliers and is
            protected by international copyright, trademark, and intellectual
            property laws. You may not reproduce, duplicate, or exploit any
            portion of our brand without explicit written permission from us.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-brand-black">
            7. Limitation of Liability
          </h2>
          <p>
            Rooted Afrika provides its website and services on an &ldquo;as
            is&rdquo; and &ldquo;as available&rdquo; basis. To the maximum extent
            permitted by law, Rooted Afrika shall not be liable for any
            direct, indirect, incidental, or consequential damages resulting from
            the use of our services, the consumption of our products, or the
            inability to access our platform.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-brand-black">
            8. Governing Law
          </h2>
          <p>
            These Terms of Service and any separate agreements whereby we provide
            you Services shall be governed by and construed in accordance with
            the laws of the United Kingdom, without regard to conflict of law
            principles.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-brand-black">
            9. Changes to Terms of Service
          </h2>
          <p>
            We reserve the right to update, change, or replace any part of these
            Terms by posting updates to our website. It is your responsibility to
            check our website periodically for changes. Your continued use of or
            access to our website following the posting of any changes
            constitutes acceptance of those changes.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-brand-black">
            10. Contact Information
          </h2>
          <p>Questions about the Terms of Service should be sent to us at:</p>
          <p className="mt-2">
            <strong>Rooted Afrika</strong>
            <br />
            Email:{" "}
            <a
              href="mailto:terms@rooted-afrika.com"
              className="text-brand-gold hover:underline"
            >
              terms@rooted-afrika.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
