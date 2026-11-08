-- ========================================================
-- Linkal AI - Multi-Tenant Supabase Production Schema
-- Run this once in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/yuvkbugblplulrzrjamg/sql/new
-- ========================================================

-- 1. Users Table (Google Sign-In, Identity, Quotas)
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY,
    google_id TEXT,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone_number TEXT,
    avatar_url TEXT,
    password_hash TEXT,
    role TEXT DEFAULT 'user',
    cv_created_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Stores & Websites Table (Zero-Redeploy Multi-Tenancy)
CREATE TABLE IF NOT EXISTS public.stores (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    business_name TEXT,
    category TEXT DEFAULT 'ecommerce',
    template_id TEXT DEFAULT 'modern',
    whatsapp_number TEXT,
    contact_email TEXT,
    site_data JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    visits_count INT DEFAULT 0,
    clicks_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Site Visits & Analytics Table
CREATE TABLE IF NOT EXISTS public.site_visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL,
    visited_at TIMESTAMPTZ DEFAULT NOW(),
    user_agent TEXT
);

-- Enable Row Level Security (RLS) but allow service role full access
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

-- Allow full public read/write via Service Role Key (used by Linkal API)
CREATE POLICY "Service Role Full Access Users" ON public.users FOR ALL USING (true);
CREATE POLICY "Service Role Full Access Stores" ON public.stores FOR ALL USING (true);
CREATE POLICY "Service Role Full Access Site Visits" ON public.site_visits FOR ALL USING (true);
