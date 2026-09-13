# Spec: Relatorios e Insights da Meta Ads

> feature: relatorios-meta-ads
> status: rascunho

## Contexto

Fornecer aos usuarios um painel analítico consolidado das contas de anuncios conectadas da Meta (Facebook e Instagram Ads). O modulo deve consultar metricas completas da Graph API (investimento, alcance, cliques, conversas de WhatsApp, leads, compras e ROAS), armazenar em cache seguro no Supabase com RLS e permitir atualizacao sob demanda via botao sem polling.

## Historias

### US-005 — Consulta e Cache Inteligente de Metricas da Meta

Como gestor de trafego, quero visualizar relatorios detalhados da minha conta de anuncios com carregamento instantaneo atraves de cache no Supabase, podendo atualizar os dados sob demanda sem onerar limites da API da Meta.

#### AC-010 — Persistencia e Cache de Metricas no Supabase
- **Dado** uma conta de anuncios vinculada no Supabase
- **Quando** a Edge Function `meta-insights` for disparada
- **Entao** os dados agregados da conta, metricas por campanha e breakdown diario devem ser persistidos na tabela `public.meta_insights_cache` com `last_synced_at` e RLS ativado.

#### AC-011 — Extracao Abrangente de Metricas da Marketing API
- **Dado** o endpoint `/{ad_account_id}/insights` da Meta
- **Quando** a sincronizacao for solicitada para um periodo selecionado
- **Entao** devem ser extraidas e normalizadas as seguintes metricas principais: spend, impressions, clicks, reach, cpc, cpm, ctr, mensagens iniciadas (WhatsApp/Direct), leads e compras.

#### AC-012 — Dashboard Dinamico com Atualizacao Sob Demanda
- **Dado** a tela `CampaignDashboard` no front-end
- **Quando** o usuario selecionar uma conta de anuncios real importada
- **Entao** a interface deve renderizar os KPIs reais da conta a partir do cache do Supabase, indicar a data da ultima sincronizacao e disponibilizar botao manual de "Sincronizar Metricas" sem uso de polling.

## Fora de escopo
- Edicao ou alteracao de orcamento de campanhas a partir do dashboard de relatorios (escopo da Fase 3).
- Integracao com outras redes nesta feature (foco exclusivo na Meta Ads).

## Suposicoes

| ID | Suposicao | Status | Resolucao |
|---|---|---|---|
| ASM-003 | O acesso aos relatorios da conta continuara protegido pela permissao `ads_read` ja obtida no OAuth da conta. | aberta | — |

## Perguntas em aberto

| ID | Pergunta | Status | Resposta |
|---|---|---|---|
| Q-003 | Deseja que o periodo padrao de visualizacao ao abrir o dashboard seja os 'Ultimos 30 dias' ou 'Maximo historico'? | aberta | — |
