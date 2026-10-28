"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  User,
  Shield,
  ArrowRight,
  AlertCircle,
  Loader2,
} from "lucide-react";

const ROLES = [
  "Lead Necromancer",
  "Legacy Code Archaeologist",
  "Principal Systems Exorcist",
  "Ghost-in-the-Machine Overseer",
  "Open-Source Preservationist",
];

function SignUpContent() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(ROLES[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please provide your Necromancer name.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Ritual passphrase must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          role,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(
          data.error || "Failed to consecrate Necromancer account.",
        );
      }
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Failed to register Necromancer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto my-auto px-4 py-12">
      {/* Decorative Glow */}
      <div className="relative">
        <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-emerald-500/20 via-amber-500/20 to-orange-500/20 blur-xl opacity-70 animate-pulse pointer-events-none" />

        <div className="relative bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          {/* Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-950 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)] mb-2">
              <span className="text-2xl animate-pulse">💀</span>
            </div>
            <h1 className="text-2xl font-bold font-mono tracking-tight text-white flex items-center justify-center gap-2">
              Join the <span className="text-emerald-400">Séance</span>
            </h1>
            <p className="text-xs text-slate-400 font-sans">
              Create an operator identity to resurrect dead libraries and
              preserve the ghost in the machine.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-5 flex items-start gap-2.5 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                Full Name / Pseudonym
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Guido Van Rossum's Shadow"
                  required
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl pl-9 pr-3 py-2.5 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="maintainer@necrostack.dev"
                  required
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl pl-9 pr-3 py-2.5 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                Ritual Passphrase (min 6 characters)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  minLength={6}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl pl-9 pr-3 py-2.5 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                Necromancy Specialization (Role)
              </label>
              <div className="relative">
                <Shield className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl pl-9 pr-3 py-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                >
                  {ROLES.map((r) => (
                    <option
                      key={r}
                      value={r}
                      className="bg-slate-950 text-slate-200"
                    >
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold text-slate-950 bg-linear-to-r from-emerald-400 to-amber-400 hover:from-emerald-300 hover:to-amber-300 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Consecrating Altar...</span>
                </>
              ) : (
                <>
                  <span>🕯️ Enter the Crypt & Workbench</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer links */}
          <div className="mt-6 text-center text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-4">
            <span>Already hold Crypt credentials? </span>
            <Link
              href="/signin"
              className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4"
            >
              Sign In (or 1-Click Judge)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center py-20 font-mono text-xs text-slate-500">
          <Loader2 className="w-5 h-5 animate-spin text-emerald-400 mr-2" />
          Preparing Altar...
        </div>
      }
    >
      <SignUpContent />
    </Suspense>
  );
}
