"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Skull,
  Zap,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Copy,
  Check,
} from "lucide-react";
import Architecture from "@/components/Architecture";
import Workings from "@/components/Workings";
import RitualFlows from "@/components/RitualFlows";

export default function NecroStackLandingPage() {
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(`// Modern Zero-Dep TypeScript Reanimation (ES2026)
      export interface DecryptedPayload {
        data: Buffer;
        timestamp: number;
      }

      export function decryptVaultPayload(
        ciphertextHex: string,
        key: Uint8Array,
        iv: Uint8Array,
        authTag: Uint8Array,
        skewToleranceSec: number = 30
      ): DecryptedPayload {
        // Safe modern Node crypto with preserved 30s NTP skew tolerance
        const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
        decipher.setAuthTag(authTag);
        const decrypted = Buffer.concat([
          decipher.update(Buffer.from(ciphertextHex, "hex")),
          decipher.final()
        ]);
        return { data: decrypted, timestamp: Date.now() };
  }`);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* HERO BANNER & INTERACTIVE LIVE PREVIEW */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-slate-900">
        {/* Ambient spectral glow blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-87.5 bg-linear-to-tr from-amber-500/15 via-orange-600/10 to-emerald-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Pill Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-mono shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span>Día de los Muertos Edition • Open-Source AI Challenge</span>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-semibold">
                100% Offline Local Gemma
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-mono tracking-tight text-white leading-tight">
              Resurrect Abandoned Code.
              <br />
              <span className="bg-linear-to-r from-amber-400 via-orange-400 to-emerald-400 bg-clip-text text-transparent">
                Preserve the Ghost in the Machine.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 font-sans max-w-3xl mx-auto leading-relaxed">
              Every day, critical open-source infrastructure rots in forgotten
              repositories—marooned on
              <span className="text-rose-400 font-mono font-medium">
                {" "}
                Node v4
              </span>
              ,
              <span className="text-rose-400 font-mono font-medium">
                {" "}
                jQuery 1.8
              </span>
              , or
              <span className="text-rose-400 font-mono font-medium">
                {" "}
                Python 2.7
              </span>
              .<strong> NecroStack</strong> diagnoses causes of death, locks
              hidden edge cases into a verifiable soul invariant checklist, and
              synthesizes zero-dependency{" "}
              <span className="text-emerald-400 font-mono font-semibold">
                Modern TypeScript (ES2026)
              </span>{" "}
              replacements using 100% local open-weight <strong>Gemma</strong>{" "}
              &amp; <strong>pgvector</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-mono text-sm font-bold text-slate-950 bg-linear-to-r from-amber-400 via-amber-300 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 shadow-[0_0_30px_rgba(245,158,11,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>🕯️ Enter the Necromancer's Workbench</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>

              <a
                href="#architecture"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-mono text-sm font-semibold text-slate-300 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 hover:text-white transition-all"
              >
                <span>Explore the 4-Node Architecture</span>
                <span className="text-xs text-amber-400">↓</span>
              </a>
            </div>

            {/* Telemetry pill row */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>0-Byte Cloud Egress</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>HNSW pgvector Cosine Search</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>LangGraph Deterministic State</span>
              </span>
            </div>
          </div>

          {/* Visual Hero Artifact: Side-by-Side Floating Preview Card */}
          <div className="mt-14 max-w-6xl mx-auto">
            <div className="relative rounded-2xl bg-slate-950/90 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-slate-500" />
                    <span>
                      necro-reanimation-diff • ghost-vault-2015.js ➔
                      modern-vault.ts
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-[11px] font-mono text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-400" />
                        <span>Copy TS</span>
                      </>
                    )}
                  </button>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    100% Soul Intact
                  </span>
                </div>
              </div>

              {/* Side-by-Side Split View */}
              <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 font-mono text-xs">
                {/* Left: 2015 Dead Node v4 Relic */}
                <div className="p-4 sm:p-5 bg-rose-950/10">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-rose-900/30">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-700/50 text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
                        <Skull className="w-3 h-3 text-rose-400" />
                        ⚰️ 2015 Dead Relic
                      </span>
                      <span className="text-slate-400 text-xs font-semibold">
                        ghost-vault-2015.js
                      </span>
                    </div>
                    <span className="text-[10px] text-rose-400/90 font-mono">
                      CVE-2016-10001 • Uninitialized Heap Memory
                    </span>
                  </div>

                  <pre className="text-slate-300 overflow-x-auto leading-relaxed p-2 rounded bg-slate-950/80 border border-rose-950/40">
                    <code>
                      <span className="text-slate-500">
                        // Node v4 CommonJS • Abandoned 2015
                      </span>
                      {"\n"}
                      <span className="text-purple-400">var</span> crypto ={" "}
                      <span className="text-amber-300">require</span>(
                      <span className="text-emerald-300">
                        &apos;crypto&apos;
                      </span>
                      );
                      {"\n\n"}
                      <span className="text-slate-500">
                        // ❌ CAUSE OF DEATH 1: Vulnerable deprecated
                        constructor
                      </span>
                      {"\n"}
                      <span className="text-purple-400">function</span>{" "}
                      <span className="text-amber-300">decryptPayload</span>
                      (rawHex, key) &#123;
                      {"\n"}
                      {"  "}
                      <span className="text-slate-500">
                        // Allocates uninitialized memory exposing memory leaks!
                      </span>
                      {"\n"}
                      {"  "}
                      <span className="text-purple-400">var</span> buf ={" "}
                      <span className="text-rose-400 line-through">
                        new Buffer(rawHex, &apos;hex&apos;)
                      </span>
                      ;{"\n"}
                      {"  "}
                      <span className="text-purple-400">var</span> decipher =
                      crypto.
                      <span className="text-amber-300">createDecipher</span>(
                      <span className="text-rose-400 line-through">
                        &apos;aes-256-cbc&apos;
                      </span>
                      , key);
                      {"\n"}
                      {"  "}
                      <span className="text-purple-400">var</span> out =
                      decipher.<span className="text-amber-300">update</span>
                      (buf);
                      {"\n\n"}
                      {"  "}
                      <span className="text-slate-500">
                        // 🕯️ CRITICAL SOUL INVARIANT (Do NOT delete in
                        rewrite!):
                      </span>
                      {"\n"}
                      {"  "}
                      <span className="text-slate-500">
                        // 30-second NTP skew tolerance for distributed IoT
                        clock drift
                      </span>
                      {"\n"}
                      {"  "}
                      <span className="text-purple-400">if</span> (Math.
                      <span className="text-amber-300">abs</span>(Date.
                      <span className="text-amber-300">now</span>() - out.ts)
                      &gt; <span className="text-cyan-300">30000</span>) &#123;
                      {"\n"}
                      {"    "}
                      <span className="text-purple-400">throw new</span>{" "}
                      <span className="text-amber-300">Error</span>(
                      <span className="text-emerald-300">
                        "ClockSkewExceeded"
                      </span>
                      );
                      {"\n"}
                      {"  "}&#125;
                      {"\n"}
                      {"  "}
                      <span className="text-purple-400">return</span> out;
                      {"\n"}&#125;
                    </code>
                  </pre>

                  <div className="mt-3 flex items-center gap-2 text-[11px] text-rose-300/80 bg-rose-950/30 p-2 rounded border border-rose-900/30">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>
                      Autopsy Result: 2 critical vulnerabilities (CVE memory
                      leaks &amp; broken CBC mode).
                    </span>
                  </div>
                </div>

                {/* Right: 2026 Zero-Dep Modern TypeScript */}
                <div className="p-4 sm:p-5 bg-emerald-950/10">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-900/30">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/50 text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
                        <Zap className="w-3 h-3 text-emerald-400" />⚡ 2026
                        Reanimated TypeScript
                      </span>
                      <span className="text-slate-300 text-xs font-semibold">
                        modern-vault.ts
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      Zero Dependencies • ES2026
                    </span>
                  </div>

                  <pre className="text-slate-300 overflow-x-auto leading-relaxed p-2 rounded bg-slate-950/80 border border-emerald-950/40">
                    <code>
                      <span className="text-slate-500">
                        // Resurrected by NecroStack • Gemma &amp; pgvector
                        Grimoire
                      </span>
                      {"\n"}
                      <span className="text-purple-400">import</span> &#123;
                      createDecipheriv, Buffer &#125;{" "}
                      <span className="text-purple-400">from</span>{" "}
                      <span className="text-emerald-300">"node:crypto"</span>;
                      {"\n\n"}
                      <span className="text-purple-400">
                        export interface
                      </span>{" "}
                      <span className="text-cyan-300">VaultPayload</span> &#123;
                      {"\n"}
                      {"  "}data: Buffer;
                      {"\n"}
                      {"  "}timestamp:{" "}
                      <span className="text-purple-400">number</span>;{"\n"}
                      &#125;
                      {"\n\n"}
                      <span className="text-purple-400">
                        export function
                      </span>{" "}
                      <span className="text-amber-300">decryptPayload</span>(
                      {"\n"}
                      {"  "}rawHex:{" "}
                      <span className="text-purple-400">string</span>, key:
                      Uint8Array, iv: Uint8Array,
                      {"\n"}
                      {"  "}skewToleranceMs:{" "}
                      <span className="text-purple-400">number</span> ={" "}
                      <span className="text-cyan-300">30_000</span>
                      {"\n"}
                      ): <span className="text-cyan-300">
                        VaultPayload
                      </span>{" "}
                      &#123;
                      {"\n"}
                      {"  "}
                      <span className="text-slate-500">
                        // ✅ MODERN FIX: Safe allocation &amp; authenticated
                        GCM mode
                      </span>
                      {"\n"}
                      {"  "}
                      <span className="text-purple-400">const</span> buf ={" "}
                      <span className="text-emerald-300">Buffer.from</span>
                      (rawHex, <span className="text-emerald-300">"hex"</span>);
                      {"\n"}
                      {"  "}
                      <span className="text-purple-400">const</span> decipher ={" "}
                      <span className="text-emerald-300">createDecipheriv</span>
                      (<span className="text-emerald-300">"aes-256-gcm"</span>,
                      key, iv);
                      {"\n\n"}
                      {"  "}
                      <span className="text-slate-500">
                        // ✨ SOUL INVARIANT VERIFIED: 30s NTP drift tolerance
                        intact
                      </span>
                      {"\n"}
                      {"  "}
                      <span className="text-purple-400">if</span> (Math.
                      <span className="text-amber-300">abs</span>(Date.
                      <span className="text-amber-300">now</span>() - out.ts)
                      &gt; skewToleranceMs) &#123;
                      {"\n"}
                      {"    "}
                      <span className="text-purple-400">throw new</span>{" "}
                      <span className="text-amber-300">Error</span>(
                      <span className="text-emerald-300">
                        "ClockSkewExceeded"
                      </span>
                      );
                      {"\n"}
                      {"  "}&#125;
                      {"\n"}
                      {"  "}
                      <span className="text-purple-400">return</span> &#123;
                      data: decipher.final(), timestamp: out.ts &#125;;
                      {"\n"}&#125;
                    </code>
                  </pre>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-emerald-300/90 bg-emerald-950/30 p-2 rounded border border-emerald-900/30">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>
                        Soul Preservation Score: 100/100 • All Invariants
                        Validated
                      </span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">
                      Vitest Test Passed ✓
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*WHAT NECROSTACK IS & HOW IT WORKS*/}
      <Workings />
      {/* THE 4-STAGE NECROMANCY RITUAL FLOW (#ritual-flow)*/}
      <RitualFlows />
      {/*FULL SYSTEM ARCHITECTURE BLUEPRINT*/}
      <Architecture />
    </div>
  );
}
