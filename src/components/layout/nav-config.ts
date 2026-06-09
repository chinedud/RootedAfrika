import { CATEGORY_LABELS, type ProductCategory } from "@/types";

export interface NavLink {
  href: string;
  label: string;
  /** Highlight when pathname starts with this prefix */
  matchPrefix?: string;
}

export const mainNavLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop", matchPrefix: "/products" },
  { href: "/about", label: "About" },
];

export const categoryNavLinks: {
  href: string;
  label: string;
  category: ProductCategory;
  description: string;
}[] = [
  {
    href: "/products?category=fresh-produce",
    label: CATEGORY_LABELS["fresh-produce"],
    category: "fresh-produce",
    description: "Farm-fresh fruits & vegetables",
  },
  {
    href: "/products?category=pantry",
    label: CATEGORY_LABELS.pantry,
    category: "pantry",
    description: "Rooted Afrika™ flours, grains & staples",
  },
  {
    href: "/products?category=spices",
    label: CATEGORY_LABELS.spices,
    category: "spices",
    description: "Seasonings, herbs & cooking oils",
  },
  {
    href: "/products?category=snacks",
    label: CATEGORY_LABELS.snacks,
    category: "snacks",
    description: "Treats, crisps & everyday bites",
  },
];

export const footerShopLinks = [
  { href: "/products", label: "All Products" },
  ...categoryNavLinks.map(({ href, label }) => ({ href, label })),
];

export const footerCompanyLinks = [
  { href: "/about", label: "Our Story" },
  { href: "/cart", label: "Your Cart" },
  { href: "/checkout", label: "Checkout" },
];

export const footerLegalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export const contactInfo = {
  email: "hello@rooted-afrika.com",
  phone: "+44 28 9000 0000",
  address: "Belfast, Northern Ireland",
};

export const socialLinks = [
  { href: "https://instagram.com", label: "Instagram", icon: "instagram" as const },
  { href: "https://facebook.com", label: "Facebook", icon: "facebook" as const },
  { href: "https://twitter.com", label: "Twitter", icon: "twitter" as const },
];

/** Returns true if the nav link should appear active */
export function isNavLinkActive(pathname: string, link: NavLink): boolean {
  if (link.matchPrefix) {
    return pathname === link.href || pathname.startsWith(link.matchPrefix);
  }
  return pathname === link.href;
}
