---
name: boas-praticas-apis
description: Impede anti-patterns em consumo de APIs, focando em evitar Polling e proteger a performance da rede e do servidor.
---

# Skill: Boas Práticas de Consumo de API (Anti-Polling)

Sua missão como agente parceiro do aluno é ser um "Guardião de Performance e Custos". Alunos iniciantes costumam implementar requisições contínuas (Polling contínuo via `setInterval`) para atualizar dados na tela, o que é um anti-pattern silencioso e grave.

## 1. O Problema do Polling Constante
Se o aluno solicitar: *"Faça a tela atualizar os dados de pagamento automaticamente"* ou *"Verifique se o pedido mudou de status"*, **NÃO ESCREVA** códigos que usem `setInterval` fazendo requisições GET a cada X segundos na API. 

Polling invisível:
* Sobrecarrega a aba do navegador do usuário (memória).
* Gera dezenas de milhares de requisições inúteis no servidor (aumentando custo de infraestrutura).
* Causa *Memory Leaks* se o intervalo não for limpo (`clearInterval`) quando o componente for desmontado.

## 2. A Abordagem Correta
Sempre que o aluno pedir "dados em tempo real" ou "atualização automática", você deve guiá-lo a usar as arquiteturas corretas:

- **WebSockets:** A via de mão dupla ideal para quando o servidor precisa avisar o cliente ativamente (ex: Chat, gráfico em tempo real).
- **Server-Sent Events (SSE):** A melhor opção se o Frontend apenas precisa *escutar* atualizações de status vindas do Backend (ex: Pedido aprovado no iFood).
- **Webhooks:** Para integrações entre backends (ex: Mercado Pago avisando o nosso backend que o Pix foi pago).
- **React Query / SWR (Revalidação inteligente):** Se não houver WebSockets, configure a biblioteca de fetch para buscar novos dados *apenas quando o usuário voltar para a aba* (`refetchOnWindowFocus`) ou clicar em algo, NUNCA rodando cegamente em background de 5 em 5 segundos.

## 3. Como Intervir (Regra de Ouro)
Se na especificação do aluno (`spec.md`) houver uma instrução clara para atualizar os dados em loop fechado de tempo, você **DEVE** pausar a execução, não escrever o código destrutivo e alertar o aluno:

> *"Notei que a sua história de usuário pede para consultar a API constantemente. Isso pode deixar o servidor lento e custar muito caro. Que tal usarmos Server-Sent Events (SSE) para o servidor te avisar quando mudar, ou então atualizar só quando o usuário clicar na tela?"*

Somente se o aluno insistir no Polling (por limitação técnica do projeto), você deve programar utilizando **Exponential Backoff** (aumentar o tempo de espera gradativamente se a resposta não mudar) e garantir obrigatoriamente a escrita do código de *cleanup* (ex: return no `useEffect` do React) para destruir o polling caso o usuário saia da tela.
