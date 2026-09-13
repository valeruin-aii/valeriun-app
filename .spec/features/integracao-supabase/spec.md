# Spec: Integracao supabase

> feature: integracao-supabase
> status: rascunho

## Contexto

Garantir que a integração do Supabase no Valeriun App possua um backend robusto, utilizando RLS e rate limits, deixando o frontend exclusivamente como camada de apresentação segura.

## Histórias

### US-004 — Segurança e Acesso Restrito no Frontend

Como desenvolvedor de segurança, quero que as credenciais sensíveis e regras de acesso permaneçam exclusivas do backend, para que o frontend atue apenas como uma interface autenticada sem capacidade de bypass.

#### AC-007 — Ausência de Chaves Privadas no Frontend

- **Dado** o código-fonte do frontend (apps/web) e os testes
- **Quando** for feita uma inspeção de chaves e variáveis sensíveis
- **Então** não deve ser encontrada nenhuma chave do tipo `service_role` ou similar, restando apenas o uso seguro da `anon_key` pública.

#### AC-008 — Tabelas Protegidas por Row Level Security (RLS)

- **Dado** uma tabela exposta (public schema) no Supabase
- **Quando** um cliente tentar consultar os dados sem os devidos grants ou identificação de tenant
- **Então** o sistema deve retornar zero registros ou negar acesso (RLS habilitado e bloqueando by default).

#### AC-009 — Limitação de Tráfego (Rate Limit)

- **Dado** a API pública do Supabase do projeto
- **Quando** um mesmo IP tentar fazer mais requisições do que o limite permitido (ex: 100/min geral, ou 10/min para auth)
- **Então** a requisição deve ser rejeitada com um erro HTTP 429 (Too Many Requests).

## Fora de escopo

- Implementar lógica de negócio que não seja estritamente de infraestrutura (ex: fluxos de tela complexos).
- Configuração de CI/CD automatizada completa neste primeiro momento (foco na segurança da infra do BD).

## Suposições

| ID | Suposição | Status | Resolução |
|---|---|---|---|
| ASM-002 | O RLS será mantido ativado universalmente em toda tabela da schema `public`, servindo como principal barreira multitenant. | aberta | — |

## Perguntas em aberto

| ID | Pergunta | Status | Resposta |
|---|---|---|---|
| Q-002 | O Rate Limit de segurança deve ser implementado no Supabase via banco de dados (ex: pg_throttle), Edge Functions ou o API Gateway atual de projeto já resolve? | aberta | — |

