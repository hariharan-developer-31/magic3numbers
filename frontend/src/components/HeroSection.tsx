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
      data-theme="dark"
      className="relative h-screen min-h-[100dvh] max-h-[100dvh] w-full flex flex-col items-center justify-center px-4 overflow-hidden bg-[#0D0B1A]"
    >
      {/* Full Hero Cosmic Background Video from frontend/public */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/video-thumb.jpg"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Cinematic Vignette & Ambient Radial Contrast Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0B1A]/75 via-[#0D0B1A]/35 to-[#0D0B1A]/90 z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(13,11,26,0.5)_70%,rgba(13,11,26,0.85)_100%)] z-[1] pointer-events-none" />

      {/* Centered Main Content Layout - Strict 100vh */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-3xl mx-auto w-full px-4">
        {/* Hero Headline - Centered & Balanced */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight leading-[1.14] text-center drop-shadow-xl">
          YOUR COSMIC <span className="text-[#CFC6F6]">IDENTITY.</span>
          <br />
          YOUR THREE{" "}
          <span className="underline decoration-[#5B3BD1] decoration-4 underline-offset-4 sm:underline-offset-6 text-white">
            SACRED
          </span>{" "}
          NUMBERS.
        </h1>

        {/* Subtitle Paragraph - Centered */}
        <p className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-base text-[#E4E0FA]/90 font-normal leading-relaxed text-center max-w-xl mx-auto drop-shadow-md">
          A unified deterministic platform harmonizing sidereal Vedic Moon &amp; Nakshatra, tropical
          Western geometric aspects, and Pythagorean vibration into one reproducible personal blueprint.
        </p>

        {/* Compact, Centered CTA Buttons with Reduced Width */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <button
            onClick={onGetStarted}
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#5B3BD1] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 ease-editorial hover:bg-[#482db5] hover:shadow-xl hover:shadow-[#5B3BD1]/40 active:scale-98 shadow-md w-full sm:w-auto"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#CFC6F6] transition-transform group-hover:scale-125" />
            <span>Discover Your 3 Numbers</span>
          </button>

          <button
            onClick={onExplore}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold tracking-wider uppercase backdrop-blur-md transition-all duration-300 ease-editorial active:scale-98 w-full sm:w-auto shadow-sm"
          >
            <span>Explore Methodology</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#CFC6F6]" />
          </button>
        </div>
      </div>
    </section>
  );
}
