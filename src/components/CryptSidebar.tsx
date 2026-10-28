"use client";

import React from "react";
import {
  Skull,
  Zap,
  CheckCircle,
  Clock,
  User,
  Flame,
} from "lucide-react";
import { DeadRelicRecord } from "@/lib/types";

interface CryptSidebarProps {
  relics: DeadRelicRecord[];
  selectedRelicId: number | null;
  onSelectRelic: (relic: DeadRelicRecord) => void;
}

export const CryptSidebar: React.FC<CryptSidebarProps> = ({
  relics,
  selectedRelicId,
  onSelectRelic,
}) => {
  const selectedRelic = relics.find((r) => r.id === selectedRelicId) || relics[0] || null;

  return (
    <div className="flex flex-col h-full bg-slate-950/70 border-r border-slate-800/80 p-3.5 space-y-4">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Skull className="w-4 h-4 text-amber-400" />
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            The Crypt Queue
          </h2>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
          {relics.length} {relics.length === 1 ? "Relic" : "Relics"}
        </span>
      </div>

      {/* Relics List */}
      <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-420px)] pr-1 custom-scrollbar">
        {relics.map((relic) => {
          const isSelected = relic.id === selectedRelicId;
          const isReanimated = relic.status === "REANIMATED";
          const isVerified = relic.status === "VERIFIED";
          const isInCrypt = relic.status === "IN_CRYPT";

          const soulScore = relic.reanimated_modules?.soul_preservation_score ?? 100;

          return (
            <div
              key={relic.id}
              onClick={() => onSelectRelic(relic)}
              className={`p-3 rounded-lg border transition-all cursor-pointer select-none group relative ${
                isSelected
                  ? "bg-slate-900 border-amber-500/70 shadow-[0_0_15px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/40"
                  : "bg-slate-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80"
              }`}
            >
              {/* Top row: Filename & Status Badge */}
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span className="text-xs font-mono font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                  {relic.filename}
                </span>

                {isVerified ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 shrink-0">
                    <CheckCircle className="w-3 h-3 text-amber-400" />
                    Verified
                  </span>
                ) : isReanimated ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 shrink-0">
                    <Zap className="w-3 h-3 text-emerald-400" />
                    {soulScore}% Intact
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-950/40 border border-rose-500/30 text-rose-300 shrink-0">
                    <Skull className="w-3 h-3 text-rose-400" />
                    In Crypt
                  </span>
                )}
              </div>

              {/* Middle row: Runtime & Era Badge */}
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 mb-2">
                <span className="px-1.5 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-[10px] text-slate-300">
                  {relic.abandoned_year}
                </span>
                <span className="truncate">{relic.source_language}</span>
              </div>

              {/* Bottom row: Original Maintainer */}
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1.5 border-t border-slate-800/60">
                <span className="flex items-center gap-1 truncate">
                  <User className="w-3 h-3 text-slate-400" />
                  <span className="truncate">{relic.original_author}</span>
                </span>
                <span className="text-slate-400 font-bold shrink-0">
                  #{relic.relic_code}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Día de los Muertos Maintainer Ofrenda Card */}
      {selectedRelic && (
        <div className="mt-auto pt-3 border-t border-slate-800/80">
          <div className="rounded-xl border border-amber-500/40 bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 p-3.5 shadow-lg relative overflow-hidden">
            {/* Background Marigold Floral Aura */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">🌼</span>
              <h3 className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wide">
                Día de los Muertos Ofrenda
              </h3>
            </div>

            <p className="text-[11px] font-mono text-slate-300 leading-relaxed mb-2.5">
              <span className="text-amber-400 font-semibold">{selectedRelic.original_author}</span>
              &apos;s legacy ({selectedRelic.abandoned_year}):
            </p>

            <blockquote className="text-[11px] text-slate-400 italic bg-black/40 border-l-2 border-amber-500/60 pl-2.5 py-1 mb-2.5 rounded-r">
              &ldquo;{selectedRelic.backstory}&rdquo;
            </blockquote>

            {selectedRelic.reanimated_modules?.maintainer_tribute ? (
              <div className="pt-2 border-t border-amber-500/20">
                <div className="text-[10px] font-mono font-semibold text-emerald-400 flex items-center gap-1 mb-1">
                  <Flame className="w-3 h-3 text-amber-400" />
                  Gemma Maintainer Tribute:
                </div>
                <p className="text-[11px] font-mono text-amber-100/90 leading-normal bg-amber-500/10 p-2 rounded border border-amber-500/30">
                  {selectedRelic.reanimated_modules.maintainer_tribute}
                </p>
              </div>
            ) : (
              <div className="text-[10px] font-mono text-slate-400 italic flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Ofrenda candlelight awaiting reanimation...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
