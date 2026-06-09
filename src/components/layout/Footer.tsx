import Link from "next/link";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import {
  contactInfo,
  footerCompanyLinks,
  footerLegalLinks,
  footerShopLinks,
  socialLinks,
} from "@/components/layout/nav-config";

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
} as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-neutral-900 text-brand-white">
      {/* Gold accent strip */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-60" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo showTagline />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Premium African produce and authentic organic spices, delivered
              fresh to your door. Celebrating the flavours of the continent
              with quality you can taste.
            </p>

            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2.5 text-sm text-white/60 transition-colors hover:text-brand-gold"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand-gold" />
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 text-sm text-white/60 transition-colors hover:text-brand-gold"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand-gold" />
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold"
                  aria-hidden
                />
                {contactInfo.address}
              </li>
            </ul>
          </div>

          {/* Shop */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
              Shop
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerShopLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-brand-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerCompanyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-brand-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
              Stay Fresh
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Get weekly picks, seasonal arrivals, and exclusive offers from
Rooted Afrika.
            </p>
            <div className="mt-5">
              <NewsletterForm />
            </div>

            <div className="mt-8">
              <p className="text-xs font-medium uppercase tracking-wider text-white/40">
                Follow us
              </p>
              <div className="mt-3 flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = socialIcons[social.icon];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-brand-gold hover:text-brand-gold"
                      aria-label={social.label}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-center text-xs text-white/40 sm:text-left">
            © {year} Rooted Afrika. All rights reserved.
          </p>
          <nav
            className="flex flex-wrap justify-center gap-x-6 gap-y-1"
            aria-label="Legal"
          >
            {footerLegalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-white/40 transition-colors hover:text-brand-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="hidden text-xs text-white/30 lg:block">
            Premium · Black · White · Gold
          </p>
        </div>
      </div>
    </footer>
  );
}
