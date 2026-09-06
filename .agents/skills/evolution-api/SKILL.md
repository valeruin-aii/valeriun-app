---
name: evolution-api-whatsapp
description: Padrões avançados e lições aprendidas (CardaPro) para integrar Agentes de IA com o WhatsApp utilizando a Evolution API.
---

# Skill: Integração Profissional com Evolution API (Padrão CardaPro)

Quando o aluno solicitar a criação de um "Bot de WhatsApp", você deve assumir o uso da **Evolution API** como motor de comunicação. O desenvolvimento dessa integração não deve ser ingênuo. Baseado em lições reais de produção (Postmortems do projeto CardaPro), você **DEVE OBRIGATORIAMENTE** implementar as seguintes proteções de infraestrutura ao gerar o código para o aluno:

## 1. O Problema das Mensagens Duplicadas (Idempotência)
**Lição Aprendida:** A Evolution API (e webhooks em geral) frequentemente dispara o mesmo payload de mensagem duas vezes com milissegundos de diferença. Se não tratado, a IA processa o mesmo texto duas vezes, envia duas respostas (cobrando o dobro de tokens) e corrompe o estado da Máquina de Estados.
* **A Solução que você deve gerar:** Todo webhook (`messages.upsert`) deve extrair o `message_id` (ex: `msg.key.id`). Use o Redis ou o Banco de Dados para checar se esse `message_id` já foi processado (Idempotency Key). Só enfileire a mensagem para o Orquestrador se for um ID inédito.

## 2. Abort Controllers e Network Retries
**Lição Aprendida:** Chamadas HTTP para o servidor da Evolution API podem ficar "penduradas" ou sofrer de picos de rede (ECONNRESET, ETIMEDOUT).
* **A Solução que você deve gerar:** Envolva o fetch para a Evolution API em um `AbortController` com timeout de 30 segundos. Adicione um bloco de `catch` que faça Retry Automático (até 3 tentativas) para erros de rede (ECONNREFUSED, ETIMEDOUT).

## 3. A Trava de `Rate-Overlimit` do WhatsApp
**Lição Aprendida:** Se o bot tentar enviar muitas mensagens muito rápido, o Baileys/Evolution retornará um erro silencioso contendo a string `rate-overlimit`. Se isso não for tratado, a mensagem do bot simplesmente desaparece e não chega ao usuário.
* **A Solução que você deve gerar:** No serviço que faz o POST para a Evolution, intercepte o erro da resposta. Se a resposta contiver `"rate-overlimit"` ou `"rate_overlimit"`, crie um bloco de `sleep` forçado (ex: `await sleep(10000)` / 10 segundos) e tente novamente, para dar tempo da fila do WhatsApp desafogar.

## 4. O Fluxo de Webhook Resiliente
Nunca processe a IA dentro da rota original do Webhook, senão a Evolution sofre timeout. O fluxo de código que você deve construir é:
1. Recebe Webhook.
2. Verifica `fromMe === true` (aborta se o bot mandou, para evitar loop infinito).
3. Faz o Dedupe pelo `message_id`.
4. Salva a mensagem em uma Fila Assíncrona (como BullMQ) ou engatilha o processamento em *background*.
5. Retorna `200 OK` instantaneamente para a Evolution API.

## Dica Educativa
Quando gerar esse serviço robusto de `evolution.service.ts` para o aluno, adicione comentários explicando o *porquê* dessas travas existirem. Diga a ele: *"Adicionei um filtro de 'rate-overlimit' e 'idempotência' porque em produção o WhatsApp derrubaria o bot sem eles"*.
