export default function RitualFlows() {
  return (
    <section
      id="ritual-flow"
      className="py-20 lg:py-28 border-b border-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            <span>Section 02</span>
            <span>•</span>
            <span>LangGraph Determinism</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white tracking-tight">
            The 4-Stage Necromancy{" "}
            <span className="text-amber-400">Ritual Flow</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Orchestrated via <strong>@langchain/langgraph</strong>. Each dead
            relic moves through a deterministic multi-stage state machine that
            streams real-time telemetry events via Server-Sent Events (SSE).
          </p>
        </div>

        {/* Stepper Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stage 1 */}
          <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between hover:border-amber-500/50 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-mono text-xs font-bold text-amber-400">
                  01
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Node: Autopsy
                </span>
              </div>
              <h3 className="text-base font-bold font-mono text-white">
                performForensicAutopsy
              </h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Ingests the legacy AST and source from PostgreSQL. Local{" "}
                <strong>Gemma</strong> diagnoses exact Causes of Death (e.g.
                Node v4 Buffer CVEs, unhandled Unicode BOM) and extracts the
                immutable Edge-Case Soul Invariants list.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 font-mono text-[11px] text-amber-400/90 flex items-center gap-1">
              <span>Output:</span>
              <span className="text-slate-300">
                CausesOfDeath &amp; Invariants[]
              </span>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between hover:border-emerald-500/50 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-mono text-xs font-bold text-emerald-400">
                  02
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Node: Grimoire
                </span>
              </div>
              <h3 className="text-base font-bold font-mono text-white">
                consultMigrationGrimoire
              </h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Vectorizes deprecated anti-patterns using{" "}
                <strong>ai/mxbai-embed-large</strong> and executes a hybrid
                <strong> PostgreSQL pgvector HNSW cosine search</strong> to
                retrieve modern Web &amp; Node.js API replacements.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 font-mono text-[11px] text-emerald-400/90 flex items-center gap-1">
              <span>Output:</span>
              <span className="text-slate-300">
                GrimoirePatterns[] (HNSW &lt; 2ms)
              </span>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-500/50 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center font-mono text-xs font-bold text-cyan-400">
                  03
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Node: Reanimate
                </span>
              </div>
              <h3 className="text-base font-bold font-mono text-white">
                reanimateIntoTypeScript
              </h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Gemma synthesizes a zero-dependency ES2026 TypeScript
                replacement, mapping every original invariant to its exact
                modern line of code while enforcing strict type contracts and
                async safety.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 font-mono text-[11px] text-cyan-400/90 flex items-center gap-1">
              <span>Output:</span>
              <span className="text-slate-300">reanimatedCode (ES2026 TS)</span>
            </div>
          </div>

          {/* Stage 4 */}
          <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between hover:border-purple-500/50 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center font-mono text-xs font-bold text-purple-400">
                  04
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Node: Vital Signs
                </span>
              </div>
              <h3 className="text-base font-bold font-mono text-white">
                verifyVitalSignsAndSave
              </h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Generates a runnable Vitest edge-case verification test suite,
                scores preservation fidelity (0-100%), writes the Maintainer
                Ofrenda Tribute, and commits to PostgreSQL.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 font-mono text-[11px] text-purple-400/90 flex items-center gap-1">
              <span>Output:</span>
              <span className="text-slate-300">
                UnitTests &amp; OfrendaTribute
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
