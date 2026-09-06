# Roadmap de Funcionalidades — Valeriun App

Planejamento e status dos módulos do produto baseados na especificação do projeto.

---

## 1. Módulo de Autenticação e Gestão de Usuários
- [ ] Cadastro, login tradicional por e-mail e senha com hash Argon2/Bcrypt
- [ ] Social Login (Google OAuth 2.0)
- [ ] Fluxo de recuperação de senha com link seguro temporário
- [ ] Autenticação de dois fatores (MFA)
- [ ] Controle de sessão com JWT e refresh tokens rotativos
- [ ] Controle de acesso baseado em papéis (RBAC: Cliente, Gestor, Agência, Admin)

---

## 2. Módulo de Contas de Anúncios e Conexão de Plataformas
- [ ] Integração OAuth 2.0 com Meta Ads (Facebook/Instagram Marketing API)
- [ ] Integração OAuth 2.0 com Google Ads API
- [ ] Armazenamento seguro e criptografado de tokens de acesso (AES-256)
- [ ] Listagem, busca e seleção de contas de anúncios vinculadas
- [ ] Controle e restrição de limites de contas por plano contratado
- [ ] Fluxo de desconexão e revogação segura de permissões

---

## 3. Módulo de Agente de IA e Criação de Campanhas
- [ ] Interface de comando por voz e texto (Mobile-First)
- [ ] Camada de defesa contra Prompt Injection e sanitização de inputs
- [ ] Integração com LLMs (OpenAI / DeepSeek) via MCP Tools e Harness AI
- [ ] Geração automática de variações de criativos e textos para testes A/B
- [ ] Sugestão e estruturação inteligente de segmentação de público
- [ ] Fluxo guiado: Revisão -> Aprovação -> Publicação automática

---

## 4. Módulo de Relatórios e Métricas de Performance
- [ ] Painel consolidado com métricas em tempo real
- [ ] Indicadores financeiros e operacionais: Investimento, Cliques, Conversões
- [ ] Métricas de eficiência: CPC, CPM, CPA e ROAS
- [ ] Comparação de performance entre períodos selecionados
- [ ] Gráficos interativos e relatórios exportáveis

---

## 5. Módulo de Back-End, Filas e Resiliência
- [ ] API REST em Node.js com TypeScript e validação de schemas Zod
- [ ] Filas BullMQ e Redis para processamento de tarefas assíncronas
- [ ] Gerenciamento de rate limits para Meta e Google Ads APIs
- [ ] Políticas de retentativa automática com idempotência
- [ ] Sincronização periódica em background de métricas de anúncios

---

## 6. Módulo de Pagamentos, Faturamento e Multi-tenancy
- [ ] Integração com Gateway de Pagamento (Stripe / Pagar.me) com chaves de idempotência
- [ ] Cobrança recorrente e gestão de assinaturas por plano
- [ ] Processamento seguro de webhooks com verificação de assinatura criptográfica
- [ ] Suporte a múltiplos times e assistentes (Multi-tenancy)

---

## 7. Módulo de Infraestrutura, Segurança e Compliance
- [ ] Ambientes conteinerizados com Docker
- [ ] Configuração de Proxy Reverso Nginx com Cloudflare WAF e CDN
- [ ] Logging estruturado e trilha de auditoria completa de ações (usuário e IA)
- [ ] Monitoramento contínuo de erros e telemetria (Sentry e Grafana)
- [ ] Conformidade com LGPD (termo de consentimento, exclusão e exportação de dados)
- [ ] Processo de submissão e aprovação Meta App Review e Google Ads Developer Verification
