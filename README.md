# 🛍️ WhyBao — Buyer-Marketplace for Trending Chinese Fashion

**WhyBao** is a modern e-commerce storefront that connects Russian customers with trending Chinese streetwear, clothing, shoes, and accessories — with free delivery to Russia. Built on **Next.js 16** (App Router) and deployed on **Vercel**, the platform features a rich product catalog, real-time cart & wishlist management, and seamless order processing via Telegram.

🌐 **Live:** [whybao.ru](https://whybao.ru)

---

## ⚡ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Standalone output) |
| **Language** | TypeScript 5 |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS v4, shadcn/ui (New York theme) |
| **Components** | Radix UI, Base UI, Lucide Icons |
| **Animations** | Framer Motion |
| **State Management** | Zustand (persisted stores for cart, wishlist, filters) |
| **Analytics** | Vercel Analytics, Vercel Speed Insights, Yandex Metrika |
| **Order Processing** | Telegram Bot API (via Next.js Route Handlers) |
| **Deployment** | Vercel (Frankfurt `fra1` region), Docker-ready |
| **Image Pipeline** | Sharp (WebP optimization), `next/image` |
| **Fonts** | Inter, Outfit (via `next/font/google`) |

---

## ✨ Features

- **Product Catalog** — Browse clothing, shoes & accessories with category, brand, price, size, and color filters
- **Full-Text Search** — Instant product search with URL-synced query params
- **Product Pages** — Detailed views with image galleries, size/color selectors, stock indicators, and related product sets
- **Shopping Cart** — Persistent cart (Zustand + localStorage) with a slide-out drawer
- **Wishlist** — Save favorite items across sessions
- **Checkout** — Form validation, minimum order enforcement (₽5,000), promo code support, and auto-generated order IDs
- **Telegram Orders** — Orders are sent directly to a Telegram chat via Bot API with IP-based rate limiting
- **Brand Pages** — Dedicated pages per brand with filtered product listings
- **SEO Optimized** — Dynamic sitemap, robots.txt, Open Graph / Twitter meta tags, JSON-LD structured data
- **Performance** — Hero image preloading, WebP assets, standalone Next.js build, Vercel Speed Insights
- **Cookie Consent** — GDPR-style cookie banner
- **Mobile-First** — Fully responsive design with touch-optimized interactions
- **Docker Support** — Production-ready multi-stage Dockerfile

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **npm** (ships with Node)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/whybao.git
cd whybao

# Install dependencies
npm install
```

### Environment Setup

Copy the example environment file and fill in your values:

```bash
cp .env.example .env.local
```

See the [Environment Variables](#-environment-variables) section below for details.

### Development

```bash
# Start the dev server (binds to 0.0.0.0 for LAN/mobile testing)
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000). The custom dev script also prints your LAN URL for mobile testing.

### Production Build

```bash
# Build for production
npm run build

# Start the production server
npm run start

# Or build + start in one command (0.0.0.0)
npm run serve
```

### Docker

```bash
# Build the Docker image
docker build -t whybao .

# Run the container
docker run -p 3000:3000 \
  -e TELEGRAM_BOT_TOKEN=your_token \
  -e TELEGRAM_ORDER_CHAT_ID=your_chat_id \
  whybao
```

### Other Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with LAN access |
| `npm run dev:simple` | Start dev server (plain `next dev`) |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run serve` | Build + start on `0.0.0.0` |
| `npm run lint` | Run ESLint |
| `npm run images:webp` | Optimize images to WebP (Sharp) |
| `npm run tunnel` | Expose localhost via Cloudflare Tunnel |
| `npm run tunnel:lt` | Expose localhost via localtunnel |

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root. Reference `.env.example` for the template.

| Variable | Required | Scope | Description |
|---|---|---|---|
| `TELEGRAM_BOT_TOKEN` | ✅ Yes | Server | Telegram Bot API token used to send order notifications |
| `TELEGRAM_ORDER_CHAT_ID` | ✅ Yes | Server | Telegram chat/group ID where orders are delivered |
| `NEXT_PUBLIC_SITE_URL` | ❌ No | Client + Server | Canonical site URL for SEO/metadata (defaults to `https://whybao.ru`) |
| `DEPLOY_REGION` | ❌ No | Server | Region label for the `/api/health` endpoint (defaults to `"unknown"`) |

> ⚠️ **Note:** The checkout flow returns a `503` error if `TELEGRAM_BOT_TOKEN` and `TELEGRAM_ORDER_CHAT_ID` are not configured.

---

## 📁 Project Structure

```
whybao/
├── app/                        # Next.js App Router
│   ├── layout.tsx              #   Root layout (fonts, metadata, JSON-LD)
│   ├── page.tsx                #   Homepage (hero, categories, catalog preview)
│   ├── globals.css             #   Global styles (Tailwind v4)
│   ├── sitemap.ts              #   Dynamic sitemap generation
│   ├── robots.ts               #   Robots.txt configuration
│   ├── shop/                   #   Shop page (search, filters, sorting)
│   ├── products/[slug]/        #   Dynamic product detail pages
│   ├── brands/[slug]/          #   Brand-specific product listings
│   ├── cart/                   #   Cart page
│   ├── checkout/               #   Checkout form & order submission
│   ├── wishlist/               #   Wishlist page
│   ├── contacts/               #   Contact information
│   ├── privacy/                #   Privacy policy
│   ├── terms/                  #   Terms of service
│   └── api/                    #   API Route Handlers
│       ├── orders/route.ts     #     POST — validate & send order to Telegram
│       └── health/route.ts     #     GET  — health check endpoint
│
├── components/
│   ├── ui/                     # shadcn/ui primitives (Button, Badge, Input, Sheet)
│   ├── layout/                 # Navbar, Footer, Breadcrumbs, ThemeToggle
│   ├── catalog/                # Product cards, filters, sorting controls
│   ├── cart/                   # Cart drawer component
│   ├── home/                   # Homepage sections (hero, categories, features)
│   ├── brands/                 # Brand page components
│   ├── analytics/              # Yandex Metrika integration
│   └── cookie-consent.tsx      # Cookie consent banner
│
├── data/
│   ├── products.ts             # Product catalog (static TypeScript data)
│   ├── categories.ts           # Category definitions
│   └── brands.ts               # Brand definitions
│
├── lib/
│   ├── store/                  # Zustand stores
│   │   ├── cart-store.ts       #   Cart state (persisted)
│   │   ├── wishlist-store.ts   #   Wishlist state (persisted)
│   │   └── filter-store.ts     #   Shop filter/search state
│   ├── product-utils.ts        # Filtering, sorting, search helpers
│   ├── format-order-message.ts # Order → Telegram message formatter
│   ├── analytics.ts            # Analytics helpers
│   └── utils.ts                # General utilities (cn, etc.)
│
├── public/
│   ├── hero/                   # Hero banner images (WebP, mobile + desktop)
│   └── products/               # Product images organized by slug
│
├── scripts/
│   ├── dev.js                  # Custom dev server launcher (LAN URL, lock cleanup)
│   ├── optimize-images.js      # Batch image → WebP converter (Sharp)
│   └── generate-apple-touch-icon.js
│
├── Dockerfile                  # Multi-stage production Docker build
├── vercel.json                 # Vercel deployment config (fra1 region)
├── next.config.ts              # Next.js configuration (standalone, image patterns)
├── components.json             # shadcn/ui configuration
├── tsconfig.json               # TypeScript config (@ path alias → root)
└── package.json                # Dependencies & scripts
```

---

## 📄 License

This project is proprietary software. All rights reserved.
