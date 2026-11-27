"use client";

import React, { useState } from "react";
import Image from "next/image";
import { User, Mail, Lock, LogIn, UserPlus, ArrowRight } from "lucide-react";

export interface UserSession {
  id?: number;
  name: string;
  email: string;
}

export default function AuthGate({
  onAuthSuccess,
}: {
  onAuthSuccess: (user: UserSession) => void;
}) {
  const [tab, setTab] = useState<"register" | "login">("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (tab === "register") {
        if (!name.trim()) {
          setError("Please provide your full name");
          setLoading(false);
          return;
        }

        if (apiUrl) {
          try {
            const res = await fetch(`${apiUrl}/api/v1/auth/register`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            if (data.success && data.user) {
              onAuthSuccess(data.user);
              setLoading(false);
              return;
            }
          } catch (apiErr) {
            console.warn("Backend register error, fallback to session:", apiErr);
          }
        }

        const userObj: UserSession = { name, email };
        onAuthSuccess(userObj);
      } else {
        if (apiUrl) {
          try {
            const res = await fetch(`${apiUrl}/api/v1/auth/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (data.success && data.user) {
              onAuthSuccess(data.user);
              setLoading(false);
              return;
            } else {
              setError(data.message || "Invalid login credentials");
              setLoading(false);
              return;
            }
          } catch (apiErr) {
            console.warn("Backend login error, fallback to session:", apiErr);
          }
        }

        const userObj: UserSession = { name: email.split("@")[0] || "Member", email };
        onAuthSuccess(userObj);
      }
    } catch (err: any) {
      setError(err?.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestAccess = () => {
    onAuthSuccess({
      name: "Guest Explorer",
      email: "guest@magic3numbers.com",
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-10 rounded-[28px] sm:rounded-[36px] bg-white/90 backdrop-blur-xl border border-white shadow-2xl shadow-[#5B3BD1]/10 overflow-hidden box-border">
      {/* Header with Golden Logo */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center drop-shadow-md">
          <Image
            src="/logo.png"
            alt="magic3numbers star emblem"
            width={80}
            height={80}
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#0D0B1A] uppercase tracking-tight">
          Unlock Your Blueprint
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-[#4A4568]">
          Sign in or create a complimentary account to calculate and securely record your 3 Sacred Numbers.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex p-1 rounded-2xl bg-[#E7E3FB]/50 border border-[#5B3BD1]/15 mb-6">
        <button
          type="button"
          onClick={() => {
            setTab("register");
            setError(null);
          }}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
            tab === "register"
              ? "bg-[#5B3BD1] text-white shadow-md shadow-[#5B3BD1]/30"
              : "text-[#4A4568] hover:text-[#0D0B1A]"
          }`}
        >
          <UserPlus className="w-4 h-4" />
          <span>Create Account</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setTab("login");
            setError(null);
          }}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
            tab === "login"
              ? "bg-[#5B3BD1] text-white shadow-md shadow-[#5B3BD1]/30"
              : "text-[#4A4568] hover:text-[#0D0B1A]"
          }`}
        >
          <LogIn className="w-4 h-4" />
          <span>Sign In</span>
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs text-center font-medium">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {tab === "register" && (
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0B1A] mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#5B3BD1]" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alexander Vance"
              className="w-full px-4 py-3 rounded-xl sm:rounded-2xl bg-[#E7E3FB]/40 border border-[#5B3BD1]/20 text-[#0D0B1A] placeholder-[#4A4568]/50 focus:outline-none focus:border-[#5B3BD1] focus:bg-white text-sm font-medium transition-all"
            />
          </div>
        )}

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0B1A] mb-1.5 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#5B3BD1]" />
            <span>Email Address</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. alex@example.com"
            className="w-full px-4 py-3 rounded-xl sm:rounded-2xl bg-[#E7E3FB]/40 border border-[#5B3BD1]/20 text-[#0D0B1A] placeholder-[#4A4568]/50 focus:outline-none focus:border-[#5B3BD1] focus:bg-white text-sm font-medium transition-all"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0B1A] mb-1.5 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#5B3BD1]" />
            <span>Password</span>
          </label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 6 characters"
            className="w-full px-4 py-3 rounded-xl sm:rounded-2xl bg-[#E7E3FB]/40 border border-[#5B3BD1]/20 text-[#0D0B1A] placeholder-[#4A4568]/50 focus:outline-none focus:border-[#5B3BD1] focus:bg-white text-sm font-medium transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl sm:rounded-2xl bg-[#5B3BD1] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 ease-editorial hover:bg-[#3A1F8C] hover:shadow-xl hover:shadow-[#5B3BD1]/30 active:scale-98 flex items-center justify-center gap-2 shadow-md disabled:opacity-70 mt-2"
        >
          {loading ? (
            <span>Processing...</span>
          ) : (
            <>
              <span>{tab === "register" ? "Create Account & Continue" : "Sign In & Access"}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Guest / Instant Access Option */}
      <div className="mt-5 pt-4 border-t border-[#5B3BD1]/10 text-center">
        <button
          type="button"
          onClick={handleGuestAccess}
          className="text-xs text-[#5B3BD1] hover:underline font-medium"
        >
          Or continue as guest explorer without password &rarr;
        </button>
      </div>
    </div>
  );
}
