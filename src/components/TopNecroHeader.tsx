"use client";

import React from "react";
import {
  Skull,
  Flame,
  Zap,
  RotateCcw,
  PlusCircle,
  ShieldCheck,
  PackageX,
  Sparkles,
  Terminal,
} from "lucide-react";
import { CryptStats, DeadRelicRecord } from "@/lib/types";

interface TopNecroHeaderProps {
  stats: CryptStats | null;
  selectedRelic: DeadRelicRecord | null;
  isResurrecting: boolean;
  onResurrectAll: () => void;
  onResurrectSelected: () => void;
  onOpenCustomModal: () => void;
  onResetCrypt: () => void;
}

export const TopNecroHeader: React.FC<TopNecroHeaderProps> = ({
  stats,
  selectedRelic,
  isResurrecting,
  onResurrectAll,
  onResurrectSelected,
  onOpenCustomModal,
  onResetCrypt,
}) => {
  return (
    <div className="border-b border-slate-800 bg-slate-950/80 px-4 lg:px-8 py-3.5 shadow-md">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Workbench Context Header */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Terminal className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base lg:text-lg font-bold tracking-tight text-white font-mono flex items-center gap-2">
                <span>Resurrection Workbench</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 uppercase tracking-widest font-mono">
                  Séance Lab
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 font-mono flex items-center gap-2 mt-0.5">
              <span>
                Autonomous Dead Code AST Pathology &amp; ES2026 Synthesis
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {selectedRelic
                  ? `Inspecting ${selectedRelic.filename}`
                  : "No relic selected"}
              </span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Custom Upload Button */}
          <button
            onClick={onOpenCustomModal}
            disabled={isResurrecting}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:border-amber-500/60 hover:text-amber-300 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            title="Paste and resurrect custom dead code snippet"
          >
            <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>+ Paste Dead Code</span>
          </button>

          {/* Reset Crypt Demo Button */}
          <button
            onClick={onResetCrypt}
            disabled={isResurrecting}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-rose-300 hover:border-rose-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            title="Reset Crypt back to default un-reanimated state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>

          {/* Resurrect Selected CTA */}
          {selectedRelic && selectedRelic.status === "IN_CRYPT" && (
            <button
              onClick={onResurrectSelected}
              disabled={isResurrecting}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-semibold rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/60 hover:border-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
              <span>Resurrect Selected</span>
            </button>
          )}

          {/* Primary CTA: Resurrect All */}
          <button
            onClick={onResurrectAll}
            disabled={isResurrecting}
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded-lg bg-linear-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_35px_rgba(245,158,11,0.55)] hover:brightness-110 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            <Flame
              className={`w-4 h-4 text-slate-950 ${isResurrecting ? "animate-spin" : "animate-pulse"}`}
            />
            <span>
              {isResurrecting
                ? "Resurrecting Relics..."
                : "🕯️ Resurrect All Crypt Relics"}
            </span>
          </button>
        </div>
      </div>

      {/* 4 KPI Metric Cards Row */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-800/60">
          {/* Card 1 */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-2.5 flex items-center gap-3">
            <div className="p-2 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-mono">
                Relics Reanimated
              </div>
              <div className="text-base font-bold text-white font-mono flex items-baseline gap-1.5">
                <span>
                  {stats.reanimatedCount} / {stats.totalRelics}
                </span>
                <span className="text-[10px] text-amber-400/90 font-normal">
                  (
                  {Math.round(
                    (stats.reanimatedCount / (stats.totalRelics || 1)) * 100,
                  )}
                  %)
                </span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-2.5 flex items-center gap-3">
            <div className="p-2 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <Skull className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-mono">
                CVEs & Dead APIs Banished
              </div>
              <div className="text-base font-bold text-rose-300 font-mono">
                {stats.cvesAndDeadApisBanished}
                <span className="text-[10px] text-slate-500 font-normal ml-1">
                  exorcised
                </span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-2.5 flex items-center gap-3">
            <div className="p-2 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-mono">
                Edge-Case &quot;Souls&quot; Preserved
              </div>
              <div className="text-base font-bold text-emerald-400 font-mono">
                {stats.soulsPreservedCount}{" "}
                <span className="text-[10px] text-emerald-500/90 font-normal">
                  ({stats.averageSoulScore}% Intact)
                </span>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-2.5 flex items-center gap-3">
            <div className="p-2 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <PackageX className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-mono">
                Dependencies Eliminated
              </div>
              <div className="text-base font-bold text-purple-300 font-mono flex items-center gap-1.5">
                <span>100% Zero-Dep</span>
                <span className="text-[10px] text-slate-400 font-normal">
                  ES2026
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
