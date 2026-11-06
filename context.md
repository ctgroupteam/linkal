# 🌐 Linkal Ecosystem — Master Architectural Context

> **Quick Summary**: This file is the primary architectural guide for the Linkal ecosystem. It documents the structure, components, and workflows of both the **Marketing Website (`index.html`)** and the **Linkal Tool (`Linkal Tool/`)**. Read this context first to understand where code lives, how multi-tenant routing works, and what API integrations are active before performing targeted edits.

---

## 📁 1. Workspace Structure

```
Linkal/
├── index.html              # Main marketing landing page (linkalsite.vercel.app)
├── chat_history.md         # Full chronological chat, research & session decision logs
├── context.md              # Current file: Core architectural context & system design
├── RULES.md                # Token efficiency, preservation & workflow rules for agents
├── Linkal Tool/            # Multi-Tenant Next.js 16 SaaS Platform (Store builder & admin)
│   ├── app/                # Next.js App Router
│   │   ├── api/            # API endpoints (checkout, webhooks, stores, templates)
│   │   │   ├── checkout/   # Cashfree checkout session generator
│   │   │   └── webhooks/   # Cashfree payment verification webhook
│   │   ├── sites/[slug]/   # Dynamic multi-tenant storefront renderer
│   │   ├── builder/        # Interactive store generator & previewer
│   │   ├── dashboard/      # Merchant admin portal (products, orders, analytics)
│   │   └── login/          # Merchant Auth (Google 1-Tap & Email/Password)
│   ├── templates/          # Plug-and-Play Template Engine for interns (100+ templates)
│   │   ├── restaurants/    # e.g., turkish-zaika-dark/ (template.html, metadata.json)
│   │   ├── ecommerce/      # Boutiques, fashion, electronics, retail catalogs
│   │   ├── portfolios/     # Photographers, designers, developers
│   │   ├── cv-resume/      # Live interactive CV & resume websites (Free tier)
│   │   ├── services/       # Salons, consultants, repair, agencies
│   │   └── events/         # Weddings, birthdays, RSVP invites
│   ├── lib/                # Shared utilities & clients
│   │   ├── supabase.ts     # Supabase PostgreSQL DB & Storage client
│   │   ├── firebase.ts     # Firebase Auth (Google 1-Tap) & FCM push triggers
│   │   ├── cashfree.ts     # Cashfree payment gateway SDK & webhook verification
│   │   ├── templates.ts    # Auto-indexing template registry reader
│   │   └── deployment/     # Cloudflare & Vercel API drivers
│   ├── types/              # TypeScript interfaces (Store, Product, Order, Merchant)
│   ├── .env.local          # Secure API keys (GitHub, Vercel, Supabase, Cashfree, Firebase)
│   └── package.json        # Next.js 16, React 19, TypeScript, Tailwind CSS
├── Turkish Zaika/          # Live reference store implementation (turkishzaikamenu.vercel.app)
├── scratch/                # Local automation scripts & tests (git ignored)
└── .agents/                # Antigravity Agent customizations & persistent rules
    └── rules/
        └── RULES.md
```

---

## 🖥️ 2. Marketing Website (`index.html`)

- **Live URL**: [`https://linkalsite.vercel.app`](https://linkalsite.vercel.app) (HTTP 200)
- **GitHub Repository**: [`ctgroupteam/linkal`](https://github.com/ctgroupteam/linkal.git) (`main` branch)
- **Technology Stack**: High-performance Vanilla HTML5, Vanilla CSS3 (custom design system), lightweight Vanilla JavaScript, and [Lucide Icons](https://lucide.dev).
- **Core Design Tokens**:
  - Primary Navy: `#0D1B3E`, Primary Blue: `#1A56FF`
  - Backgrounds: `#FFFFFF`, Card Bg: `#F8FAFC`, Navy Light: `#F0F4FF`
  - Typography: `'Plus Jakarta Sans'`, sans-serif

### Section Sequence & Element IDs:

1. **Header / Navbar (`#navbar`)**: Branded SVG logo, nav links (`#how`, `#use-cases`, `#features`, `#seo`, `#pricing`, `#faq`), and CTA button triggering modal (`#modalOverlay`).
2. **Hero Section (`#hero`)**: Headline, live example CTA (`https://turkishzaikamenu.vercel.app`), trust badges (`Google-indexed automatically`), and interactive CSS phone mockup.
3. **Stats & Ticker (`#stats`, `#ticker`)**: 300+ stores metric counter and infinite marquee ticker with verified Indian business names.
4. **How It Works (`#how`) — Single-Box Interactive Showcase**:
   - 5 top button toggles (`.how-tab-btn`):
     - `01. Enter Business`: Interactive typing simulation of *"Turkish Zaika"* + instant subdomain badge.
     - `02. Add Products`: Item card (*"Turkish Doner Kebab Platter"* @ ₹240), stock toggle, and 0% commission badge.
     - `03. Instant Domain`: `https://turkishzaika.linkal.in` address bar + Edge CDN & wildcard DNS diagram.
     - `04. Bio Link & QR`: Side-by-side Instagram bio link card + printable vector QR code.
     - `05. Google & Orders`: Google search #1 ranking card + incoming WhatsApp order notification toast.
   - Scripted auto-cycle (4.5s per step) with instant tab switching.
5. **Who Can Use (`#use-cases`) — Compact Colored SVG Grid**:
   - Compact cards showing only title and tailored SVG icon (no paragraphs):
     1. Instagram Businesses & Boutiques (`#E1306C`)
     2. Hotel & Restaurant Menus (`#D97706`)
     3. Personal Portfolio Websites (`#2563EB`)
     4. Live CV & Resume Websites (`#059669`)
     5. Services & Freelancers (`#7C3AED`)
     6. Wedding & Event Invites (`#E11D48`)
     7. Real Estate & Properties (`#0284C7`)
     8. Coaches & Creators (`#4F46E5`)
6. **Features Bento (`#features`)**: 15 features (Custom Subdomain, 200 Products, WhatsApp Ordering, Theme Picker, Story Studio, etc.).
7. **Google Screen & SEO (`#seo`)**: Realistic Google search results mockup ranking Turkish Zaika #1 with JSON-LD schema & 99/100 PageSpeed card.
8. **AI Business Advisor (`#ai-analyzer`)**: Revenue opportunities, posting timing insights, category trend alerts.
9. **Exclusive Features (`#exclusive`) & Story Studio (`#story`)**: Festival mode, Instagram reel embed, 1-tap story card templates.
10. **Pricing (`#pricing`)**: Starter (₹300/mo or ₹200/mo), Growth (₹500/mo, includes Android App), Pro (₹700/mo). All include 7-day free trial.
11. **Testimonials, FAQ (`#faq`), CTA Banner (`#cta-banner`), and Footer**: Interactive accordion FAQ and complete site sitemap.
12. **Still Floating Instagram Button (`.float-ig`)**: Clean circular gradient button linking directly to:
    `https://ig.me/m/linkal.in?text=Hello%2C%20I%20am%20interested%20in%20Linkal`

---

## 🛠️ 3. Linkal Tool Architecture & Core System Design

### A. Repository Architecture: Single Multi-Tenant Repo vs. Separate Repos
- **The Decision**: **1 Single Multi-Tenant Repository** runs the entire SaaS platform.
- **Why NOT a GitHub repo per customer?**:
  1. Creating a new repo for each customer violates GitHub's Terms of Service when used for runtime data storage.
  2. Hits GitHub API rate limits (5,000 req/hr) and creates unmanageable repository sprawl (managing 1,000+ individual repos).
  3. Every customer's dynamic data (products, prices, themes, orders) lives securely in **Supabase PostgreSQL**.
  4. The multi-tenant Next.js engine dynamically serves any customer at `<slug>.linkal.in` via `app/sites/[slug]/page.tsx` with zero delay.
- **Enterprise Exception**: Separate GitHub repos are reserved exclusively for enterprise clients who specifically pay for source code export.

---

### B. Vercel Hosting & Category Partitioning
To scale cleanly within Vercel's free tier (200 projects limit) without mixing unrelated business logics, Linkal partitions its multi-tenant engine into **Category Projects**:

```
                       [ Cloudflare Wildcard DNS (*.linkal.in) ]
                                          │
        ┌───────────────────┬─────────────┴───────┬───────────────────┐
        ▼                   ▼                     ▼                   ▼
 [ linkal-restaurants ] [ linkal-ecommerce ] [ linkal-portfolios ] [ linkal-cv-resume ]
   100s of Dining &       100s of Boutiques &     100s of Creators &   100s of Resumes
   Digital QR Menus       Retail Catalogs         Personal Portfolios  (100% Free Tier)
```

- **Benefits**:
  - Each category project hosts hundreds to thousands of stores under a single Vercel deployment.
  - Changes to an e-commerce checkout template never risk breaking restaurant menus.
  - Zero deployment calls needed when merchants update prices, dishes, or stock.

---

### C. Plug-and-Play Template Engine for Interns (`Linkal Tool/templates/`)
Interns can continuously contribute new HTML/CSS templates without touching backend Next.js logic.

#### Folder Convention:
```
Linkal Tool/templates/
├── restaurants/
│   ├── turkish-zaika-dark/
│   │   ├── template.html      # Complete HTML/CSS with {{PLACEHOLDERS}}
│   │   ├── preview.jpg        # 16:9 or 9:16 UI thumbnail for builder
│   │   └── metadata.json      # Template ID, name, author, features
│   └── bistro-minimal/
├── ecommerce/
│   └── boutique-luxury/
├── portfolios/
│   └── developer-terminal/
└── cv-resume/
    └── modern-executive/
```

- **How It Works**:
  - `lib/templates.ts` dynamically scans `templates/` and indexes all available designs.
  - When an intern drops a new folder with `template.html` and `metadata.json`, it instantly appears in the merchant dashboard template picker.
  - The renderer injects store data into `template.html` placeholders:
    `{{BUSINESS_NAME}}`, `{{PRODUCTS_DATA}}`, `{{WHATSAPP_NUMBER}}`, `{{THEME_COLOR}}`.

---

### D. Cashfree Payment Gateway Integration
- **Role**: Secure payment processing for Indian merchants via UPI, Cards, NetBanking, and Wallets.
- **Key Flows**:
  1. **Order Checkout Session**: Store customer or merchant calls `/api/checkout` &rarr; Linkal server calls Cashfree Orders API to create a `payment_session_id`.
  2. **Payment Modal**: Client opens Cashfree Drop JS SDK seamlessly.
  3. **Automated Webhook Verification**:
     - Cashfree sends webhook event `PAYMENT_SUCCESS_WEBHOOK` to `/api/webhooks/cashfree`.
     - Linkal verifies signature using HMAC-SHA256 with `CASHFREE_SECRET_KEY`.
     - On verification: updates merchant plan status in Supabase, extends `plan_expiry` by 30 days, and unlocks product catalog limits.

---

### E. Subscription Plans, 7-Day Free Trial & Restrictions

| Plan / Category | Price | Product Limit | Trial Period | Android Admin App? | WhatsApp Ordering |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CV / Resume** | **₹0 Free** | N/A (1 Live CV) | Permanent Free | ❌ No | ❌ (Direct email/link) |
| **Store 7-Day Trial** | **₹0** | **Max 10 Products** | **7 Days** | ❌ No | ✅ Included |
| **Basic Plan** | **₹200–₹300/mo**| Unlimited | Post-trial | ❌ No (Web admin) | ✅ Included |
| **Growth Plan** | **₹500/mo** | Unlimited | Post-trial | ✅ **Yes (Instant FCM Push)**| ✅ Included + Priority |

- **Product Upload Rule during 7-Day Trial**:
  - Merchants can upload a maximum of **10 product images/items**.
  - Attempting to add product #11 prompts the merchant to upgrade via Cashfree.
  - Once paid, the 10-product limit is removed instantly.

---

### F. Merchant Authentication & Profile Onboarding

```
[ Merchant visits /login ]
           │
           ▼
[ Google 1-Tap Sign-In ]  ◄── 1-Click, zero friction (Firebase Spark Free: 50,000 MAU)
           │
           ▼ (New User Check)
[ Onboarding Step ]       ◄── Merchant inputs: 1) WhatsApp Number, 2) Business Name
           │
           ▼
[ Supabase Profile DB ]   ◄── Stores merchant profile, WhatsApp, store slug, trial start
```

#### Understanding Firebase Free Tier Auth Options:
- **Google 1-Tap / Google Sign-In**: Store owners sign in with 1 click using their Google account. **100% free for up to 50,000 monthly active users (MAU)** on the Firebase Spark plan with zero credit card required.
- **Email / Password**: Traditional login using email and a password. **100% free and unlimited** on Firebase Spark.
- **Why NOT Phone SMS OTP?**: Firebase Phone SMS OTP on the free tier only allows 10 test SMS/day and requires a credit card on the Blaze plan for real SMS. Because store owners need WhatsApp to receive orders, we collect their WhatsApp number during onboarding directly—achieving 100% verified order routing with **$0 SMS cost**.

---

### G. Admin Android App & FCM Push Notifications
- **Target Audience**: Merchants on the **Growth Plan (₹500/mo)**.
- **Technology**: Native Android / Flutter admin app configured with `google-services.json`.
- **Firebase Cloud Messaging (FCM)**:
  - **100% Free & Unlimited**: FCM costs $0 and has no message volume caps.
  - When a customer places an order on `<store>.linkal.in` or via WhatsApp trigger:
    1. Storefront writes order to Supabase.
    2. Supabase webhook or Next.js API calls Firebase Admin SDK `admin.messaging().send()`.
    3. Merchant's phone instantly plays a chime/cash-register notification sound with order summary: *"New Order #104 — ₹480 from Rahul (2 items)"*.
  - Basic Plan users (₹200–₹300/mo) receive web-only order management and direct WhatsApp alerts.

---

## 🔑 4. API Keys & Credentials Matrix (Audit Status)

| Service | Keys Needed | Current Status | Notes |
| :--- | :--- | :--- | :--- |
| **Domain** | `linkal.in` | ✅ **Purchased & Active** | Registered, Cloudflare DNS active, Vercel SSL active |
| **Cloudflare** | `CLOUDFLARE_API_TOKEN`, `ZONE_ID` | ✅ **Active** | Zone `481ff287798b0a40412db997237acc41` verified |
| **Vercel** | `VERCEL_TOKEN`, `VERCEL_TEAM_ID` | ✅ **Active** | Token saved in `.env.local` (`team_tv...`) |
| **GitHub** | `GITHUB_TOKEN`, `GITHUB_OWNER` | ✅ **Active** | Token saved in `.env.local` (`ctgroupteam`) |
| **Supabase** | `SUPABASE_URL`, `ANON_KEY`, `SERVICE_ROLE_KEY` | ✅ **Active** | Project `yuvkbugblplulrzrjamg` connected & tested HTTP 200 |
| **Firebase** | Web Config + `google-services.json` | ✅ **Active** | Web client in `.env.local`, `google-services.json` verified |
| **Cashfree PG**| `CASHFREE_APP_ID`, `CASHFREE_SECRET_KEY` | ⏳ **User Ready** | User has keys; awaiting input to add to `.env.local` |


### Is Firebase Enough for Everything?
- **For FCM (Push Notifications)**: **YES, 100%.** FCM is completely free and unlimited for sending real-time notifications to Android devices.
- **For Authentication**: **YES, 100%.** Free for 50,000 monthly active users via Google Sign-In and unlimited for Email/Password.
- **For Database & Product Storage**: **NO.** Firebase Firestore Free tier limits reads to 50,000/day (easily exhausted by 1,000 store visitors) and charges for storage egress. **Supabase** is used alongside Firebase because Supabase offers **unlimited API reads/writes** and is protected by Cloudflare CDN for unlimited free image bandwidth.

---

## 📋 5. Key Rules for Future AI Agents

1. **Check this file (`context.md`) first** to understand the architecture before writing or modifying code.
2. **Never create individual GitHub repositories for standard customers** — all stores run on the multi-tenant engine.
3. **Intern templates go to `Linkal Tool/templates/<category>/<template-name>/`** with `template.html` and `metadata.json`.
4. **Follow [`RULES.md`](file:///c:/Users/Administrator/Desktop/All%20projects/Linkal/RULES.md)** for token conservation, zero-omission editing, and mandatory post-edit verification.
