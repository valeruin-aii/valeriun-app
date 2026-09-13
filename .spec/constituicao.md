# Regras do Projeto (v1.0.0)

<!--
  Princípios Gerais do Projeto.
  Regras de arquitetura, segurança e boas práticas para todo o código.
-->

## P-001 [DEVE] Toda funcionalidade tem prova de funcionamento

Nenhuma funcionalidade é considerada pronta sem testes provando que ela realmente funciona.

- verificação(gate): intrínseca ao audit

## P-002 [DEVE] Segredos e senhas fora do código

Chaves de API, senhas e senhas de banco vêm de variáveis de ambiente e nunca ficam gravadas no código.

- verificação(proibido): `(api[_-]?key|senha|password)\s*[:=]\s*['"][^'"]{8,}` em `apps/**`

## P-003 [DEVE] Frontend com Shadcn UI e Design System

No front-end, sempre utilizar componentes da biblioteca Shadcn UI — nunca criar componente isolado quando já existir um equivalente na biblioteca. Seguir estritamente o design system do projeto (cores, espaçamento e tipografia).

- verificação(gate): intrínseca ao design review

## P-004 [DEVE] Proibição total de emojis

Nunca usar emojis em nenhuma interface, texto, logs, respostas de API ou mensagens de commit.

- verificação(gate): intrínseca ao linter e code review


## P-005 [DEVE] Proibição estrita de Polling em tempo real e assincronismo

Nunca utilizar polling na aplicação.
- No front-end: utilizar WebSocket (Socket.io) ou eventos para dados em tempo real.
- No back-end: utilizar filas (BullMQ/Redis) ou eventos para processamento assíncrono.

- verificação(proibido): `(setInterval|usePolling|pollingInterval)` em `apps/**`

## P-006 [DEVE] Gerenciadores de pacotes específicos por ambiente

Respeitar rigorosamente o gerenciador de cada camada:
- Front-end: utilizar exclusivamente `pnpm` (nunca npm ou yarn).
- Back-end: utilizar exclusivamente `npm` (nunca pnpm ou yarn).

- verificação(gate): intrínseca à configuração de workspace

## P-007 [DEVE] Validação de infraestrutura Supabase em specs de backend

Ao criar ou atualizar especificações (`.spec`) com escopo de backend, é obrigatório verificar e planejar a infraestrutura no Supabase (migrações SQL, RLS, schemas e Edge Functions). Nenhuma tarefa de backend deve ser executada sem validar se a infraestrutura necessária no Supabase foi devidamente criada ou especificada.

- verificação(gate): intrínseca ao planejamento de spec


