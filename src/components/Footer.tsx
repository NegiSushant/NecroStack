"use client";

import React from "react";
import Link from "next/link";
import {
  Cpu,
  Database,
  Shield,
  Infinity,
  Flame,
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 font-sans z-30 transition-colors">
      {/* 4 Open-Innovation Telemetry Badges Strip */}
      <div className="border-b border-slate-900 bg-slate-950/70 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          {/* Badge 1: Local Runner */}
          <div className="flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800/80 hover:border-emerald-500/40 transition-colors">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              <strong className="text-slate-200">Local Runner:</strong> Google Gemma
            </span>
          </div>

          {/* Badge 2: pgvector */}
          <div className="flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800/80 hover:border-amber-500/40 transition-colors">
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <span>
              <strong className="text-slate-200">Vector Grimoire:</strong> PostgreSQL pgvector HNSW
            </span>
          </div>

          {/* Badge 3: 0 Bytes Egress */}
          <div className="flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800/80 hover:border-purple-500/40 transition-colors">
            <Shield className="w-3.5 h-3.5 text-purple-400" />
            <span>
              <strong className="text-slate-200">Code Egress:</strong>{" "}
              <span className="text-purple-300 font-bold">0 Bytes</span> (100% Offline-Capable)
            </span>
          </div>

          {/* Badge 4: Digital Permanence */}
          <div className="flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
            <Infinity className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              <strong className="text-slate-200">Digital Permanence:</strong> Zero Cloud Lock-In
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Summary */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <span>🕯️</span>
              </div>
              <span className="text-lg font-bold font-mono tracking-tight text-white">
                Necro<span className="text-amber-400">Stack</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans max-w-md leading-relaxed">
              The Autonomous Dead Code & Open-Source Relic Resurrector. Rescuing abandoned
              Node v4, jQuery 1.8, and Python 2.7 libraries into zero-dependency Modern TypeScript (ES2026)
              while forensically locking every critical domain invariant and edge case.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pt-1">
              <span className="flex items-center gap-1 text-amber-400/90">
                <Flame className="w-3.5 h-3.5" />
                Día de los Muertos Edition
              </span>
              <span>•</span>
              <span className="text-emerald-400/90">Week 4 • Ghost in the Machine</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
              Necromancy Vault
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link
                  href="/#how-it-works"
                  className="hover:text-amber-300 transition-colors"
                >
                  What is NecroStack
                </Link>
              </li>
              <li>
                <Link
                  href="/#ritual-flow"
                  className="hover:text-amber-300 transition-colors"
                >
                  4-Node Ritual Flow
                </Link>
              </li>
              <li>
                <Link
                  href="/#architecture"
                  className="hover:text-amber-300 transition-colors"
                >
                  System Architecture
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 font-semibold"
                >
                  <span>🕯️ Crypt Workbench</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Access & Crypt Auth */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
              Crypt Access
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link
                  href="/signin"
                  className="hover:text-amber-300 transition-colors"
                >
                  Lead Necromancer Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="hover:text-amber-300 transition-colors"
                >
                  Create Crypt Credentials
                </Link>
              </li>
              <li>
                <Link
                  href="/signin"
                  className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-semibold"
                >
                  <span>⚡ 1-Click Judge Demo</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Tribute Row */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="text-amber-400 text-sm">🏵️</span>
            <span>
              Built for the <strong className="text-slate-300">Hacktoberfest 2026 Open-Source AI Challenge</strong> —
              Honoring past open-source maintainers by keeping their code alive forever.
            </span>
          </div>
          <div className="text-[11px] text-slate-600">
            100% Local AI • No Cloud Telemetry • Digital Permanence
          </div>
        </div>
      </div>
    </footer>
  );
};
