import {
  CheckCircle2,
  Flame,
  ShieldAlert,
  Skull,
  Sparkles,
} from "lucide-react";

export default function Workings() {
  return (
    <section
      id="how-it-works"
      className="py-20 lg:py-28 border-b border-slate-900 bg-slate-950/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-amber-500/30 bg-amber-500/10 text-amber-300">
            <span>Section 01</span>
            <span>•</span>
            <span>The Engineering Paradox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white tracking-tight">
            Why Naive AI Rewrites <span className="text-rose-400">Fail</span> on
            Legacy Code
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            When developers ask standard chat LLMs to &ldquo;upgrade this 2014
            JavaScript file to TypeScript&ldquo;, the model hallucinates modern
            syntax while{" "}
            <strong>silently deleting weird-looking conditionals</strong>. In
            legacy enterprise code, those &ldquo;weird&ldquo; conditionals are
            actually battle-tested domain invariants: 30-second NTP clock-skew
            tolerances, CJK IME keystroke locks, or Banker&ldquo;s Rounding
            arithmetic.
          </p>
        </div>

        {/* 3 Pillars of NecroStack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Pillar 1 */}
          <div className="relative group rounded-2xl bg-slate-900/80 border border-slate-800 p-6 lg:p-8 hover:border-amber-500/50 transition-all hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-950/60 border border-rose-500/40 flex items-center justify-center text-rose-400 text-xl shadow-inner">
                <Skull className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-rose-400 uppercase tracking-widest font-bold">
                  Pillar 01 • Autopsy
                </span>
                <h3 className="text-lg font-bold font-mono text-white">
                  Forensic Autopsy &amp; Causes of Death
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                Before altering code, local <strong>Gemma</strong> performs a
                forensic pathology inspection. It detects obsolete runtime
                constructs (<code className="text-rose-300">new Buffer()</code>,
                broken MD5 ciphers, synchronous XMLHttpRequests) and categorizes
                them into deterministic, actionable CVE warnings.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 font-mono text-xs text-rose-400/90 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              <span>Zero Hallucinated Security Vulnerabilities</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="relative group rounded-2xl bg-slate-900/80 border border-slate-800 p-6 lg:p-8 hover:border-emerald-500/50 transition-all hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xl shadow-inner">
                <Flame className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                  Pillar 02 • Invariants
                </span>
                <h3 className="text-lg font-bold font-mono text-white">
                  Extracting &ldquo;The Soul&ldquo;
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                The soul of a program is its hidden behavioral invariants.
                NecroStack extracts every subtle edge case into an explicit,
                machine-verifiable checklist <em>before</em> any TypeScript is
                generated, ensuring 100% preservation of obscure edge cases.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 font-mono text-xs text-emerald-400/90 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Verifiable Soul Invariant Score (0-100%)</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="relative group rounded-2xl bg-slate-900/80 border border-slate-800 p-6 lg:p-8 hover:border-amber-500/50 transition-all hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-950/60 border border-amber-500/40 flex items-center justify-center text-amber-400 text-xl shadow-inner">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest font-bold">
                  Pillar 03 • Tribute
                </span>
                <h3 className="text-lg font-bold font-mono text-white">
                  Día de los Muertos Ofrenda
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                We honor the original 2012–2016 open-source pioneers who built
                the web on sleepless nights. Every reanimated module synthesizes
                an eternal Maintainer Ofrenda Tribute and an automated Vitest
                test suite verifying that the code lives on for decades to come.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 font-mono text-xs text-amber-400/90 flex items-center gap-1.5">
              <span>🏵️</span>
              <span>Permanent Attribution &amp; Test Matrix</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
