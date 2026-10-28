# 🕯️💀 NecroStack — Autonomous Dead Code & Open-Source Relic Resurrector

> *Submission for the **Hacktoberfest 2026 Open-Source AI Challenge** (Week 4: "Ghost in the Machine")*  
> *Honoring past open-source maintainers by keeping their code alive forever — without cloud egress, subscription tolls, or lost edge cases.*

[![Next.js 16](https://img.shields.io/badge/Next.js%2016-App%20Router%20%2B%20proxy.ts-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-ES2026%20Zero--Dep-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![LangGraph.js](https://img.shields.io/badge/LangGraph.js-Deterministic%20State%20Machine-FF6F00?style=for-the-badge)](https://langchain-ai.github.io/langgraphjs/)
[![Local Gemma](https://img.shields.io/badge/Local%20Gemma-Docker%20Model%20Runner-4285F4?style=for-the-badge&logo=google)](https://github.com/google/gemma_pytorch)
[![PostgreSQL pgvector](https://img.shields.io/badge/PostgreSQL%2016-pgvector%20HNSW-336791?style=for-the-badge&logo=postgresql)](https://github.com/pgvector/pgvector)
[![Prisma 7](https://img.shields.io/badge/Prisma%207-Type--Safe%20ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Code Egress](https://img.shields.io/badge/Code%20Egress-0%20Bytes%20Air--Gapped-10B981?style=for-the-badge)](https://dev.to/challenges/hacktoberfest-week4-2026-10-26)

---

## 🔮 The Elevator Pitch: Rescuing the "Ghost in the Machine"

Every engineering organization is haunted by dead open-source relics and abandoned legacy modules: forgotten 2013–2015 utilities written in **Node.js v4 CommonJS**, **jQuery 1.8**, or **Python 2.7**. These libraries sit unmaintained in the GitHub graveyard, riddled with critical memory-disclosure CVEs (like `new Buffer()` CVE-2018-7167) or removed runtime APIs. Yet engineering teams cannot simply rewrite them from scratch. Why? Because buried inside that ancient spaghetti code lies the hard-won domain wisdom of past builders: a 30-second NTP clock-skew tolerance, an Asian CJK IME keystroke composition lock, or IEEE 754 Banker's Rounding on financial taxes.

When developers paste legacy code into generic cloud chatbots with the naive instruction *"Rewrite this in TypeScript,"* the chatbot gets lazy. It hallucinates clean syntax while silently deleting "weird-looking" conditionals—murdering the **"Ghost in the Machine"** and introducing catastrophic production regressions.

**NecroStack** is an autonomous, 100% offline Legacy Code Necromancer & Open-Source Relic Resurrector. Built with **Google's open-weight Gemma** (via **Docker Model Runner**), **LangGraph.js**, and **PostgreSQL `pgvector`**, NecroStack executes a deterministic 4-stage Necromancy Ritual:
1. **Forensic Autopsy:** Diagnoses causes of death (CVEs, dead APIs) and extracts the sacred behavioral invariants checklist (the "Soul").
2. **Grimoire RAG Consultation:** Queries modern architectural equivalents from an HNSW-indexed vector database.
3. **TypeScript Reanimation:** Local **Gemma** synthesizes zero-dependency Modern TypeScript (ES2026) and maps every original invariant line-by-line.
4. **Vital Signs Verification & Ofrenda:** Generates a runnable `node:test` verification suite and a heartfelt *Día de los Muertos* Maintainer Tribute.

---

## 🏛️ Why Open-Source & Local AI Wins: The Digital Permanence Doctrine

Building an engine to rescue decaying code on top of a closed commercial cloud API is fundamentally flawed. Closed SaaS models suffer from sudden weight deprecations, rate limits, enterprise pricing hikes, and severe code-privacy leaks. **NecroStack** is architected for **Digital Permanence**:

| Capability / Metric | Closed SaaS Cloud APIs (OpenAI / Anthropic) | **NecroStack (Local Gemma + pgvector + Docker)** |
| :--- | :--- | :--- |
| **Digital Permanence** | ❌ **High Risk:** Cloud endpoints deprecate models or shut down APIs every 12–18 months. | 🟢 **100% Eternal:** Open-weight Gemma container runs identically today or 20 years from now. |
| **Source Code Privacy** | ❌ **High Risk:** Proprietary intellectual property, banking rules, and trade secrets leak to cloud servers. | 🟢 **0 Bytes Egress:** 100% air-gapped execution on `localhost:12434`. Nothing leaves your machine. |
| **Bulk Refactoring Cost** | ❌ **Expensive:** Multi-pass AST autopsy & RAG synthesis across millions of lines incurs recurring token bills. | 🟢 **$0.00 Token Cost:** Unlimited séances, infinite iterations, zero API bills. |
| **Offline / Air-Gapped Use** | ❌ **Impossible:** Requires continuous, low-latency broadband internet access. | 🟢 **Native:** Unplug your Ethernet cable, turn off Wi-Fi, and reanimate code on an airplane or bunker. |
| **Deterministic Weight Pinning**| ❌ **No:** Silent server-side model drift breaks prompt stability across quarters. | 🟢 **Exact:** Bit-for-bit reproducible local weights (`ai/gemma3` + `ai/mxbai-embed-large`). |

---

## 📐 System Architecture & The 4-Node Necromancy Ritual

### 1. Full System Architecture Blueprint

```mermaid
flowchart TD
    subgraph Client ["Client Presentation & Edge Guard"]
        A["Public Landing Page (/)"] --> B["proxy.ts Edge Guard (src/proxy.ts)"]
        B -->|Unauthenticated| C["Sign In / 1-Click Judge Demo (/signin)"]
        B -->|Authenticated JWT necro_session| D["Protected Crypt Workbench (/dashboard)"]
        D -->|EventSource SSE Connection| E["Next.js 16 Route Handlers (/api/necro/*)"]
    end

    subgraph StateMachine ["LangGraph.js Deterministic State Machine"]
        E --> F["necroWorkflow StateGraph (src/lib/agent/necroGraph.ts)"]
        F --> G["Node 1: performForensicAutopsy"]
        G --> H["Node 2: consultMigrationGrimoire"]
        H --> I["Node 3: reanimateIntoTypeScript"]
        I --> J["Node 4: verifyVitalSignsAndSave"]
    end

    subgraph LocalAI ["Local Air-Gapped Intelligence (Docker Model Runner)"]
        G -.->|Prompt: Extract Causes & Soul| K["Google Gemma (ai/gemma3) on localhost:12434"]
        H -.->|Embed Query String| L["ai/mxbai-embed-large on localhost:12434"]
        I -.->|Synthesize Zero-Dep TS| K
        J -.->|Generate Unit Tests & Ofrenda| K
    end

    subgraph Database ["PostgreSQL 16 + pgvector (Prisma 7)"]
        H <-->|Hybrid Cosine Search <=>| M[("migration_grimoire (HNSW Index)")]
        G <-->|Fetch Dead Relics| N[("dead_relics Table")]
        J -->|Upsert Reanimated Output| O[("reanimated_modules Table")]
        C <-->|Query/Create Operators| P[("users Table")]
    end

    classDef primary fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#ecfdf5;
    classDef secondary fill:#451a03,stroke:#f59e0b,stroke-width:2px,color:#fef3c7;
    classDef ai fill:#1e1b4b,stroke:#818cf8,stroke-width:2px,color:#e0e7ff;
    classDef db fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#f0f9ff;

    class D,E primary;
    class F,G,H,I,J secondary;
    class K,L ai;
    class M,N,O,P db;
```

---

### 2. The 4-Node LangGraph Necromancy Ritual (`sequenceDiagram`)

```mermaid
sequenceDiagram
    autonumber
    actor User as Lead Necromancer
    participant API as /api/necro/resurrect (SSE Stream)
    participant Graph as LangGraph NecroGraph
    participant Gemma as Local Gemma (Docker Runner)
    participant DB as PostgreSQL + pgvector (Prisma)

    User->>API: POST /api/necro/resurrect { relicId: 1, stream: true }
    API-->>User: SSE Event: relic_start [ghost-vault-2015.js]

    rect rgb(20, 20, 35)
        Note over Graph,Gemma: Node 1: performForensicAutopsy
        API->>Graph: Invoke Node 1
        Graph->>DB: Fetch dead_relics row (legacy_code, known_symptoms)
        Graph->>Gemma: Analyze AST for CVEs & extract hidden domain rules
        Gemma-->>Graph: { autopsyCausesOfDeath[], soulInvariantsList[] }
        Graph-->>API: SSE Event: node_complete [Node 1: Autopsy Done]
    end

    rect rgb(35, 25, 20)
        Note over Graph,DB: Node 2: consultMigrationGrimoire
        API->>Graph: Invoke Node 2
        Graph->>Gemma: Generate query vector via ai/mxbai-embed-large
        Gemma-->>Graph: 1024-dim dense float vector
        Graph->>DB: SELECT * FROM migration_grimoire ORDER BY embedding <=> queryVector LIMIT 4
        DB-->>Graph: Modern replacement patterns (AES-GCM, timingSafeEqual, etc.)
        Graph-->>API: SSE Event: node_complete [Node 2: Grimoire RAG Matches]
    end

    rect rgb(20, 35, 25)
        Note over Graph,Gemma: Node 3: reanimateIntoTypeScript
        API->>Graph: Invoke Node 3
        Graph->>Gemma: Synthesize zero-dep ES2026 TS mapping each soul invariant line-by-line
        Gemma-->>Graph: { reanimatedTypeScriptCode, invariantVerificationList[], score: 100 }
        Graph-->>API: SSE Event: node_complete [Node 3: Reanimated to TypeScript]
    end

    rect rgb(30, 20, 35)
        Note over Graph,DB: Node 4: verifyVitalSignsAndSave
        API->>Graph: Invoke Node 4
        Graph->>Gemma: Synthesize node:test assert suite & Día de los Muertos Ofrenda
        Gemma-->>Graph: { generatedUnitTests, maintainerTribute }
        Graph->>DB: Upsert reanimated_modules & update dead_relics status = 'REANIMATED'
        Graph-->>API: SSE Event: node_complete [Node 4: Persisted to DB]
    end

    API-->>User: SSE Event: ritual_complete { score: 100, status: "SOUL_PRESERVED" }
```

---

## ⚰️ The 3 Pre-Loaded Crypt Relics (Seeded Scenarios)

NecroStack comes out-of-the-box with 3 synthetic legacy code artifacts located in [`src/lib/seed-data.ts`](file:///d:/practices/necro-stacks/src/lib/seed-data.ts):

| Relic Code | Filename | Year & Runtime | Original Maintainer | Causes of Death (Banished) | Sacred "Soul" Invariants (Preserved) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`RELIC-2015-001`** | `ghost-vault-2015.js` | 2015 • Node.js v4 (CommonJS) | `@marcus_v_oss` | • `new Buffer()` uninitialized heap memory leak (**CVE-2018-7167**)<br>• `crypto.createCipher` with broken MD5 & no IV<br>• `===` string comparison timing side-channel attacks<br>• Error-first callback pyramid | • **30-Second NTP Clock-Skew Grace Window:** Distributed IoT timestamps are accepted within `Math.abs(nowSec - iat) <= 30` drift.<br>• **URL-Safe Base64 Padding Stripping:** Strips `=` padding and normalizes `+` to `-` and `/` to `_`. |
| **`RELIC-2013-002`** | `jquery-form-poltergeist.js` | 2013 • ES5 + jQuery 1.8 | `@elena_dom_wizard` | • `$.fn.live()` removed in jQuery 1.9+<br>• Synchronous `async: false` XMLHttpRequest freezing UI thread<br>• Deprecated `$.Deferred.pipe()`<br>• `window.__POLTERGEIST_LOCK` race conditions | • **CJK Asian IME Keystroke Lock:** Locks form submission while Japanese Kanji/Korean Hangul composition is active (`isComposing` or `keyCode 229`).<br>• **Bracket Key Normalization:** Recursively parses repeated `tags[]` into deduplicated arrays while preserving scalar keys. |
| **`RELIC-2014-003`** | `py2-ledger-phantom.py` | 2014 • Python 2.7 | `@carlos_fin_hack` | • Python 2 `urllib2` removed in Python 3<br>• Silent integer floor division bug (`cents / 100 = 1`)<br>• Removed `xrange()` and `dict.iteritems()`<br>• `print` statement without parentheses | • **IEEE 754 Banker's Rounding (Round-Half-to-Even):** Rounds exact .5 cent fractions to nearest even integer to prevent cumulative upward ledger drift.<br>• **UTF-8 BOM Stripping & Accounting Negatives:** Strips `\uFEFF` byte artifacts and parses parenthesized values `(1,250.50)` into `-1250.50`. |

---

## 🌟 Key Platform Features

1. **Atmospheric Public Landing Page (`/`):**
   - High-craft *"Haunted Terminal meets Día de los Muertos Marigold & Spectral Emerald"* aesthetic.
   - Interactive live side-by-side preview showing 2015 dead code transforming into zero-dependency Modern TypeScript (ES2026).
   - Interactive 4-Node Ritual Pipeline Stepper and 4-Layer Architecture Blueprint with copyable code snippets.

2. **Protected Crypt Workbench (`/dashboard`):**
   - Split-screen workspace: Left panel showcases the legacy tombstone with exact causes of death; right panel renders reanimated TypeScript, runnable unit tests, and the Maintainer Tribute.
   - Real-time Server-Sent Events (SSE) streaming stepper showing live node transitions, execution logs, and preservation scores.
   - Interactive Code Editor: Lead Necromancers can manually edit reanimated TypeScript and unit tests in-browser, click **"Save Code Edits"**, toggle individual soul invariant checkboxes, and click **"Verify & Mark as Blessed Relic"**.

3. **1-Click Judge Demo Login (`/signin`):**
   - Built specifically for hackathon judges! Click the **"⚡ 1-Click Judge Demo Login"** button on `/signin` to automatically authenticate with `judge@necrostack.dev` / `hacktoberfest2026` and jump into the workbench in under 1 second.

4. **Next.js 16 `proxy.ts` Route Protection:**
   - Uses the modern Next.js `proxy.ts` convention (`export function proxy(request: NextRequest)`) to enforce cryptographic `jose` JWT cookies.
   - Redirects unauthenticated visitors attempting to access `/dashboard` to `/signin?callbackUrl=/dashboard`, and redirects logged-in operators away from auth pages directly into `/dashboard`.

5. **Custom Dead Code Uploader (`+ Paste Dead Code`):**
   - Upload any raw legacy JavaScript, Node.js, or Python snippet with custom backstory and author attribution.
   - Immediately runs the full 4-node LangGraph reanimation ritual and inters it into your Crypt queue!

6. **Día de los Muertos Maintainer Ofrenda Card:**
   - Honors the original human creator behind the code with an emotional memorial card and generates a verifiable unit test suite asserting their original logic.

---

## 🚀 Step-by-Step Local Setup & Installation Guide

### Prerequisites
- **Node.js:** v20+ or **Bun** v1.2+
- **Docker & Docker Compose:** Installed and running locally
- **Docker Model Runner:** Operating on `http://localhost:12434`

### 1. Pull Local Open-Weight Models via Docker Model Runner
In your terminal, pull Google's open-weight **Gemma** model and the embedding model:
```bash
docker model pull ai/gemma3:4B-F16
docker model pull ai/mxbai-embed-large
```

### 2. Start PostgreSQL 16 with pgvector
Start the PostgreSQL container configured in [`Docker-compose.yml`](file:///d:/practices/necro-stacks/Docker-compose.yml):
```bash
docker-compose up -d
```
*This starts PostgreSQL on port `5432` with the `pgvector` extension enabled.*

### 3. Configure Environment Variables
Create or verify your `.env` file in the project root:
```env
# PostgreSQL Database Connection
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"

# Docker Model Runner (Local Air-Gapped AI)
DOCKER_MODEL_BASE_URL="http://localhost:12434/engines/llama.cpp/v1"
EMBEDDING_MODEL_NAME="ai/mxbai-embed-large"
LLM_MODEL_NAME="ai/gemma3:4B-F16"

# JWT Cookie Authentication Secret
JWT_SECRET="necrostack-local-open-source-secret-key-2026"
```

### 4. Install Dependencies & Seed the Database
Install required packages, generate Prisma client, and execute the database seeding ritual:
```bash
# Install dependencies
bun install
# or: npm install

# Generate Prisma Client models
npx prisma generate

# Execute DDL schema creation, vectorize Grimoire patterns, and seed Judge account
npm run db:seed
```

### 5. Launch NecroStack
Start the Next.js development server:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser!

### 6. 1-Click Judge Login
- Navigate to **[http://localhost:3000/signin](http://localhost:3000/signin)**
- Click the prominent **"⚡ 1-Click Judge Demo Login"** button
- You are immediately authenticated as **"Hacktoberfest Judge (Lead Necromancer)"** and redirected to **`/dashboard`**!

---

## 📡 API Reference

### Authentication Endpoints (`/api/auth/*`)
- **`POST /api/auth/signup`:** Registers a new operator, hashes password with `bcryptjs`, issues JWT in `necro_session` `httpOnly` cookie.
- **`POST /api/auth/signin`:** Verifies credentials, updates `last_sign_in_at`, and sets `necro_session` cookie.
- **`POST /api/auth/signout`:** Clears `necro_session` cookie and invalidates session.
- **`GET /api/auth/me`:** Returns the currently authenticated operator's profile (`name`, `email`, `role`).

### Necromancy Core Endpoints (`/api/necro/*`)
- **`GET /api/necro/crypt`:** Returns all relics, matched Grimoire patterns, and calculated KPI metrics.
- **`POST /api/necro/resurrect`:** Triggers the 4-node LangGraph ritual for a single relic or all un-reanimated relics. Supports Server-Sent Events streaming when `{ stream: true }`.
- **`POST /api/necro/custom`:** Ingests a custom legacy code snippet, classifies era category, and triggers immediate reanimation.
- **`PATCH /api/necro/module/[relicId]`:** Supports interactive workbench actions:
  - `SAVE_CODE_EDITS`: Updates reanimated code and unit tests.
  - `TOGGLE_INVARIANT`: Flips preservation status of a soul invariant.
  - `VERIFY_AND_PUBLISH`: Blesses the relic and marks status as `VERIFIED`.
- **`POST /api/necro/reset`:** Resets the Crypt back to its initial seeded state with all 3 relics un-reanimated.

---

## 📂 Project Directory Structure

```text
necro-stacks/
├── Docker-compose.yml              # PostgreSQL 16 + pgvector container definition
├── package.json                    # Project dependencies (Next.js 16, LangGraph, Prisma)
├── prisma/
│   └── schema.prisma               # Prisma schema (dead_relics, migration_grimoire, reanimated_modules, users)
├── scripts/
│   ├── seed.ts                     # Database DDL, HNSW index creation, embedding vectorizer & judge account seed
│   ├── test-agent.ts               # Offline CLI test script for LangGraph workflow
│   └── test-routes.ts              # Automated HTTP endpoint integration test suite
├── src/
│   ├── proxy.ts                    # Modern Next.js proxy.ts route guard (protects /dashboard)
│   ├── app/
│   │   ├── layout.tsx              # Root HTML layout with persistent Navbar & Telemetry Footer
│   │   ├── page.tsx                # High-craft Public Landing Page
│   │   ├── signin/page.tsx         # Sign In page with 1-Click Judge Demo Login
│   │   ├── signup/page.tsx         # Sign Up page with role specialization selector
│   │   ├── dashboard/page.tsx      # Protected Necromancer's Crypt Workbench & Séance Stepper
│   │   └── api/
│   │       ├── auth/               # signup, signin, signout, me
│   │       └── necro/              # crypt, resurrect (SSE), custom, reset, module/[relicId]
│   ├── components/
│   │   ├── Navbar.tsx              # Global sticky glassmorphic navigation bar
│   │   ├── Footer.tsx              # Global footer with 4 Open-Innovation Telemetry Badges
│   │   ├── TopNecroHeader.tsx      # Workbench control bar & 4 KPI metric cards
│   │   ├── NecromancyStepper.tsx   # Real-time 4-stage SSE ritual progress stepper & terminal log
│   │   ├── CryptSidebar.tsx        # Queue of dead relics in Crypt
│   │   ├── ResurrectionWorkbench.ts# Split-screen Tombstone vs. Reanimated Code & Ofrenda Card
│   │   └── CustomRelicModal.tsx    # Modal to paste and inter custom legacy code snippets
│   ├── lib/
│   │   ├── prisma.ts               # Singleton Prisma Client instance with PostgreSQL adapter
│   │   ├── auth.ts                 # Password hashing (bcryptjs) & JWT signing/verification (jose)
│   │   ├── config.ts               # Model URLs and environment configuration
│   │   ├── db.ts                   # Raw pg connection pool for vector queries
│   │   ├── embeddings.ts           # Embedding generator with deterministic offline fallback
│   │   ├── schema.sql              # Raw PostgreSQL DDL with vector(1024) and HNSW indexes
│   │   ├── seed-data.ts            # Curated Grimoire patterns & 3 synthetic Crypt relics
│   │   ├── types.ts                # TypeScript domain models and SSE payloads
│   │   └── agent/
│   │       ├── models.ts           # Local Gemma ChatOpenAI configuration & JSON cleaner
│   │       ├── state.ts            # LangGraph Annotation.Root state channels
│   │       ├── nodes.ts            # The 4 Necromancy Nodes (Autopsy, Grimoire, Reanimate, Verify)
│   │       └── necroGraph.ts       # StateGraph workflow assembly & convenience runners
└── README.md                       # Comprehensive repository documentation
```

---

## 🏆 Hacktoberfest 2026 Challenge Attribution

Built with passion and reverence for past open-source maintainers during the **Hacktoberfest 2026 Open-Source AI Challenge (Week 4: "Ghost in the Machine")**.

*“Honoring past open-source maintainers by keeping their code alive forever.”* 🏵️🕯️💀

Built with passion and reverence for past open-source maintainers during the **Hacktoberfest 2026 Open-Source AI Challenge (Week 4: "Ghost in the Machine")**.

*“Honoring past open-source maintainers by keeping their code alive forever.”* 🏵️🕯️💀

