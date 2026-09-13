# Plano de execução — integracao-supabase

> gerado por `onp-spec plano` em 2026-09-12 01:32 — NÃO edite à mão;
> mudou tasks.md ou a config? Regenere: `onp-spec plano integracao-supabase --sequencial`

## Resumo — o que vai acontecer

- **modo SEQUENCIAL (escolha do usuário)**: 5 tarefa(s) pendente(s), UMA APÓS A OUTRA, na árvore principal
- sem worktrees e sem paralelismo — cada tarefa roda numa janela de contexto limpa, na ordem do tasks.md
- tudo acontece na branch de trabalho `spec/integracao-supabase`; levar para a main é decisão sua

## Ordem de execução (uma tarefa após a outra)

| tarefa | título | modelo | esforço |
|---|---|---|---|
| T-005 | Remover variáveis sensíveis do frontend | `claude-sonnet-5` | medium |
| T-006 | Habilitar RLS em tabelas do Supabase | `claude-sonnet-5` | medium |
| T-007 | Configurar Rate Limiting via Banco | `claude-sonnet-5` | medium |
| T-008 | Remover polling e usar Realtime | `claude-sonnet-5` | medium |
| T-009 | Implementar testes dos ACs | `claude-sonnet-5` | medium |

## Gestão de branches e commits

1. branch de trabalho `spec/integracao-supabase` criada do ponto atual (se ainda não existir)
2. as tarefas rodam nela mesma, na ordem — **1 tarefa = 1 commit** (`T-xxx feature: título`), marcada `[concluida]` só com trabalho feito
3. gate final na branch de trabalho: `onp-spec verify integracao-supabase` + `onp-spec audit --ci` — **exit 0 ou não está pronto**

## Como executar

### ▶ Sequencial no Antigravity (uma tarefa após a outra, sem Claude CLI)

1. **Entre na branch de trabalho** (terminal, na raiz do repositório):

```bash
git checkout -b spec/integracao-supabase   # ou: git checkout spec/integracao-supabase
```

2. **Execute as tarefas NA ORDEM, uma após a outra** (janela limpa por tarefa
   ajuda o foco; a próxima só começa quando a anterior commitou):

#### Prompt — T-005

```
Você executa UMA tarefa da feature "integracao-supabase" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/integracao-supabase/spec.md, .spec/features/integracao-supabase/tasks.md e .spec/constituicao.md.

Sua tarefa (somente ela):
T-005 — "Remover variáveis sensíveis do frontend"
  critérios/refs: AC-007 (Ausência de Chaves Privadas no Frontend)
  arquivos permitidos (e seus testes): apps/web/.env.example, apps/web/src/lib/supabase.ts
  mensagem de commit: "T-005 integracao-supabase: Remover variáveis sensíveis do frontend"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `pnpm test` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.
```

`node .agents/skills/onp-spec-driven/scripts/onp-spec.mjs tarefa integracao-supabase T-005 concluida` após o commit.

#### Prompt — T-006

```
Você executa UMA tarefa da feature "integracao-supabase" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/integracao-supabase/spec.md, .spec/features/integracao-supabase/tasks.md e .spec/constituicao.md.

Sua tarefa (somente ela):
T-006 — "Habilitar RLS em tabelas do Supabase"
  critérios/refs: AC-008 (Tabelas Protegidas por Row Level Security (RLS))
  arquivos permitidos (e seus testes): supabase/migrations/20240101000000_enable_rls.sql
  mensagem de commit: "T-006 integracao-supabase: Habilitar RLS em tabelas do Supabase"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `pnpm test` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.
```

`node .agents/skills/onp-spec-driven/scripts/onp-spec.mjs tarefa integracao-supabase T-006 concluida` após o commit.

#### Prompt — T-007

```
Você executa UMA tarefa da feature "integracao-supabase" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/integracao-supabase/spec.md, .spec/features/integracao-supabase/tasks.md e .spec/constituicao.md.

Sua tarefa (somente ela):
T-007 — "Configurar Rate Limiting via Banco"
  critérios/refs: AC-009 (Limitação de Tráfego (Rate Limit))
  arquivos permitidos (e seus testes): supabase/migrations/20240101000001_rate_limiting.sql
  mensagem de commit: "T-007 integracao-supabase: Configurar Rate Limiting via Banco"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `pnpm test` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.
```

`node .agents/skills/onp-spec-driven/scripts/onp-spec.mjs tarefa integracao-supabase T-007 concluida` após o commit.

#### Prompt — T-008

```
Você executa UMA tarefa da feature "integracao-supabase" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/integracao-supabase/spec.md, .spec/features/integracao-supabase/tasks.md e .spec/constituicao.md.

Sua tarefa (somente ela):
T-008 — "Remover polling e usar Realtime"
  critérios/refs: AC-007 (Ausência de Chaves Privadas no Frontend)
  arquivos permitidos (e seus testes): apps/web/src/components/agent/chat-area.tsx
  mensagem de commit: "T-008 integracao-supabase: Remover polling e usar Realtime"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `pnpm test` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.
```

`node .agents/skills/onp-spec-driven/scripts/onp-spec.mjs tarefa integracao-supabase T-008 concluida` após o commit.

#### Prompt — T-009

```
Você executa UMA tarefa da feature "integracao-supabase" (fluxo onp-spec, spec-anchored).
Leia primeiro: .spec/features/integracao-supabase/spec.md, .spec/features/integracao-supabase/tasks.md e .spec/constituicao.md.

Sua tarefa (somente ela):
T-009 — "Implementar testes dos ACs"
  critérios/refs: AC-007 (Ausência de Chaves Privadas no Frontend), AC-008 (Tabelas Protegidas por Row Level Security (RLS)), AC-009 (Limitação de Tráfego (Rate Limit))
  arquivos permitidos (e seus testes): test/integracao-supabase.spec.test.js
  mensagem de commit: "T-009 integracao-supabase: Implementar testes dos ACs"

Regras inegociáveis:
- Todo critério de aceite referenciado vira teste com @spec:AC-xxx no título.
- NUNCA enfraqueça, pule (skip/todo) ou apague um teste para passar — teste pulado não é prova e o audit acusa.
- Rode os testes localmente com `pnpm test` até passarem.
- NÃO edite tasks.md, NÃO rode onp-spec verify/audit e NÃO toque em outras tarefas — o orquestrador cuida disso.
- Ao final de CADA tarefa: `git add` só no que você tocou e um commit próprio.
```

`node .agents/skills/onp-spec-driven/scripts/onp-spec.mjs tarefa integracao-supabase T-009 concluida` após o commit.

3. **Gate final** (exit 0 ou não está pronto):

```bash
node .agents/skills/onp-spec-driven/scripts/onp-spec.mjs verify integracao-supabase
node .agents/skills/onp-spec-driven/scripts/onp-spec.mjs audit --ci
```

4. **Acompanhamento (a cada ~1 min, enquanto executa)**: avise ANTES de começar
   que o trabalho roda em background e que o resumo completo vem ao final. Marque
   cada tarefa no ledger ao começar e ao terminar (é disso que a tabela é feita):

```bash
node .agents/skills/onp-spec-driven/scripts/onp-spec.mjs evento --run valeriun-app-integracao-supabase-mtxpn1s6 --tipo tarefa --tarefa <T-xxx> --faixa seq --estado executando   # ao começar
node .agents/skills/onp-spec-driven/scripts/onp-spec.mjs evento --run valeriun-app-integracao-supabase-mtxpn1s6 --tipo tarefa --tarefa <T-xxx> --faixa seq --estado concluida    # após o commit
```

   E a cada ~1 min poste no chat a TABELA de andamento + um parágrafo curto,
   registrando o texto no ledger:

```bash
node .agents/skills/onp-spec-driven/scripts/onp-spec.mjs resumo integracao-supabase --tabela   # a tabela — cole no chat
node .agents/skills/onp-spec-driven/scripts/onp-spec.mjs resumo integracao-supabase --gravar --origem ia --texto "<2 a 4 frases do que está rolando>"
```

