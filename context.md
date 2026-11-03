# 🌐 Linkal Ecosystem — Master Architectural Context

> **Quick Summary**: This file is the primary architectural guide for the Linkal ecosystem. It documents the structure, components, and workflows of both the **Marketing Website (`index.html`)** and the upcoming **Linkal Tool (`Linkal Tool/`)**. Read this context first to understand where code lives and how systems connect before doing targeted code reads.

---

## 📁 1. Workspace Structure

```
Linkal/
├── index.html              # Main marketing website (linkalsite.vercel.app)
├── chat_history.md         # Full chronological chat, research & deployment history
├── context.md              # Current file: Core architectural context & system design
├── RULES.md                # Token efficiency & code preservation rules for agents
├── Linkal Tool/            # Multi-Tenant Next.js 16 SaaS Platform (Store builder & admin)
│   ├── app/                # Next.js App Router (pages, dynamic [slug] storefronts, api)
│   ├── lib/                # Database clients, auth, API integrations
│   ├── types/              # TypeScript interfaces for stores, products, orders
│   ├── .env.local          # Secure API keys (GitHub, Vercel, Supabase, Firebase)
│   └── package.json        # Next.js 16, React 19, TypeScript, Tailwind CSS
├── Turkish Zaika/          # Live reference store implementation (turkishzaikamenu.vercel.app)
├── scratch/                # Local development & automation helper scripts (git ignored)
└── .agents/                # Antigravity Agent customizations & rules
    └── rules/
        └── RULES.md        # Persistent system rules for agent execution
```

---

## 🖥️ 2. Marketing Website (`index.html`)

- **Domain / Deployment**: Deployed on Vercel at [`https://linkalsite.vercel.app`](https://linkalsite.vercel.app) and linked to GitHub repository [`ctgroupteam/linkal`](https://github.com/ctgroupteam/linkal.git) (`main` branch).
- **Technology Stack**: High-performance Vanilla HTML5, Vanilla CSS3 (custom design system), and lightweight Vanilla JavaScript with [Lucide Icons](https://lucide.dev).
- **Key Design Tokens**:
  - Primary Navy: `#0D1B3E`, Primary Blue: `#1A56FF`
  - Backgrounds: `#FFFFFF`, Card Bg: `#F8FAFC`, Navy Light: `#F0F4FF`
  - Typography: `'Plus Jakarta Sans'`, sans-serif

### Exact Section Sequence & IDs:

1. **Header / Navbar (`#navbar`)**:
   - Branded logo with vector icon
   - Navigation links: `#how`, `#use-cases`, `#features`, `#seo`, `#pricing`, `#faq`
   - Primary CTA: `Get Started` (triggers modal `#modalOverlay`)
   - Mobile hamburger menu (`#mobileMenu`)
2. **Hero Section (`#hero`)**:
   - Value proposition: *"Your Business Deserves Its Own Website — Not Just a Bio Link"*
   - CTAs: `Create My Store Free` (modal), `See Live Example` (`https://turkishzaikamenu.vercel.app`), `See How It Works` (`#how`)
   - Interactive CSS phone mockup displaying live store demo
3. **Stats & Ticker (`#stats`, `#ticker`)**:
   - Verified metric counters (300+ stores, 10-min setup, etc.)
   - Infinite CSS marquee ticker with Indian business names
4. **How It Works (`#how`) — Single-Box Interactive Showcase**:
   - 5 Top Button Toggles (`.how-tab-btn`):
     - `01. Enter Business`: Interactive typing simulation of *"Turkish Zaika"* + instant subdomain badge
     - `02. Add Products`: Item preview (*"Turkish Doner Kebab Platter"* @ ₹240), stock toggle, and 0% commission badge
     - `03. Instant Domain`: `https://turkishzaika.linkal.in` address bar + Edge CDN & wildcard DNS diagram
     - `04. Bio Link & QR`: Side-by-side Instagram bio link card + printable table QR code
     - `05. Google & Orders`: Google search #1 ranking card + incoming WhatsApp order notification toast
   - Logic: Controlled by `setHowStep(stepIndex)` with 4.5s auto-cycle and manual tab replay
5. **Who Can Use (`#use-cases`) — Compact Colored SVG Grid**:
   - Compact cards showing only heading and colored SVG icons:
     1. Instagram Businesses & Boutiques (`#E1306C`)
     2. Hotel & Restaurant Menus (`#D97706`)
     3. Personal Portfolio Websites (`#2563EB`)
     4. Live CV & Resume Websites (`#059669`)
     5. Services & Freelancers (`#7C3AED`)
     6. Wedding & Event Invites (`#E11D48`)
     7. Real Estate & Properties (`#0284C7`)
     8. Coaches & Creators (`#4F46E5`)
6. **Features Bento (`#features`)**:
   - 15 features: Custom Subdomain, Mobile Optimization, 200 Products, WhatsApp Ordering, Theme Picker, Story Studio, etc.
7. **Google Screen & SEO (`#seo`)**:
   - Realistic Google search results mockup ranking Turkish Zaika #1
   - Structured JSON-LD schema, 99/100 Mobile PageSpeed, and zero-delay automated indexing cards
8. **AI Business Advisor (`#ai-analyzer`)**:
   - Revenue opportunities, posting timing insights, and category trend alerts
9. **Exclusive Features (`#exclusive`) & Story Studio (`#story`)**:
   - Festival mode, Instagram reel embed, 1-tap story card templates
10. **Pricing (`#pricing`)**:
    - Starter (₹300/mo), Growth (₹500/mo, Most Popular), Pro (₹700/mo)
    - All plans trigger onboarding modal with 7-day free trial
11. **Testimonials, FAQ (`#faq`), CTA Banner (`#cta-banner`), and Footer**:
    - Interactive accordion FAQ and complete site sitemap
12. **Still Floating Instagram Button (`.float-ig`)**:
    - Clean circular gradient button (no popup tooltip, no pulsing) linking directly to:
      `https://ig.me/m/linkal.in?text=Hello%2C%20I%20am%20interested%20in%20Linkal`

---

## 🛠️ 3. Linkal Tool (`Linkal Tool/`) — Core SaaS Platform

### Vision & High-Level Architecture
`Linkal Tool` is the automated store builder, management engine, and multi-tenant platform. Instead of generating separate Vercel projects or abusing GitHub repositories for database persistence, it operates as a **single multi-tenant Next.js 16 application** that serves thousands of stores dynamically.

```
Visitor opens: [ customer.linkal.in ]
      │
      ▼
Cloudflare Wildcard DNS (*.linkal.in ➔ cname.vercel-dns.com)
      │
      ▼
Next.js Multi-Tenant Middleware (extracts subdomain "customer")
      │
      ▼
Fetches store JSON from Supabase (Cached at Vercel Edge)
      │
      ▼
Renders custom theme, products, WhatsApp triggers (0ms deployment delay)
```

### The 4 Core Integrations:

#### 1. Automated GitHub Integration
- **Credentials**: Stored in `Linkal Tool/.env.local` (`ctgroupteam` account)
- **Role**:
  - Automatically initializes repositories from templates for standalone enterprise clients.
  - Syncs core platform updates across repositories.
  - Commits platform releases without storing runtime customer content (complying with GitHub TOS).

#### 2. Supabase Integration (Database & Image Storage)
- **Role**:
  - **Relational PostgreSQL DB**: Stores business profiles, subdomains, themes, categories, products, prices, stock statuses, business hours, and WhatsApp numbers.
  - **Supabase Storage**: Stores uploaded logos, product photos, and store banners.
  - **Cloudflare CDN Shield**: Cloudflare CDN (`cdn.linkal.in`) caches Supabase storage assets permanently, giving unlimited image bandwidth at **$0 egress cost** and requiring no credit card.

#### 3. Firebase Integration (Auth & Notifications)
- **Role**:
  - **Authentication**: Store owner sign-in via Google OAuth, Phone OTP (crucial for Indian merchants), and Email/Password.
  - **Notifications**: Instant order alerts, push notifications, and daily summary digests.

#### 4. Vercel API Integration
- **Role**:
  - Programmatic domain and alias management via `/v2/deployments/.../aliases` and `/v9/projects/.../domains`.
  - Edge routing for instant subdomain provisioning (`<slug>.linkal.in`).
  - Zero deployment overhead for daily menu/inventory edits.

---

## 📋 4. Key Rules for Future AI Agents

1. **Check this file (`context.md`) first** to pinpoint the correct section or service before doing code searches.
2. **Never break existing production features** in `index.html` or `Linkal Tool/`.
3. **Use targeted line slices** (`view_file` with `StartLine`/`EndLine`) instead of dumping full 4,000-line files into context.
4. **Follow the guidelines in [`RULES.md`](file:///c:/Users/Administrator/Desktop/All%20projects/Linkal/RULES.md)** for maximum token conservation.
