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
} from "lucide-react";

export default function DashboardSection({ analysis }: { analysis: FullCosmicAnalysis }) {
  const [selectedPlanetaryNum, setSelectedPlanetaryNum] = useState<number>(
    analysis.numerology.lifePathNumber
  );
  const [activeTab, setActiveTab] = useState<
    "overview" | "vedic" | "western" | "numerology" | "planetary"
  >("overview");

  const { numerology, vedic, western, synthesis, input } = analysis;

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
            Your Cosmic Blueprint: <span className="text-[#5B3BD1]">{input.fullName}</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#4A4568] font-mono break-words">
            Born {input.birthDate} {input.isTimeUnknown ? "(Time Unverified)" : `@ ${input.birthTime}`}{" "}
            &bull; {input.birthCity} ({input.latitude.toFixed(2)}°N, {input.longitude.toFixed(2)}°E)
          </p>
        </div>

        {/* =========================================================================
            REQUIREMENT: SHOW THE 3 NUMBERS 1ST
            ========================================================================= */}
        <div className="mb-14 sm:mb-20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="editorial-caption text-[#5B3BD1]">The Sacred Triad</span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-[#0D0B1A] mt-1">
                Your 3 Sacred Numbers
              </h3>
            </div>
            <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-[#5B3BD1] font-bold bg-white/70 px-3 py-1 rounded-full border border-[#5B3BD1]/20">
              Primary Identifiers
            </span>
          </div>

          {/* The 3 Cards - Grid: 1 col on mobile, 3 cols on tablet/desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {/* Number 1: Western Tropical Sun */}
            <div className="relative p-6 sm:p-8 rounded-[28px] bg-white/90 border border-white shadow-xl shadow-[#5B3BD1]/5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#5B3BD1]/30">01</span>
                  <div className="w-10 h-10 rounded-2xl bg-[#E7E3FB] flex items-center justify-center text-[#5B3BD1]">
                    <Sun className="w-5 h-5" />
                  </div>
                </div>

                <span className="editorial-caption text-[#5B3BD1] block mb-1">
                  Sacred Number 1 &bull; Solar Purpose
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#0D0B1A] block">
                  {western.sunSign}
                </span>
                <span className="text-xs uppercase tracking-wider text-[#4A4568] font-bold block mt-1">
                  Western Tropical Sun
                </span>

                <div className="mt-4 p-3 rounded-xl bg-[#E7E3FB]/50 border border-[#5B3BD1]/15 text-xs text-[#0D0B1A] font-medium">
                  Solar Radiance &bull; Core Conscious Will
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#5B3BD1]/10 text-xs text-[#4A4568] flex items-center justify-between">
                <span>Rising (Ascendant):</span>
                <span className="font-bold text-[#0D0B1A]">{western.risingSign}</span>
              </div>
            </div>

            {/* Number 2: Vedic Sidereal Moon & Nakshatra */}
            <div className="relative p-6 sm:p-8 rounded-[28px] bg-[#3A1F8C] text-white border border-[#CFC6F6]/30 shadow-2xl flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#5B3BD1] opacity-50 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#CFC6F6]/40">02</span>
                  <div className="w-10 h-10 rounded-2xl bg-[#5B3BD1]/60 border border-[#CFC6F6]/30 flex items-center justify-center text-[#CFC6F6]">
                    <Moon className="w-5 h-5" />
                  </div>
                </div>

                <span className="editorial-caption text-[#CFC6F6] block mb-1">
                  Sacred Number 2 &bull; Lunar Asterism
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-white block">
                  {vedic.moonSign}
                </span>
                <span className="text-xs uppercase tracking-wider text-[#CFC6F6] font-bold block mt-1">
                  {vedic.moonNakshatra} &bull; Pada {vedic.moonPada}
                </span>

                <div className="mt-4 p-3 rounded-xl bg-[#5B3BD1]/40 border border-[#CFC6F6]/20 text-xs text-white/95 font-medium">
                  Sidereal Moon &bull; Subconscious Sanctuary
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#CFC6F6]/20 text-xs text-[#CFC6F6]/80 flex items-center justify-between relative z-10">
                <span>Vedic Lagna:</span>
                <span className="font-bold text-white">{vedic.ascendantSign}</span>
              </div>
            </div>

            {/* Number 3: Pythagorean Life Path Number */}
            <div className="relative p-6 sm:p-8 rounded-[28px] bg-white/90 border border-white shadow-xl shadow-[#5B3BD1]/5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#5B3BD1]/30">03</span>
                  <div className="w-10 h-10 rounded-2xl bg-[#E7E3FB] flex items-center justify-center text-[#5B3BD1]">
                    <Hash className="w-5 h-5" />
                  </div>
                </div>

                <span className="editorial-caption text-[#5B3BD1] block mb-1">
                  Sacred Number 3 &bull; Destiny Frequency
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#5B3BD1]">
                    {numerology.lifePathNumber}
                  </span>
                  {numerology.isMasterLifePath && (
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#5B3BD1] text-white font-bold tracking-wider uppercase">
                      Master Number
                    </span>
                  )}
                </div>
                <span className="text-xs uppercase tracking-wider text-[#4A4568] font-bold block mt-1">
                  Life Path Vibration
                </span>

                <div className="mt-4 p-3 rounded-xl bg-[#E7E3FB]/50 border border-[#5B3BD1]/15 text-xs text-[#0D0B1A] font-medium">
                  Pythagorean Matrix &bull; Planetary Ruler {synthesis.dailyInsight.alignedPlanet}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#5B3BD1]/10 text-xs text-[#4A4568] flex items-center justify-between">
                <span>Birthday Vibration:</span>
                <span className="font-bold text-[#0D0B1A]">Day {numerology.birthdayNumber}</span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              REQUIREMENT: THEN EXPLAIN THAT 3 BELOW
              ========================================================================= */}
          <div className="mt-8 p-6 sm:p-10 rounded-[32px] bg-white/80 backdrop-blur-md border border-white shadow-md">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#5B3BD1]/15">
              <div className="w-9 h-9 rounded-xl bg-[#5B3BD1] text-white flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="editorial-caption text-[#5B3BD1]">Triad Synthesis &bull; Meaning &amp; Dynamics</span>
                <h4 className="text-lg sm:text-xl font-bold text-[#0D0B1A]">
                  How Your 3 Sacred Numbers Interlock
                </h4>
              </div>
            </div>

            {/* Triad Explanation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-xs sm:text-sm text-[#4A4568] leading-relaxed">
              <div className="p-5 rounded-2xl bg-[#E7E3FB]/40 border border-[#5B3BD1]/10">
                <span className="font-bold text-[#0D0B1A] block text-sm mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#5B3BD1]" />
                  1. Solar Conscious Purpose ({western.sunSign})
                </span>
                <p>
                  {synthesis.cosmicTriad.soulPurpose.description}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#E7E3FB]/40 border border-[#5B3BD1]/10">
                <span className="font-bold text-[#0D0B1A] block text-sm mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#3A1F8C]" />
                  2. Lunar Subconscious Sanctuary ({vedic.moonNakshatra})
                </span>
                <p>
                  {synthesis.cosmicTriad.innerMind.description}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#E7E3FB]/40 border border-[#5B3BD1]/10">
                <span className="font-bold text-[#0D0B1A] block text-sm mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#5B3BD1]" />
                  3. Life Path Trajectory (Number {numerology.lifePathNumber})
                </span>
                <p>
                  {synthesis.cosmicTriad.destinyPath.description}
                </p>
              </div>
            </div>

            {/* Overarching Harmonization Summary */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#E7E3FB] to-white border border-[#5B3BD1]/20">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#5B3BD1] block mb-1">
                The Harmonized Synthesis
              </span>
              <p className="text-xs sm:text-sm text-[#0D0B1A] font-medium leading-relaxed">
                {synthesis.synthesisSummary}
              </p>
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
