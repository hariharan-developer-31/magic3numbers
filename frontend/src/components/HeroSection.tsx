"use client";

import React from "react";
import { ArrowDown, Sparkles } from "lucide-react";

export default function HeroSection({
  onGetStarted,
  onExplore,
}: {
  onGetStarted: () => void;
  onExplore: () => void;
}) {
  return (
    <section
      id="hero"
      data-theme="light"
      className="relative h-screen min-h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-center pt-16 sm:pt-20 pb-6 sm:pb-8 overflow-hidden bg-[#E7E3FB]"
    >
      {/* Soft Ambient Background Aura (Subtle and non-intrusive) */}
      <div className="absolute -top-20 -right-20 w-80 h-80 sm:w-96 sm:h-96 bg-[#CFC6F6]/40 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 sm:w-96 sm:h-96 bg-[#5B3BD1]/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Content Layout - Strictly constrained to 100vh */}
      <div className="content-container relative z-10 flex flex-col justify-center flex-1 max-h-full">
        {/* Hero Headline with Reduced, Balanced Editorial Font Size */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0D0B1A] uppercase tracking-tight leading-[1.12]">
            YOUR COSMIC <span className="text-[#5B3BD1]">IDENTITY.</span>
            <br />
            YOUR THREE <span className="underline decoration-[#CFC6F6] decoration-4 underline-offset-4 sm:underline-offset-6">SACRED</span> NUMBERS.
          </h1>
        </div>

        {/* Subtitle & Editorial Paragraph */}
        <div className="mt-4 sm:mt-5 max-w-2xl">
          <p className="text-xs sm:text-sm md:text-base text-[#4A4568] font-normal leading-relaxed">
            A unified deterministic platform harmonizing sidereal Vedic Moon &amp; Nakshatra, tropical
            Western geometric aspects, and Pythagorean vibration into one reproducible personal blueprint.
          </p>
        </div>

        {/* CTA Button Group */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={onGetStarted}
            className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-full bg-[#5B3BD1] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 ease-editorial hover:bg-[#3A1F8C] hover:shadow-xl hover:shadow-[#5B3BD1]/25 active:scale-98 shadow-md"
          >
            <Sparkles className="w-4 h-4 text-[#CFC6F6] transition-transform group-hover:scale-125" />
            <span>Discover Your 3 Numbers</span>
          </button>

          <button
            onClick={onExplore}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 rounded-full bg-white/80 text-[#0D0B1A] border border-[#5B3BD1]/20 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 ease-editorial hover:bg-white hover:border-[#5B3BD1] active:scale-98"
          >
            <span>Explore Methodology</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#5B3BD1]" />
          </button>
        </div>

        {/* Micro Badges Row pinned neatly inside 100vh */}
        <div className="mt-8 sm:mt-10 pt-4 sm:pt-5 border-t border-[#5B3BD1]/15 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-xs text-[#4A4568]">
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-[#5B3BD1] font-bold">Zodiac Engine</span>
            <span className="font-semibold text-[#0D0B1A] text-[11px] sm:text-xs">Sidereal Lahiri + Tropical</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-[#5B3BD1] font-bold">Asterisms</span>
            <span className="font-semibold text-[#0D0B1A] text-[11px] sm:text-xs">27 Nakshatras &amp; 108 Padas</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-[#5B3BD1] font-bold">Vibration System</span>
            <span className="font-semibold text-[#0D0B1A] text-[11px] sm:text-xs">Master Numbers 11, 22, 33</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-[#5B3BD1] font-bold">Location Precision</span>
            <span className="font-semibold text-[#0D0B1A] text-[11px] sm:text-xs">Historical Timezones &amp; UTC</span>
          </div>
        </div>
      </div>
    </section>
  );
}
