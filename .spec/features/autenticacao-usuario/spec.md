# Spec: Autenticação de Usuário e Multi-tenant

> feature: autenticacao-usuario
> status: rascunho

<!--
  Como ler este arquivo (o formato é verificado por `onp-spec audit`):
  - US-xxx = história de usuário · AC-xxx = critério de aceite
    ASM-xxx = suposição · Q-xxx = pergunta em aberto
    São códigos de rastreio: ligam a especificação às tarefas e aos testes.
  - Toda história de usuário precisa de pelo menos um critério de aceite.
  - Todo critério de aceite precisa de Dado/Quando/Então completos.
  - Os códigos são únicos no projeto inteiro (nunca reutilize um número).
  - Suposições e Perguntas em aberto são OBRIGATÓRIAS: se não há nenhuma,
    escreva "Nenhuma." — mas desconfie: quase toda feature esconde uma.
-->

## Contexto

Esta funcionalidade estabelece a base de segurança do sistema. O projeto é focado em um **usuário único por empresa** (o dono), portanto não haverá hierarquia de outros funcionários no momento. Ela permite o cadastro do usuário (dono do tenant), o login seguro com Rate Limit (proteção contra brute-force) e a proteção das rotas seguintes através de um Token JWT armazenado exclusivamente em Cookie `HttpOnly`.

## Histórias

### US-001 — Cadastro de Usuário Único e Criação de Tenant (Empresa)

Como o dono e único usuário do restaurante, quero me cadastrar e criar minha conta, para começar a utilizar o sistema de forma isolada.

#### AC-001 — Cadastro bem-sucedido cria o usuário e o tenant
- **Dado** que o cliente preenche nome, e-mail, senha, número de telefone e nome da empresa
- **Quando** ele envia o formulário de cadastro
- **Então** o sistema cria a "Empresa" (Tenant), cria o "Usuário" vinculado a ela (com a role de `admin` por padrão), e retorna sucesso (HTTP 201).

#### AC-002 — E-mail duplicado é rejeitado
- **Dado** que o cliente tenta se cadastrar com um e-mail já existente
- **Quando** ele envia o formulário
- **Então** o sistema exibe "Este e-mail já está em uso" (HTTP 409).

### US-002 — Login Seguro com Cookie HttpOnly

Como um usuário cadastrado, quero fazer login no sistema, para acessar as funcionalidades da minha empresa com segurança.

#### AC-003 — Login válido gera sessão HttpOnly
- **Dado** que o usuário informa um e-mail e senha corretos
- **Quando** ele clica em entrar
- **Então** o sistema valida as credenciais e envia o Token JWT de acesso em um Cookie com as flags `HttpOnly`, `Secure` e `SameSite=Strict`.
- **E** (CRÍTICO) a resposta da API em JSON não deve conter o token (evitando que o frontend possa salvá-lo em localStorage).

#### AC-004.5 — Proteção contra Força Bruta (Rate Limit)
- **Dado** que alguém tenta adivinhar a senha fazendo múltiplas requisições (ex: 5 erros seguidos)
- **Quando** a requisição bate na rota de login
- **Então** o sistema bloqueia o IP temporariamente com a mensagem "Muitas tentativas, tente novamente mais tarde" (HTTP 429).

#### AC-004 — Acesso negado com credenciais inválidas
- **Dado** que o usuário erra a senha
- **Quando** tenta fazer login
- **Então** o sistema exibe a mensagem genérica "Credenciais inválidas" (HTTP 401) e nenhum cookie é gerado.

### US-003 — Proteção de Rotas (Multi-tenant)

Como um usuário autenticado, quero acessar os dados da minha empresa, garantindo que não vejo dados de outras empresas.

#### AC-005 — Middleware injeta o Tenant ID a partir do Cookie
- **Dado** que o usuário faz uma requisição para uma rota protegida (ex: `/api/perfil`)
- **Quando** a requisição chega com o Cookie de sessão
- **Então** o servidor lê o Cookie, decodifica o JWT, e disponibiliza o `tenantId` e `userId` na requisição para que os bancos de dados filtrem corretamente as informações.

#### AC-006 — Requisição sem Cookie é bloqueada
- **Dado** que um visitante anônimo tenta acessar `/api/perfil` sem o Cookie de sessão
- **Quando** a requisição chega
- **Então** o servidor bloqueia o acesso com "Não autorizado" (HTTP 401).

## Fora de escopo

- Recuperação de senha (esqueci minha senha) — será feito em outra funcionalidade.
- Confirmação de e-mail (double opt-in).
- Login com OAuth (Google/Facebook).

## Suposições

| ID | Suposição | Status | Resolução |
|---|---|---|---|
| ASM-001 | O Token JWT terá no payload o `userId`, o `tenantId` (id da empresa) e a `role` | aberta | — |
| ASM-002 | Usaremos Bcrypt para o hash das senhas no banco de dados | aberta | — |

## Perguntas em aberto

| ID | Pergunta | Status | Resposta |
|---|---|---|---|
| Q-001 | Qual deve ser a duração da sessão (expiração do Cookie)? (ex: 1 hora, 1 dia, 7 dias?) | aberta | — |
