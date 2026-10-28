"use client";

import React from "react";
import { Cpu, Database, Shield, Infinity } from "lucide-react";

export const TelemetryFooter: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur border-t border-slate-800 px-4 lg:px-8 py-2.5 text-[11px] font-mono shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 text-slate-400">
        {/* Pillar 1 */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          <span>
            <strong className="text-slate-300">Necromancer Engine:</strong> Local Docker Model Runner (Gemma)
          </span>
        </div>

        {/* Pillar 2 */}
        <div className="flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-amber-400" />
          <span>
            <strong className="text-slate-300">Grimoire DB:</strong> PostgreSQL pgvector (HNSW Hybrid Index)
          </span>
        </div>

        {/* Pillar 3 */}
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-purple-400" />
          <span>
            <strong className="text-slate-300">Code Egress:</strong>{" "}
            <span className="text-purple-300 font-bold">0 Bytes</span> (100% Air-Gapped / Offline-Capable)
          </span>
        </div>

        {/* Pillar 4 */}
        <div className="flex items-center gap-2">
          <Infinity className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-cyan-300/90 font-medium">
            Digital Permanence: Immune to Cloud API Deprecations
          </span>
        </div>
      </div>
    </footer>
  );
};
