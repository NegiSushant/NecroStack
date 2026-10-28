"use client";

import React, { useState, useEffect, useCallback } from "react";
import { TopNecroHeader } from "@/components/TopNecroHeader";
import { NecromancyStepper } from "@/components/NecromancyStepper";
import { CryptSidebar } from "@/components/CryptSidebar";
import { ResurrectionWorkbench } from "@/components/ResurrectionWorkbench";
import { CustomRelicModal } from "@/components/CustomRelicModal";
import {
  DeadRelicRecord,
  CryptStats,
  SSEEventPayload,
} from "@/lib/types";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

export default function NecroStackDashboard() {
  const [relics, setRelics] = useState<DeadRelicRecord[]>([]);
  const [stats, setStats] = useState<CryptStats | null>(null);
  const [selectedRelicId, setSelectedRelicId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isResurrecting, setIsResurrecting] = useState<boolean>(false);

  // Stepper state
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [currentRelicName, setCurrentRelicName] = useState<string | null>(null);
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  // Modals & Notifications
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "success") => {
      setToast({ message, type });
      setTimeout(() => {
        setToast((prev) => (prev?.message === message ? null : prev));
      }, 4500);
    },
    []
  );

  // 1. Fetch Crypt status and relics
  const fetchCrypt = useCallback(async () => {
    try {
      const res = await fetch("/api/necro/crypt");
      if (!res.ok) throw new Error("Failed to load Crypt records");
      const data = await res.json();
      if (data.success) {
        setRelics(data.relics || []);
        setStats(data.stats || null);
        if (data.relics?.length > 0 && selectedRelicId === null) {
          setSelectedRelicId(data.relics[0].id);
        }
      }
    } catch (err: any) {
      console.error("Error fetching crypt:", err);
      showToast(err?.message || "Failed to fetch Crypt state", "error");
    } finally {
      setIsLoading(false);
    }
  }, [selectedRelicId, showToast]);

  useEffect(() => {
    fetchCrypt();
  }, [fetchCrypt]);

  // Selected relic object
  const selectedRelic =
    relics.find((r) => r.id === selectedRelicId) || relics[0] || null;

  // 2. Consume SSE Resurrection Stream
  const executeResurrectionStream = async (targetRelicId?: number) => {
    try {
      setIsResurrecting(true);
      setCurrentStep(1);
      setLogs([]);

      const response = await fetch("/api/necro/resurrect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          relicId: targetRelicId,
          stream: true,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to initiate SSE resurrection stream");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith("data:")) {
            try {
              const event: SSEEventPayload = JSON.parse(
                trimmed.replace(/^data:\s*/, "")
              );

              if (event.type === "relic_start") {
                setCurrentRelicName(event.filename || null);
                if (event.relicId) {
                  setSelectedRelicId(event.relicId);
                }
                setLogs((prev) => [
                  ...prev,
                  `🕯️ Commencing Séance on [${event.filename}] (${event.abandonedYear} • ${event.sourceLanguage})`,
                ]);
              } else if (event.type === "node_active") {
                if (event.step) setCurrentStep(event.step);
                if (event.label) setActiveLabel(event.label);
              } else if (event.type === "node_complete") {
                if (event.logs && event.logs.length > 0) {
                  setLogs((prev) => [...prev, ...event.logs!]);
                }
              } else if (event.type === "relic_complete") {
                setLogs((prev) => [
                  ...prev,
                  `✨ [${event.filename}] Reanimated! Preservation Score: ${event.soulPreservationScore}% (${event.resurrectionStatus})`,
                ]);
                // Refresh Crypt state so UI immediately displays new code and score
                await fetchCrypt();
              } else if (event.type === "ritual_complete") {
                setCurrentStep(5);
                setActiveLabel("Séance Complete • All Relics Reanimated");
                showToast(
                  `Ritual completed! Resurrected ${event.totalProcessed || 1} relic(s).`,
                  "success"
                );
              } else if (event.type === "error") {
                setLogs((prev) => [...prev, `❌ Error: ${event.message}`]);
                showToast(event.message || "Séance error encountered", "error");
              }
            } catch (parseErr) {
              console.warn("Failed to parse SSE event chunk:", parseErr);
            }
          }
        }
      }
    } catch (err: any) {
      console.error("Resurrection ritual error:", err);
      showToast(err?.message || "Séance ritual failed to complete", "error");
    } finally {
      setIsResurrecting(false);
      await fetchCrypt();
    }
  };

  // 3. Handlers
  const handleResurrectAll = () => {
    executeResurrectionStream();
  };

  const handleResurrectSelected = () => {
    if (selectedRelic) {
      executeResurrectionStream(selectedRelic.id);
    }
  };

  const handleSaveCodeEdits = async (
    relicId: number,
    newCode: string,
    newTests?: string
  ) => {
    const res = await fetch(`/api/necro/module/${relicId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "SAVE_CODE_EDITS",
        reanimatedTypeScriptCode: newCode,
        generatedUnitTests: newTests,
      }),
    });
    if (!res.ok) throw new Error("Failed to save code edits");
    await fetchCrypt();
  };

  const handleToggleInvariant = async (
    relicId: number,
    invariantIndex: number
  ) => {
    const res = await fetch(`/api/necro/module/${relicId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "TOGGLE_INVARIANT",
        invariantIndex,
      }),
    });
    if (!res.ok) throw new Error("Failed to toggle invariant");
    await fetchCrypt();
  };

  const handleVerifyAndPublish = async (relicId: number) => {
    const res = await fetch(`/api/necro/module/${relicId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "VERIFY_AND_PUBLISH",
        verifierName: "Lead Necromancer",
      }),
    });
    if (!res.ok) throw new Error("Failed to verify & publish module");
    await fetchCrypt();
  };

  const handleCustomSubmit = async (payload: {
    filename: string;
    sourceLanguage: string;
    legacyCode: string;
    originalAuthor?: string;
    abandonedYear?: number;
    backstory?: string;
    runImmediately?: boolean;
  }) => {
    const res = await fetch("/api/necro/custom", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData?.error || "Failed to upload custom relic");
    }
    const data = await res.json();
    showToast(`Interred ${payload.filename} into Crypt!`, "success");
    await fetchCrypt();
    if (data.relicId) {
      setSelectedRelicId(data.relicId);
    }
  };

  const handleResetCrypt = async () => {
    if (!confirm("Reset Crypt back to default un-reanimated state?")) return;
    try {
      const res = await fetch("/api/necro/reset", { method: "POST" });
      if (!res.ok) throw new Error("Failed to reset Crypt");
      const data = await res.json();
      showToast(data.message || "Crypt demo reset complete!", "info");
      setCurrentStep(0);
      setActiveLabel(null);
      setCurrentRelicName(null);
      setLogs([]);
      await fetchCrypt();
    } catch (err: any) {
      showToast(err?.message || "Failed to reset Crypt", "error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl border font-mono text-xs backdrop-blur-md animate-in slide-in-from-top-2 duration-200">
          {toast.type === "success" && (
            <div className="flex items-center gap-2 bg-emerald-950/90 text-emerald-200 border-emerald-500/40 p-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{toast.message}</span>
            </div>
          )}
          {toast.type === "error" && (
            <div className="flex items-center gap-2 bg-rose-950/90 text-rose-200 border-rose-500/40 p-1">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>{toast.message}</span>
            </div>
          )}
          {toast.type === "info" && (
            <div className="flex items-center gap-2 bg-amber-950/90 text-amber-200 border-amber-500/40 p-1">
              <Info className="w-4 h-4 text-amber-400" />
              <span>{toast.message}</span>
            </div>
          )}
          <button
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-white ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Header */}
      <TopNecroHeader
        stats={stats}
        selectedRelic={selectedRelic}
        isResurrecting={isResurrecting}
        onResurrectAll={handleResurrectAll}
        onResurrectSelected={handleResurrectSelected}
        onOpenCustomModal={() => setIsCustomModalOpen(true)}
        onResetCrypt={handleResetCrypt}
      />

      {/* Necromancy Stepper */}
      <NecromancyStepper
        currentStep={currentStep}
        currentRelicName={currentRelicName}
        activeLabel={activeLabel}
        logs={logs}
        isResurrecting={isResurrecting}
      />

      {/* Main Workspace (Sidebar + Workbench) */}
      <main className="flex-1 grid grid-cols-12 overflow-hidden min-h-[750px]">
        {/* Left Crypt Queue Sidebar (col-span-12 lg:col-span-3) */}
        <aside className="col-span-12 lg:col-span-3 h-full border-r border-slate-800">
          <CryptSidebar
            relics={relics}
            selectedRelicId={selectedRelicId}
            onSelectRelic={(relic) => setSelectedRelicId(relic.id)}
          />
        </aside>

        {/* Right Resurrection Workbench (col-span-12 lg:col-span-9) */}
        <section className="col-span-12 lg:col-span-9 h-full">
          <ResurrectionWorkbench
            relic={selectedRelic}
            isResurrecting={isResurrecting}
            onResurrectRelic={(id) => executeResurrectionStream(id)}
            onSaveCodeEdits={handleSaveCodeEdits}
            onToggleInvariant={handleToggleInvariant}
            onVerifyAndPublish={handleVerifyAndPublish}
            showToast={showToast}
          />
        </section>
      </main>

      {/* Custom Relic Modal */}
      <CustomRelicModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onSubmit={handleCustomSubmit}
      />
    </div>
  );
}

