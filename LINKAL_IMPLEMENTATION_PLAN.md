# 🚀 Linkal Platform — Master Architecture & Implementation Plan

> **Plan Version**: 3.0 (Full SaaS Ecosystem: Marketing Landing + Linkal Studio + Linkal Admin)  
> **Permanent Location**: `LINKAL_IMPLEMENTATION_PLAN.md`  
> **Status**: APPROVED & IN ACTIVE EXECUTION  
> **Governing Standards**: [`RULES.md`](file:///c:/Users/Administrator/Desktop/All%20projects/Linkal/RULES.md) (Zero Omissions, Code Preservation, Mandatory Verification)

---

## 🏛️ 1. Global Multi-Repo Ecosystem Architecture

The Linkal platform is organized into three distinct, decoupled repositories:

```
                                    ┌────────────────────────────────────────────────────────┐
                                    │                   Cloudflare DNS & Edge                │
                                    │                (*.linkal.in / linkal.in)               │
                                    └──────────────────────────┬─────────────────────────────┘
                                                               │
                       ┌───────────────────────────────────────┼───────────────────────────────────────┐
                       ▼                                       ▼                                       ▼
         [ 1. Marketing Landing ]                    [ 2. Linkal Studio ]                    [ 3. Linkal Admin ]
          ctgroupteam/linkal                         ctgroupteam/linkaltool                  ctgroupteam/linkaladmin
          https://linkal.in                          https://studio.linkal.in                https://admin.linkal.in
          - High-Converting Landing                  - User Dashboard ("My Sites")           - Founder Command Center
          - Clean Linkal AI Logo                     - Real-Time Subdomain Validator         - Password: #kotlinjs (Vercel ENV)
          - Direct Studio CTA                        - 1-Click Google Auth                   - Real-Time User & Visit Metrics
          - Cashfree Policy Modals                   - 1 Free CV Per User Rule               - Dynamic CV Promo Code Editor
          - Floating Instagram Button                - Auto-Free for First 100 CVs           - First 100 CVs Progress Tracker
          - Sticky Mobile Taskbar                    - 7-Day Trial Soft Paywall              - PWA + Web Push Notifications
                                                     - Cashfree 1/3/6/12 Month Billing       - VAPID Push on New User / CV
```

---

## 🎨 2. Component Specifications & Requirements

### A. Marketing Landing Page (`ctgroupteam/linkal` &rarr; `linkal.in`)
1. **Top-Left Logo & Branding**:
   - Replace generic SVG square with official [`linkal.jpeg`](file:///c:/Users/Administrator/Desktop/All%20projects/Linkal/linkal.jpeg).
   - Remove `.in`.
   - Remove blue box pill around `AI`.
   - Brand text cleanly renders: **Linkal AI**.
2. **Remove Popup & Template Modal**:
   - Completely delete `#modalOverlay` popup. No clunky forms, no dead-end "Site initiated" dialogs.
   - Remove template modal from main website (templates live inside Studio).
3. **"Get Started" CTAs**:
   - Desktop and Mobile headers, Hero CTA, and Pricing cards link directly to Linkal Studio (`https://studio.linkal.in` or `/studio`).
   - Mobile Header: Clean, properly styled "Get Started" button visible directly in the top bar (not buried in hamburger).
4. **Mobile Navigation Drawer**:
   - Outside click detection: Tapping anywhere outside the mobile drawer menu closes it immediately.
5. **Mobile Sticky Bottom Taskbar**:
   - Frosted glass anchored bar with direct actions: **Studio**, **How It Works**, **Pricing**, and **WhatsApp**.
6. **Mobile Floating Instagram Button (`.float-ig`)**:
   - Positioned on mobile (`@media (max-width: 768px)`) at `bottom: 80px; right: 16px; z-index: 1850;` so it floats gracefully above the bottom taskbar with full clickability.
7. **CEO/Executive CV Framing**:
   - Feature announcement: **"Free for First 100 Executive CVs"**.

---

### B. Linkal Studio & Builder (`ctgroupteam/linkaltool` &rarr; `studio.linkal.in`)
1. **PWA Install Prompt**:
   - Shows a native-like banner inside Studio up to **3 times per day** until user installs or clicks "Remind Later".
   - Copy: *"Install Linkal Studio to keep editing your website seamlessly from your mobile."*
   - Frequency tracked in `localStorage` via daily timestamp array.
2. **Real-Time Subdomain Matching & Availability UI**:
   - Instant 200ms debounced verification against `/api/subdomain/check?slug=...`
   - Clean UI state indicators:
     - ⏳ Checking... (Spinner)
     - ✅ Available: `yourname.linkal.in` (Green)
     - ❌ Unavailable: Reserved or Already Registered (Red) + Smart suggestions (`yourname-pro`, `yourname-in`).
   - RFC 1035 enforcement: Lowercase letters, numbers, hyphens `-` only. Underscores `_` strictly prohibited.
3. **Google 1-Click Sign-In & User Identity**:
   - Firebase Auth / Google OAuth popup triggered when saving/publishing.
   - Quick 3-second 1-click sign-in.
   - User profile (Google Name, Email, WhatsApp Phone) saved into Supabase `users` table.
4. **1 Free CV Per User Rule**:
   - Each authenticated Google account is entitled to **exactly one (1) Free CV website**.
   - Attempting to create a second CV prompts standard plan subscription.
5. **First 100 CVs Automated Free Status**:
   - If total CV count on platform < 100: Automatically granted 100% Free Lifetime access without entering any promo code.
   - If total CV count >= 100: Prompt user for Promo Code (empty input, **never pre-filled**).
   - High-end corporate aesthetic: Pure white `#FFFFFF`, dark charcoal `#111827`, precision vector SVG icons, zero emojis, zero photos on free tier.
6. **"My Websites" User Dashboard**:
   - Dedicated dashboard section where users see all their active websites with visitor counts, quick edit link, live domain link, and QR code download.
7. **7-Day Soft Paywall for E-Commerce & Menus**:
   - Storefronts include automated trial expiration check in `lib/generator.ts`.
   - If trial expires (>7 days) and plan is not active, storefront displays:
     > **"Free Trial Ended"**  
     > *"Your 7-day free trial has concluded. Renew your subscription starting at ₹299/mo to continue receiving live WhatsApp orders."*  
     > **[Renew Now in Linkal Studio]**
   - Store catalogs and subdomains are **never deleted**.
8. **Cashfree Production Billing Options**:
   - **1 Month**: `₹299`
   - **3 Months**: `₹799` (Save 11%)
   - **6 Months**: `₹1,499` (Save 16%)
   - **1 Year**: `₹2,699` (Save 25%)

---

### C. Linkal Admin Command Center (`ctgroupteam/linkaladmin` &rarr; `admin.linkal.in`)
1. **Dedicated Repository**:
   - Initialized at [`ctgroupteam/linkaladmin`](https://github.com/ctgroupteam/linkaladmin).
2. **Founder Authentication & Security**:
   - Password-protected access.
   - **Zero hardcoded credentials in source code or Git.**
   - Password read exclusively from Vercel Environment Variable: `ADMIN_PASSWORD=#kotlinjs`.
   - Session secured with signed JWT or secure session cookie.
3. **Command Center Capabilities**:
   - **Overview Metrics**: Total Users, Total Websites, Total CVs, Total Page Visits, Estimated Revenue (INR).
   - **Registered Users Directory**: Table of Google Name, Email, Phone Number, Sign-Up Date, Active Websites count.
   - **CV Portfolio Directory**: Table of CV Profiles, Subdomain link, User Email, Views, Creation Date.
   - **First 100 CVs Counter**: Visual gauge showing `X / 100 Free CVs Claimed`.
   - **Dynamic CV Promo Code Manager**:
     - View currently active Promo Code.
     - Real-time form to update the Promo Code in Supabase without code redeployments.
4. **Admin PWA & Push Notifications**:
   - PWA installable on Android / Desktop with standalone manifest and service worker.
   - **Settings Tab**: "Enable Mobile Notifications" button that triggers browser/Android notification permission.
   - VAPID keys generated using `web-push`.
   - Automated push notifications dispatched for:
     1. **New User Registered**: *"🎉 New User Registered: [Name] ([Email])"*
     2. **New CV Created**: *"📄 New CV Created: [Full Name] on [slug].linkal.in"*

---

## 🗄️ 3. Supabase Schema Additions

```sql
-- Users Table (Populated from Google Sign-In)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    google_id VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    avatar_url VARCHAR(500),
    cv_created_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics & Visits Counter
CREATE TABLE IF NOT EXISTS site_visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(63) NOT NULL,
    visited_at TIMESTAMPTZ DEFAULT NOW(),
    user_agent TEXT,
    ip_hash VARCHAR(64)
);

-- Admin Web Push Notification Subscriptions
CREATE TABLE IF NOT EXISTS admin_push_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    endpoint TEXT NOT NULL UNIQUE,
    keys JSONB NOT NULL,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Platform Configuration (Promo Codes & Global Counters)
CREATE TABLE IF NOT EXISTS platform_config (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO platform_config (key, value) VALUES
('cv_promo_code', '{"code": "LINKALCV", "active": true, "max_free_tier": 100}')
ON CONFLICT (key) DO NOTHING;
```

---

## 📋 4. Implementation Checklist & Verification Gates

### Phase 1: Marketing Landing Page (`ctgroupteam/linkal`)
- [ ] Top-left logo updated to `linkal.jpeg`.
- [ ] Brand text changed to clean `Linkal AI` (no `.in`, no box pill around `AI`).
- [ ] Clunky `#modalOverlay` popup completely deleted.
- [ ] Template showcase modal removed from main website.
- [ ] "Get Started" buttons link to Linkal Studio (`https://studio.linkal.in`).
- [ ] Mobile header displays clean, visible "Get Started" button.
- [ ] Mobile bottom taskbar updated with dedicated "Studio" button.
- [ ] Mobile floating Instagram button `.float-ig` floats above taskbar at `bottom: 80px; z-index: 1850`.
- [ ] Mobile menu closes when tapping outside anywhere.
- [ ] "Free for First 100 Executive CVs" framed prominently.
- [ ] Committed, pushed to `ctgroupteam/linkal`, deployed to Vercel, and verified live with `curl` (HTTP 200).

### Phase 2: Linkal Studio Platform (`ctgroupteam/linkaltool`)
- [ ] Subdomain input real-time 200ms debounced validator with instant visual feedback.
- [ ] PWA install prompt in Studio (3 times/day frequency cap with "Remind Later").
- [ ] Google 1-Click Sign-in popup on Save/Publish.
- [ ] 1 Free CV per authenticated Google account rule enforced.
- [ ] First 100 CVs automatically free logic (no code needed if count < 100).
- [ ] Empty CV code input (not prefilled) if count >= 100.
- [ ] "My Websites" dashboard tab for users.
- [ ] 7-day soft paywall for stores/menus in `lib/generator.ts`.
- [ ] Cashfree 1/3/6/12 month billing packages.
- [ ] Update `pipeline.ts` domain targets from `dominal.in` to `linkal.in`.
- [ ] Committed and pushed to `ctgroupteam/linkaltool`.

### Phase 3: Admin Command Center (`ctgroupteam/linkaladmin`)
- [ ] GitHub repository `ctgroupteam/linkaladmin` created.
- [ ] Next.js 16 PWA admin application scaffolded.
- [ ] Password protection via `ADMIN_PASSWORD` (#kotlinjs) environment variable.
- [ ] Real-time metrics dashboard (Users, Sites, CVs, Page Views, Revenue).
- [ ] Registered users directory table.
- [ ] CV profiles table with view counts.
- [ ] Dynamic CV promo code manager with live Supabase update.
- [ ] First 100 CVs progress bar.
- [ ] Web Push settings page with VAPID keys for Android/browser notifications.
- [ ] Edge dispatch for new user and new CV notifications.
- [ ] Deployed and pushed to `ctgroupteam/linkaladmin`.

### Final Phase: Comprehensive Code Integrity Check
- [ ] Zero TypeScript / ESLint errors across all repositories.
- [ ] Zero secret leaks in Git commits.
- [ ] Verify live endpoints: `https://linkal.in`, `https://studio.linkal.in`, `https://admin.linkal.in`.
