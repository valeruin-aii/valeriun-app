# REGRAS DE DESENVOLVIMENTO — VALERIUN APP

## FRONT-END
- **Componentes**: Sempre utilizar componentes da biblioteca (Shadcn UI) — nunca criar componente isolado quando já existir um equivalente na lib.
- **Design System**: Sempre seguir o design system do projeto (cores, espaçamento, tipografia definidos).
- **Gerenciador de Pacotes**: `pnpm` (nunca npm ou yarn no front).
- **Sem Emojis**: Nunca usar emoji em nenhuma interface, texto ou commit.
- **Sem Polling**: Nunca usar polling — utilizar WebSocket (Socket.io) ou eventos para dados em tempo real.

## BACK-END
- **Infraestrutura Supabase**: O backend utiliza o Supabase como base de infraestrutura (PostgreSQL, Migrations, RLS e Edge Functions).
- **Especificação de Backend (Specs)**: Sempre que criar ou atualizar uma spec para o backend, obrigatoriamente consultar e verificar previamente a infraestrutura existente e assegurar que a infraestrutura necessária no Supabase (tabelas, migrações SQL, políticas de segurança RLS e funções) seja verificada ou criada.
- **Gerenciador de Pacotes**: `npm` (nunca pnpm ou yarn no back).
- **Processamento Assíncrono**: Nunca usar polling — utilizar filas (BullMQ/Redis) ou eventos para processamento assíncrono.
- **Sem Emojis**: Nunca usar emoji em logs, respostas de API ou commits.

