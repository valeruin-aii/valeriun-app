-- Migration de Rate Limiting (T-007 / AC-009)

-- Criação de uma tabela de controle de requisições por IP
-- Embora o ideal seja via Redis (no Edge) ou pg_throttle,
-- ter esta tabela garante que possamos logar abusos e restringir acessos.
CREATE TABLE IF NOT EXISTS public.rate_limit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_address TEXT NOT NULL,
    endpoint TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ativa RLS para que ninguém possa consultar o log externamente
ALTER TABLE public.rate_limit_log ENABLE ROW LEVEL SECURITY;

-- Função utilitária para registrar e verificar limites (100 req/min).
CREATE OR REPLACE FUNCTION public.check_rate_limit(client_ip TEXT, target_endpoint TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    req_count INT;
BEGIN
    -- Limpa registros antigos (opcional, pode ser feito por cron)
    DELETE FROM public.rate_limit_log WHERE created_at < now() - interval '1 minute';
    
    -- Insere a requisição atual
    INSERT INTO public.rate_limit_log (ip_address, endpoint) VALUES (client_ip, target_endpoint);
    
    -- Conta quantas vezes este IP bateu neste minuto
    SELECT COUNT(*) INTO req_count 
    FROM public.rate_limit_log 
    WHERE ip_address = client_ip AND endpoint = target_endpoint AND created_at >= now() - interval '1 minute';
    
    -- Retorna FALSO se excedeu 100 requisições
    IF req_count > 100 THEN
        RETURN FALSE;
    END IF;
    
    RETURN TRUE;
END;
$$;
