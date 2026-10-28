"use client";

import React, { useState } from "react";
import { X, Sparkles, Flame, PlusCircle, AlertCircle } from "lucide-react";

interface CustomRelicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: {
    filename: string;
    sourceLanguage: string;
    legacyCode: string;
    originalAuthor?: string;
    abandonedYear?: number;
    backstory?: string;
    runImmediately?: boolean;
  }) => Promise<void>;
}

export const CustomRelicModal: React.FC<CustomRelicModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [filename, setFilename] = useState("legacy-token-hasher.js");
  const [sourceLanguage, setSourceLanguage] = useState("Node.js v4 (CommonJS)");
  const [originalAuthor, setOriginalAuthor] = useState("@forgotten_hacker");
  const [abandonedYear, setAbandonedYear] = useState<number>(2015);
  const [backstory, setBackstory] = useState(
    "Mission-critical IoT gateway token generator abandoned after developer left the startup."
  );
  const [legacyCode, setLegacyCode] = useState(`var crypto = require('crypto');

function signPayload(data, secret) {
  // Uses vulnerable Buffer constructor & deprecated createCipher
  var buf = new Buffer(secret, 'binary');
  var cipher = crypto.createCipher('aes-256-cbc', buf);
  var out = cipher.update(data, 'utf8', 'base64') + cipher.final('base64');
  // Strip padding
  return out.replace(/=+$/, '');
}

module.exports = { signPayload: signPayload };`);
  const [runImmediately, setRunImmediately] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!filename.trim() || !sourceLanguage.trim() || !legacyCode.trim()) {
      setError("Filename, language, and legacy code snippet are required.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await onSubmit({
        filename: filename.trim(),
        sourceLanguage: sourceLanguage.trim(),
        originalAuthor: originalAuthor.trim() || undefined,
        abandonedYear: abandonedYear || 2016,
        backstory: backstory.trim() || undefined,
        legacyCode,
        runImmediately,
      });
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to submit custom dead code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden font-mono">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🕯️</span>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Inter Custom Dead Code into the Crypt
              </h3>
              <p className="text-[11px] text-slate-400">
                Paste any abandoned JavaScript, jQuery, or Python 2 snippet to resurrect it
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar text-xs">
          {error && (
            <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Relic Filename *
              </label>
              <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                required
                placeholder="e.g. old-crypto-signer.js"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-500/80"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Source Runtime / Language *
              </label>
              <input
                type="text"
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
                required
                placeholder="e.g. Node.js v4 (CommonJS) or Python 2.7"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-500/80"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Original Author
              </label>
              <input
                type="text"
                value={originalAuthor}
                onChange={(e) => setOriginalAuthor(e.target.value)}
                placeholder="e.g. @anonymous_maintainer"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-500/80"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Abandoned Year
              </label>
              <input
                type="number"
                value={abandonedYear}
                onChange={(e) => setAbandonedYear(Number(e.target.value))}
                min={1995}
                max={2026}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-500/80"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Maintainer Lore / Backstory
            </label>
            <input
              type="text"
              value={backstory}
              onChange={(e) => setBackstory(e.target.value)}
              placeholder="Why this code was abandoned..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-500/80"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center justify-between">
              <span>Dead / Legacy Code Snippet *</span>
              <span className="text-[10px] text-slate-400">Preserves edge cases</span>
            </label>
            <textarea
              value={legacyCode}
              onChange={(e) => setLegacyCode(e.target.value)}
              required
              rows={8}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-rose-200/90 font-mono text-xs leading-relaxed focus:outline-none focus:border-amber-500/80 custom-scrollbar resize-none"
              spellCheck={false}
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="runImmediately"
              checked={runImmediately}
              onChange={(e) => setRunImmediately(e.target.checked)}
              className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-amber-500 focus:ring-0 cursor-pointer"
            />
            <label htmlFor="runImmediately" className="text-slate-300 text-xs cursor-pointer select-none">
              Ignite 4-Node LangGraph Ritual immediately upon upload
            </label>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] disabled:opacity-50 cursor-pointer"
            >
              <Flame className="w-4 h-4" />
              <span>{isSubmitting ? "Interring Relic..." : "Inter & Resurrect Code"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
