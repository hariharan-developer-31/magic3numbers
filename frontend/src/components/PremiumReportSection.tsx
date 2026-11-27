"use client";

import React, { useState } from "react";
import { Check, Download, FileText, Lock, Shield, Sparkles } from "lucide-react";
import { FullCosmicAnalysis } from "@/types/astrology";

export default function PremiumReportSection({ analysis }: { analysis: FullCosmicAnalysis }) {
  const [downloading, setDownloading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const handleDownloadReport = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      // Generate clean JSON/Text export of the personal dossier
      const dossier = {
        title: "magic3numbers — Comprehensive Personal Cosmic Blueprint",
        subject: analysis.input.fullName,
        birthParameters: analysis.input,
        cosmicTriad: analysis.synthesis.cosmicTriad,
        numerologyBreakdown: analysis.numerology,
        vedicKundali: analysis.vedic,
        westernAspects: analysis.western,
        synthesisReport: analysis.synthesis,
        generatedAt: new Date().toISOString(),
      };

      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dossier, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `magic3numbers_${analysis.input.fullName.replace(/\s+/g, "_")}_blueprint.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    }, 1200);
  };

  return (
    <section
      id="premium-reports"
      data-theme="light"
      className="relative min-h-screen w-full py-24 md:py-32 bg-[#E7E3FB] text-[#0D0B1A] flex items-center overflow-hidden"
    >
      <div className="content-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="editorial-caption text-[#5B3BD1]">Transparent Tiers &amp; Dossiers</span>
          <h2 className="section-headline mt-3 uppercase tracking-tight">
            Complete Synthesis <span className="text-[#5B3BD1]">Reports.</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-[#4A4568]">
            Experience your complete synthesized astrological and numerological blueprint.
            Available instantly for digital consultation and downloadable export.
          </p>
        </div>

        {/* Pricing & Access Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Free Standard Tier */}
          <div className="p-8 sm:p-12 rounded-[32px] bg-white/70 border border-[#5B3BD1]/15 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider font-bold text-[#4A4568]">
                  Standard Discovery
                </span>
                <span className="px-3 py-1 rounded-full bg-[#E7E3FB] text-xs font-bold text-[#5B3BD1]">
                  Complimentary
                </span>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-[#0D0B1A]">Free</span>
                <span className="text-xs text-[#4A4568] ml-2">No expiration</span>
              </div>
              <p className="text-xs md:text-sm text-[#4A4568] leading-relaxed mb-8">
                Basic cosmic profile access including your primary Life Path Number, Western Sun Sign,
                and Vedic Moon Sign.
              </p>

              <ul className="space-y-3.5 text-xs text-[#0D0B1A]">
                {[
                  "Core Life Path Number calculation",
                  "Western Sun and Vedic Moon Sign identification",
                  "Primary daily cycle overview",
                  "Standard web access",
                ].map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#5B3BD1] flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-6 border-t border-[#5B3BD1]/15">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("dashboard-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full py-4 rounded-2xl bg-white border border-[#5B3BD1]/30 text-[#0D0B1A] text-xs font-semibold tracking-wider uppercase hover:border-[#5B3BD1] transition-colors"
              >
                Current Active Tier
              </button>
            </div>
          </div>

          {/* Lifetime Comprehensive Access Tier */}
          <div className="p-8 sm:p-12 rounded-[32px] bg-gradient-to-b from-[#3A1F8C] to-[#0D0B1A] text-white border border-[#CFC6F6]/30 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#5B3BD1] opacity-50 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider font-bold text-[#CFC6F6]">
                  Comprehensive Blueprint
                </span>
                <span className="px-3.5 py-1 rounded-full bg-[#5B3BD1] text-xs font-bold text-white shadow-sm">
                  Full Lifetime
                </span>
              </div>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white">RM 19.90</span>
                <span className="text-xs text-[#CFC6F6]/70">One-time payment</span>
              </div>
              <p className="text-xs md:text-sm text-[#CFC6F6]/85 leading-relaxed mb-8">
                Unlock the entire deterministic dossier: North Indian D1 Kundali with all planetary degrees,
                Western aspects wheel, master numbers, and personal calendar.
              </p>

              <ul className="space-y-3.5 text-xs text-white">
                {[
                  "Full Vedic D1 Chart & 27 Nakshatras / 108 Padas breakdown",
                  "Western aspects matrix with exact degree orbs",
                  "Complete Pythagorean Numerology (Soul Urge, Expression, Destiny)",
                  "Preserved Master Numbers (11, 22, 33) synthesis",
                  "Full Personal Calendar (Daily, Weekly, Monthly forecast cycles)",
                  "Exportable High-Resolution JSON / PDF Blueprint Dossier",
                ].map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#CFC6F6] flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-6 border-t border-[#CFC6F6]/20 relative z-10">
              {unlocked ? (
                <button
                  type="button"
                  onClick={handleDownloadReport}
                  disabled={downloading}
                  className="w-full py-4 rounded-2xl bg-[#5B3BD1] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#5B3BD1]/90 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloading ? "Preparing Dossier..." : "Download Blueprint Dossier"}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setUnlocked(true);
                  }}
                  className="w-full py-4 rounded-2xl bg-white text-[#0D0B1A] text-xs font-semibold tracking-wider uppercase hover:bg-[#CFC6F6] transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-[#5B3BD1]" />
                  <span>Unlock Full Lifetime Blueprint</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
