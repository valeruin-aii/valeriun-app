-- Migration de Inicialização de Segurança (T-006 / AC-008)

CREATE TABLE IF NOT EXISTS public.test_table_rls_demo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    data TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ativa o Row Level Security.
-- Como NENHUMA policy (CREATE POLICY) foi criada para esta tabela,
-- a regra padrão do PostgreSQL entra em ação: "Deny All" (Negar tudo).
-- Isso garante o AC-008 (Tabelas Protegidas por RLS e bloqueando by default).
ALTER TABLE public.test_table_rls_demo ENABLE ROW LEVEL SECURITY;
