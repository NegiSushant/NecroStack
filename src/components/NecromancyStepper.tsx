"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Terminal,
  ChevronDown,
  ChevronUp,
  Cpu,
  Search,
  Sparkles,
  ShieldCheck,
  Flame,
} from "lucide-react";

interface StepperProps {
  currentStep: number;
  currentRelicName: string | null;
  activeLabel: string | null;
  logs: string[];
  isResurrecting: boolean;
}

export const NecromancyStepper: React.FC<StepperProps> = ({
  currentStep,
  currentRelicName,
  activeLabel,
  logs,
  isResurrecting,
}) => {
  const [showLogs, setShowLogs] = useState(false);

  const steps = [
    {
      id: 1,
      title: "1. Forensic Autopsy",
      desc: "Extract Causes of Death & Soul Invariants",
      icon: Cpu,
    },
    {
      id: 2,
      title: "2. pgvector Grimoire",
      desc: "Retrieve Zero-Dep Modern Patterns",
      icon: Search,
    },
    {
      id: 3,
      title: "3. Gemma Code Resurrector",
      desc: "Reanimate into Modern TypeScript (ES2026)",
      icon: Sparkles,
    },
    {
      id: 4,
      title: "4. Vital Signs Verification",
      desc: "Assert Invariants & Maintainer Tribute",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="bg-slate-900/90 border-b border-slate-800 px-4 lg:px-8 py-3.5 shadow-md">
      {/* Current Ritual Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 relative">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isResurrecting ? "bg-amber-400" : "bg-emerald-400"
              }`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isResurrecting ? "bg-amber-500" : "bg-emerald-500"
              }`}
            ></span>
          </span>
          <span className="text-xs font-mono text-slate-300">
            {isResurrecting ? (
              <span className="flex items-center gap-1.5 font-medium text-amber-300">
                <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>
                  Active Séance Altar:{" "}
                  <strong className="text-white underline decoration-amber-500 underline-offset-4">
                    {currentRelicName || "Preparing Relic..."}
                  </strong>
                </span>
                {activeLabel && (
                  <span className="text-slate-400 font-normal">
                    — {activeLabel}
                  </span>
                )}
              </span>
            ) : (
              <span className="text-slate-400">
                Altar Status:{" "}
                <span className="text-emerald-400 font-medium">
                  {currentStep === 5
                    ? "Ritual Completed (All Relics Preserved)"
                    : "Séance Idle (Altar Ready for Invocation)"}
                </span>
              </span>
            )}
          </span>
        </div>

        {/* Collapsible Logs Toggle */}
        <button
          onClick={() => setShowLogs(!showLogs)}
          className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-amber-400 transition-colors px-2.5 py-1 rounded-md bg-slate-950/60 border border-slate-800"
        >
          <Terminal className="w-3.5 h-3.5 text-amber-400" />
          <span>Séance Terminal ({logs.length} events)</span>
          {showLogs ? (
            <ChevronUp className="w-3.5 h-3.5 ml-0.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
          )}
        </button>
      </div>

      {/* 4-Step Horizontal Progress Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5">
        {steps.map((step) => {
          const Icon = step.icon;
          const isCompleted = currentStep > step.id || currentStep === 5;
          const isActive = isResurrecting && currentStep === step.id;
          const isPending = !isCompleted && !isActive;

          let cardClasses =
            "bg-slate-950/40 border-slate-800/80 text-slate-500";
          let iconClasses = "bg-slate-900 border-slate-800 text-slate-500";
          let titleClasses = "text-slate-400";

          if (isActive) {
            cardClasses =
              "bg-gradient-to-r from-amber-950/40 to-slate-900 border-amber-500/60 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]";
            iconClasses =
              "bg-amber-500/20 border-amber-500/60 text-amber-400 animate-pulse";
            titleClasses = "text-amber-300 font-bold";
          } else if (isCompleted) {
            cardClasses =
              "bg-slate-950/80 border-emerald-500/40 text-emerald-400";
            iconClasses =
              "bg-emerald-500/10 border-emerald-500/40 text-emerald-400";
            titleClasses = "text-emerald-300 font-medium";
          }

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all ${cardClasses}`}
            >
              <div
                className={`w-8 h-8 rounded-md flex items-center justify-center border shrink-0 ${iconClasses}`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <div className="min-w-0">
                <div className={`text-xs font-mono truncate ${titleClasses}`}>
                  {step.title}
                </div>
                <div className="text-[10px] text-slate-400 font-mono truncate">
                  {step.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Collapsible Séance Logs Drawer */}
      {showLogs && (
        <div className="mt-3 p-3 bg-black/90 border border-slate-800 rounded-lg shadow-inner max-h-56 overflow-y-auto font-mono text-xs text-slate-300 space-y-1">
          <div className="text-[11px] text-amber-400/90 pb-1 border-b border-slate-800 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" /> LangGraph Execution Terminal
              Log Stream
            </span>
            <span className="text-[10px] text-slate-500">Live Telemetry</span>
          </div>
          {logs.length === 0 ? (
            <p className="text-slate-500 italic py-2">
              Altar logs quiet. Click &quot;Resurrect&quot; to ignite the 4-node
              ritual.
            </p>
          ) : (
            logs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="text-slate-600 select-none">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-emerald-400/90">»</span>
                <span className="text-slate-200">{log}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
