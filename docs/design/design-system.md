# Design System & Tokens — Shadcn UI

Este documento reflete a **paleta de cores, tipografia e tokens de design** configurados nativamente no projeto (`packages/ui/src/styles/globals.css`).

---

## Paleta de Cores (Tokens Semanticos)

A aplicação utiliza o espaço de cor **OKLCH** com Tailwind CSS v4 e Shadcn UI.

### Modo Claro (Light Mode)

| Token | Variável / Valor OKLCH | Uso / Descrição |
| :--- | :--- | :--- |
| **`--primary`** | `oklch(0.488 0.243 264.376)` | Ação principal, botões de destaque, links (Azul Royal) |
| **`--primary-foreground`** | `oklch(0.97 0.014 254.604)` | Texto sobre cor primária (Branco gelo) |
| **`--background`** | `oklch(1 0 0)` | Fundo geral da página (Branco puro) |
| **`--foreground`** | `oklch(0.145 0 0)` | Texto principal (Preto suave) |
| **`--card`** | `oklch(1 0 0)` | Fundo de cartões/containers |
| **`--card-foreground`** | `oklch(0.145 0 0)` | Texto em cartões |
| **`--secondary`** | `oklch(0.967 0.001 286.375)` | Ações secundárias |
| **`--secondary-foreground`** | `oklch(0.21 0.006 285.885)` | Texto em botões secundários |
| **`--muted`** | `oklch(0.97 0 0)` | Fundos sutis e áreas desabilitadas |
| **`--muted-foreground`** | `oklch(0.556 0 0)` | Legendas, placeholders e textos secundários |
| **`--accent`** | `oklch(0.97 0 0)` | Realces em hover/seleção |
| **`--accent-foreground`** | `oklch(0.205 0 0)` | Texto em áreas com realce |
| **`--destructive`** | `oklch(0.577 0.245 27.325)` | Ações críticas/erro (Vermelho) |
| **`--border`** | `oklch(0.922 0 0)` | Linhas e divisórias |
| **`--input`** | `oklch(0.922 0 0)` | Bordas de campos de entrada (Inputs) |
| **`--ring`** | `oklch(0.708 0 0)` | Foco de acessibilidade / anéis |

---

### Modo Escuro (Dark Mode)

| Token | Variável / Valor OKLCH | Uso / Descrição |
| :--- | :--- | :--- |
| **`--primary`** | `oklch(0.424 0.199 265.638)` | Ação principal (Azul mais profundo) |
| **`--primary-foreground`** | `oklch(0.97 0.014 254.604)` | Texto sobre cor primária |
| **`--background`** | `oklch(0.145 0 0)` | Fundo escuro geral |
| **`--foreground`** | `oklch(0.985 0 0)` | Texto principal claro |
| **`--card`** | `oklch(0.205 0 0)` | Fundo de cartões escuros |
| **`--card-foreground`** | `oklch(0.985 0 0)` | Texto em cartões |
| **`--secondary`** | `oklch(0.274 0.006 286.033)` | Ações secundárias escuras |
| **`--secondary-foreground`** | `oklch(0.985 0 0)` | Texto em botões secundários |
| **`--muted`** | `oklch(0.269 0 0)` | Fundos sutis escuros |
| **`--muted-foreground`** | `oklch(0.708 0 0)` | Legendas e textos secundários |
| **`--accent`** | `oklch(0.269 0 0)` | Realces em hover |
| **`--accent-foreground`** | `oklch(0.985 0 0)` | Texto em realce |
| **`--destructive`** | `oklch(0.704 0.191 22.216)` | Erros/alertas destrutivos |
| **`--border`** | `oklch(1 0 0 / 10%)` | Bordas translúcidas |
| **`--input`** | `oklch(1 0 0 / 15%)` | Bordas de inputs |
| **`--ring`** | `oklch(0.556 0 0)` | Anel de foco |

---

### Graficos e Sidebar

- **Charts (Visualização de Dados)**:
  - `chart-1`: `oklch(0.809 0.105 251.813)`
  - `chart-2`: `oklch(0.623 0.214 259.815)`
  - `chart-3`: `oklch(0.546 0.245 262.881)`
  - `chart-4`: `oklch(0.488 0.243 264.376)`
  - `chart-5`: `oklch(0.424 0.199 265.638)`
- **Sidebar**:
  - Light: Fundo `oklch(0.985 0 0)` | Texto `oklch(0.145 0 0)`
  - Dark: Fundo `oklch(0.205 0 0)` | Texto `oklch(0.985 0 0)`

---

## Tipografia

- **Fonte Principal**: `'Inter Variable', sans-serif`
- **Variáveis**:
  - `--font-sans`: `'Inter Variable', sans-serif`
  - `--font-heading`: `var(--font-sans)`

---

## Raio de Borda (Radius)

- **Base (`--radius`)**: `0.625rem` (~10px)
- **Escala de Raios**:
  - `sm`: `calc(var(--radius) * 0.6)` (~6px)
  - `md`: `calc(var(--radius) * 0.8)` (~8px)
  - `lg`: `var(--radius)` (10px)
  - `xl`: `calc(var(--radius) * 1.4)` (14px)
  - `2xl`: `calc(var(--radius) * 1.8)` (18px)
  - `3xl`: `calc(var(--radius) * 2.2)` (22px)
  - `4xl`: `calc(var(--radius) * 2.6)` (26px)
