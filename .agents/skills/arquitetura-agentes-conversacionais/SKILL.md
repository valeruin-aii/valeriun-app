---
name: arquitetura-agentes-conversacionais
description: Guia de implementação do padrão arquitetural de agentes autônomos conversacionais (Yrys Pattern) focados em orquestração e máquina de estados.
---

# Skill: Arquitetura de Agentes Conversacionais (Yrys Pattern)

Toda vez que o aluno solicitar a criação de um "Agente de IA", "Bot", "Atendente Autônomo" ou similar para qualquer nicho, você **NÃO DEVE** criar um script frágil que apenas faz proxy de chat para a OpenAI/Anthropic. 

Você deve **obrigatoriamente** implementar o projeto usando a arquitetura de **Orquestrador + Máquina de Estados (Padrão Yrys)**.

## O Padrão Arquitetural
A arquitetura é dividida em módulos atômicos e independentes para garantir segurança, resiliência e foco. Ao construir um agente, você deve gerar e organizar o código nos seguintes módulos principais:

### 1. State Machine (Máquina de Estados)
O cérebro do fluxo. O agente nunca opera de forma livre, ele transita entre estados predefinidos de acordo com o nicho do aluno (ex: `ColetandoDados`, `ExecutandoAcao`, `Finalizado`).
* **Sua Tarefa:** Criar `state-machine.ts`. Garantir que a lógica avalie a intenção do usuário e mova o estado de forma previsível.

### 2. Context Manager (Gerenciador de Memória)
* **Sua Tarefa:** Criar `context-manager.ts`.
* O Context Manager agrupa o histórico da conversa e os metadados (como o nome do cliente e a intenção atual). Ele é responsável por injetar o contexto no Prompt e fazer a poda de mensagens antigas para economizar tokens.

### 3. Tool Registry (Registro de Ferramentas)
* **Sua Tarefa:** Criar `tool-registry.ts`.
* O Agente atua no mundo real chamando ferramentas (Tools). Se o nicho for clínicas médicas, a tool pode ser `agendarConsulta`. Todas as ferramentas devem ter uma definição estrita (JSON Schema ou Zod) documentando exatamente seus parâmetros.

### 4. Guardrails e Policy Engine (Filtros de Segurança)
* **Sua Tarefa:** Criar `guardrails.ts` e `policy-engine.ts`.
* **Regra de Ouro:** Antes do output do LLM ser enviado de volta ao cliente final, a resposta deve passar por uma triagem. O Guardrail verifica se a IA prometeu algo impossível (como dar um desconto que não existe no nicho do aluno) ou se alucinou. Se falhar no guardrail, uma resposta de *fallback* amigável deve ser enviada em vez da resposta gerada.

### 5. Controle de Concorrência (Debounce & Lock)
* **Sua Tarefa:** Criar `conversation-lock.ts` e `message-debounce.ts`.
* Em canais de mensagens (como WhatsApp, Telegram ou Chats Web), humanos costumam enviar múltiplas mensagens fragmentadas ("Oi", "tudo bem?", "quero comprar"). O sistema DEVE enfileirar (buffer) as mensagens curtas (debounce) e usar um sistema de trava (lock) de conversa para não iniciar o Orquestrador 3 vezes em paralelo corrompendo a Máquina de Estado.

## Procedimento de Execução
Ao ser instruído para iniciar o projeto do Agente:
1. Valide qual é o **Nicho** do projeto (imobiliário, saúde, financeiro).
2. Esboce no `tasks.md` do aluno a criação exata dos 5 pilares acima adaptados para o nicho dele.
3. Gere o código pilar por pilar e ensine o aluno o que cada parte faz no README local da feature.
