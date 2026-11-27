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
      className="relative min-h-screen w-full flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#E7E3FB]"
    >
      {/* Decorative Floating Celestial Geometry & Sacred Triad Background Elements */}
      <div className="absolute top-1/4 right-[8%] w-72 h-72 md:w-96 md:h-96 lg:w-[480px] lg:h-[480px] rounded-full border border-[#5B3BD1]/20 pointer-events-none animate-rotate-slow" />
      <div
        className="absolute top-1/3 right-[12%] w-56 h-56 md:w-80 md:h-80 rounded-full border border-dashed border-[#5B3BD1]/25 pointer-events-none animate-rotate-slow"
        style={{ animationDirection: "reverse", animationDuration: "36s" }}
      />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 md:w-[450px] md:h-[450px] bg-[#CFC6F6]/50 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Star Orbs */}
      <div className="absolute top-32 left-[15%] w-3 h-3 rounded-full bg-[#5B3BD1] opacity-60 animate-float-slow" />
      <div
        className="absolute bottom-40 right-[22%] w-4 h-4 rounded-full bg-[#3A1F8C] opacity-40 animate-float-slow"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-2/3 left-[8%] w-2 h-2 rounded-full bg-[#5B3BD1] opacity-70 animate-float-slow"
        style={{ animationDelay: "4s" }}
      />

      {/* Main Content Layout */}
      <div className="content-container relative z-10 flex flex-col justify-center min-h-[calc(100vh-12rem)]">
        {/* Editorial Eyebrow Tag */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 border border-[#5B3BD1]/15 w-fit shadow-xs mb-6 sm:mb-8">
          <Compass className="w-3.5 h-3.5 text-[#5B3BD1]" />
          <span className="editorial-caption text-[#5B3BD1]">
            Vedic Jyotish &bull; Western Natal &bull; Pythagorean Numerology
          </span>
        </div>

        {/* Hero Headline with Large Expressive Typography */}
        <div className="max-w-6xl">
          <h1 className="hero-headline text-[#0D0B1A] uppercase tracking-tight">
            YOUR COSMIC <span className="text-[#5B3BD1]">IDENTITY.</span>
            <br />
            YOUR THREE <span className="underline decoration-[#CFC6F6] decoration-4 underline-offset-8">SACRED</span> NUMBERS.
          </h1>
        </div>

        {/* Subtitle & Asymmetrical Editorial Paragraph */}
        <div className="mt-8 sm:mt-10 max-w-2xl lg:max-w-3xl">
          <p className="sub-headline text-[#4A4568] font-normal leading-relaxed">
            The first unified platform synthesizing sidereal Vedic Moon &amp; Nakshatra, tropical
            Western geometric aspects, and Pythagorean vibration into one reproducible,
            deterministic personal profile.
          </p>
        </div>

        {/* CTA Button Group */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 max-w-md sm:max-w-none">
          <button
            onClick={onGetStarted}
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-full bg-[#5B3BD1] text-white text-sm sm:text-base font-semibold tracking-wider uppercase transition-all duration-300 ease-editorial hover:bg-[#3A1F8C] hover:shadow-xl hover:shadow-[#5B3BD1]/25 active:scale-98"
          >
            <Sparkles className="w-4 h-4 text-[#CFC6F6] transition-transform group-hover:scale-125" />
            <span>Calculate Your 3 Numbers</span>
          </button>

          <button
            onClick={onExplore}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 sm:px-9 sm:py-5 rounded-full bg-white/70 text-[#0D0B1A] border border-[#5B3BD1]/20 text-sm sm:text-base font-semibold tracking-wider uppercase transition-all duration-300 ease-editorial hover:bg-white hover:border-[#5B3BD1] active:scale-98"
          >
            <span>Explore Methodology</span>
            <ArrowDown className="w-4 h-4 text-[#5B3BD1]" />
          </button>
        </div>

        {/* Micro Badges / Reproducibility Notice */}
        <div className="mt-14 sm:mt-18 pt-8 border-t border-[#5B3BD1]/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-[#4A4568]">
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-[#5B3BD1] font-bold">Zodiac Engine</span>
            <span className="font-medium text-[#0D0B1A]">Sidereal Lahiri + Tropical Placidus</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-[#5B3BD1] font-bold">Asterisms</span>
            <span className="font-medium text-[#0D0B1A]">27 Nakshatras &amp; 108 Padas</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-[#5B3BD1] font-bold">Vibrational System</span>
            <span className="font-medium text-[#0D0B1A]">Master Numbers 11, 22, 33</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-[#5B3BD1] font-bold">Location Precision</span>
            <span className="font-medium text-[#0D0B1A]">Sub-degree Geocoding &amp; UTC</span>
          </div>
        </div>
      </div>
    </section>
  );
}
