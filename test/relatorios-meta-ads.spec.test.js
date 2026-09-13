// Testes de spec da feature relatorios-meta-ads — validacao mecanica de criterios de aceite
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

test('AC-010: Armazenamento e Cache de Metricas no Supabase @spec:AC-010', async () => {
  const migrationPath = path.join(rootDir, 'supabase/migrations/20260913000003_meta_insights_cache.sql');
  const content = await fs.readFile(migrationPath, 'utf-8');

  assert.ok(content.includes('CREATE TABLE IF NOT EXISTS public.meta_insights_cache'), 'Deve criar a tabela meta_insights_cache');
  assert.ok(content.includes('ENABLE ROW LEVEL SECURITY'), 'A tabela meta_insights_cache deve ter RLS habilitado');
  assert.ok(content.includes('UNIQUE (account_id, period)'), 'Deve possuir constraint UNIQUE de conta e periodo para upsert');
});

test('AC-011: Extracao Abrangente de Metricas da Meta Marketing API @spec:AC-011', async () => {
  const edgeFunctionPath = path.join(rootDir, 'supabase/functions/meta-insights/index.ts');
  const content = await fs.readFile(edgeFunctionPath, 'utf-8');

  assert.ok(content.includes('graph.facebook.com'), 'Deve consumir a Graph API da Meta');
  assert.ok(content.includes('insights'), 'Deve consultar o endpoint de insights');
  assert.ok(content.includes('spend'), 'Deve extrair metrica de investimento (spend)');
  assert.ok(content.includes('impressions'), 'Deve extrair metrica de impressoes');
  assert.ok(content.includes('clicks'), 'Deve extrair metrica de cliques');
  assert.ok(content.includes('messaging_conversation_started_7d'), 'Deve mapear conversas e mensagens de WhatsApp');
  assert.ok(!content.includes('setInterval'), 'Edge Function nao deve realizar polling continuo');
});

test('AC-012: Dashboard com Cache-First e Sincronizacao Sob Demanda @spec:AC-012', async () => {
  const dashboardPath = path.join(rootDir, 'apps/web/src/pages/campaign-dashboard.tsx');
  const apiPath = path.join(rootDir, 'apps/web/src/lib/meta-api.ts');
  
  const dashboardContent = await fs.readFile(dashboardPath, 'utf-8');
  const apiContent = await fs.readFile(apiPath, 'utf-8');

  assert.ok(dashboardContent.includes('fetchAccountInsights'), 'Dashboard deve invocar fetchAccountInsights');
  assert.ok(dashboardContent.includes('fetchConnectedAdAccounts'), 'Dashboard deve carregar contas reais conectadas');
  assert.ok(apiContent.includes('fromCache'), 'Servico meta-api deve suportar cache-first');
  assert.ok(!dashboardContent.includes('setInterval'), 'Dashboard nao deve usar polling (Principio P-005)');
});
