# Tasks: Integracao supabase

> feature: integracao-supabase

<!--
  Como ler este arquivo (o formato é verificado por `onp-spec audit`):
  - T-xxx = tarefa (código de rastreio, único no projeto inteiro).
  - Toda tarefa referencia em `Refs:` pelo menos uma história de usuário
    (US-xxx) ou critério de aceite (AC-xxx).
  - Toda tarefa lista os arquivos que cria/altera em `Arquivos:` — capriche:
    é o que decide o que `onp-spec plano` roda em PARALELO (arquivos
    disjuntos) e o que roda em sequência.
  - Campos opcionais por tarefa, usados pelo plano de execução:
    `- Modelo: claude-sonnet-5` e `- Esforço: alto` (baixo|medio|alto|xalto|max).
  - Uma tarefa só pode virar [concluida] quando os critérios de aceite dela
    tiverem prova PASS registrada por `onp-spec verify`.
  Status: pendente | em-andamento | concluida
    (atalho: `onp-spec tarefa <feature> <T-xxx> <status>`)
-->

## T-005 — Remover variáveis sensíveis do frontend [concluida]
- Refs: AC-007
- Arquivos: apps/web/.env.example, apps/web/src/lib/supabase.ts
- Notas: Garantir que apenas VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY fiquem disponíveis no client.

## T-006 — Habilitar RLS em tabelas do Supabase [concluida]
- Refs: AC-008
- Arquivos: supabase/migrations/20240101000000_enable_rls.sql
- Notas: Criar migration para habilitar RLS em tabelas expostas.

## T-007 — Configurar Rate Limiting via Banco [concluida]
- Refs: AC-009
- Arquivos: supabase/migrations/20240101000001_rate_limiting.sql
- Notas: Implementar defesas básicas contra abuso usando funções RPC ou trigger.

## T-008 — Remover polling e usar Realtime [concluida]
- Refs: AC-007
- Arquivos: apps/web/src/components/agent/chat-area.tsx
- Notas: Substituir setInterval por chamadas real-time do Supabase, corrigindo violação de princípio (P-005).

## T-009 — Implementar testes dos ACs [concluida]
- Refs: AC-007, AC-008, AC-009
- Arquivos: test/integracao-supabase.spec.test.js
- Notas: Fazer os testes de esqueleto gerados verificarem os arquivos reais e integrações mockadas.
