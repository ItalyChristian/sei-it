# SeiIt — Sistema de Gestão de Chamados (ITSM)

Sistema de help desk para gestão de chamados de TI, com visões específicas para gestores, consultores e clientes. Projeto desenvolvido como parte de um desafio técnico, com foco em arquitetura escalável, tipagem forte e experiência do usuário.

## Requisitos

- Node.js 20.9 ou superior
- Yarn 1.22.22 (recomendado) — o projeto inclui `yarn.lock` e declara a versão no `package.json`.

## Rodando localmente

Clone o repositório, abra o terminal na pasta do projeto e instale as dependências:

```bash
corepack enable
yarn install --frozen-lockfile
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador. Nenhuma variável de ambiente é necessária — os dados vêm de um mock local (`src/mocks/dados.json`) e de uma API simulada.

> **Nota:** Yarn é a ferramenta recomendada para manter consistência com o lockfile. npm e pnpm também funcionam, mas seus lockfiles não estão no repositório.

## Comandos do projeto

| Propósito                | Yarn (recomendado)               | npm             | pnpm           |
| ------------------------ | -------------------------------- | --------------- | -------------- |
| Instalar dependências    | `yarn install --frozen-lockfile` | `npm install`   | `pnpm install` |
| Iniciar servidor de dev  | `yarn dev`                       | `npm run dev`   | `pnpm dev`     |
| Rodar lint               | `yarn lint`                      | `npm run lint`  | `pnpm lint`    |
| Criar build de produção  | `yarn build`                     | `npm run build` | `pnpm build`   |
| Servir build de produção | `yarn start`                     | `npm start`     | `pnpm start`   |

Antes de servir em produção, gere o build:

```bash
yarn build
yarn start
```

## Principais decisões

- **Next.js (App Router) + React + TypeScript + Vanilla Extract.** A escolha do Vanilla Extract permite tipagem forte dos estilos, zero runtime CSS-in-JS e uma base de design tokens centralizada (`src/shared/styles/theme.css.ts`).
- **FDS Architecture (Feature-Oriented Domain Architecture).** O projeto segue os princípios da FDS, com organização orientada a features e estruturas de domínio reutilizáveis. Referência: [Feature-Oriented Domain Architecture for Scalable Ecosystems](https://github.com/ItalyChristian/feature-oriented-domain-architecture-for-scalable-ecosystems).
- **TanStack Query para estado de servidor.** O `useTickets()`, `useUsers()` e `useCategories()` compartilham cache entre as telas, eliminando `useEffect` de fetch e requisições duplicadas.
- **Data de referência centralizada.** Todo cálculo de SLA usa o `meta.agora` do JSON (via `useReferenceDate()`), garantindo que os prazos sejam calculados com o "relógio oficial" do sistema, e não com a data real do navegador.
- **Autenticação simulada com `sessionStorage`.** A tela inicial permite selecionar um perfil (gestor, consultor ou cliente). A sessão por aba permite testar dois perfis simultaneamente; o roteamento por perfil é centralizado em `app/dashboard/page.tsx`.
- **WebSocket planejado.** A estrutura está preparada para receber eventos em tempo real (`chamado.aberto`, `status.alterado`, `mensagem.adicionada`), mas a integração não foi concluída nesta versão.

## Gaps conhecidos

- **WebSocket não integrado.** A tabela e os KPIs são atualizados apenas no carregamento inicial. A integração de eventos em tempo real ficou para uma próxima iteração.
- **Redistribuição de chamados não implementada.** O botão "Redistribuir Chamados" existe no `TeamWorkload`, mas está desabilitado.
- **Formulário de abertura de chamado não implementado.** A base de componentes está pronta, mas a tela de criação ainda não foi construída.
- **Testes automatizados não configurados.** Recomenda-se rodar `yarn lint` e `yarn build` para validar o projeto.
- **Paginação client-side.** A tabela pagina no frontend (10/25/50 itens por página). Em produção, a paginação deveria vir da API.

## Tempo aproximado de implementação

Aproximadamente 16 horas de trabalho (estimativa). Isso inclui a modelagem de tipos, a arquitetura de componentes, os protótipos e a refatoração para Vanilla Extract.

## Ferramentas de IA e histórico do repositório

- **Deepseek (assistente de IA) foi utilizado como parceiro de arquitetura e prototipagem.** Os protótipos iniciais de layout (dashboard do gestor, dashboard do consultor, tela de seleção de perfil, tabela de chamados) foram gerados pelo Deepseek e serviram de **base para o desenvolvimento da versão final**. A partir desses protótipos, o código foi refatorado para Vanilla Extract, tipagem forte e separação de responsabilidades.
- **Deepseek também auxiliou na padronização de tokens de design.** As cores de status (neutral/info/success/warning/danger), a base visual de badges e o mapeamento semântico de status/prioridade foram definidos em conjunto.
- **Deepseek contribuiu para a refatoração de hooks.** A separação entre `useManagerKpis`, `useOperatorKpis`, `useTeamWorkload` e `useTeamScope` foi desenhada para eliminar `useEffect` e centralizar a lógica de cálculo.
- **Documentação e decisões arquiteturais** foram discutidas e registradas em conjunto, incluindo a escolha de `enum` + `nativeEnum` para prioridade/status, o uso de `IanaTimeZone` como `string`, e a centralização do "relógio oficial" via `useReferenceDate`.
- **GitHub Copilot** foi utilizado para auxiliar em trechos pontuais (autocompletar, sugestões de sintaxe), mas **a arquitetura central foi definida com o Deepseek**.

> **Nota de transparência:** o link da FDS Architecture foi mantido como referência do modelo arquitetural adotado. O README do projeto original (Luma) serviu de inspiração para a estrutura desta documentação.

## Demo

---

## Estrutura de pastas (resumo)

```
src/
├── app/                    # Rotas Next.js (App Router)
│   └── dashboard/
│       ├── page.tsx        # "Porteiro" — decide qual view renderizar
│       └── _views/         # ManagerView, OperatorView, ClientView
├── entities/               # Domínio (Ticket, User, SLA, Categoria)
├── features/               # Features por contexto
│   ├── team/               # TeamOverview, TeamWorkload, hooks
│   ├── operator/           # OperatorOverview, hooks
│   └── tickets/            # TicketsTable, filtros, colunas
├── mocks/                  # dados.json + mock DB
├── shared/                 # Componentes, hooks, estilos compartilhados
│   ├── components/         # KpiCard, WorkloadCard, StatusBadge, etc.
│   ├── contexts/           # session.context (auth mockada)
│   ├── hooks/              # useReferenceDate
│   └── styles/             # theme.css.ts, tokens, badge-base.css.ts
└── layout/                 # AppShell, Subheading, Navbar
```

```

```
