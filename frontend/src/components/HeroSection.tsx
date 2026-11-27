"use client";

import React from "react";
import { ArrowDown, Compass, Sparkles } from "lucide-react";

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
      className="relative min-h-[92vh] sm:min-h-screen w-full flex items-center justify-center pt-24 pb-16 sm:pt-28 sm:pb-20 overflow-hidden bg-[#E7E3FB]"
    >
      {/* Decorative Floating Elements restrained to prevent horizontal scrolling on mobile */}
      <div className="hidden sm:block absolute top-1/4 right-[5%] w-64 h-64 md:w-96 md:h-96 lg:w-[480px] lg:h-[480px] rounded-full border border-[#5B3BD1]/20 pointer-events-none animate-rotate-slow" />
      <div
        className="hidden sm:block absolute top-1/3 right-[10%] w-48 h-48 md:w-80 md:h-80 rounded-full border border-dashed border-[#5B3BD1]/25 pointer-events-none animate-rotate-slow"
        style={{ animationDirection: "reverse", animationDuration: "36s" }}
      />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] bg-[#CFC6F6]/50 rounded-full blur-[80px] pointer-events-none" />

      {/* Main Content Layout */}
      <div className="content-container relative z-10 flex flex-col justify-center min-h-[calc(100vh-10rem)]">
        {/* Editorial Eyebrow Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full bg-white/80 border border-[#5B3BD1]/15 w-fit shadow-xs mb-5 sm:mb-8">
          <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#5B3BD1] flex-shrink-0" />
          <span className="editorial-caption text-[#5B3BD1] text-[10px] sm:text-xs">
            Vedic Jyotish &bull; Western Natal &bull; Pythagorean Numerology
          </span>
        </div>

        {/* Hero Headline with Responsive Clamp */}
        <div className="max-w-5xl">
          <h1 className="hero-headline text-[#0D0B1A] uppercase tracking-tight">
            YOUR COSMIC <span className="text-[#5B3BD1]">IDENTITY.</span>
            <br />
            YOUR THREE <span className="underline decoration-[#CFC6F6] decoration-4 underline-offset-6 sm:underline-offset-8">SACRED</span> NUMBERS.
          </h1>
        </div>

        {/* Subtitle & Editorial Paragraph */}
        <div className="mt-5 sm:mt-8 max-w-2xl lg:max-w-3xl">
          <p className="sub-headline text-[#4A4568] font-normal leading-relaxed text-sm sm:text-base md:text-lg">
            A unified deterministic platform harmonizing sidereal Vedic Moon &amp; Nakshatra, tropical
            Western geometric aspects, and Pythagorean vibration into one reproducible personal blueprint.
          </p>
        </div>

        {/* CTA Button Group - Full width on mobile, inline on sm+ */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5 w-full sm:w-auto max-w-md sm:max-w-none">
          <button
            onClick={onGetStarted}
            className="group inline-flex items-center justify-center gap-3 px-6 py-4 sm:px-8 sm:py-4.5 rounded-full bg-[#5B3BD1] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 ease-editorial hover:bg-[#3A1F8C] hover:shadow-xl hover:shadow-[#5B3BD1]/25 active:scale-98 shadow-md"
          >
            <Sparkles className="w-4 h-4 text-[#CFC6F6] transition-transform group-hover:scale-125" />
            <span>Discover Your 3 Numbers</span>
          </button>

          <button
            onClick={onExplore}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-7 sm:py-4.5 rounded-full bg-white/80 text-[#0D0B1A] border border-[#5B3BD1]/20 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 ease-editorial hover:bg-white hover:border-[#5B3BD1] active:scale-98"
          >
            <span>Explore Methodology</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#5B3BD1]" />
          </button>
        </div>

        {/* Micro Badges Grid */}
        <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-[#5B3BD1]/15 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-xs text-[#4A4568]">
          <div className="p-2 sm:p-0">
            <span className="block text-[10px] uppercase tracking-widest text-[#5B3BD1] font-bold">Zodiac Engine</span>
            <span className="font-semibold text-[#0D0B1A] text-xs">Sidereal Lahiri + Tropical</span>
          </div>
          <div className="p-2 sm:p-0">
            <span className="block text-[10px] uppercase tracking-widest text-[#5B3BD1] font-bold">Asterisms</span>
            <span className="font-semibold text-[#0D0B1A] text-xs">27 Nakshatras &amp; 108 Padas</span>
          </div>
          <div className="p-2 sm:p-0">
            <span className="block text-[10px] uppercase tracking-widest text-[#5B3BD1] font-bold">Vibration System</span>
            <span className="font-semibold text-[#0D0B1A] text-xs">Master Numbers 11, 22, 33</span>
          </div>
          <div className="p-2 sm:p-0">
            <span className="block text-[10px] uppercase tracking-widest text-[#5B3BD1] font-bold">Location Precision</span>
            <span className="font-semibold text-[#0D0B1A] text-xs">Historical Timezones &amp; UTC</span>
          </div>
        </div>
      </div>
    </section>
  );
}
