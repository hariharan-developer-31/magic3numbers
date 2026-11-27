"use client";

import React, { useState } from "react";
import { FullCosmicAnalysis } from "@/types/astrology";
import VedicChart from "./VedicChart";
import {
  Sparkles,
  Sun,
  Moon,
  Hash,
  Compass,
  Info,
  Check,
  Layers,
  Calendar as CalendarIcon,
  HelpCircle,
  ArrowDown,
  Link2,
} from "lucide-react";

export default function DashboardSection({ analysis }: { analysis: FullCosmicAnalysis }) {
  const [selectedPlanetaryNum, setSelectedPlanetaryNum] = useState<number>(
    analysis.numerology.lifePathNumber
  );
  const [activeTab, setActiveTab] = useState<
    "overview" | "vedic" | "western" | "numerology" | "planetary"
  >("overview");

  const { numerology, vedic, western, synthesis, input } = analysis;

  const sunSign = western?.sunSign || "Taurus";
  const risingSign = western?.risingSign || "Aries";
  const moonSign = vedic?.moonSign || "Scorpio";
  const moonNakshatra = vedic?.moonNakshatra || "Anuradha";
  const moonPada = vedic?.moonPada || 1;
  const ascendantSign = vedic?.ascendantSign || "Sagittarius";

  const currentPlanetaryDetail =
    synthesis.planetaryNumberLinks.find((p) => p.number === selectedPlanetaryNum) ||
    synthesis.planetaryNumberLinks[0];

  return (
    <section
      id="dashboard-section"
      data-theme="light"
      className="relative min-h-screen w-full py-16 sm:py-24 md:py-32 bg-[#E7E3FB] text-[#0D0B1A] overflow-hidden"
    >
      <div className="content-container relative z-10">
        {/* Header with User Metadata */}
        <div className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5B3BD1]/10 text-[#5B3BD1] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Blueprint Calculated &amp; Verified</span>
          </div>
          <h2 className="section-headline uppercase tracking-tight text-[#0D0B1A]">
            Your Cosmic Blueprint: <span className="text-[#5B3BD1]">{input.fullName || "Your Cosmic Identity"}</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#4A4568] font-mono break-words">
            Born {input.birthDate} {input.isTimeUnknown ? "(Time Unverified)" : `@ ${input.birthTime}`}{" "}
            &bull; {input.birthCity} ({input.latitude.toFixed(2)}°N, {input.longitude.toFixed(2)}°E)
          </p>
        </div>

        {/* =========================================================================
            REQUIREMENT: SHOW THE 3 NUMBERS 1ST PROMINENTLY
            ========================================================================= */}
        <div className="mb-14 sm:mb-20">
          <div className="text-center mb-8">
            <span className="editorial-caption text-[#5B3BD1]">The Sacred Triad</span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#0D0B1A] mt-1">
              Your 3 Sacred Numbers
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#4A4568] max-w-lg mx-auto">
              Synthesized deterministically from your date of birth, birth day vibration, and full birth name matrix.
            </p>

            {/* Prominent 3 Numbers Top Display */}
            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 p-5 sm:p-8 rounded-[32px] sm:rounded-[40px] bg-white border border-[#5B3BD1]/20 shadow-2xl shadow-[#5B3BD1]/15">
              {/* Number 1: Life Path */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#5B3BD1] mb-1.5">
                  1st Number
                </span>
                <div className="w-16 h-16 sm:w-22 sm:h-22 rounded-2xl sm:rounded-3xl bg-[#5B3BD1] text-white flex items-center justify-center text-3xl sm:text-4xl font-extrabold shadow-lg shadow-[#5B3BD1]/30">
                  {numerology.lifePathNumber}
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#0D0B1A] mt-2">
                  Life Path
                </span>
                <span className="text-[10px] text-[#4A4568]">Solar Purpose</span>
              </div>

              <span className="hidden sm:inline-block text-3xl font-extrabold text-[#5B3BD1]/30">•</span>

              {/* Number 2: Birthday */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#3A1F8C] mb-1.5">
                  2nd Number
                </span>
                <div className="w-16 h-16 sm:w-22 sm:h-22 rounded-2xl sm:rounded-3xl bg-[#3A1F8C] text-white flex items-center justify-center text-3xl sm:text-4xl font-extrabold shadow-lg shadow-[#3A1F8C]/30 border-2 border-[#CFC6F6]/40">
                  {numerology.birthdayNumber}
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#0D0B1A] mt-2">
                  Birthday
                </span>
                <span className="text-[10px] text-[#4A4568]">Lunar Asterism</span>
              </div>

              <span className="hidden sm:inline-block text-3xl font-extrabold text-[#5B3BD1]/30">•</span>

              {/* Number 3: Expression */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#5B3BD1] mb-1.5">
                  3rd Number
                </span>
                <div className="w-16 h-16 sm:w-22 sm:h-22 rounded-2xl sm:rounded-3xl bg-[#5B3BD1] text-white flex items-center justify-center text-3xl sm:text-4xl font-extrabold shadow-lg shadow-[#5B3BD1]/30">
                  {numerology.expressionNumber}
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#0D0B1A] mt-2">
                  Expression
                </span>
                <span className="text-[10px] text-[#4A4568]">Soul Calling</span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              REQUIREMENT: STEP-BY-STEP CONNECTED FLOW (ONE BY ONE LINKED TOGETHER)
              ========================================================================= */}
          <div className="mt-8 sm:mt-12 p-6 sm:p-10 md:p-12 rounded-[32px] sm:rounded-[40px] bg-white/90 backdrop-blur-md border border-white shadow-xl shadow-[#5B3BD1]/5">
            {/* Header with perfectly proportioned square icon badge */}
            <div className="flex items-center gap-3.5 sm:gap-4 mb-8 sm:mb-12 pb-5 border-b border-[#5B3BD1]/15">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#5B3BD1] to-[#3A1F8C] border border-[#5B3BD1]/30 text-white flex items-center justify-center shadow-md shadow-[#5B3BD1]/20 flex-shrink-0 aspect-square">
                <Layers className="w-5 h-5 text-[#CFC6F6]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="editorial-caption text-[#5B3BD1] block">Sequential Cosmic Circuit</span>
                <h4 className="text-lg sm:text-2xl font-extrabold uppercase tracking-tight text-[#0D0B1A] leading-tight">
                  How Your 3 Sacred Numbers Flow &bull; Connected Blueprint
                </h4>
              </div>
            </div>

            {/* Vertical Connected Timeline Flow */}
            <div className="relative pl-6 sm:pl-10 space-y-8 sm:space-y-10 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-6 before:w-0.5 before:bg-gradient-to-b before:from-[#5B3BD1] before:via-[#3A1F8C] before:to-[#5B3BD1]">
              {/* Node 1: Life Path */}
              <div className="relative group transition-all duration-300 ease-editorial hover:translate-x-1">
                {/* Flow Node Pin */}
                <div className="absolute -left-6 sm:-left-10 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#5B3BD1] text-white flex items-center justify-center text-[10px] sm:text-xs font-extrabold shadow-md shadow-[#5B3BD1]/30 border-2 border-white">
                  01
                </div>

                <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#E7E3FB]/40 border border-[#5B3BD1]/15 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs uppercase font-extrabold tracking-wider text-[#5B3BD1]">
                      Step 1: The Prime Direction
                    </span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white text-[#5B3BD1] font-bold border border-[#5B3BD1]/20">
                      Western Sun in {sunSign}
                    </span>
                  </div>
                  <h5 className="text-base sm:text-lg font-bold text-[#0D0B1A] mb-2">
                    Life Path Vibration (Number {numerology.lifePathNumber})
                  </h5>
                  <p className="text-xs sm:text-sm text-[#4A4568] leading-relaxed">
                    Governs your overarching destiny trajectory, spiritual will, and conscious life mission. Operating through the lens of {sunSign}, you are configured to embody: {numerology.descriptions.lifePath}
                  </p>
                </div>
              </div>

              {/* Connector Link 1 -> 2 */}
              <div className="relative -my-3 sm:-my-4 flex items-center gap-2 text-[11px] font-semibold text-[#5B3BD1] pl-2">
                <div className="w-5 h-5 rounded-full bg-white border border-[#5B3BD1]/30 flex items-center justify-center text-[#5B3BD1] shadow-xs">
                  <ArrowDown className="w-3 h-3" />
                </div>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#4A4568] bg-white/80 px-2 py-0.5 rounded-md border border-[#5B3BD1]/10">
                  Infuses conscious willpower into instinctive subconscious sanctuary
                </span>
              </div>

              {/* Node 2: Birthday Vibration */}
              <div className="relative group transition-all duration-300 ease-editorial hover:translate-x-1">
                {/* Flow Node Pin */}
                <div className="absolute -left-6 sm:-left-10 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#3A1F8C] text-white flex items-center justify-center text-[10px] sm:text-xs font-extrabold shadow-md shadow-[#3A1F8C]/30 border-2 border-white">
                  02
                </div>

                <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#3A1F8C]/5 border border-[#3A1F8C]/15 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs uppercase font-extrabold tracking-wider text-[#3A1F8C]">
                      Step 2: The Innate Core
                    </span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white text-[#3A1F8C] font-bold border border-[#3A1F8C]/20">
                      Sidereal Moon in {moonSign} &bull; {moonNakshatra}
                    </span>
                  </div>
                  <h5 className="text-base sm:text-lg font-bold text-[#0D0B1A] mb-2">
                    Birthday Vibration (Number {numerology.birthdayNumber})
                  </h5>
                  <p className="text-xs sm:text-sm text-[#4A4568] leading-relaxed">
                    Represents your instinctive talents, emotional sanctuary, and unlearned gifts. Anchored in the sidereal asterism of {moonNakshatra} (Pada {moonPada}), it supplies: {numerology.descriptions.birthday}
                  </p>
                </div>
              </div>

              {/* Connector Link 2 -> 3 */}
              <div className="relative -my-3 sm:-my-4 flex items-center gap-2 text-[11px] font-semibold text-[#5B3BD1] pl-2">
                <div className="w-5 h-5 rounded-full bg-white border border-[#5B3BD1]/30 flex items-center justify-center text-[#5B3BD1] shadow-xs">
                  <ArrowDown className="w-3 h-3" />
                </div>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#4A4568] bg-white/80 px-2 py-0.5 rounded-md border border-[#5B3BD1]/10">
                  Projects inner subconscious instincts outward into the worldly calling
                </span>
              </div>

              {/* Node 3: Expression Calling */}
              <div className="relative group transition-all duration-300 ease-editorial hover:translate-x-1">
                {/* Flow Node Pin */}
                <div className="absolute -left-6 sm:-left-10 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#5B3BD1] text-white flex items-center justify-center text-[10px] sm:text-xs font-extrabold shadow-md shadow-[#5B3BD1]/30 border-2 border-white">
                  03
                </div>

                <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#E7E3FB]/40 border border-[#5B3BD1]/15 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs uppercase font-extrabold tracking-wider text-[#5B3BD1]">
                      Step 3: The Outward Impact
                    </span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white text-[#5B3BD1] font-bold border border-[#5B3BD1]/20">
                      Ascendant Lagna in {ascendantSign}
                    </span>
                  </div>
                  <h5 className="text-base sm:text-lg font-bold text-[#0D0B1A] mb-2">
                    Expression Number (Number {numerology.expressionNumber})
                  </h5>
                  <p className="text-xs sm:text-sm text-[#4A4568] leading-relaxed">
                    Derived from your full birth name matrix, determining how your inner talents are manifested in your career, relationships, and legacy: {numerology.descriptions.expression}
                  </p>
                </div>
              </div>

              {/* Connector Link 3 -> 4 */}
              <div className="relative -my-3 sm:-my-4 flex items-center gap-2 text-[11px] font-semibold text-[#5B3BD1] pl-2">
                <div className="w-5 h-5 rounded-full bg-white border border-[#5B3BD1]/30 flex items-center justify-center text-[#5B3BD1] shadow-xs">
                  <ArrowDown className="w-3 h-3" />
                </div>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#4A4568] bg-white/80 px-2 py-0.5 rounded-md border border-[#5B3BD1]/10">
                  Completes the closed vibrational circuit into your personal blueprint
                </span>
              </div>

              {/* Node 4: Integrated Synthesis Outcome */}
              <div className="relative group transition-all duration-300 ease-editorial hover:translate-x-1">
                {/* Flow Node Pin */}
                <div className="absolute -left-6 sm:-left-10 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#5B3BD1] to-[#3A1F8C] text-white flex items-center justify-center text-[10px] sm:text-xs font-extrabold shadow-md shadow-[#5B3BD1]/40 border-2 border-white">
                  ✓
                </div>

                <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#3A1F8C] to-[#16122C] text-white border border-[#CFC6F6]/30 shadow-xl">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-extrabold text-[#CFC6F6] block mb-2">
                    Integrated Synthesis &bull; The Complete 3-Number Circuit
                  </span>
                  <p className="text-xs sm:text-sm text-[#E4E0FA] font-normal leading-relaxed">
                    Your three sacred numbers — <strong>{numerology.lifePathNumber}</strong> (Life Path), <strong>{numerology.birthdayNumber}</strong> (Birthday), and <strong>{numerology.expressionNumber}</strong> (Expression) — lock together like gear teeth. In tandem with your Tropical {sunSign} Sun, Sidereal {moonSign} ({moonNakshatra}) Moon, and {ascendantSign} Lagna, they form a harmonious compass for all decision-making, creative focus, and personal evolution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            DETAILED TABS: Kundali D1, Western Aspects, Numerology, Planetary 1-9
            Mobile-optimized horizontal scrollable tabs
            ========================================================================= */}
        <div className="mb-8">
          <div className="flex items-center justify-between pb-3 border-b border-[#5B3BD1]/15 mb-6">
            <h4 className="text-base sm:text-lg font-bold uppercase tracking-tight text-[#0D0B1A]">
              Detailed Astronomical &amp; Numerological Explorations
            </h4>
            <span className="text-xs text-[#4A4568] hidden sm:inline">Select a view below</span>
          </div>

          {/* Swipeable Tabs Bar on Mobile & Tablet */}
          <div className="flex overflow-x-auto no-scrollbar scroll-smooth space-x-2 pb-2">
            {[
              { id: "overview", label: "Overview & Derivation" },
              { id: "vedic", label: "Vedic D1 Kundali Chart" },
              { id: "western", label: "Western Aspects Matrix" },
              { id: "numerology", label: "Full Numerology Matrix" },
              { id: "planetary", label: "Planetary 1–9 Frequencies" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-xs font-semibold tracking-wide transition-all ${
                  activeTab === tab.id
                    ? "bg-[#5B3BD1] text-white shadow-md shadow-[#5B3BD1]/30"
                    : "bg-white/80 text-[#4A4568] hover:text-[#0D0B1A] hover:bg-white border border-[#5B3BD1]/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: OVERVIEW & DERIVATIONS */}
        {activeTab === "overview" && (
          <div className="animate-fade-in space-y-6">
            <div className="p-6 sm:p-10 rounded-3xl bg-white/80 border border-white shadow-md">
              <div className="flex items-center gap-2 mb-4 text-[#5B3BD1]">
                <Info className="w-4 h-4 flex-shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                  Mathematical Derivation &amp; Transparency Rationales
                </h4>
              </div>
              <p className="text-xs text-[#4A4568] mb-6">
                Every calculation in magic3numbers is transparent and reproducible. No AI model is
                permitted to fabricate your astrological coordinates or numerological values.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {synthesis.derivedRationales.map((rationale, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#E7E3FB]/40 border border-[#5B3BD1]/15 flex items-start gap-3 text-xs text-[#4A4568]"
                  >
                    <Check className="w-4 h-4 text-[#5B3BD1] flex-shrink-0 mt-0.5" />
                    <span>{rationale}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VEDIC D1 KUNDALI */}
        {activeTab === "vedic" && (
          <div className="animate-fade-in space-y-6">
            <VedicChart vedic={vedic} />
          </div>
        )}

        {/* TAB 3: WESTERN ASPECTS */}
        {activeTab === "western" && (
          <div className="p-6 sm:p-10 rounded-3xl bg-white/80 border border-white shadow-md animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-4 border-b border-[#5B3BD1]/15">
              <div>
                <span className="editorial-caption text-[#5B3BD1]">Tropical Placidus Calculations</span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0D0B1A] mt-1">
                  Western Planetary Placements &amp; Aspects
                </h3>
              </div>
              <span className="text-xs font-mono text-[#5B3BD1] bg-[#E7E3FB] px-3.5 py-1.5 rounded-full w-fit">
                {western.aspects.length} Active Geometric Aspects
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Placements */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A4568] mb-3">
                  Tropical Celestial Placements
                </h4>
                <div className="space-y-2.5">
                  {western.placements.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-[#E7E3FB]/40 border border-[#5B3BD1]/15 flex items-center justify-between text-xs"
                    >
                      <span className="font-bold text-[#5B3BD1] text-sm">{p.planet}</span>
                      <span className="font-semibold text-[#0D0B1A]">
                        {p.sign} {p.degree}° {p.minute}&apos;
                      </span>
                      <span className="text-[#4A4568] font-mono">House {p.house}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Major Geometric Aspects */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A4568] mb-3">
                  Major Harmonic Aspects (Orbs &lt;= 8°)
                </h4>
                <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                  {western.aspects.map((asp, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white border border-[#5B3BD1]/15 flex items-center justify-between text-xs shadow-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#0D0B1A]">{asp.planet1}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#5B3BD1]/10 text-[#5B3BD1] font-semibold">
                          {asp.aspectType} ({asp.angle}°)
                        </span>
                        <span className="font-bold text-[#0D0B1A]">{asp.planet2}</span>
                      </div>
                      <span className="font-mono text-[#4A4568]">orb {asp.orb}°</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: NUMEROLOGY MATRIX */}
        {activeTab === "numerology" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 animate-fade-in">
            {[
              {
                title: "Life Path Number",
                val: numerology.lifePathNumber,
                desc: numerology.descriptions.lifePath,
                isMaster: numerology.isMasterLifePath,
              },
              {
                title: "Birthday Number",
                val: numerology.birthdayNumber,
                desc: numerology.descriptions.birthday,
                isMaster: false,
              },
              {
                title: "Expression / Destiny",
                val: numerology.expressionNumber,
                desc: numerology.descriptions.expression,
                isMaster: numerology.isMasterExpression,
              },
              {
                title: "Soul Urge (Vowels)",
                val: numerology.soulUrgeNumber,
                desc: numerology.descriptions.soulUrge,
                isMaster: numerology.isMasterSoulUrge,
              },
              {
                title: "Personality (Consonants)",
                val: numerology.personalityNumber,
                desc: numerology.descriptions.personality,
                isMaster: numerology.isMasterPersonality,
              },
              {
                title: "Personal Year (2026)",
                val: numerology.personalYearNumber,
                desc: numerology.descriptions.personalYear,
                isMaster: false,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-[28px] bg-white/80 border border-white shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider font-bold text-[#4A4568]">
                      {item.title}
                    </span>
                    {item.isMaster && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#5B3BD1] text-white font-bold uppercase">
                        Master
                      </span>
                    )}
                  </div>
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#5B3BD1] block mb-2">
                    {item.val}
                  </span>
                  <p className="text-xs text-[#4A4568] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: PLANETARY 1-9 ASSOCIATIONS */}
        {activeTab === "planetary" && (
          <div className="p-6 sm:p-10 rounded-3xl bg-white/80 border border-white shadow-lg animate-fade-in">
            <div className="max-w-xl mb-6">
              <span className="editorial-caption text-[#5B3BD1]">Cosmological Correspondence</span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0D0B1A] mt-1">
                Canonical 1–9 Planetary Vibration Matrix
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#4A4568]">
                Tap any digit (1–9) to inspect its governing celestial archetype, Sanskrit name, and
                energetic influence.
              </p>
            </div>

            {/* Clickable 1-9 Number Selector */}
            <div className="grid grid-cols-3 sm:grid-cols-9 gap-2.5 sm:gap-3 mb-8">
              {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setSelectedPlanetaryNum(n)}
                  className={`py-3.5 sm:py-4 rounded-2xl flex flex-col items-center justify-center transition-all ${
                    selectedPlanetaryNum === n
                      ? "bg-[#5B3BD1] text-white shadow-lg shadow-[#5B3BD1]/30 scale-105"
                      : "bg-[#E7E3FB]/50 text-[#0D0B1A] hover:bg-[#E7E3FB]"
                  }`}
                >
                  <span className="text-xl sm:text-2xl font-extrabold">{n}</span>
                </button>
              ))}
            </div>

            {/* Selected Planetary Details */}
            {currentPlanetaryDetail && (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#E7E3FB]/60 border border-[#5B3BD1]/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#5B3BD1]">
                      {currentPlanetaryDetail.number}
                    </span>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-[#0D0B1A]">
                        {currentPlanetaryDetail.planet} &bull; {currentPlanetaryDetail.sanskritName}
                      </h4>
                      <span className="text-xs uppercase tracking-wider text-[#4A4568] font-semibold">
                        {currentPlanetaryDetail.energy}
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-[#4A4568] max-w-xl leading-relaxed">
                    {currentPlanetaryDetail.relevanceToUser}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {currentPlanetaryDetail.qualities.map((q, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-full bg-white text-xs font-semibold text-[#5B3BD1] shadow-xs"
                    >
                      {q}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
