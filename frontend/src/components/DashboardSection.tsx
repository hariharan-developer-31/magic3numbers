"use client";

import React, { useState } from "react";
import { FullCosmicAnalysis, PlanetaryAssociation } from "@/types/astrology";
import VedicChart from "./VedicChart";
import { Sparkles, Sun, Moon, Hash, Compass, Info, Check, ArrowRight } from "lucide-react";

export default function DashboardSection({ analysis }: { analysis: FullCosmicAnalysis }) {
  const [selectedPlanetaryNum, setSelectedPlanetaryNum] = useState<number>(analysis.numerology.lifePathNumber);
  const [activeTab, setActiveTab] = useState<"triad" | "vedic" | "western" | "numerology" | "planetary">("triad");

  const { numerology, vedic, western, synthesis, input } = analysis;

  const currentPlanetaryDetail = synthesis.planetaryNumberLinks.find(
    (p) => p.number === selectedPlanetaryNum
  ) || synthesis.planetaryNumberLinks[0];

  return (
    <section
      id="dashboard-section"
      data-theme="light"
      className="relative min-h-screen w-full py-24 md:py-32 bg-[#E7E3FB] text-[#0D0B1A] overflow-hidden"
    >
      <div className="content-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5B3BD1]/10 text-[#5B3BD1] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personal Cosmic Blueprint</span>
            </div>
            <h2 className="section-headline uppercase tracking-tight">
              Calculated For <span className="text-[#5B3BD1]">{input.fullName}</span>
            </h2>
            <p className="mt-2 text-xs md:text-sm text-[#4A4568] font-mono">
              Born {input.birthDate} {input.isTimeUnknown ? "(Time Unverified)" : `@ ${input.birthTime}`} &bull; {input.birthCity} ({input.latitude.toFixed(2)}°N, {input.longitude.toFixed(2)}°E)
            </p>
          </div>

          {/* Navigation Pill Tabs */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2 p-1.5 bg-white/70 backdrop-blur-md rounded-2xl border border-[#5B3BD1]/15">
            {[
              { id: "triad", label: "The Cosmic Triad" },
              { id: "vedic", label: "Vedic D1 Chart" },
              { id: "western", label: "Western Aspects" },
              { id: "numerology", label: "Numerology Matrix" },
              { id: "planetary", label: "Planetary 1–9" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  activeTab === tab.id
                    ? "bg-[#5B3BD1] text-white shadow-sm"
                    : "text-[#4A4568] hover:text-[#0D0B1A] hover:bg-[#E7E3FB]/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: THE COSMIC TRIAD */}
        {activeTab === "triad" && (
          <div className="space-y-10 animate-fade-in">
            {/* The 3 Core Pillars Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Western Sun Card */}
              <div className="p-8 rounded-3xl bg-white/80 border border-white shadow-lg shadow-[#5B3BD1]/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="editorial-caption text-[#5B3BD1]">Pillar 1: Conscious Purpose</span>
                    <div className="w-10 h-10 rounded-full bg-[#E7E3FB] flex items-center justify-center text-[#5B3BD1]">
                      <Sun className="w-5 h-5" />
                    </div>
                  </div>
                  <span className="text-3xl font-extrabold text-[#0D0B1A] block">
                    {western.sunSign}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-[#4A4568] font-bold block mt-1">
                    Western Tropical Sun
                  </span>
                  <p className="mt-4 text-xs md:text-sm text-[#4A4568] leading-relaxed">
                    {synthesis.cosmicTriad.soulPurpose.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#5B3BD1]/10 text-[11px] text-[#5B3BD1] font-medium">
                  Rising Sign: {western.risingSign}
                </div>
              </div>

              {/* Vedic Moon & Nakshatra Card */}
              <div className="p-8 rounded-3xl bg-[#3A1F8C] text-white border border-[#CFC6F6]/20 shadow-xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#5B3BD1] opacity-50 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="editorial-caption text-[#CFC6F6]">Pillar 2: Subconscious Mind</span>
                    <div className="w-10 h-10 rounded-full bg-[#5B3BD1]/50 border border-[#CFC6F6]/30 flex items-center justify-center text-[#CFC6F6]">
                      <Moon className="w-5 h-5" />
                    </div>
                  </div>
                  <span className="text-3xl font-extrabold text-white block">
                    {vedic.moonSign}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-[#CFC6F6] font-bold block mt-1">
                    Nakshatra: {vedic.moonNakshatra} (Pada {vedic.moonPada})
                  </span>
                  <p className="mt-4 text-xs md:text-sm text-[#CFC6F6]/85 leading-relaxed">
                    {synthesis.cosmicTriad.innerMind.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#CFC6F6]/20 text-[11px] text-[#CFC6F6] font-medium relative z-10">
                  Ascendant: {vedic.ascendantSign} &bull; Lahiri {vedic.ayanamsa}°
                </div>
              </div>

              {/* Numerology Life Path Card */}
              <div className="p-8 rounded-3xl bg-white/80 border border-white shadow-lg shadow-[#5B3BD1]/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="editorial-caption text-[#5B3BD1]">Pillar 3: Vibrational Blueprint</span>
                    <div className="w-10 h-10 rounded-full bg-[#E7E3FB] flex items-center justify-center text-[#5B3BD1]">
                      <Hash className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-extrabold text-[#5B3BD1]">
                      {numerology.lifePathNumber}
                    </span>
                    {numerology.isMasterLifePath && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#5B3BD1] text-white font-bold tracking-wider uppercase">
                        Master Number
                      </span>
                    )}
                  </div>
                  <span className="text-xs uppercase tracking-widest text-[#4A4568] font-bold block mt-1">
                    Life Path Frequency
                  </span>
                  <p className="mt-4 text-xs md:text-sm text-[#4A4568] leading-relaxed">
                    {synthesis.cosmicTriad.destinyPath.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#5B3BD1]/10 text-[11px] text-[#5B3BD1] font-medium">
                  Birthday: {numerology.birthdayNumber} &bull; Expression: {numerology.expressionNumber}
                </div>
              </div>
            </div>

            {/* Synthesis Summary Banner */}
            <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-white via-white/90 to-[#E4E0FA] border border-white shadow-md">
              <span className="editorial-caption text-[#5B3BD1] block mb-2">Synthesized Harmonization</span>
              <p className="text-sm md:text-base text-[#0D0B1A] font-medium leading-relaxed max-w-4xl">
                {synthesis.synthesisSummary}
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: VEDIC D1 CHART */}
        {activeTab === "vedic" && (
          <div className="animate-fade-in space-y-6">
            <VedicChart vedic={vedic} />
          </div>
        )}

        {/* TAB 3: WESTERN ASPECTS */}
        {activeTab === "western" && (
          <div className="p-8 sm:p-10 rounded-3xl bg-white/80 border border-white shadow-md animate-fade-in">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#5B3BD1]/15">
              <div>
                <span className="editorial-caption text-[#5B3BD1]">Tropical Placidus Calculations</span>
                <h3 className="text-2xl font-bold text-[#0D0B1A] mt-1">
                  Western Planetary Placements &amp; Aspects
                </h3>
              </div>
              <span className="text-xs font-mono text-[#5B3BD1] bg-[#E7E3FB] px-3 py-1.5 rounded-full">
                {western.aspects.length} Active Geometric Aspects
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Placements */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A4568] mb-4">
                  Tropical Celestial Placements
                </h4>
                <div className="space-y-2.5">
                  {western.placements.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-[#E7E3FB]/40 border border-[#5B3BD1]/15 flex items-center justify-between text-xs"
                    >
                      <span className="font-bold text-[#5B3BD1] text-sm">{p.planet}</span>
                      <span className="font-semibold text-[#0D0B1A]">{p.sign} {p.degree}° {p.minute}&apos;</span>
                      <span className="text-[#4A4568] font-mono">House {p.house}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Major Geometric Aspects */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A4568] mb-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {[
              { title: "Life Path Number", val: numerology.lifePathNumber, desc: numerology.descriptions.lifePath, isMaster: numerology.isMasterLifePath },
              { title: "Birthday Number", val: numerology.birthdayNumber, desc: numerology.descriptions.birthday, isMaster: false },
              { title: "Expression / Destiny", val: numerology.expressionNumber, desc: numerology.descriptions.expression, isMaster: numerology.isMasterExpression },
              { title: "Soul Urge (Vowels)", val: numerology.soulUrgeNumber, desc: numerology.descriptions.soulUrge, isMaster: numerology.isMasterSoulUrge },
              { title: "Personality (Consonants)", val: numerology.personalityNumber, desc: numerology.descriptions.personality, isMaster: numerology.isMasterPersonality },
              { title: "Personal Year (2026)", val: numerology.personalYearNumber, desc: numerology.descriptions.personalYear, isMaster: false },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white/80 border border-white shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-wider font-bold text-[#4A4568]">
                      {item.title}
                    </span>
                    {item.isMaster && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#5B3BD1] text-white font-bold uppercase">
                        Master
                      </span>
                    )}
                  </div>
                  <span className="text-4xl font-extrabold text-[#5B3BD1] block mb-3">
                    {item.val}
                  </span>
                  <p className="text-xs text-[#4A4568] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: PLANETARY 1-9 ASSOCIATIONS */}
        {activeTab === "planetary" && (
          <div className="p-8 sm:p-12 rounded-3xl bg-white/80 border border-white shadow-lg animate-fade-in">
            <div className="max-w-xl mb-8">
              <span className="editorial-caption text-[#5B3BD1]">Traditional Cosmological Correspondence</span>
              <h3 className="text-2xl font-bold text-[#0D0B1A] mt-1">
                Canonical 1–9 Planetary Vibration Matrix
              </h3>
              <p className="mt-2 text-xs md:text-sm text-[#4A4568]">
                Select any number from 1 to 9 to inspect its traditional ruling celestial body,
                Sanskrit correspondence, and core energetic qualities.
              </p>
            </div>

            {/* Clickable 1-9 Number Selector */}
            <div className="grid grid-cols-3 sm:grid-cols-9 gap-3 mb-10">
              {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setSelectedPlanetaryNum(n)}
                  className={`py-4 rounded-2xl flex flex-col items-center justify-center transition-all ${
                    selectedPlanetaryNum === n
                      ? "bg-[#5B3BD1] text-white shadow-lg shadow-[#5B3BD1]/30 scale-105"
                      : "bg-[#E7E3FB]/50 text-[#0D0B1A] hover:bg-[#E7E3FB]"
                  }`}
                >
                  <span className="text-2xl font-extrabold">{n}</span>
                </button>
              ))}
            </div>

            {/* Selected Planetary Details */}
            {currentPlanetaryDetail && (
              <div className="p-8 rounded-2xl bg-[#E7E3FB]/60 border border-[#5B3BD1]/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-extrabold text-[#5B3BD1]">
                      {currentPlanetaryDetail.number}
                    </span>
                    <div>
                      <h4 className="text-xl font-bold text-[#0D0B1A]">
                        {currentPlanetaryDetail.planet} &bull; {currentPlanetaryDetail.sanskritName}
                      </h4>
                      <span className="text-xs uppercase tracking-wider text-[#4A4568] font-semibold">
                        {currentPlanetaryDetail.energy}
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-xs md:text-sm text-[#4A4568] max-w-xl leading-relaxed">
                    {currentPlanetaryDetail.relevanceToUser}
                  </p>
                </div>

                <div className="flex flex-wrap md:flex-col gap-2">
                  {currentPlanetaryDetail.qualities.map((q, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full bg-white text-xs font-semibold text-[#5B3BD1] shadow-xs"
                    >
                      {q}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mathematical Derivations & Rationales (Always Visible Below) */}
        <div className="mt-12 p-8 rounded-3xl bg-white/60 border border-[#5B3BD1]/15 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4 text-[#5B3BD1]">
            <Info className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">
              Mathematical Derivation &amp; Transparency Rationales
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {synthesis.derivedRationales.map((rationale, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-[#4A4568]">
                <Check className="w-3.5 h-3.5 text-[#5B3BD1] flex-shrink-0 mt-0.5" />
                <span>{rationale}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
