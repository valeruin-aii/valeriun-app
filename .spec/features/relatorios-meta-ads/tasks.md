# Tasks: Relatorios e Insights da Meta Ads

> feature: relatorios-meta-ads

## T-010 — Criar migration de cache de metricas no Supabase [concluido]
- Refs: AC-010
- Arquivos: supabase/migrations/20260913000003_meta_insights_cache.sql
- Notas: Criar tabela meta_insights_cache com RLS habilitado e indices por account_id e periodo.

## T-011 — Implementar Edge Function meta-insights [concluido]
- Refs: AC-010, AC-011
- Arquivos: supabase/functions/meta-insights/index.ts
- Notas: Extrair metricas detalhadas da Meta Marketing API (spend, clicks, impressions, reach, WhatsApp, leads, compras) e gerenciar cache no Supabase.

## T-012 — Expandir servico meta-api no frontend [concluido]
- Refs: AC-011, AC-012
- Arquivos: apps/web/src/lib/meta-api.ts
- Notas: Adicionar metodos fetchAccountInsights e syncAccountInsights com tipagens completas de metricas.

## T-013 — Conectar CampaignDashboard a dados reais da Meta [concluido]
- Refs: AC-012
- Arquivos: apps/web/src/pages/campaign-dashboard.tsx
- Notas: Tornar selecao de conta dinamica, exibir status conectado, carregar dados do cache do Supabase e disponibilizar botao de sincronizacao sob demanda.

## T-014 — Testes automatizados dos criterios de aceite de relatorios [concluido]
- Refs: AC-010, AC-011, AC-012
- Arquivos: test/relatorios-meta-ads.spec.test.js
- Notas: Testar integridade da migration, ausencia de polling e cobertura dos campos retornados.
