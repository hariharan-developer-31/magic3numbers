"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, RefreshCw, Sparkles, Share2, Check } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import DashboardSection from "@/components/DashboardSection";
import InsightsCalendarSection from "@/components/InsightsCalendarSection";
import PremiumReportSection from "@/components/PremiumReportSection";
import Footer from "@/components/Footer";
import { BirthInput, FullCosmicAnalysis } from "@/types/astrology";
import { performFullAnalysis } from "@/lib/engines/synthesis";

const DEFAULT_INPUT: BirthInput = {
  fullName: "Cosmic Explorer",
  birthDate: "1992-05-18",
  birthTime: "14:30",
  isTimeUnknown: false,
  birthCity: "Kuala Lumpur",
  latitude: 3.139,
  longitude: 101.6869,
  timezone: "Asia/Kuala_Lumpur",
  utcOffset: 8,
};

export default function BlueprintPage() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState<FullCosmicAnalysis | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Attempt to load active calculated blueprint from localStorage
    try {
      const stored = localStorage.getItem("magic3_active_blueprint");
      if (stored) {
        const parsed = JSON.parse(stored);
        setAnalysis(parsed);
        return;
      }
    } catch (e) {
      console.warn("Failed to load stored blueprint:", e);
    }

    // Fallback to default analysis if accessed directly
    setAnalysis(performFullAnalysis(DEFAULT_INPUT));
  }, []);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!analysis) {
    return (
      <div className="min-h-screen w-full bg-[#E7E3FB] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#5B3BD1] border-t-transparent animate-spin" />
          <span className="text-xs uppercase font-semibold tracking-wider text-[#5B3BD1]">
            Rendering Blueprint...
          </span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#E7E3FB] text-[#0D0B1A] flex flex-col justify-between selection:bg-[#5B3BD1] selection:text-white">
      {/* =========================================================================
          TOP NAVIGATION BAR: Sticky, with prominent "Back to Website" action
          ========================================================================= */}
      <header className="sticky top-0 z-40 w-full bg-[#E7E3FB]/90 backdrop-blur-md border-b border-[#5B3BD1]/10 shadow-xs">
        <div className="content-container flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Back to Website Button */}
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white text-[#0D0B1A] border border-[#5B3BD1]/20 hover:border-[#5B3BD1] hover:bg-[#5B3BD1] hover:text-white transition-all text-xs sm:text-sm font-semibold shadow-xs flex-shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5B3BD1] group-hover:text-white group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Back to Website</span>
            <span className="inline sm:hidden">Back</span>
          </Link>

          {/* Centered Brand Logo */}
          <Link href="/" className="focus:outline-none flex-shrink-0">
            <BrandLogo textColor="text-[#0D0B1A]" className="w-7 h-7 sm:w-9 sm:h-9" />
          </Link>

          {/* Right Action: Recalculate or Share */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={handleShare}
              title="Copy Blueprint link"
              className="p-2 sm:px-3 sm:py-2 rounded-full bg-white text-[#4A4568] border border-[#5B3BD1]/15 hover:border-[#5B3BD1] hover:text-[#5B3BD1] transition-colors text-xs font-semibold flex items-center gap-1.5 shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline text-emerald-600">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

            <Link
              href="/#profile-generator"
              className="inline-flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-[#5B3BD1] text-white hover:bg-[#3A1F8C] transition-colors text-xs font-semibold shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Profile</span>
            </Link>
          </div>
        </div>
      </header>

      {/* =========================================================================
          PAGE CONTENT: The 3 Numbers 1st, Sequential Interlocking Flow, Detailed Tabs,
          Temporal Calendar, and Complete Synthesis Dossier
          ========================================================================= */}
      <div className="flex-1">
        {/* The 3 Sacred Numbers Revealed 1st & Interlocking Dynamics */}
        <DashboardSection analysis={analysis} />

        {/* Temporal Cycles & Daily/Weekly/Monthly Calendar */}
        <InsightsCalendarSection synthesis={analysis.synthesis} />

        {/* Synthesis Dossier Reports & Download */}
        <PremiumReportSection analysis={analysis} />

        {/* Bottom Return Banner */}
        <div className="py-12 sm:py-16 bg-[#E4E0FA] border-t border-[#5B3BD1]/15">
          <div className="content-container text-center max-w-xl mx-auto">
            <span className="editorial-caption text-[#5B3BD1]">Exploration Complete</span>
            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#0D0B1A] mt-1 mb-3">
              Ready to Explore More?
            </h3>
            <p className="text-xs sm:text-sm text-[#4A4568] mb-6">
              Return to the main platform to read about the methodology or calculate another blueprint.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#0D0B1A] border border-[#5B3BD1]/20 hover:border-[#5B3BD1] hover:bg-[#5B3BD1] hover:text-white transition-all text-xs sm:text-sm font-semibold shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Website</span>
              </Link>
              <Link
                href="/#profile-generator"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#5B3BD1] text-white hover:bg-[#3A1F8C] transition-colors text-xs sm:text-sm font-semibold shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-[#CFC6F6]" />
                <span>Calculate Another Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Footer */}
      <Footer />
    </main>
  );
}
