# Valeriun App

Monorepo estruturado com Turborepo e pnpm para a plataforma Valeriun.

---

## Estrutura do Workspace

```text
valeriun-app/
├── apps/
│   └── web/                # Aplicação frontend (React 19, Vite, Tailwind CSS v4)
├── packages/
│   └── ui/                 # Design System e biblioteca de componentes Shadcn UI
├── docs/
│   ├── architecture/       # Arquitetura geral, fluxo de dados e orquestração
│   ├── design/             # Tokens, diretrizes visuais e especificações de UI
│   ├── roadmap/            # Planejamento de módulos e status de desenvolvimento
│   └── security/           # Checklist profissional de segurança e compliance
├── .agents/
│   └── skills/             # Skills e diretrizes dos agentes de desenvolvimento
├── .spec/
│   ├── constituicao.md     # Constituição e invariantes do projeto
│   ├── features/           # Especificações funcionais rastreáveis
│   └── verification/       # Relatórios de auditoria e validação mecânica
├── AGENTS.md               # Regras fundamentais de desenvolvimento
├── turbo.json              # Configuração do pipeline Turborepo
└── pnpm-workspace.yaml     # Configuração de workspaces pnpm
```

---

## Documentação Técnica

- [**Arquitetura Geral**](file:///docs/architecture/overview.md): Camadas do sistema, orquestração de IA, filas e infraestrutura.
- [**Checklist de Segurança**](file:///docs/security/checklist.md): Diretrizes de autenticação, MFA, RBAC, OAuth, criptografia e proteção OWASP.
- [**Roadmap de Funcionalidades**](file:///docs/roadmap/features.md): Mapeamento de entregas e módulos do produto.
- [**Design System & Tokens**](file:///docs/design/design-system.md): Paleta OKLCH, tipografia e tokens de interface.

---

## Tecnologias Principais

- **Monorepo**: [Turborepo](https://turbo.build/)
- **Gerenciador de Pacotes**: [pnpm](https://pnpm.io/)
- **Frontend**: [React](https://react.dev/), [Vite](https://vitejs.dev/)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Componentes**: [Shadcn UI](https://ui.shadcn.com/)
- **Qualidade de Código**: TypeScript, Prettier, ESLint

---

## Regras de Desenvolvimento

1. **Gerenciador de Pacotes**:
   - **Frontend**: Utilizar sempre `pnpm` (nunca `npm` ou `yarn`).
   - **Backend**: Utilizar `npm` (quando aplicável).
2. **Componentes de Interface**:
   - Sempre utilizar componentes da biblioteca interna (`@workspace/ui`).
   - Nunca criar componente isolado quando já existir um equivalente no Design System.
3. **Sem Emojis**:
   - Proibido o uso de emojis em interfaces, textos, logs de API e commits.
4. **Comunicação em Tempo Real**:
   - Proibido o uso de polling — utilizar WebSockets (Socket.io) ou eventos assíncronos.

---

## Como Executar

### Pré-requisitos
- Node.js >= 20
- pnpm >= 10

### Instalação das Dependências

```bash
pnpm install
```

### Modo de Desenvolvimento

```bash
pnpm dev
```

A aplicação web estará disponível em `http://localhost:5173`.

### Construção (Build)

```bash
pnpm build
```

### Checagem de Tipos e Lint

```bash
pnpm typecheck
pnpm lint
```

### Auditoria e Especificações

```bash
pnpm spec:init
pnpm audit
```

---

## Adicionando Componentes Shadcn UI

Para adicionar novos componentes ao pacote compartilhado `@workspace/ui`, execute a partir da raiz:

```bash
pnpm dlx shadcn@latest add <componente> -c apps/web
```

Os componentes serão posicionados em `packages/ui/src/components` e disponibilizados para consumo.
