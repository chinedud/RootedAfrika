# AfriFresh Market — Folder Structure

```
afrifreshmarket/
├── public/                          # Static assets (favicon, etc.)
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx               # Root layout (Navbar + Footer)
│   │   ├── page.tsx                 # Homepage
│   │   ├── globals.css              # Tailwind + global styles
│   │   ├── about/
│   │   │   └── page.tsx             # About / brand story
│   │   ├── cart/
│   │   │   └── page.tsx             # Shopping cart
│   │   ├── checkout/
│   │   │   └── page.tsx             # Checkout form
│   │   └── products/
│   │       ├── page.tsx             # Product listing + filters
│   │       ├── ProductsPageContent.tsx
│   │       └── [slug]/
│   │           ├── page.tsx         # Product detail (SSG)
│   │           └── ProductDetail.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx           # Logo, nav, search, cart badge
│   │   │   └── Footer.tsx
│   │   ├── home/
│   │   │   ├── HeroBanner.tsx
│   │   │   └── FeaturedProducts.tsx
│   │   ├── products/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── CategoryFilter.tsx
│   │   └── ui/
│   │       └── Button.tsx
│   ├── data/
│   │   └── products.ts              # 13 mock products (3 categories)
│   ├── hooks/
│   │   └── use-cart.ts              # Cart lines + totals helper
│   ├── lib/
│   │   └── format.ts                # GBP price formatting
│   ├── store/
│   │   └── cart-store.ts            # Zustand + persist
│   └── types/
│       └── product.ts               # Product & category types
├── tailwind.config.ts               # brand black / white / gold
├── next.config.ts                   # Image domains
├── package.json
└── README.md
```
