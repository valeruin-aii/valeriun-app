#!/usr/bin/env node
// CLI entry point para pnpm dlx spec-kit-educaflex@github:lucasnogueiradev/spec-kit-educaflex
// Redireciona para o motor principal da skill onp-spec-driven.
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliPath = pathToFileURL(join(__dirname, '../.agents/skills/onp-spec-driven/scripts/onp-spec.mjs')).href;

const { run } = await import(cliPath).then(m => m).catch(async () => {
  // Fallback: importa o lib diretamente
  const libPath = pathToFileURL(join(__dirname, '../.agents/skills/onp-spec-driven/scripts/lib/src/cli.js')).href;
  return import(libPath);
});

if (typeof run === 'function') {
  run(process.argv.slice(2)).then(
    (code) => { process.exitCode = code ?? 0; },
    (err) => {
      console.error(`erro: ${err.message}`);
      process.exitCode = 2;
    }
  );
}
