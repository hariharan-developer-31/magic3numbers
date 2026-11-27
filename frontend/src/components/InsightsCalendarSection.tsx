"use client";

import React, { useState } from "react";
import { SynthesisReport } from "@/types/astrology";
import { Calendar as CalendarIcon, Clock, Compass, Sparkles, Star, TrendingUp } from "lucide-react";

export default function InsightsCalendarSection({ synthesis }: { synthesis: SynthesisReport }) {
  const [selectedCycle, setSelectedCycle] = useState<"daily" | "weekly" | "monthly">("daily");

  const today = new Date();
  const currentMonthName = today.toLocaleString("default", { month: "long" });

  return (
    <section
      id="insights-calendar"
      data-theme="dark"
      className="relative min-h-screen w-full py-24 md:py-32 bg-[#3A1F8C] text-white flex items-center overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#5B3BD1] opacity-40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-[500px] h-[500px] bg-[#0D0B1A] opacity-60 rounded-full blur-[120px] pointer-events-none" />

      <div className="content-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <span className="editorial-caption text-[#CFC6F6]">Temporal Cycle Astronomy</span>
            <h2 className="section-headline text-white mt-3 uppercase tracking-tight">
              Personal Insights &amp; <span className="text-[#CFC6F6]">Cycles.</span>
            </h2>
            <p className="mt-4 text-sm md:text-base text-[#CFC6F6]/85 font-normal">
              Harmonizing your personal vibrational frequency with daily planetary transits and
              macro annual personal year cycles.
            </p>
          </div>

          {/* Toggle Cycle Type */}
          <div className="mt-6 md:mt-0 flex p-1.5 rounded-2xl bg-[#0D0B1A]/50 border border-[#CFC6F6]/20 backdrop-blur-md">
            {(["daily", "weekly", "monthly"] as const).map((cycle) => (
              <button
                key={cycle}
                onClick={() => setSelectedCycle(cycle)}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCycle === cycle
                    ? "bg-[#5B3BD1] text-white shadow-md shadow-[#5B3BD1]/40"
                    : "text-[#CFC6F6]/80 hover:text-white"
                }`}
              >
                {cycle} Cycle
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Cycle Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Focus Card */}
          <div className="lg:col-span-2 p-8 sm:p-12 rounded-[32px] bg-[#0D0B1A]/40 border border-[#CFC6F6]/20 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
            {selectedCycle === "daily" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-[#CFC6F6]/15">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#5B3BD1] flex items-center justify-center text-white">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="editorial-caption text-[#CFC6F6]">Today&apos;s Vibrational Resonance</span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        {synthesis.dailyInsight.headline}
                      </h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-extrabold text-[#CFC6F6]">
                      {synthesis.dailyInsight.focusNumber}
                    </span>
                    <span className="block text-[10px] uppercase tracking-widest text-[#CFC6F6]/70">Focus Key</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#CFC6F6] font-semibold mb-2">
                    Actionable Guidance
                  </h4>
                  <p className="text-base sm:text-lg text-white/95 leading-relaxed font-normal">
                    {synthesis.dailyInsight.advice}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#3A1F8C]/60 border border-[#CFC6F6]/20 text-xs text-[#CFC6F6] flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#CFC6F6] flex-shrink-0" />
                  <span>{synthesis.dailyInsight.cycleTheme}</span>
                </div>
              </div>
            )}

            {selectedCycle === "weekly" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-[#CFC6F6]/15">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#5B3BD1] flex items-center justify-center text-white">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="editorial-caption text-[#CFC6F6]">7-Day Strategic Transit</span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        {synthesis.weeklyInsight.theme}
                      </h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-extrabold text-[#CFC6F6]">
                      {synthesis.weeklyInsight.dominantNumber}
                    </span>
                    <span className="block text-[10px] uppercase tracking-widest text-[#CFC6F6]/70">Macro Key</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#CFC6F6] font-semibold mb-2">
                    Weekly Overview
                  </h4>
                  <p className="text-base sm:text-lg text-white/95 leading-relaxed font-normal">
                    {synthesis.weeklyInsight.overview}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <span className="text-xs font-semibold text-[#CFC6F6] uppercase tracking-wider">Favorable Days:</span>
                  <div className="flex gap-2">
                    {synthesis.weeklyInsight.favorableDays.map((day, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-[#5B3BD1] text-xs font-semibold text-white"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedCycle === "monthly" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-[#CFC6F6]/15">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#5B3BD1] flex items-center justify-center text-white">
                      <CalendarIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="editorial-caption text-[#CFC6F6]">{currentMonthName} Overview</span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        {synthesis.monthlyInsight.theme}
                      </h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-extrabold text-[#CFC6F6]">
                      {synthesis.monthlyInsight.personalMonthNumber}
                    </span>
                    <span className="block text-[10px] uppercase tracking-widest text-[#CFC6F6]/70">Month Vibration</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#CFC6F6] font-semibold mb-2">
                    Monthly Strategic Alignment
                  </h4>
                  <p className="text-base sm:text-lg text-white/95 leading-relaxed font-normal">
                    {synthesis.monthlyInsight.strategicAdvice}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-[#CFC6F6]/15 flex items-center justify-between text-xs text-[#CFC6F6]/70 font-mono">
              <span>Deterministic Astrological &amp; Numerological Synthesis</span>
              <span>Updated in real-time</span>
            </div>
          </div>

          {/* Interactive Mini Calendar Snapshot */}
          <div className="p-8 rounded-[32px] bg-[#0D0B1A]/40 border border-[#CFC6F6]/20 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="editorial-caption text-[#CFC6F6]">Cosmic Calendar</span>
                <Star className="w-4 h-4 text-[#CFC6F6]" />
              </div>
              <h4 className="text-lg font-bold text-white mb-4">
                {currentMonthName} {today.getFullYear()}
              </h4>

              {/* Day vibration grid */}
              <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <span key={i} className="font-bold text-[#CFC6F6]/60 p-1">
                    {d}
                  </span>
                ))}
                {Array.from({ length: 28 }, (_, i) => {
                  const dayNum = i + 1;
                  const isCurrent = dayNum === today.getDate();
                  return (
                    <div
                      key={i}
                      className={`py-2 rounded-xl text-xs font-medium transition-colors ${
                        isCurrent
                          ? "bg-[#5B3BD1] text-white font-bold shadow-md shadow-[#5B3BD1]/50"
                          : "text-white/80 hover:bg-[#3A1F8C]"
                      }`}
                    >
                      {dayNum}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#CFC6F6]/15 text-[11px] text-[#CFC6F6]/80 text-center">
              Personal vibration syncs seamlessly with your birth chart.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
