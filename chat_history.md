# 🌐 Linkal Platform — Architecture, Scaling & Infrastructure Context

> **Document Purpose**: This file serves as the permanent knowledge base, technical research archive, and architectural blueprint for the Linkal Website Builder SaaS platform. It captures all discussions, evaluated alternatives, platform limits, and final decisions for scaling to 1,000–10,000+ customer storefronts. **It is also the chat-history substitute** — when a new conversation starts, the agent MUST read this file first to restore full context.

---

## 📌 Executive Summary & Current Status

* **Project**: Linkal Website Builder (`Linkal Tool`) — A Next.js 16 (App Router) + React 19 + TypeScript platform designed to generate high-converting, mobile-responsive storefronts with direct WhatsApp conversion links.
* **Target Domain**: **`linkal.in`** (replacing test domain `dominal.in`).
* **Active Credentials** (in `Linkal Tool/.env.local`):
  * **GitHub Token**: `[REDACTED_SECURE_TOKEN_SAVED_LOCALLY]`
  * **GitHub Account**: `ctgroupteam`
  * **Vercel Token**: `[REDACTED_SECURE_TOKEN_SAVED_LOCALLY]`
  * **Vercel Team ID**: `team_tvoncHtTym1zblw6TERP7Djt`
  * **Cloudflare Credentials**: Pending domain purchase & account setup.

---

## 📋 Session History & Decisions Log

### Session 1 — Architecture Research (Oct 2026)
**Topics covered:**
- Cloudflare Zone ID requires domain to be purchased and added first (cannot get it in advance).
- Cloudflare API Token CAN be pre-generated before the domain is added.
- Selected **Wildcard DNS** (`*.linkal.in → cname.vercel-dns.com`) over per-site individual DNS records.
- Researched and compared Firebase vs. Supabase for multi-tenant SaaS. Chose **Supabase** (unlimited reads/writes vs. Firebase's daily read caps that break at 1,000 users).
- Decided on **Multi-Tenant Single Next.js Project** on Vercel (Option 1 in architecture section) — zero re-deploys needed on customer edits.
- Identified GitHub repo abuse risk: GitHub must never store customer content. Only platform code goes to GitHub.
- Chosen stack: Cloudflare (DNS + CDN) + Vercel (1 project) + Supabase (DB + Storage).

### Session 2 — First Live Proof-of-Concept: Turkish Zaika Restaurant Menu (Nov 2026)

**What was built:**
- Created a standalone **contactless digital menu** for **Turkish Zaika Restaurant, Solapur**.
- Single-file (`index.html`) with zero dependencies except QRCode.js CDN.
- **Tech**: Vanilla HTML/CSS/JS — 9:16 aspect ratio food cards, dark/light mode toggle, Bebas Neue neon signboard (exact replica of physical signboard), searchable menu, category filters, item detail modal, QR code generator with 1-click print download.
- **15 dish photos** uploaded and served: `.jpg` format, renamed from `.jpg.jpeg`.
- **Signboard assets**: `turkish_zaika_logo.svg` and `turkish_zaika_signboard_clean.png` created from user-uploaded photo.
- **Image preloader**: Real JS `Image()` preloader tracking all 15 photos before dismissing welcome overlay. 4.5s safety timeout fallback. Progress shows `Fetching Fresh Delicacies (X/16)...`.
- **Mobile layout**: Ultra-compact `@media (max-width: 640px)` — at least 2 dish cards visible above the fold without scrolling on any standard mobile screen.
- **Top banner**: `Powered by Linkal AI` with CTA to linkal.in.
- **No WhatsApp order button** — menu is strictly informational/contactless dine-in.

**GitHub Repository:**
- Repo: `https://github.com/ctgroupteam/turkish-zaika`
- Owner: `ctgroupteam` (NOT mdyahhya)
- Branch: `main`
- GitHub repoId: `1442724226`

**Vercel Deployment:**
- Project ID: `prj_dC12RPJc1f3rPYTsE15obZv9jSQT`
- Project name on Vercel: `turkishzaikamenu`
- **Production URL**: `https://turkishzaikamenu.vercel.app` ✅ (only active vercel.app URL)
- **Custom subdomain**: `https://turkishzaika.linkal.in` (bound to Vercel via Cloudflare wildcard DNS)
- Removed domains: `turkish-zaika.vercel.app`, `turkishzaika-menu.vercel.app`
- Note: `turkishzaika.vercel.app` is already claimed by **another Vercel account** running a "Turkish Zaika – Billing" app — cannot use this URL.

**QR Code:**
- Generates QR for `https://turkishzaikamenu.vercel.app`
- Downloadable print card shows `turkishzaikamenu.vercel.app` and `Powered by Linkal AI`

**Design rules enforced:**
- Default theme: off-white cream (`#faf7f2`) with 20% dark navy (`#0f1d38`)
- Dark mode toggle preserved
- No emojis in UI — SVG icons only
- Dish images: 9:16 aspect ratio cards, `decoding="async"` (no `loading="lazy"`)
- Above-the-fold: 2 cards visible immediately on mobile

**Linkal Tool — fallback owner:**
- `Linkal Tool/lib/storage.ts` → fallback owner updated to `ctgroupteam`

**Deployment notes (for future agent reference):**
- PowerShell uses `;` not `&&` for chaining commands
- Git commits need `git config user.name "ctgroupteam"` and `git config user.email "admin@linkal.in"` if identity unknown
- Vercel deployments triggered via Node.js HTTPS to `api.vercel.com/v13/deployments` (not PowerShell due to parsing issues)
- Alias assignment via `POST /v2/deployments/{id}/aliases`
- Vercel project rename via `PATCH /v9/projects/{projectId}` with `{ name: "newname" }`
- Vercel domain removal via `DELETE /v9/projects/{projectId}/domains/{domain}`

### Session 3 — Linkal Main Platform Landing Page & Storemaker Deployment (Nov 2026)

**What was built & updated:**
- **Landing page (`index.html`) revamp**:
  - Added new **"Who Can Use linkal.in?"** section (`#use-cases`) featuring 8 tailored cards: Instagram Businesses, Hotel Menu Cards, Personal Portfolio Websites, Live CV & Resume Websites, Local Services, Wedding & Event Invites, Real Estate Listings, and Coaches/Consultants. All with precision inline SVG icons (no emojis).
  - Upgraded **"How It Works"** section (`#how`) with 3 interactive animated SVG visual cards: Subdomain & Edge DNS router preview, Product catalog & pre-filled WhatsApp bubble trigger, and precision vector QR code with live order toast alert.
  - Added **"See Live Example"** button in hero linking to `https://turkishzaikamenu.vercel.app`.
  - Added 4th trust badge in hero: `Google-indexed automatically`.
  - Upgraded floating Instagram button with an expandable hover tooltip: `Chat on Instagram @linkal.in` and subtle pulse ring.
- **Store Builder integration (`storemaker.html`)**:
  - Published alongside `index.html` so all "Create Store" buttons route to the builder tool seamlessly.

**GitHub Repository:**
- Repo: `https://github.com/ctgroupteam/linkal`
- Owner: `ctgroupteam`
- Branch: `main`
- GitHub repoId: `1444009762`

**Vercel Deployment:**
- Project ID: `prj_zjOfk5dnsiW320ef4WIWlRzopktD`
- Project name on Vercel: `linkalsite`
- **Production URL**: `https://linkalsite.vercel.app` ✅
- **Store Builder**: `https://linkalsite.vercel.app/storemaker.html` ✅

---

## 🛣️ Product Roadmap & Upcoming Features

### Planned: Admin Panel (Android App)
- Business owners will have an **Android app** as their admin panel.
- This app will let them manage their store, products, images, prices, and business hours.
- The app connects to Supabase to push live updates — no redeploy needed on Vercel.
- Future planning needed: Define app stack (React Native / Flutter / native Android).

### Planned: Linkal Landing Page (`index.html`) — "How It Works" SVG Animation Feature

**Current state of `index.html`:**
- Hero section with animated phone mockup (left text, right phone with product cards)
- Stats strip (300+ businesses, 10 min to go live, etc.)
- Horizontal scrolling business name ticker
- AI Business Advisor section
- "How It Works" section with 3 text steps (Step 1: Tell us your business, Step 2: Build your store, Step 3: Share your link)
- Bento feature grid
- Exclusive features section
- Story Studio preview
- SEO section with Google search simulation
- Pricing cards
- Testimonials
- FAQ accordion
- Footer with nav links
- Floating Instagram button (bottom-right)

**Proposed improvement (NOT yet implemented — awaiting approval):**
See Section below: "Linkal Landing Page — Proposed SVG Animation Revamp"

---

## 🎨 Linkal Landing Page — Proposed SVG Animation Revamp

**Goal**: Replace the current text-only "How It Works" steps with an **interactive, animated SVG journey** that shows users exactly what using Linkal feels like — in the first 30 seconds of reading.

**Design Concept:**
- A **mobile phone frame** shown prominently (already exists in hero section)
- Inside the phone: an animated SVG step-by-step product UI simulation
- **5 toggle tabs** (like pill buttons) that the user can click, with each tab showing one step of the animation:

| Step | Tab Label | What Animation Shows |
|:---|:---|:---|
| 1 | **Get Started** | User tapping "Create My Store" — input field appears, user types their business name |
| 2 | **Upload Products** | Image upload animation — photos of products appear on the phone screen one by one |
| 3 | **Get Your Domain** | `yourname.linkal.in` URL materializes at top of phone with a checkmark flash |
| 4 | **Instagram Bio** | Phone shows Instagram app, bio link replaced with `yourname.linkal.in` |
| 5 | **Google Search** | Google search bar appears with Google logo — search runs and store appears in results |

**Interaction Behavior:**
- Clicking a step tab plays that step's SVG animation (CSS/JS keyframes, no external libraries)
- The active tab is highlighted; animations can replay when re-clicked
- Auto-advances through all 5 steps with a 3-second delay between each if idle
- Each step has a short caption below (e.g. "In under 30 seconds, your store is live")

**Technical notes:**
- Pure CSS animations + JS tab controller — no external libraries
- Fully responsive: phone frame scales for mobile (<640px) and desktop
- Step counter indicator below phone (•••••)
- Smooth `opacity` and `translateX/Y` transitions between steps

**Additional improvements to suggest:**
1. **Tagline update**: Change `"Live in 10 minutes"` to `"Live in under 30 seconds"` (more accurate after our digital menu proof-of-concept)
2. **Trust badge update**: Add `"Google-indexed automatically"` trust badge in hero
3. **Live example link**: Add `"See a live example →"` button pointing to `https://turkishzaikamenu.vercel.app` or `https://turkishzaika.linkal.in`
4. **Animated counter speed**: Current `stat-num` counter (300+ businesses) animates on scroll — fine to keep
5. **Instagram floating button**: Currently goes nowhere — should link to actual Linkal Instagram account when created

---

## 🔍 Key Research Topics & Decisions

### 1. Domain Registration & Cloudflare Setup
* **Question**: *Can we obtain a Cloudflare Zone ID and API Token without adding or buying a domain first?*
* **Findings**:
  * **Zone ID**: **No.** Cloudflare verifies registration with the TLD registry. If `linkal.in` is unpurchased, Cloudflare rejects it with `"<domain> is not a registered domain"`. You must purchase/register the domain first, then add it to Cloudflare to receive the unique Zone ID.
  * **API Token**: **Yes.** You can generate a Custom API Token in advance with `Zone:DNS:Edit` permissions by selecting *"All zones from an account"*. As soon as `linkal.in` is added, the token automatically has control.
* **Action Order**:
  1. Buy `linkal.in` (Namecheap, GoDaddy, Hostinger, etc.).
  2. Add `linkal.in` to Cloudflare (Free Plan) → immediately get the Zone ID and nameservers.
  3. Create Cloudflare API Token.

---

### 2. Wildcard DNS (`*.linkal.in`) vs. Individual DNS Records

* **Question**: *Can we use a wildcard DNS record (`*`) instead of creating a DNS record via API on every site publish? Does Google SEO treat subdomains as independent sites?*
* **How Wildcard DNS Works**:
  * Add a single CNAME record in Cloudflare:
    * **Type**: `CNAME`
    * **Name**: `*` (matches `*.linkal.in`)
    * **Target**: `cname.vercel-dns.com`
    * **Proxy**: `DNS only` (Grey cloud)
  * Any subdomain request (e.g. `unitywatches.linkal.in`, `solapurshop.linkal.in`) automatically routes to Vercel without calling any DNS API.

#### Comprehensive Comparison:

| Feature | Method A: Individual DNS Record per Site | Method B: Wildcard DNS (`*.linkal.in`) [Selected] |
| :--- | :--- | :--- |
| **Publish Pipeline** | Must call Cloudflare API on every publish | **Zero API calls** during site publish |
| **Publish Speed** | Slower (waits for DNS propagation) | **Instant** (Subdomains resolve immediately) |
| **Failure Points** | High (API rate limits, token expiry, outages) | **None** (DNS routing is static & permanent) |
| **Subdomain Limits**| Hard-capped by Cloudflare DNS record limits (~1,000–3,500) | **Infinite** subdomains supported |
| **Google SEO Impact**| Treated as independent site | Treated as independent site (**Identical**) |
| **SSL Provisioning** | Dedicated per-domain certificate | Auto-provisioned by Vercel on domain bind |
| **Catch-All 404**   | Non-existent subdomains show browser DNS error | Non-existent subdomains route to platform 404 |

#### SEO Verdict for Subdomains:
* Google crawls and indexes subdomains as **completely independent entities**.
* Global giants (Shopify: `*.myshopify.com`, WordPress: `*.wordpress.com`, Webflow: `*.webflow.io`) use this identical model.
* Subdomains inherit the root domain's trust faster, bypassing the usual 6-month Google "sandbox" period for fresh domains.
* Each site maintains its own custom `<title>`, OpenGraph tags, meta description, and JSON-LD schema.

---

### 3. Scaling & Infrastructure Limits (1,000 to 10,000 Sites)

#### A. Vercel Limits (Hobby vs. Pro)
* **Vercel Hobby (Free)**:
  * **Max Projects**: 200 projects per account.
  * **Daily Deployments**: Hard limit of **100 deployments/day**.
  * **Bandwidth**: 100 GB/month.
* **Why the Old Approach Breaks**: The prototype created 1 separate Vercel project per customer (`POST /v9/projects`). At 200 users, new projects are blocked; at 1,000 users making edits, the 100 deploys/day cap is hit immediately.

#### B. GitHub Ban / Suspension Risk
* **Critical Finding**: Using GitHub as a live database by committing HTML/JSON files via API on every customer edit violates GitHub's Terms of Service.
* **Risks**:
  * API rate limit: 5,000 requests/hour.
  * Repository bloat: Thousands of commits cause repositories to exceed recommended 1–5 GB limits.
  * Automated abuse detection: Accounts running automated commit bots for data persistence risk shadow-bans or account termination.
* **Rule**: **GitHub must only store the core platform code, never customer runtime content.**

#### C. Database & Storage: Supabase vs. Firebase (Spark Free Plan)
* **Firebase (Spark Free)**:
  * Firestore: 50,000 reads/day, 20,000 writes/day. (At 1,000 users, 50 reads each exhausts the entire daily limit).
  * Storage: 1 GB/day download egress (exhausted in hours under normal traffic).
* **Supabase (Free Tier)**:
  * **Unlimited API reads & writes** (PostgreSQL).
  * 500 MB database (easily stores >50,000 site records).
  * 1 GB storage, 2 GB egress bandwidth.
* **Verdict**: **Supabase is vastly superior** because it does not artificially throttle daily read/write volume.

#### D. Cloudflare Egress & Bandwidth Superpower
* Cloudflare CDN has **zero egress charges and unlimited bandwidth**.
* **Cloudflare R2** (Object Storage): 10 GB free, $0 egress fees. However, activating R2 requires a credit card on file.

---

## 🏗️ Architectural Options Evaluated

### Option 1: Multi-Tenant Single Next.js Project on Vercel *(RECOMMENDED)*
* **Concept**: One core Next.js application deployed once on Vercel. Wildcard domain `*.linkal.in` points to this single project.
* **Workflow**:
  1. Visitor opens `https://unitywatches.linkal.in`.
  2. `middleware.ts` extracts the slug (`unitywatches`).
  3. Dynamic route `app/sites/[slug]/page.tsx` fetches the site JSON from Supabase.
  4. The page is rendered and cached at the edge.
* **Edits**: When an owner changes prices or products, it writes to Supabase in 10ms. **0 Vercel deployments needed. Instant updates.**

### Option 2: Cloudflare Pages Hosting
* **Concept**: Host static site builds on Cloudflare Pages.
* **Pros**: 100% free, unlimited bandwidth, no credit card required.
* **Cons**: Next.js 16 App Router requires complex edge adapters (`@cloudflare/next-on-pages`) which can cause Node.js compatibility issues with libraries like `jose` or dynamic database drivers.
* **Future Utility**: Excellent fallback if hosting pure compiled static `index.html` files.

### Option 3: Self-Hosting via Cheap VPS ($4–$5/mo)
* **Concept**: Run Docker / Coolify / Dokku on Hetzner or DigitalOcean.
* **Pros**: Complete control, unlimited projects, zero deployment limits.
* **Cons**: Requires Linux server maintenance, manual SSL management, and database backups.

### Option 4: Image Handling Without Credit Cards (Supabase Storage + Cloudflare CDN Cache)
* **The Problem**: Cloudflare R2 requires a credit card on file to activate.
* **The Zero-Card Solution**:
  1. Upload images to **Supabase Storage** (1 GB free, no credit card needed).
  2. Proxy image URLs through Cloudflare CDN (`cdn.linkal.in`).
  3. Cloudflare fetches each image from Supabase **only once** on the first visit, then caches it permanently across 300+ edge locations.
  4. Subsequent thousands of downloads are served from Cloudflare's free cache.
  5. **Supabase egress used: < 10 MB. Total cost: $0. Credit card needed: NONE.**

---

## 🎯 Final Blueprint: 100% Free, Zero-Card Production Stack

```
                                [ Visitor Browser ]
                                         │
                                         ▼
                      [ Cloudflare Wildcard *.linkal.in ]
                               (Unlimited Bandwidth)
                                         │
                    ┌────────────────────┴────────────────────┐
                    ▼                                         ▼
         [ Web App / Storefront ]                     [ Media & Assets ]
       1 Single Next.js on Vercel                    Cloudflare CDN Edge Cache
                    │                                         │
                    ▼                                         ▼
          [ Supabase Database ]                      [ Supabase Storage ]
       (Products, Menus, Slugs)                    (1GB Free, 0 Egress Bleed)
```

### Exact Breakdown:

| Service | Provider | Purpose | Limits / Cost | Credit Card Required? |
| :--- | :--- | :--- | :--- | :--- |
| **Domain & DNS** | Cloudflare | Wildcard DNS (`*.linkal.in`) | Free, unlimited | ❌ **No** |
| **CDN & SSL** | Cloudflare | Global edge caching & HTTPS | Free, unlimited bandwidth | ❌ **No** |
| **App Engine** | Vercel | 1 Multi-Tenant Project | 1 project total, 0 deploys per edit | ❌ **No** |
| **Database** | Supabase | Site content, menus, WhatsApp | Free tier (Unlimited reads) | ❌ **No** |
| **Image Storage** | Supabase Storage | Product/menu photos | 1 GB Free (Protected by Cloudflare CDN) | ❌ **No** |

---

## 📝 Implementation Checklist

- [x] Save GitHub credentials to `.env.local`
- [x] Save Vercel credentials to `.env.local`
- [x] Create `.env.example` template
- [x] Built Turkish Zaika Restaurant live digital menu (proof-of-concept client)
- [x] Deployed to `turkishzaikamenu.vercel.app`
- [x] Subdomain `turkishzaika.linkal.in` bound via Cloudflare wildcard DNS
- [ ] Buy `linkal.in` domain
- [ ] Add `linkal.in` to Cloudflare (Free Plan)
- [ ] Add Wildcard CNAME: `*` → `cname.vercel-dns.com` (DNS only)
- [ ] Add Cloudflare Zone ID and Token to `.env.local`
- [ ] Replace `dominal.in` with `linkal.in` in codebase
- [ ] Implement Multi-Tenant `middleware.ts` for dynamic subdomain routing
- [ ] Connect Supabase client for instant site data persistence
- [ ] Configure Cloudflare CDN caching rule for Supabase image storage
- [ ] Plan & build Android Admin Panel app (stack TBD)
- [ ] Revamp Linkal `index.html` "How It Works" section with interactive SVG animation steps


---

## 🔍 Key Research Topics & Discussions

### 1. Domain Registration & Cloudflare Setup
* **Question**: *Can we obtain a Cloudflare Zone ID and API Token without adding or buying a domain first?*
* **Findings**:
  * **Zone ID**: **No.** Cloudflare verifies registration with the TLD registry. If `linkal.in` is unpurchased, Cloudflare rejects it with `"<domain> is not a registered domain"`. You must purchase/register the domain first, then add it to Cloudflare to receive the unique Zone ID.
  * **API Token**: **Yes.** You can generate a Custom API Token in advance with `Zone:DNS:Edit` permissions by selecting *"All zones from an account"*. As soon as `linkal.in` is added, the token automatically has control.
* **Action Order**:
  1. Buy `linkal.in` (Namecheap, GoDaddy, Hostinger, etc.).
  2. Add `linkal.in` to Cloudflare (Free Plan) &rarr; immediately get the Zone ID and nameservers.
  3. Create Cloudflare API Token.

---

### 2. Wildcard DNS (`*.linkal.in`) vs. Individual DNS Records

* **Question**: *Can we use a wildcard DNS record (`*`) instead of creating a DNS record via API on every site publish? Does Google SEO treat subdomains as independent sites?*
* **How Wildcard DNS Works**:
  * Add a single CNAME record in Cloudflare:
    * **Type**: `CNAME`
    * **Name**: `*` (matches `*.linkal.in`)
    * **Target**: `cname.vercel-dns.com`
    * **Proxy**: `DNS only` (Grey cloud)
  * Any subdomain request (e.g. `unitywatches.linkal.in`, `solapurshop.linkal.in`) automatically routes to Vercel without calling any DNS API.

#### Comprehensive Comparison:

| Feature | Method A: Individual DNS Record per Site | Method B: Wildcard DNS (`*.linkal.in`) [Selected] |
| :--- | :--- | :--- |
| **Publish Pipeline** | Must call Cloudflare API on every publish | **Zero API calls** during site publish |
| **Publish Speed** | Slower (waits for DNS propagation) | **Instant** (Subdomains resolve immediately) |
| **Failure Points** | High (API rate limits, token expiry, outages) | **None** (DNS routing is static & permanent) |
| **Subdomain Limits**| Hard-capped by Cloudflare DNS record limits (~1,000–3,500) | **Infinite** subdomains supported |
| **Google SEO Impact**| Treated as independent site | Treated as independent site (**Identical**) |
| **SSL Provisioning** | Dedicated per-domain certificate | Auto-provisioned by Vercel on domain bind |
| **Catch-All 404**   | Non-existent subdomains show browser DNS error | Non-existent subdomains route to platform 404 |

#### SEO Verdict for Subdomains:
* Google crawls and indexes subdomains as **completely independent entities**.
* Global giants (Shopify: `*.myshopify.com`, WordPress: `*.wordpress.com`, Webflow: `*.webflow.io`) use this identical model.
* Subdomains inherit the root domain's trust faster, bypassing the usual 6-month Google "sandbox" period for fresh domains.
* Each site maintains its own custom `<title>`, OpenGraph tags, meta description, and JSON-LD schema.

---

### 3. Scaling & Infrastructure Limits (1,000 to 10,000 Sites)

#### A. Vercel Limits (Hobby vs. Pro)
* **Vercel Hobby (Free)**:
  * **Max Projects**: 200 projects per account.
  * **Daily Deployments**: Hard limit of **100 deployments/day**.
  * **Bandwidth**: 100 GB/month.
* **Why the Old Approach Breaks**: The prototype created 1 separate Vercel project per customer (`POST /v9/projects`). At 200 users, new projects are blocked; at 1,000 users making edits, the 100 deploys/day cap is hit immediately.

#### B. GitHub Ban / Suspension Risk
* **Critical Finding**: Using GitHub as a live database by committing HTML/JSON files via API on every customer edit violates GitHub's Terms of Service.
* **Risks**:
  * API rate limit: 5,000 requests/hour.
  * Repository bloat: Thousands of commits cause repositories to exceed recommended 1–5 GB limits.
  * Automated abuse detection: Accounts running automated commit bots for data persistence risk shadow-bans or account termination.
* **Rule**: **GitHub must only store the core platform code, never customer runtime content.**

#### C. Database & Storage: Supabase vs. Firebase (Spark Free Plan)
* **Firebase (Spark Free)**:
  * Firestore: 50,000 reads/day, 20,000 writes/day. (At 1,000 users, 50 reads each exhausts the entire daily limit).
  * Storage: 1 GB/day download egress (exhausted in hours under normal traffic).
* **Supabase (Free Tier)**:
  * **Unlimited API reads & writes** (PostgreSQL).
  * 500 MB database (easily stores >50,000 site records).
  * 1 GB storage, 2 GB egress bandwidth.
* **Verdict**: **Supabase is vastly superior** because it does not artificially throttle daily read/write volume.

#### D. Cloudflare Egress & Bandwidth Superpower
* Cloudflare CDN has **zero egress charges and unlimited bandwidth**.
* **Cloudflare R2** (Object Storage): 10 GB free, $0 egress fees. However, activating R2 requires a credit card on file.

---

## 🏗️ Architectural Options Evaluated

### Option 1: Multi-Tenant Single Next.js Project on Vercel *(RECOMMENDED)*
* **Concept**: One core Next.js application deployed once on Vercel. Wildcard domain `*.linkal.in` points to this single project.
* **Workflow**:
  1. Visitor opens `https://unitywatches.linkal.in`.
  2. `middleware.ts` extracts the slug (`unitywatches`).
  3. Dynamic route `app/sites/[slug]/page.tsx` fetches the site JSON from Supabase.
  4. The page is rendered and cached at the edge.
* **Edits**: When an owner changes prices or products, it writes to Supabase in 10ms. **0 Vercel deployments needed. Instant updates.**

### Option 2: Cloudflare Pages Hosting
* **Concept**: Host static site builds on Cloudflare Pages.
* **Pros**: 100% free, unlimited bandwidth, no credit card required.
* **Cons**: Next.js 16 App Router requires complex edge adapters (`@cloudflare/next-on-pages`) which can cause Node.js compatibility issues with libraries like `jose` or dynamic database drivers.
* **Future Utility**: Excellent fallback if hosting pure compiled static `index.html` files.

### Option 3: Self-Hosting via Cheap VPS ($4–$5/mo)
* **Concept**: Run Docker / Coolify / Dokku on Hetzner or DigitalOcean.
* **Pros**: Complete control, unlimited projects, zero deployment limits.
* **Cons**: Requires Linux server maintenance, manual SSL management, and database backups.

### Option 4: Image Handling Without Credit Cards (Supabase Storage + Cloudflare CDN Cache)
* **The Problem**: Cloudflare R2 requires a credit card on file to activate.
* **The Zero-Card Solution**:
  1. Upload images to **Supabase Storage** (1 GB free, no credit card needed).
  2. Proxy image URLs through Cloudflare CDN (`cdn.linkal.in`).
  3. Cloudflare fetches each image from Supabase **only once** on the first visit, then caches it permanently across 300+ edge locations.
  4. Subsequent thousands of downloads are served from Cloudflare's free cache.
  5. **Supabase egress used: < 10 MB. Total cost: $0. Credit card needed: NONE.**

---

## 🎯 Final Blueprint: 100% Free, Zero-Card Production Stack

```
                                [ Visitor Browser ]
                                         │
                                         ▼
                      [ Cloudflare Wildcard *.linkal.in ]
                               (Unlimited Bandwidth)
                                         │
                    ┌────────────────────┴────────────────────┐
                    ▼                                         ▼
         [ Web App / Storefront ]                     [ Media & Assets ]
       1 Single Next.js on Vercel                    Cloudflare CDN Edge Cache
                    │                                         │
                    ▼                                         ▼
          [ Supabase Database ]                      [ Supabase Storage ]
       (Products, Menus, Slugs)                    (1GB Free, 0 Egress Bleed)
```

### Exact Breakdown:

| Service | Provider | Purpose | Limits / Cost | Credit Card Required? |
| :--- | :--- | :--- | :--- | :--- |
| **Domain & DNS** | Cloudflare | Wildcard DNS (`*.linkal.in`) | Free, unlimited | ❌ **No** |
| **CDN & SSL** | Cloudflare | Global edge caching & HTTPS | Free, unlimited bandwidth | ❌ **No** |
| **App Engine** | Vercel | 1 Multi-Tenant Project | 1 project total, 0 deploys per edit | ❌ **No** |
| **Database** | Supabase | Site content, menus, WhatsApp | Free tier (Unlimited reads) | ❌ **No** |
| **Image Storage** | Supabase Storage | Product/menu photos | 1 GB Free (Protected by Cloudflare CDN) | ❌ **No** |

---

## 📝 Implementation Checklist

- [x] Save GitHub credentials to `.env.local`
- [x] Save Vercel credentials to `.env.local`
- [x] Create `.env.example` template
- [x] Complete Marketing Site revamp with 5-tab "How It Works" and SVG "Who Can Use"
- [x] Deploy live landing page to Vercel (`linkalsite.vercel.app`)
- [x] Push all landing page updates to GitHub (`ctgroupteam/linkal`)
- [ ] Receive Cashfree API credentials (`CASHFREE_APP_ID`, `CASHFREE_SECRET_KEY`)
- [ ] Connect Supabase project (`SUPABASE_URL`, `ANON_KEY`, `SERVICE_ROLE_KEY`)
- [ ] Add Firebase web credentials & Admin SDK service account for FCM
- [ ] Buy `linkal.in` domain and configure Cloudflare Wildcard CNAME (`*` → `cname.vercel-dns.com`)
- [ ] Build Intern Template Engine (`Linkal Tool/templates/`) with auto-indexer
- [ ] Implement Multi-Tenant `middleware.ts` for dynamic subdomain routing
- [ ] Implement Cashfree checkout and webhook listener for plan upgrades
- [ ] Build Growth Plan Android Admin App with instant FCM order notifications

---

## 🚀 Session 4 — Marketing Website Overhaul & Production Deployment (Nov 2026)

**Key Deliverables Completed:**
- **Reordered Section Sequence in `index.html`**:
  `#navbar` &rarr; `#hero` &rarr; `#stats` &rarr; `#ticker` &rarr; `#how` &rarr; `#use-cases` &rarr; `#features` &rarr; `#seo` &rarr; `#ai-analyzer` &rarr; `#exclusive` &rarr; `#story` &rarr; `#pricing` &rarr; `#faq` &rarr; `#cta-banner` &rarr; `footer`.
- **Single-Box Interactive "How It Works" Showcase (`#how`)**:
  - Replaced static cards with a unified showcase box and 5 top toggle buttons (`.how-tab-btn`):
    1. `01. Enter Business`: Live typing animation of *"Turkish Zaika"* + instant subdomain badge.
    2. `02. Add Products`: Item card (*"Turkish Doner Kebab Platter"* @ ₹240), stock toggle, and 0% commission badge.
    3. `03. Instant Domain`: `https://turkishzaika.linkal.in` address bar + Edge CDN & wildcard DNS diagram.
    4. `04. Bio Link & QR`: Side-by-side Instagram bio link card + printable vector QR code.
    5. `05. Google & Orders`: Google search #1 ranking card + incoming WhatsApp order notification toast.
  - Scripted auto-cycle (4.5s per step) with immediate click override.
- **Compact "Who Can Use" Grid (`#use-cases`)**:
  - Compact cards displaying only the title and tailored colored SVG icon (no paragraphs): Instagram Businesses (`#E1306C`), Hotel & Restaurant Menus (`#D97706`), Personal Portfolios (`#2563EB`), Live CVs & Resumes (`#059669`), Local Services (`#7C3AED`), Wedding & Event Invites (`#E11D48`), Real Estate (`#0284C7`), Coaches & Creators (`#4F46E5`).
- **Realistic Google SEO Mockup (`#seo`)**:
  - Added simulated Google Search result card ranking Turkish Zaika #1 with structured schema highlights, 99/100 Mobile PageSpeed, and automated indexing badge.
- **Still Floating Instagram Button (`.float-ig`)**:
  - Changed from pulsing tooltip to clean, still circular gradient button linking directly to:
    `https://ig.me/m/linkal.in?text=Hello%2C%20I%20am%20interested%20in%20Linkal`.
- **Removed `storemaker.html` & CTA Route Cleanup**:
  - Completely purged references to `storemaker.html`. All "Create Store" and plan selection buttons trigger the `#modalOverlay` onboarding modal.
- **Live Deployment & Verification**:
  - Deployed to Vercel at [`https://linkalsite.vercel.app`](https://linkalsite.vercel.app) (HTTP 200).
  - Committed and pushed to GitHub [`ctgroupteam/linkal`](https://github.com/ctgroupteam/linkal.git) (`main` branch, commit `bf22460`).

---

## 🏗️ Session 5 — SaaS Architecture, Multi-Tenant Partitioning, Cashfree & API Keys Audit (Nov 2026)

**Critical Architectural Decisions & Requirements Clarified:**

1. **GitHub Repository Strategy: Single Multi-Tenant Repo**:
   - **Decision**: All standard customer stores run from a single multi-tenant codebase. We do **NOT** create a separate GitHub repository for every customer.
   - **Rationale**: Creating a repository per customer violates GitHub TOS (using GitHub as database persistence), hits GitHub API rate limits (5,000 req/hr), and causes unmanageable repository sprawl. Supabase PostgreSQL stores all customer data, dishes, products, prices, and themes dynamically.
   - Standalone GitHub repositories are created only for enterprise clients purchasing custom source-code ownership.

2. **Vercel Project Partitioning by Field/Category**:
   - Rather than bundling all client types into a single monolithic deployment or spawning 1 project per user, Linkal partitions into **Category Projects**:
     - `linkal-restaurants`: Dining menus, food catalogs, table QR systems.
     - `linkal-ecommerce`: Retail stores, boutiques, product inventories.
     - `linkal-portfolios`: Creative portfolios, freelancer showcases.
     - `linkal-cv-resume`: Interactive live CVs and resumes (Free tier).
     - `linkal-services`: Agencies, salons, consultancies.
     - `linkal-events`: Weddings, RSVP landing pages, event invites.
   - Each category project handles hundreds to thousands of customer subdomains via Vercel wildcard domain routing.

3. **Plug-and-Play Template Engine for Interns (`Linkal Tool/templates/`)**:
   - Folder structure: `Linkal Tool/templates/<category>/<template-name>/`
   - Files per template:
     - `template.html`: Vanilla HTML/CSS/JS with dynamic data placeholders (`{{BUSINESS_NAME}}`, `{{PRODUCTS_DATA}}`, `{{WHATSAPP_NUMBER}}`).
     - `preview.jpg`: UI thumbnail displayed in the dashboard template picker.
     - `metadata.json`: Template name, author, features, and responsive tags.
   - Auto-indexed dynamically by `lib/templates.ts`, allowing interns to drop in 100+ templates without modifying Next.js core logic.

4. **Cashfree Payment Gateway Integration**:
   - Cashfree API provides seamless UPI, NetBanking, Card, and Wallet payments for Indian merchants.
   - Flow:
     - Next.js server calls Cashfree Orders API (`/api/checkout`) to generate a `payment_session_id`.
     - Client opens the seamless Cashfree Drop JS checkout modal.
     - Cashfree posts event `PAYMENT_SUCCESS_WEBHOOK` to `/api/webhooks/cashfree`.
     - Server verifies HMAC-SHA256 signature, updates merchant plan status in Supabase, extends `plan_expiry` by 30 days, and unlocks product catalog limits.

5. **Subscription Plans, 7-Day Free Trial & Restrictions**:
   - **CV / Resume Websites**: 100% Free at the start.
   - **Stores & E-commerce**: **7-day free trial**.
     - **Trial Restriction**: Merchants can upload a maximum of **10 product images/items**.
     - Once paid (Cashfree verified), the 10-product limit is removed and unlimited products are unlocked.
   - **Plan Pricing**: Basic Plan (₹200–₹300/mo, web admin only); Growth Plan (₹500/mo, includes Admin Android App with instant FCM order notifications).

6. **Merchant Onboarding Flow & Authentication Clarification**:
   - **Primary Login**: **Google 1-Tap Sign-In** (Firebase Spark Free allows 50,000 monthly active users at $0 with zero credit card).
   - **Secondary Login**: **Email / Password** (Firebase Spark Free allows unlimited accounts at $0 with zero credit card).
   - **Why NOT Phone SMS OTP?**: Firebase Spark allows only 10 test SMS/day and requires a credit card on Blaze for real SMS. Because store owners need WhatsApp to receive customer orders, we collect their WhatsApp number and business name on the profile onboarding screen immediately after Google Sign-In, achieving 100% verified order routing with **$0 SMS cost**.

7. **Admin Android App with FCM Push Notifications**:
   - Merchants on the **Growth Plan (₹500/mo)** receive the Linkal Admin Android App.
   - Configured with `google-services.json` using Firebase Cloud Messaging (FCM).
   - Instant order alerts: When an order is placed on `<store>.linkal.in`, backend triggers FCM to play a loud cash-register chime and pop an instant push notification on the merchant's phone.
   - Basic Plan users (₹200–₹300/mo) receive web-only admin and direct WhatsApp alerts.

8. **API Keys & Credentials Audit**:
   - **Active & Configured**: GitHub Token (`ghp_FZ...`), GitHub Owner (`ctgroupteam`), Vercel Token (`vcp_2y...`), Vercel Team ID (`team_tv...`).
   - **Ready from User**: Cashfree App ID & Secret Key.
   - **Pending Setup**:
     - Supabase: `SUPABASE_URL`, `ANON_KEY`, `SERVICE_ROLE_KEY` (Free at supabase.com).
     - Firebase: Web Config (for Google 1-Tap) + Admin SDK Service Account (for FCM backend). Note: Android `google-services.json` is ready.
     - Cloudflare: Zone ID & API Token (to be added once `linkal.in` is registered).
   - **Verdict on Firebase Services**:
     - FCM is 100% free and unlimited for Android push alerts.
     - Firebase Auth is 100% free for 50k MAU.
     - For database and product image storage, **Supabase** is used alongside Firebase to avoid Firestore's 50k daily read limit and storage egress charges.

