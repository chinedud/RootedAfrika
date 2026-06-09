# AfriFresh Market

Premium African produce e-commerce frontend built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Zustand**.

## Features

- Homepage with hero banner and featured products
- Product listing with category filters and search
- Product detail pages with add-to-cart
- Cart with quantity controls and order summary
- Checkout with shipping form (demo)
- About page with brand story
- Reusable Navbar, Footer, and ProductCard components
- Zustand cart state (persisted in localStorage)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                    # App Router pages
│   ├── page.tsx            # Homepage
│   ├── products/           # Shop & product detail
│   ├── cart/
│   ├── checkout/
│   └── about/
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── products/           # ProductCard, ProductGrid, CategoryFilter
│   ├── home/               # HeroBanner, FeaturedProducts
│   └── ui/                 # Button
├── data/products.ts        # Mock product data (13 products)
├── store/cart-store.ts     # Zustand cart
├── hooks/use-cart.ts
├── types/product.ts
└── lib/format.ts
```

## Colour Scheme

- **Black** `#0a0a0a` — backgrounds
- **White** `#fafafa` — text
- **Gold** `#c9a227` — accents and CTAs
