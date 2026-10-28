"use client";

import React, { useState, useEffect } from "react";
import {
  Skull,
  Ghost,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Copy,
  Download,
  Save,
  Award,
  Flame,
  FileCode,
  TestTube2,
  BookOpen,
} from "lucide-react";
import { DeadRelicRecord, CauseOfDeath } from "@/lib/types";

interface ResurrectionWorkbenchProps {
  relic: DeadRelicRecord | null;
  isResurrecting: boolean;
  onResurrectRelic: (relicId: number) => void;
  onSaveCodeEdits: (
    relicId: number,
    newCode: string,
    newTests?: string,
  ) => Promise<void>;
  onToggleInvariant: (relicId: number, invariantIndex: number) => Promise<void>;
  onVerifyAndPublish: (relicId: number) => Promise<void>;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

export const ResurrectionWorkbench: React.FC<ResurrectionWorkbenchProps> = ({
  relic,
  isResurrecting,
  onResurrectRelic,
  onSaveCodeEdits,
  onToggleInvariant,
  onVerifyAndPublish,
  showToast,
}) => {
  const [activeTab, setActiveTab] = useState<"code" | "tests" | "grimoire">(
    "code",
  );
  const [editableCode, setEditableCode] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Sync reanimated code state when selected relic updates
  useEffect(() => {
    if (relic?.reanimated_modules?.reanimated_typescript_code) {
      setEditableCode(relic.reanimated_modules.reanimated_typescript_code);
    } else {
      setEditableCode("");
    }
  }, [relic]);

  if (!relic) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center p-8 bg-slate-950/40">
        <Skull className="w-12 h-12 text-slate-700 mb-3 animate-pulse" />
        <h3 className="text-base font-mono text-slate-400 font-semibold">
          No Dead Relic Selected
        </h3>
        <p className="text-xs text-slate-600 font-mono mt-1 max-w-sm">
          Select an abandoned open-source relic from the Crypt queue to view its
          autopsy and reanimated code.
        </p>
      </div>
    );
  }

  const isReanimated = !!relic.reanimated_modules;
  const reanimatedModule = relic.reanimated_modules;

  // Extract causes of death (either from reanimated module or fallback from relic's symptoms)
  const causesOfDeath: CauseOfDeath[] =
    reanimatedModule?.autopsy_causes_of_death ||
    relic.known_symptoms.map((symptom) => {
      let severity: "CRITICAL_CVE" | "REMOVED_API" | "OBSOLETE_SYNTAX" =
        "OBSOLETE_SYNTAX";
      if (
        symptom.includes("CVE") ||
        symptom.includes("vulnerable") ||
        symptom.includes("corruption")
      ) {
        severity = "CRITICAL_CVE";
      } else if (
        symptom.includes("not a function") ||
        symptom.includes("Removed") ||
        symptom.includes("deprecated")
      ) {
        severity = "REMOVED_API";
      }
      return {
        api_or_pattern: symptom.split(":")[0] || "Deprecated Pattern",
        severity,
        reason: symptom,
      };
    });

  // Extract soul invariants (either verified from module or expected preview)
  const soulInvariants: Array<{
    invariant: string;
    preserved: boolean;
    original_line_quote: string;
    modern_implementation_quote: string;
  }> =
    reanimatedModule?.soul_invariants_checklist ||
    Object.values(relic.expected_soul_invariants || {}).map((inv) => ({
      invariant: inv.invariant,
      preserved: false,
      original_line_quote: inv.description,
      modern_implementation_quote: "Awaiting resurrection ritual...",
    }));

  // Handle Copy to clipboard
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${label} to clipboard!`, "success");
  };

  // Handle Download file
  const handleDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/typescript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${filename}`, "info");
  };

  // Check if a line in legacy code contains known dead patterns
  const isDeadLine = (line: string) => {
    const deadTokens = [
      "new Buffer",
      "createCipher(",
      ".live(",
      "$.Deferred",
      "urllib2",
      "xrange(",
      "iteritems(",
      "print ",
      "__POLTERGEIST_LOCK",
      "async: false",
      "\\xef\\xbb\\xbf",
    ];
    return deadTokens.some((token) => line.includes(token));
  };

  const legacyLines = relic.legacy_code.split("\n");

  return (
    <div className="flex flex-col h-full space-y-4 p-4 lg:p-6 overflow-y-auto custom-scrollbar">
      {/* PART A: Top Forensic Banner (Causes of Death vs. Soul Checklist)    */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Left Box: Causes of Death Exorcised */}
        <div className="bg-slate-900/80 border border-rose-900/40 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-rose-900/30">
            <div className="flex items-center gap-2">
              <Skull className="w-4 h-4 text-rose-400" />
              <h3 className="text-xs font-mono font-bold text-rose-300 uppercase tracking-wider">
                Forensic Autopsy: Causes of Death Exorcised
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-400 font-semibold">
              {causesOfDeath.length} Vulnerabilities
            </span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
            {causesOfDeath.map((item, idx) => {
              let badgeColor =
                "bg-rose-950/80 text-rose-400 border-rose-500/40";
              if (item.severity === "REMOVED_API") {
                badgeColor =
                  "bg-amber-950/80 text-amber-400 border-amber-500/40";
              } else if (item.severity === "OBSOLETE_SYNTAX") {
                badgeColor =
                  "bg-purple-950/80 text-purple-400 border-purple-500/40";
              }

              return (
                <div
                  key={idx}
                  className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-xs font-mono flex items-start gap-2.5"
                >
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded border uppercase font-bold shrink-0 mt-0.5 ${badgeColor}`}
                  >
                    {item.severity}
                  </span>
                  <div className="min-w-0">
                    <div className="text-white font-semibold truncate">
                      {item.api_or_pattern}
                    </div>
                    <div className="text-slate-400 text-[11px] leading-relaxed line-clamp-2">
                      {item.reason}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Box: Edge-Case Soul Checklist */}
        <div className="bg-slate-900/80 border border-emerald-900/40 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-emerald-900/30">
            <div className="flex items-center gap-2">
              <Ghost className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider">
                The Ghost in the Machine: Edge-Case &quot;Soul&quot; Checklist
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-semibold">
              {relic.reanimated_modules?.soul_preservation_score ?? 100}%
              Preserved
            </span>
          </div>

          <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
            {soulInvariants.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs font-mono space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-emerald-300 font-semibold flex items-center gap-1.5 truncate">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{item.invariant}</span>
                  </span>

                  {isReanimated ? (
                    <button
                      onClick={async () => {
                        await onToggleInvariant(relic.id, idx);
                        showToast(
                          `Updated verification status for invariant #${idx + 1}`,
                          "info",
                        );
                      }}
                      className={`text-[10px] px-2 py-0.5 rounded-full border transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                        item.preserved
                          ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25"
                          : "bg-rose-500/15 border-rose-500/40 text-rose-300 hover:bg-rose-500/25"
                      }`}
                      title="Click to toggle engineer verification check"
                    >
                      {item.preserved ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Preserved</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 text-rose-400" />
                          <span>Mutated</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-500 shrink-0">
                      Pending
                    </span>
                  )}
                </div>

                {/* Quote comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px] pt-1 border-t border-slate-900">
                  <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800/60">
                    <span className="text-slate-500 block mb-0.5 font-sans">
                      Legacy Rule:
                    </span>
                    <span className="text-slate-300 italic line-clamp-2">
                      &ldquo;{item.original_line_quote}&rdquo;
                    </span>
                  </div>
                  <div className="bg-emerald-950/20 p-1.5 rounded border border-emerald-900/30">
                    <span className="text-emerald-500/80 block mb-0.5 font-sans">
                      Modern Proof:
                    </span>
                    <span className="text-emerald-200/90 font-mono line-clamp-2">
                      {item.modern_implementation_quote}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Split-Screen Code Comparison Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-125">
        {/* Left Pane: The Tombstone (Original Dead Code) */}
        <div className="flex flex-col bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Skull className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-mono font-bold text-white">
                The Tombstone (Original Dead Code)
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-rose-300">
                {relic.source_language}
              </span>
              <span>{legacyLines.length} lines</span>
              <button
                onClick={() => handleCopy(relic.legacy_code, "legacy code")}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Copy Legacy Code"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Code Viewer with Line Numbers and Dead Pattern Highlighting */}
          <div className="flex-1 p-3 font-mono text-xs overflow-auto custom-scrollbar bg-slate-950">
            <pre className="text-slate-300 leading-relaxed">
              {legacyLines.map((line, idx) => {
                const highlighted = isDeadLine(line);
                return (
                  <div
                    key={idx}
                    className={`flex items-start group ${
                      highlighted
                        ? "bg-rose-500/15 border-l-2 border-rose-500 text-rose-200"
                        : "hover:bg-slate-900/40 text-slate-300"
                    }`}
                  >
                    <span className="w-10 shrink-0 text-slate-600 text-right pr-3 select-none text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="whitespace-pre flex-1 pl-1">
                      {line || " "}
                    </span>
                  </div>
                );
              })}
            </pre>
          </div>
        </div>

        {/* Right Pane: The Reanimated Module (TypeScript ES2026) */}
        <div className="flex flex-col bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          {/* If still IN_CRYPT, show Altar placeholder */}
          {!isReanimated ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-slate-950/60 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(245,158,11,0.25)] animate-pulse">
                🕯️
              </div>
              <div className="max-w-md">
                <h4 className="text-base font-mono font-bold text-white mb-1">
                  Relic Resting in the Crypt
                </h4>
                <p className="text-xs font-mono text-slate-400 leading-relaxed">
                  <strong className="text-amber-400">{relic.filename}</strong>{" "}
                  has not yet been reanimated. Ignite the 4-node LangGraph
                  ritual to exorcise deprecated APIs and synthesize modern
                  zero-dependency TypeScript.
                </p>
              </div>
              <button
                onClick={() => onResurrectRelic(relic.id)}
                disabled={isResurrecting}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-bold rounded-lg bg-linear-to-r from-amber-500 to-orange-500 text-slate-950 hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all cursor-pointer disabled:opacity-50"
              >
                <Flame className="w-4 h-4" />
                <span>Perform Necromancy Ritual on {relic.filename}</span>
              </button>
            </div>
          ) : (
            <>
              {/* Tab Header & Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between px-3 py-2 bg-slate-900/90 border-b border-slate-800 gap-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab("code")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md transition-all ${
                      activeTab === "code"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span>reanimated.ts</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("tests")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md transition-all ${
                      activeTab === "tests"
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <TestTube2 className="w-3.5 h-3.5" />
                    <span>vital-signs.test.ts</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("grimoire")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md transition-all ${
                      activeTab === "grimoire"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Grimoire Matches</span>
                  </button>
                </div>

                {/* Toolbar buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() =>
                      handleCopy(editableCode, "reanimated TypeScript")
                    }
                    className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    title="Copy TypeScript Code"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() =>
                      handleDownload(
                        relic.filename.replace(/\.(js|py)$/, ".ts"),
                        editableCode,
                      )
                    }
                    className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    title="Download .ts Module"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  {/* Save Edits button */}
                  <button
                    onClick={async () => {
                      setIsSaving(true);
                      await onSaveCodeEdits(relic.id, editableCode);
                      setIsSaving(false);
                      showToast("Saved code edits to database!", "success");
                    }}
                    disabled={isSaving}
                    className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  >
                    <Save className="w-3 h-3 text-amber-400" />
                    <span>{isSaving ? "Saving..." : "Save"}</span>
                  </button>

                  {/* Verify & Publish CTA */}
                  <button
                    onClick={async () => {
                      setIsPublishing(true);
                      await onVerifyAndPublish(relic.id);
                      setIsPublishing(false);
                      showToast(
                        `Verified and published ${relic.filename}!`,
                        "success",
                      );
                    }}
                    disabled={isPublishing || relic.status === "VERIFIED"}
                    className="flex items-center gap-1 px-3 py-1 text-[11px] font-mono font-bold rounded bg-linear-to-r from-emerald-500 to-teal-600 text-slate-950 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)] disabled:opacity-50"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>
                      {relic.status === "VERIFIED"
                        ? "Published ✔"
                        : "Verify & Publish"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Tab 1: Reanimated TypeScript Code Editor */}
              {activeTab === "code" && (
                <div className="flex-1 flex flex-col bg-slate-950 font-mono text-xs">
                  <textarea
                    value={editableCode}
                    onChange={(e) => setEditableCode(e.target.value)}
                    className="flex-1 w-full p-4 bg-slate-950 text-emerald-200/90 font-mono text-xs leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-emerald-500/40 custom-scrollbar selection:bg-emerald-500/30"
                    spellCheck={false}
                  />
                </div>
              )}

              {/* Tab 2: Vital Signs Tests */}
              {activeTab === "tests" && (
                <div className="flex-1 flex flex-col bg-slate-950 font-mono text-xs p-4 overflow-auto custom-scrollbar">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                    <span className="text-slate-400 text-xs">
                      Runnable Test Suite (
                      <code className="text-purple-300">node:test</code> +{" "}
                      <code className="text-purple-300">node:assert</code>)
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(
                          reanimatedModule?.generated_unit_tests || "",
                          "unit test suite",
                        )
                      }
                      className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy Tests</span>
                    </button>
                  </div>
                  <pre className="text-purple-200/90 leading-relaxed whitespace-pre">
                    {reanimatedModule?.generated_unit_tests ||
                      "// No unit tests generated yet"}
                  </pre>
                </div>
              )}

              {/* Tab 3: Grimoire Matches */}
              {activeTab === "grimoire" && (
                <div className="flex-1 bg-slate-950 p-4 overflow-auto custom-scrollbar space-y-3">
                  <div className="text-xs font-mono text-slate-400 pb-2 border-b border-slate-800">
                    Retrieved from PostgreSQL pgvector Grimoire for{" "}
                    <strong className="text-amber-400">
                      {relic.era_category}
                    </strong>
                    :
                  </div>

                  {(relic.matched_grimoire_patterns || []).length === 0 ? (
                    <div className="text-xs font-mono text-slate-500 italic p-4 text-center">
                      No matching Grimoire chunks retrieved for this era
                      category.
                    </div>
                  ) : (
                    relic.matched_grimoire_patterns?.map((pattern, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2 text-xs font-mono"
                      >
                        <div className="flex items-center justify-between text-amber-300 font-bold">
                          <span>{pattern.modern_replacement_title}</span>
                          <span className="text-[10px] text-slate-500 uppercase">
                            Pattern #{pattern.id}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {pattern.rule_text}
                        </p>
                        <div className="pt-2 border-t border-slate-800">
                          <span className="text-[10px] text-emerald-400 block mb-1">
                            Modern Reference Snippet:
                          </span>
                          <pre className="bg-black/70 p-2 rounded text-[11px] text-emerald-200/90 overflow-x-auto custom-scrollbar">
                            {pattern.code_example}
                          </pre>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
