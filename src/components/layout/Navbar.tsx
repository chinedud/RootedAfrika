"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";
import {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Logo } from "@/components/layout/Logo";
import {
  categoryNavLinks,
  isNavLinkActive,
  mainNavLinks,
} from "@/components/layout/nav-config";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { signOut } from "@/actions/auth";

interface NavbarProps {
  user?: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    role: string;
  } | null;
}

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const shopRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const itemCount = useCartStore((s) => s.getItemCount());

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setShopOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shopRef.current && !shopRef.current.contains(e.target as Node)) {
        setShopOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    if (shopOpen || userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [shopOpen, userMenuOpen]);

  const handleSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const q = search.trim();
      router.push(
        q ? `/products?q=${encodeURIComponent(q)}` : "/products"
      );
      setMobileOpen(false);
    },
    [search, router]
  );

  const shopIsActive =
    pathname === "/products" || pathname.startsWith("/products/");

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:gap-6 lg:px-8 lg:py-4">
        <Logo onNavigate={() => setMobileOpen(false)} />

        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {mainNavLinks.map((link) => {
            if (link.href === "/products") {
              return (
                <div key={link.href} className="relative" ref={shopRef}>
                  <button
                    type="button"
                    onClick={() => setShopOpen((o) => !o)}
                    className={cn(
                      "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      shopIsActive
                        ? "text-brand-gold"
                        : "text-brand-black/80 hover:text-brand-gold"
                    )}
                    aria-expanded={shopOpen}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        shopOpen && "rotate-180"
                      )}
                      aria-hidden
                    />
                  </button>

                  {shopOpen && (
                    <div
                      className="absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-black/10 bg-white shadow-2xl shadow-black/10"
                      role="menu"
                    >
                      <div className="border-b border-black/10 px-4 py-3">
                        <Link
                          href="/products"
                          className="text-sm font-semibold text-brand-black hover:text-brand-gold"
                          role="menuitem"
                          onClick={() => setShopOpen(false)}
                        >
                          Browse all products
                        </Link>
                      </div>
                      <ul className="p-2">
                        {categoryNavLinks.map((cat) => (
                          <li key={cat.category}>
                            <Link
                              href={cat.href}
                              role="menuitem"
                              className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-black/5"
                              onClick={() => setShopOpen(false)}
                            >
                              <span className="block text-sm font-medium text-brand-black">
                                {cat.label}
                              </span>
                              <span className="mt-0.5 block text-xs text-black/45">
                                {cat.description}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            }

            const active = isNavLinkActive(pathname, link);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-brand-gold"
                    : "text-brand-black/80 hover:text-brand-gold"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop search */}
        <form
          onSubmit={handleSearch}
          className="hidden max-w-sm flex-1 lg:block"
          role="search"
        >
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Search fruits, spices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-black/15 bg-black/5 py-2.5 pl-10 pr-4 text-sm text-brand-black placeholder:text-black/40 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-brand-black transition-colors hover:border-brand-gold hover:text-brand-gold"
            aria-label={
              mounted && itemCount > 0
                ? `Shopping cart, ${itemCount} items`
                : "Shopping cart"
            }
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={1.75} />
            {mounted && itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-gold px-1 text-[10px] font-bold leading-none text-brand-black">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen((o) => !o)}
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-brand-gold bg-neutral-200 transition-colors hover:border-brand-gold/70"
                aria-label="User menu"
                aria-expanded={userMenuOpen}
              >
                {user.avatar_url ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={user.avatar_url}
                    alt={user.full_name || "User"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-semibold text-brand-black">
                    {(user.full_name || "U").charAt(0).toUpperCase()}
                  </span>
                )}
              </button>

              {userMenuOpen && (
                <div
                  className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-black/10 bg-white shadow-2xl shadow-black/10"
                  role="menu"
                >
                  <div className="border-b border-black/10 px-4 py-3">
                    <p className="text-sm font-medium text-brand-black">
                      {user.full_name || "User"}
                    </p>
                    <p className="text-xs text-black/50">
                      {user.role === "admin" ? "Admin" : "Customer"}
                    </p>
                  </div>
                  <div className="p-2">
                    <Link
                      href="/account"
                      role="menuitem"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-brand-black/80 transition-colors hover:bg-black/5"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      My Account
                    </Link>
                    <Link
                      href="/account"
                      role="menuitem"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-brand-black/80 transition-colors hover:bg-black/5"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        role="menuitem"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-brand-black/80 transition-colors hover:bg-black/5"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                  </div>
                  <div className="border-t border-black/10 p-2">
                    <form action={signOut}>
                      <button
                        type="submit"
                        role="menuitem"
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 transition-colors hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-brand-black/80 transition-colors hover:text-brand-gold"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="rounded-lg border border-brand-gold px-4 py-2 text-sm font-medium text-brand-gold transition-colors hover:bg-brand-gold hover:text-brand-black"
              >
                Register
              </Link>
            </div>
          )}

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/15 text-brand-black transition-colors hover:border-brand-gold hover:text-brand-gold md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" strokeWidth={1.75} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-black/10 bg-white transition-[max-height,opacity] duration-300 md:hidden",
          mobileOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0 border-t-0"
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="max-h-[calc(85vh-1px)] overflow-y-auto px-4 py-4">
          <form onSubmit={handleSearch} className="mb-4" role="search">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40"
                aria-hidden
              />
              <input
                type="search"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-black/15 bg-black/5 py-2.5 pl-10 pr-4 text-sm text-brand-black placeholder:text-black/40 focus:border-brand-gold focus:outline-none"
              />
            </div>
          </form>

          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {mainNavLinks.map((link) => {
              if (link.href === "/products") {
                return (
                  <div key={link.href} className="space-y-1">
                    <Link
                      href="/products"
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block rounded-lg px-3 py-2.5 text-sm font-semibold",
                        shopIsActive
                          ? "bg-brand-gold/15 text-brand-gold"
                          : "text-brand-black hover:bg-black/5"
                      )}
                    >
                      Shop &mdash; All Products
                    </Link>
                    <div className="ml-3 space-y-0.5 border-l border-black/10 pl-3">
                      {categoryNavLinks.map((cat) => (
                        <Link
                          key={cat.category}
                          href={cat.href}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-lg px-3 py-2 text-sm text-black/70 hover:bg-black/5 hover:text-brand-gold"
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              const active = isNavLinkActive(pathname, link);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm font-medium",
                    active
                      ? "bg-brand-gold/15 text-brand-gold"
                      : "text-brand-black/80 hover:bg-black/5"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 border-t border-black/10 pt-4">
            <Link
              href="/checkout"
              onClick={() => setMobileOpen(false)}
              className="block w-full rounded-lg bg-brand-gold py-2.5 text-center text-sm font-semibold text-brand-black transition-colors hover:bg-brand-gold-light"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
