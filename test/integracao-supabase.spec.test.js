// Testes de spec da feature integracao-supabase — gerados por onp-spec scaffold
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

test('AC-007: Ausência de Chaves Privadas no Frontend @spec:AC-007', async () => {
  const envExamplePath = path.join(rootDir, 'apps/web/.env.example');
  const supabaseTsPath = path.join(rootDir, 'apps/web/src/lib/supabase.ts');
  
  const envContent = await fs.readFile(envExamplePath, 'utf-8').catch(() => '');
  const tsContent = await fs.readFile(supabaseTsPath, 'utf-8').catch(() => '');

  assert.ok(!envContent.includes('SERVICE_ROLE_KEY'), 'A .env.example não deve conter SERVICE_ROLE_KEY');
  assert.ok(!tsContent.includes('SERVICE_ROLE_KEY'), 'O código do client não deve referenciar chaves privadas');
  assert.ok(tsContent.includes('VITE_SUPABASE_ANON_KEY'), 'O client deve usar VITE_SUPABASE_ANON_KEY');
});

test('AC-008: Tabelas Protegidas por Row Level Security (RLS) @spec:AC-008', async () => {
  const migrationDir = path.join(rootDir, 'supabase/migrations');
  const files = await fs.readdir(migrationDir).catch(() => []);
  
  let hasRls = false;
  for (const file of files) {
    if (file.endsWith('.sql')) {
      const content = await fs.readFile(path.join(migrationDir, file), 'utf-8');
      if (content.includes('ENABLE ROW LEVEL SECURITY')) {
        hasRls = true;
        break;
      }
    }
  }
  
  assert.ok(hasRls, 'Pelo menos uma migration deve conter ENABLE ROW LEVEL SECURITY');
});

test('AC-009: Limitação de Tráfego (Rate Limit) @spec:AC-009', async () => {
  const migrationDir = path.join(rootDir, 'supabase/migrations');
  const files = await fs.readdir(migrationDir).catch(() => []);
  
  let hasRateLimit = false;
  for (const file of files) {
    if (file.endsWith('.sql')) {
      const content = await fs.readFile(path.join(migrationDir, file), 'utf-8');
      if (content.includes('rate_limit') && (content.includes('COUNT') || content.includes('INSERT INTO public.rate_limit_log'))) {
        hasRateLimit = true;
        break;
      }
    }
  }
  
  assert.ok(hasRateLimit, 'Pelo menos uma migration deve conter a lógica de Rate Limiting (rate_limit_log)');
});
