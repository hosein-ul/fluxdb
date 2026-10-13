# FluxDB — Collaborative Database Schema Studio
> **TestSprite Hackathon Season 4** · The real-time visual schema designer for engineering teams.
> Live URL: [https://fluxdb.pages.dev](https://fluxdb.pages.dev) (Local: `http://localhost:3000`)

[![TestSprite Verified](https://img.shields.io/badge/TestSprite-Automated%20PR%20Testing-2563EB)](https://www.testsprite.com/hackathon-s4)
[![Next.js 15](https://img.shields.io/badge/Next.js-15%20App%20Router-black)](https://nextjs.org/)
[![React Flow v12](https://img.shields.io/badge/React%20Flow-v12-050709)](https://reactflow.dev/)
[![Cloudflare Edge](https://img.shields.io/badge/Cloudflare-Workers%20%26%20D1-F38020)](https://workers.cloudflare.com/)

---

## ✦ Why FluxDB?
Engineering teams today design database schemas in DBdiagram.io, write documentation in Notion, discuss modifications in Slack, run migrations with Flyway, and fight over Git merge conflicts on SQL migration files.

**FluxDB collapses this 5-tool disconnect into one continuous feedback loop:**
1. **Visual ER Diagram Studio:** High-density, type-safe canvas powered by React Flow with custom TableNodes, constraint pills (PK, UNIQUE, NOT NULL), and foreign key connection lines.
2. **Multiplayer Collaboration:** Real-time presence tracking, color-coded collaborator cursors (sub-10ms), and concurrent schema modeling.
3. **Automated Migration Diff Engine:** Structural diffs between schema versions compiling clean `ALTER TABLE`, `ADD COLUMN`, and `DROP` statements without manual syntax errors.
4. **Universal Code Export:** Compile visual schemas into PostgreSQL, MySQL, SQLite DDL, complete Prisma models, or Drizzle ORM TypeScript code with one click.
5. **Continuous PR Verification:** Connected to TestSprite GitHub App so every pull request automatically runs full End-to-End browser validation suites.

---

## ✦ TestSprite E2E Test Suite Coverage
TestSprite automatically exercises and validates the entire application loop on every Pull Request:

| Test Scenario | Scope & Validation | Status |
|---------------|-------------------|--------|
| **TS-01: Authentication & Navigation** | User lands on `/`, clicks CTA, reaches `/app/dashboard`, verifies project list | Passed |
| **TS-02: Project Creation & Templates** | Opens "+ New Project" modal, types identifier, selects template, navigates to canvas | Passed |
| **TS-03: Visual Schema Canvas Editing** | Adds new table, specifies column types (UUID, varchar), sets constraints (PK, UNIQUE) | Passed |
| **TS-04: Multi-Engine Code Export** | Triggers Export modal, previews PostgreSQL, Prisma, Drizzle, copies code to clipboard | Passed |
| **TS-05: Public Read-Only Share Flow** | Generates public share token, opens `/share/[token]` in read-only mode, verifies locks | Passed |
| **TS-06: Migration Diff Engine** | Computes `ALTER TABLE` additions/deletions across versions, downloads `.sql` migration file | Passed |

---

## ✦ Tech Stack Architecture
- **Monorepo:** Turborepo + pnpm workspaces (`apps/web`, `apps/worker`, `packages/schema-types`)
- **Frontend App:** Next.js 15 (App Router), React 19, TypeScript strict mode
- **Visual Canvas:** `@xyflow/react` v12 (React Flow) with custom nodes, edges, mini-map, and controls
- **Styling & Design System:** Tailwind CSS v4, Google Fonts (Space Grotesk, DM Sans, Fragment Mono), bespoke 60-30-10 palette (`#07090E` base, `#2563EB` Electric Cobalt accent)
- **State & Collaboration:** Zustand store with undo/redo history stack, real-time presence cursor broadcast
- **Backend API:** Hono.js running on Cloudflare Workers edge runtime
- **Persistence & Storage:** Cloudflare D1 (edge SQLite) with Drizzle ORM

---

## ✦ Getting Started Locally

```bash
# 1. Clone repository
git clone https://github.com/fluxdb/fluxdb.git
cd fluxdb

# 2. Install dependencies (pnpm v12+)
pnpm install

# 3. Start local development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✦ Repository Structure

```
fluxdb/
├── apps/
│   ├── web/                     # Next.js 15 Studio & Landing Page
│   │   ├── app/
│   │   │   ├── page.tsx         # Enterprise Landing Page
│   │   │   ├── app/
│   │   │   │   ├── dashboard/   # Project Dashboard & Switcher
│   │   │   │   └── [projectId]/ # Studio Canvas & Migration Diff
│   │   │   └── share/[token]/   # Read-Only Public Share Page
│   │   ├── components/
│   │   │   ├── canvas/          # TableNode, RelationEdge, Toolbar, Inspector
│   │   │   └── landing/         # Hero, Showcase, Workflow, Export, Pricing
│   │   └── lib/                 # SQL, Prisma, Drizzle generators & Diff engine
│   └── worker/                  # Cloudflare Worker API (Hono.js)
└── packages/
    └── schema-types/            # Shared TypeScript data models
```
