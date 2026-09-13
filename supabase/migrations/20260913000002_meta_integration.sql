-- Migration: Integracao Meta Ads (Contas e Conexoes)

-- 1. Tabela de Conexoes com a Meta
CREATE TABLE IF NOT EXISTS public.meta_integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    facebook_user_id TEXT,
    facebook_user_name TEXT,
    access_token TEXT NOT NULL,
    token_expires_at TIMESTAMPTZ,
    scopes TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'connected' CHECK (status IN ('connected', 'expired', 'revoked')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT unique_meta_integration_facebook_user UNIQUE (facebook_user_id)
);

-- 2. Tabela de Contas de Anuncios da Meta
CREATE TABLE IF NOT EXISTS public.meta_ad_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    integration_id UUID REFERENCES public.meta_integrations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    account_id TEXT NOT NULL,
    name TEXT NOT NULL,
    account_status INTEGER DEFAULT 1,
    currency TEXT DEFAULT 'BRL',
    timezone_name TEXT DEFAULT 'America/Sao_Paulo',
    business_id TEXT,
    business_name TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT unique_account_per_integration UNIQUE (integration_id, account_id)
);

-- Ativacao do Row Level Security
ALTER TABLE public.meta_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meta_ad_accounts ENABLE ROW LEVEL SECURITY;

-- Politicas RLS para meta_integrations
CREATE POLICY "Permitir acesso total a usuarios autenticados em suas integracoes"
ON public.meta_integrations
FOR ALL
TO authenticated
USING (auth.uid() = user_id OR user_id IS NULL)
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Permitir acesso de desenvolvimento anonimo para integracoes"
ON public.meta_integrations
FOR ALL
TO anon
USING (true)
WITH CHECK (true);

-- Politicas RLS para meta_ad_accounts
CREATE POLICY "Permitir acesso total a usuarios autenticados em suas contas de anuncio"
ON public.meta_ad_accounts
FOR ALL
TO authenticated
USING (auth.uid() = user_id OR user_id IS NULL)
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Permitir acesso de desenvolvimento anonimo para contas de anuncio"
ON public.meta_ad_accounts
FOR ALL
TO anon
USING (true)
WITH CHECK (true);

-- Indices para performance
CREATE INDEX IF NOT EXISTS idx_meta_ad_accounts_user_id ON public.meta_ad_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_meta_ad_accounts_account_id ON public.meta_ad_accounts(account_id);
CREATE INDEX IF NOT EXISTS idx_meta_integrations_user_id ON public.meta_integrations(user_id);
