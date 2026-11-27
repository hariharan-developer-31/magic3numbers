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
      className="relative h-screen min-h-[100dvh] max-h-[100dvh] w-full flex flex-col items-center justify-center px-4 overflow-hidden bg-[#E7E3FB]"
    >
      {/* Soft Ambient Background Aura & Subtle Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none mix-blend-multiply"
        src="/bg-video.mp4"
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 sm:w-96 sm:h-96 bg-[#CFC6F6]/40 rounded-full blur-[90px] pointer-events-none" />

      {/* Centered Main Content Layout - Strict 100vh */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-3xl mx-auto w-full">
        {/* Hero Headline - Centered & Balanced */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D0B1A] uppercase tracking-tight leading-[1.14] text-center">
          YOUR COSMIC <span className="text-[#5B3BD1]">IDENTITY.</span>
          <br />
          YOUR THREE <span className="underline decoration-[#CFC6F6] decoration-4 underline-offset-4 sm:underline-offset-6">SACRED</span> NUMBERS.
        </h1>

        {/* Subtitle Paragraph - Centered */}
        <p className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-base text-[#4A4568] font-normal leading-relaxed text-center max-w-xl mx-auto">
          A unified deterministic platform harmonizing sidereal Vedic Moon &amp; Nakshatra, tropical
          Western geometric aspects, and Pythagorean vibration into one reproducible personal blueprint.
        </p>

        {/* Compact, Centered CTA Buttons with Reduced Width */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <button
            onClick={onGetStarted}
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#5B3BD1] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 ease-editorial hover:bg-[#3A1F8C] hover:shadow-lg hover:shadow-[#5B3BD1]/25 active:scale-98 shadow-sm w-full sm:w-auto"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#CFC6F6] transition-transform group-hover:scale-125" />
            <span>Discover Your 3 Numbers</span>
          </button>

          <button
            onClick={onExplore}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/80 text-[#0D0B1A] border border-[#5B3BD1]/20 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 ease-editorial hover:bg-white hover:border-[#5B3BD1] active:scale-98 w-full sm:w-auto"
          >
            <span>Explore Methodology</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#5B3BD1]" />
          </button>
        </div>
      </div>
    </section>
  );
}
