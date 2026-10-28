"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  Mail,
  Zap,
  ArrowRight,
  AlertCircle,
  Loader2,
} from "lucide-react";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (
    e?: React.FormEvent,
    overrideEmail?: string,
    overridePass?: string,
  ) => {
    if (e) e.preventDefault();
    setError(null);

    const submitEmail = overrideEmail || email;
    const submitPass = overridePass || password;

    if (!submitEmail || !submitPass) {
      setError("Please enter both email and ritual passphrase.");
      return;
    }

    try {
      if (overrideEmail) setDemoLoading(true);
      else setLoading(true);

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: submitEmail, password: submitPass }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Authentication failed.");
      }
      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Séance authentication rejected.");
    } finally {
      setLoading(false);
      setDemoLoading(false);
    }
  };

  const handleJudge1ClickLogin = () => {
    setEmail("judge@necrostack.dev");
    setPassword("hacktoberfest2026");
    handleSubmit(undefined, "judge@necrostack.dev", "hacktoberfest2026");
  };

  return (
    <div className="w-full max-w-md mx-auto my-auto px-4 py-12">
      {/* Decorative Aura */}
      <div className="relative">
        <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-amber-500/20 via-orange-500/20 to-emerald-500/20 blur-xl opacity-70 animate-pulse pointer-events-none" />

        <div className="relative bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          {/* Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-950 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.2)] mb-2">
              <span className="text-2xl animate-pulse">🕯️</span>
            </div>
            <h1 className="text-2xl font-bold font-mono tracking-tight text-white flex items-center justify-center gap-2">
              Enter the <span className="text-amber-400">Crypt</span>
            </h1>
            <p className="text-xs text-slate-400 font-sans">
              Authenticate your Lead Necromancer credentials to commence code
              resurrection séances.
            </p>
          </div>

          {/* 1-Click Judge Demo Button */}
          <div className="mb-6">
            <button
              type="button"
              onClick={handleJudge1ClickLogin}
              disabled={loading || demoLoading}
              className="w-full group relative flex items-center justify-between px-4 py-3 rounded-xl bg-linear-to-r from-amber-500/15 via-emerald-500/15 to-amber-500/15 border border-amber-500/50 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] text-left transition-all overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  {demoLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                  ) : (
                    <Zap className="w-4 h-4 fill-amber-400" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
                    <span>⚡ 1-Click Judge Demo Login</span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-200 px-1.5 py-0.2 rounded font-sans">
                      Hacktoberfest
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">
                    judge@necrostack.dev • Auto-fill & Enter
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="relative flex items-center justify-center my-5">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-slate-900 px-3 text-[11px] font-mono text-slate-500 uppercase tracking-widest">
              or sign in with password
            </span>
            <div className="border-t border-slate-800 w-full" />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 flex items-start gap-2.5 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                Necromancer Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="archaeologist@necrostack.dev"
                  required
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl pl-9 pr-3 py-2.5 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                Ritual Passphrase
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl pl-9 pr-3 py-2.5 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || demoLoading}
              className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold text-slate-950 bg-linear-to-r from-amber-400 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Chanting Invocation...</span>
                </>
              ) : (
                <>
                  <span>🕯️ Unlock Workbench</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer links */}
          <div className="mt-6 text-center text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-4">
            <span>Don&apos;t have an altar yet? </span>
            <Link
              href="/signup"
              className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4"
            >
              Create Account (Sign Up)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center py-20 font-mono text-xs text-slate-500">
          <Loader2 className="w-5 h-5 animate-spin text-amber-400 mr-2" />
          Loading Crypt Gate...
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
