-- Migration: Cache de Relatorios e Metricas da Meta Ads

CREATE TABLE IF NOT EXISTS public.meta_insights_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id TEXT NOT NULL,
    period TEXT NOT NULL DEFAULT 'maximum',
    summary JSONB NOT NULL DEFAULT '{}'::jsonb,
    campaigns JSONB NOT NULL DEFAULT '[]'::jsonb,
    actions_breakdown JSONB NOT NULL DEFAULT '{}'::jsonb,
    last_synced_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT unique_account_period_cache UNIQUE (account_id, period)
);

-- Ativacao do Row Level Security
ALTER TABLE public.meta_insights_cache ENABLE ROW LEVEL SECURITY;

-- Politicas RLS
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'meta_insights_cache' AND policyname = 'Permitir acesso total a usuarios autenticados em insights_cache') THEN
        CREATE POLICY "Permitir acesso total a usuarios autenticados em insights_cache"
        ON public.meta_insights_cache FOR ALL TO authenticated
        USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'meta_insights_cache' AND policyname = 'Permitir acesso anonimo de desenvolvimento em insights_cache') THEN
        CREATE POLICY "Permitir acesso anonimo de desenvolvimento em insights_cache"
        ON public.meta_insights_cache FOR ALL TO anon
        USING (true) WITH CHECK (true);
    END IF;
END $$;

-- Indices
CREATE INDEX IF NOT EXISTS idx_meta_insights_cache_account_period ON public.meta_insights_cache(account_id, period);
CREATE INDEX IF NOT EXISTS idx_meta_insights_cache_last_synced ON public.meta_insights_cache(last_synced_at);
