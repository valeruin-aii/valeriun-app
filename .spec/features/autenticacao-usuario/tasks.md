# Tasks: Autenticação de Usuário e Multi-tenant

> feature: autenticacao-usuario

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

## T-001 — Configuração do Banco de Dados (Tenants e Usuários) [pendente]

- Refs: US-001, AC-001
- Arquivos: src/db/schema.sql, src/db/connection.mjs
- Notas: Criar as tabelas `tenants` (id, nome) e `users` (id, tenant_id, nome, email, password_hash, numero, role). A `role` padrão para o criador do tenant deve ser 'admin'.

## T-002 — Implementar Rota de Cadastro de Tenant e Usuário [pendente]

- Refs: US-001, AC-001, AC-002
- Arquivos: src/controllers/authController.mjs, src/routes/authRoutes.mjs
- Notas: Validar se o e-mail já existe. Se não, inserir o tenant e o usuário no banco, fazendo o hash da senha usando bcrypt. Retornar HTTP 201.

## T-003 Implementar geração do JWT e Cookie HttpOnly [pendente]
- Refs: US-002, AC-003, AC-004
- Arquivos: src/controllers/authController.mjs, src/utils/jwt.mjs, src/routes/authRoutes.mjs
- Notas: Aplicar middleware de `express-rate-limit` (ex: máx 5 tentativas por 15 min) na rota de login. Verificar e-mail e hash da senha. Se sucesso, gerar JWT. Enviar resposta com `res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' })`. **ATENÇÃO:** Não inclua o token no objeto JSON da resposta.

## T-004 — Criar Middleware de Proteção Multi-tenant [pendente]

- Refs: US-003, AC-005, AC-006
- Arquivos: src/middlewares/authMiddleware.mjs
- Notas: Interceptar rotas protegidas (ex: `/api/*`), ler o cookie `token`, verificar a assinatura do JWT. Se válido, injetar `req.tenantId` e `req.userId` para controle de acesso. Se inválido ou ausente, retornar HTTP 401 Unauthorized.
