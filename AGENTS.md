# REGRAS DE DESENVOLVIMENTO — VALERIUN APP

## FRONT-END
- **Componentes**: Sempre utilizar componentes da biblioteca (Shadcn UI) — nunca criar componente isolado quando já existir um equivalente na lib.
- **Design System**: Sempre seguir o design system do projeto (cores, espaçamento, tipografia definidos).
- **Gerenciador de Pacotes**: `pnpm` (nunca npm ou yarn no front).
- **Sem Emojis**: Nunca usar emoji em nenhuma interface, texto ou commit.
- **Sem Polling**: Nunca usar polling — utilizar WebSocket (Socket.io) ou eventos para dados em tempo real.

## BACK-END
- **Gerenciador de Pacotes**: `npm` (nunca pnpm ou yarn no back).
- **Processamento Assíncrono**: Nunca usar polling — utilizar filas (BullMQ/Redis) ou eventos para processamento assíncrono.
- **Sem Emojis**: Nunca usar emoji em logs, respostas de API ou commits.
