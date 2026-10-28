import {
  Cpu,
  Database,
  GitBranch,
  Terminal,
  Infinity,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function Architecture() {
  return (
    <section id="architecture" className="py-20 lg:py-28 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
            <span>Section 03</span>
            <span>•</span>
            <span>Full Stack Blueprint</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white tracking-tight">
            4-Layer System{" "}
            <span className="text-emerald-400">Architecture</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Constructed for the Hacktoberfest 2026 Open-Source AI Challenge with
            zero external API dependencies, 100% offline capability, and digital
            permanence.
          </p>
        </div>

        {/* 4-Layer Architecture Diagram Cards */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {/* Layer 1: Frontend & Edge Guard */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 hover:border-amber-500/40 transition-colors shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold">
                    Layer 1 • Presentation &amp; Guard
                  </span>
                  <h3 className="text-base font-bold font-mono text-white">
                    Next.js 16 App Router &amp; proxy.ts Edge Guard
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  proxy.ts
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  SSE Streams
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Modern Next.js 16 routing with persistent glassmorphic Navbar and
              Footer. Authentication routes enforced via the modern{" "}
              <code className="text-amber-300">proxy.ts</code> file convention.
              Split-screen Necromancer Workbench rendering dead code vs. live
              reanimated TypeScript with SSE streaming stepper events.
            </p>
          </div>

          {/* Layer 2: Deterministic State Machine */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 hover:border-emerald-500/40 transition-colors shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <GitBranch className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold">
                    Layer 2 • Deterministic Orchestration
                  </span>
                  <h3 className="text-base font-bold font-mono text-white">
                    LangGraph.js State Graph (@langchain/langgraph)
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  StateGraph
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Zod Schemas
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              4-node cyclic and linear state graph managing forensic autopsy,
              RAG grimoire lookup, code synthesis, and vital signs testing.
              Strict Zod JSON output parsers ensure zero malformed agent outputs
              or broken AST rewrites.
            </p>
          </div>

          {/* Layer 3: Local Docker Model Runner */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 hover:border-cyan-500/40 transition-colors shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
                    Layer 3 • 100% Air-Gapped Intelligence
                  </span>
                  <h3 className="text-base font-bold font-mono text-white">
                    Docker Model Runner (Google Gemma + Local Embeddings)
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  0 Bytes Egress
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Open-Weight
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Operates on{" "}
              <code className="text-cyan-300">http://localhost:12434</code> with
              OpenAI-compatible API. Serving Google Gemma for code understanding
              &amp; reasoning alongside{" "}
              <code className="text-cyan-300">ai/mxbai-embed-large</code> for
              vector embeddings. Zero private source code ever leaves the host
              machine.
            </p>
          </div>

          {/* Layer 4: PostgreSQL 16 + pgvector */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 hover:border-purple-500/40 transition-colors shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/40 flex items-center justify-center text-purple-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider font-bold">
                    Layer 4 • Persistent Memory
                  </span>
                  <h3 className="text-base font-bold font-mono text-white">
                    PostgreSQL 16 + pgvector HNSW Grimoire (prisma.ts)
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  HNSW Cosine
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Prisma 7
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Stores users, dead relics catalog, and reanimated modules. Houses
              the curated Migration Grimoire with sub-millisecond HNSW cosine
              similarity vector indexing for instantaneous deprecated-to-modern
              pattern retrieval.
            </p>
          </div>
        </div>

        {/* Comparison Box: Why Local Open-Source AI Beats Closed Cloud APIs */}
        <div className="mt-14 max-w-4xl mx-auto rounded-2xl bg-linear-to-br from-amber-500/10 via-slate-900 to-emerald-500/10 border border-slate-800 p-6 sm:p-8">
          <h3 className="text-lg font-bold font-mono text-white mb-4 flex items-center gap-2">
            <Infinity className="w-5 h-5 text-amber-400" />
            <span>
              Why Local Open-Source AI Beats Closed Cloud APIs for Code
              Resurrection
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="text-amber-400 font-bold text-sm">
                Digital Permanence
              </div>
              <p className="text-slate-400 font-sans leading-relaxed">
                Closed cloud LLM endpoints change weights, deprecate models, or
                get shut down. An open-weight model and local PostgreSQL
                database can run in an air-gapped bunker 20 years from now with
                identical results.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="text-emerald-400 font-bold text-sm">
                100% Code Privacy
              </div>
              <p className="text-slate-400 font-sans leading-relaxed">
                Legacy enterprise code contains proprietary domain logic,
                patentable algorithms, and confidential IP. Zero bytes of code
                egress guarantee compliance with sovereign and air-gapped
                security boundaries.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="text-cyan-400 font-bold text-sm">
                $0.00 Bulk Cost
              </div>
              <p className="text-slate-400 font-sans leading-relaxed">
                Resurrecting millions of lines of legacy code through cloud
                token APIs incurs prohibitive cost and rate limits. Local Docker
                execution runs unlimited séances at zero marginal token cost.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 text-center max-w-2xl mx-auto space-y-5">
          <h3 className="text-2xl font-bold font-mono text-white">
            Ready to Resurrect Your First Abandoned Relic?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-sans">
            Enter the Necromancer&apos;s Crypt, inspect forensic autopsies, and
            reanimate abandoned legacy libraries into modern TypeScript in
            real-time.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs font-bold text-slate-950 bg-linear-to-r from-amber-400 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 shadow-lg shadow-amber-500/20 transition-all"
            >
              <span>🕯️ Launch Resurrection Workbench</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/signin"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-colors"
            >
              <span>⚡ 1-Click Judge Demo Login</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
