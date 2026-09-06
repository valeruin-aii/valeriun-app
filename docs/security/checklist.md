# Checklist Profissional de Segurança e Compliance

Este documento estabelece as diretrizes e requisitos obrigatórios de segurança para a plataforma Valeriun.

---

## 1. Autenticação e Acesso

- **MFA Obrigatório**: Autenticação de dois fatores (TOTP/SMS/Email) mandatória para acesso administrativo e contas sensíveis.
- **Hash de Senhas**: Algoritmos robustos de derivação de chave (Argon2id ou Bcrypt com salt factor >= 12). Proibido armazenamento em texto puro.
- **Tokens de Sessão**: JWT com tempo de expiração curto (< 15 minutos) aliado a Refresh Tokens rotativos persistidos de forma segura.
- **Proteção contra Força Bruta**: Rate limiting por IP e por conta nas rotas de login e recuperação de senha.
- **Bloqueio de Conta**: Bloqueio temporário progressivo após tentativas repetidas de falha.
- **RBAC (Role-Based Access Control)**: Controle estrito de acesso segregado por papéis: Cliente, Gestor, Agência e Administrador.
- **Sessões Revogáveis**: Mecanismo de invalidação imediata de refresh tokens no logout e em alterações de senha.
- **Proteção contra Session Fixation**: Regeneração obrigatória de ID de sessão após autenticação bem-sucedida.

---

## 2. OAuth e Tokens de Terceiros (Meta / Google)

- **Criptografia em Repouso**: Tokens de acesso e refresh tokens de parceiros criptografados com AES-256-GCM.
- **Gerenciamento de Chaves**: Chaves mestras de criptografia gerenciadas fora da base de dados (ex.: AWS KMS, HashiCorp Vault ou variáveis de ambiente isoladas).
- **Isolamento de Tokens**: Tokens de APIs terceiras nunca devem trafegar ou ser expostos ao front-end; todas as chamadas ocorrem exclusivamente no back-end.
- **Renovação Automática**: Rotina assíncrona para renovação preventiva de tokens antes da expiração.
- **Revogação sob Demanda**: Desconexão de conta força a revogação e exclusão segura dos tokens correspondentes.
- **Princípio do Menor Privilégio**: Solicitação estrita apenas dos escopos OAuth estritamente necessários para a operação.

---

## 3. Proteção de Dados e Criptografia

- **Criptografia em Trânsito**: HTTPS/TLS 1.3 obrigatório em todos os endpoints públicos e internos.
- **Criptografia no Banco de Dados**: Dados sensíveis criptografados no MongoDB antes da gravação.
- **Backups Criptografados**: Rotina automatizada de backup criptografado com testes periódicos de restore.
- **Mascaramento em Logs**: Sanitização ativa para impedir log de tokens, credenciais, payloads brutos ou dados de pagamento.

---

## 4. Sanitização e Validação de Entrada (Front-End e Back-End)

- **Validação no Back-End**: Validação mandatória de schemas (ex.: Zod/Joi) no servidor para todas as requisições, nunca confiando apenas na validação do cliente.
- **Proteção contra NoSQL Injection**: Proibição de concatenação de queries no MongoDB; utilização estrita de operadores parametrizados do Mongoose.
- **Proteção contra XSS**: Sanitização de saídas no React e cabeçalhos Content Security Policy (CSP).
- **Proteção contra SSRF**: Validação rigorosa e lista de permissões para qualquer URL de destino acionada por webhooks.
- **Upload Seguro**: Validação de arquivos por Magic Bytes (MIME type real) e limite estrito de tamanho.
- **Defesa contra Prompt Injection**: Sanitização e isolamento de comandos de voz/texto do usuário antes do envio aos modelos de linguagem (LLM).

---

## 5. Idempotência e Pagamentos

- **Chave de Idempotência (`Idempotency-Key`)**: Implementada em todas as requisições financeiras e operações críticas (criação/publicação de anúncios e cobranças).
- **Assinatura de Webhooks**: Validação criptográfica das assinaturas de webhooks recebidos de gateways (Stripe / Pagar.me).
- **Reconciliação Automática**: Rotinas assíncronas para reconciliar eventos de gateway com o banco de dados interno.
- **PCI-DSS Compliance**: Utilização de formulários hospedados/tokenizados; nenhum dado de cartão de crédito trafega pelos servidores da aplicação.

---

## 6. Segurança da API e Cabeçalhos

- **Rate Limiting**: Aplicado por IP, usuário autenticado e chave de API.
- **CORS Restritivo**: Configuração com lista explícita de origens permitidas.
- **Proteção CSRF**: Tokens anti-CSRF e cookies com flags `SameSite=Strict`, `HttpOnly` e `Secure`.
- **Cabeçalhos de Segurança (Helmet)**: Configuração de `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options` e `Referrer-Policy`.

---

## 7. Infraestrutura, Rede e Observabilidade

- **WAF e Proteção DDoS**: Tráfego intermediado por Cloudflare com regras ativas de proteção contra bots e ataques comuns.
- **Segmentação de Rede**: Banco de dados e instâncias Redis acessíveis apenas pela rede interna privada da aplicação.
- **Trilha de Auditoria**: Registro imutável de todas as ações de usuários, gestores e agentes autônomos de IA.
- **Monitoramento de Incidentes**: Alertas integrados com Sentry e Grafana para resposta rápida a anomalias.

---

## 8. Compliance e LGPD

- **Consentimento Explícito**: Termos de Uso e Políticas de Privacidade transparentes no onboarding.
- **Direito dos Titulares**: Funcionalidades para exportação e exclusão definitiva de dados cadastrais.
- **Contratos e DPA**: Acordos de processamento de dados alinhados com provedores e plataformas (Meta, Google e provedores de nuvem).
