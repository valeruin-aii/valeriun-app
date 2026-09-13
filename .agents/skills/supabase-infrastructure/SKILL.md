---
name: supabase-infrastructure
description: Skill de infraestrutura e segurança para integrações Supabase. Foco em garantir RLS (Row Level Security), prevenção de secrets no frontend, configuração de Rate Limits e boas práticas de arquitetura.
risk: safe
source: custom
date_added: "2026-09-11"
---

# Infraestrutura e Segurança Supabase

Esta skill define as regras inegociáveis e padrões de infraestrutura ao utilizar o Supabase no projeto Valeriun App. O foco é manter o frontend "burro" (apenas visualização autênticada) e concentrar toda a segurança, rate limits e regras de negócio no banco de dados e backend.

## Regras Fundamentais (Constituição de Infraestrutura)

1. **Nenhum Segredo no Frontend:** O frontend NUNCA deve conter regras de negócio sensíveis, query params abertos para inserção direta sem validação, ou variáveis como a `service_role_key`. Apenas a `anon_key` pública deve ser utilizada no lado do cliente.
2. **Row Level Security (RLS) Mandatório:** TODA tabela exposta (public schema) deve ter o RLS ativado (`ALTER TABLE nome_da_tabela ENABLE ROW LEVEL SECURITY;`). Nenhuma tabela deve ser acessível via Data API sem que políticas específicas (`CREATE POLICY`) de leitura e escrita estejam definidas.
3. **Validação de Token e Multi-tenant:** Toda policy deve verificar o tenant correto (ex: `tenant_id = current_setting('app.current_tenant_id')::uuid` ou usar funções com `auth.uid()`). Consulte a skill `saas-multi-tenant` para detalhes de isolamento.
4. **Proteção contra Abuso (Rate Limits):** A infraestrutura deve implementar Rate Limiting para proteger a API pública. O recomendado padrão para APIs críticas (como login e inserção de dados pesados) é de `10 a 30 requisições por minuto por IP`, e para chamadas gerais `100 requisições por minuto por IP/Tenant`. Isso pode ser gerido no Supabase via API Gateway, Edge Functions, ou usando extensões como o `pg_throttle` no banco.
5. **Comunicação em Tempo Real:** Conforme a skill `boas-praticas-apis`, nunca utilize polling (`setInterval`) para atualizar dados. Utilize o Realtime do Supabase (WebSockets) para escutar inserções e alterações.

## Passo a Passo para Novas Tabelas

Sempre que uma nova funcionalidade que precise de banco de dados for criada, siga este checklist:

1. **Criar a tabela via Migration (Nunca direto via dashboard na produção):** Utilize `supabase migration new nome_da_feature`.
2. **Adicionar `tenant_id`:** Se a tabela for escopada por tenant, garanta que a coluna `tenant_id` existe, não é nula (`NOT NULL`) e possui indexação composta adequada.
3. **Habilitar RLS:** Execute o comando de habilitar RLS.
4. **Criar Políticas:** Crie políticas claras usando a cláusula `TO authenticated` combinada com o `USING (...)`. **NUNCA** use `auth.role() = 'authenticated'`, isso está depreciado.
5. **Auditoria:** Verifique se as roles `anon` e `authenticated` têm os `GRANTs` adequados.

## Rate Limits Recomendados (Padrão)

Se não especificado pela regra de negócio, aplique as seguintes defesas:
- **Endpoints de Autenticação/Criação:** 10 req/min por IP.
- **Endpoints de Leitura Pública/API Geral:** 100 req/min por IP.
- **Implementação:** Se for necessário implementar no nível do banco para funções RPC, utilize lógica com tracking de IPs ou adote Rate Limiter no Edge Function antes que o tráfego atinja o banco.

## Limitações

- Nunca contorne RLS usando funções `SECURITY DEFINER` na schema `public`. Se precisar de bypass, faça-o em schemas privados e verifique rigorosamente a origem da chamada.
- Ao usar o Supabase MCP, as queries devem ser testadas com contexto seguro.
