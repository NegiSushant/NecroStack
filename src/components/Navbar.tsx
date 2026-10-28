"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Skull,
  LogOut,
  Menu,
  X,
  UserCheck,
} from "lucide-react";

interface CurrentUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (mounted) {
            setUser(data.user || null);
          }
        }
      } catch (err) {
        console.warn("Auth check error in navbar:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    checkAuth();

    return () => {
      mounted = false;
    };
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" });
      setUser(null);
      router.push("/signin");
      router.refresh();
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Brand Logo */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-linear-to-br from-amber-500/20 via-orange-600/10 to-emerald-500/20 border border-amber-500/40 group-hover:border-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                <span className="text-lg">🕯️</span>
                <Skull className="w-3.5 h-3.5 absolute bottom-0.5 right-0.5 text-slate-400 group-hover:text-amber-300 transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold font-mono tracking-tight text-white flex items-center gap-1 group-hover:text-amber-200 transition-colors">
                  Necro<span className="text-amber-400">Stack</span>
                </span>
              </div>
            </Link>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border border-amber-500/30 bg-amber-500/10 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.1)]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Week 4 • Ghost in the Machine
            </span>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              href="/#how-it-works"
              className="px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
            >
              About & Working
            </Link>
            <Link
              href="/#ritual-flow"
              className="px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
            >
              Ritual Flow
            </Link>
            <Link
              href="/#architecture"
              className="px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
            >
              Architecture
            </Link>
            <Link
              href="/dashboard"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold rounded-lg transition-all ${
                pathname === "/dashboard"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  : "bg-slate-900/90 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-950/40 hover:border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)]"
              }`}
            >
              <span>🕯️</span>
              <span>Crypt Workbench</span>
            </Link>
          </div>

          {/* Right Auth Controls (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {!loading && user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono">
                  <div className="w-6 h-6 rounded-md bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <UserCheck className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-slate-200 font-semibold leading-tight">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-amber-400/90 leading-none">
                      {user.role}
                    </span>
                  </div>
                </div>

                {pathname !== "/dashboard" && (
                  <Link
                    href="/dashboard"
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-colors"
                  >
                    Open Workbench
                  </Link>
                )}

                <button
                  onClick={handleSignOut}
                  title="Sign out of the Crypt"
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 border border-transparent hover:border-rose-500/30 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : !loading ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="px-3.5 py-1.5 text-xs font-mono text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-semibold text-slate-950 bg-linear-to-br from-amber-400 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all transform hover:-translate-y-0.5"
                >
                  <span>Enter the Crypt</span>
                  <span className="text-[10px]">→</span>
                </Link>
              </div>
            ) : (
              <div className="h-8 w-24 bg-slate-900 animate-pulse rounded-lg" />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-4 space-y-2 font-mono text-xs">
          <Link
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-md"
          >
            About & Working
          </Link>
          <Link
            href="/#ritual-flow"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-md"
          >
            Ritual Flow
          </Link>
          <Link
            href="/#architecture"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-md"
          >
            Architecture
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 rounded-md font-semibold"
          >
            🕯️ Crypt Workbench
          </Link>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            {!loading && user ? (
              <div className="space-y-2">
                <div className="px-3 py-2 bg-slate-900 rounded-md text-slate-300">
                  <p className="font-semibold text-white">{user.name}</p>
                  <p className="text-[10px] text-amber-400">{user.role}</p>
                  <p className="text-[10px] text-slate-500">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-rose-300 bg-rose-950/40 border border-rose-500/30 rounded-md hover:bg-rose-900/40"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : !loading ? (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center px-3 py-2 text-slate-300 bg-slate-900 border border-slate-800 rounded-md"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center px-3 py-2 text-slate-950 font-bold bg-amber-400 hover:bg-amber-300 rounded-md"
                >
                  Sign Up
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
};

