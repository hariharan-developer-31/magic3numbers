"use client";

import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export default function CalculationLoader({
  isOpen,
  fullName,
  title,
  subtitle,
  steps: customSteps,
}: {
  isOpen: boolean;
  fullName?: string;
  title?: string;
  subtitle?: string;
  steps?: string[];
}) {
  const [stepIndex, setStepIndex] = useState(0);

  const defaultSteps = [
    "Resolving geographical coordinates & UTC historical timezone...",
    "Calculating Lahiri Sidereal ephemeris & 27 Nakshatras...",
    "Aligning Tropical Western geometry & planetary aspects...",
    "Deriving Pythagorean Life Path & master vibrational frequencies...",
    "Harmonizing your 3 Sacred Numbers...",
  ];

  const steps = customSteps && customSteps.length > 0 ? customSteps : defaultSteps;

  useEffect(() => {
    if (!isOpen) {
      setStepIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 380);

    return () => clearInterval(interval);
  }, [isOpen, steps.length]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Calculating your cosmic profile"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D0B1A]/85 backdrop-blur-xl animate-fade-in"
    >
      <div className="relative w-full max-w-md p-8 sm:p-10 rounded-[32px] bg-[#16122C] border border-[#CFC6F6]/20 shadow-2xl text-center text-white flex flex-col items-center">
        {/* Soft Ambient Glow */}
        <div className="absolute w-48 h-48 bg-[#5B3BD1] opacity-30 rounded-full blur-[70px] pointer-events-none" />

        {/* Smooth Celestial Orb with Minimal Rings */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-6 flex items-center justify-center">
          {/* Subtle Outer Orbit */}
          <div className="absolute inset-0 rounded-full border border-[#CFC6F6]/20 animate-rotate-slow" />
          
          {/* Pulsing Core Ring */}
          <div
            className="absolute inset-2 rounded-full border border-dashed border-[#5B3BD1] animate-rotate-slow"
            style={{ animationDirection: "reverse", animationDuration: "12s" }}
          />

          {/* Central Cosmic Icon */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#5B3BD1] to-[#3A1F8C] border border-[#CFC6F6]/40 flex items-center justify-center shadow-lg shadow-[#5B3BD1]/50 animate-pulse-subtle">
            <Sparkles className="w-6 h-6 text-[#CFC6F6]" />
          </div>
        </div>

        {/* Dynamic Calculation Title */}
        <span className="editorial-caption text-[#CFC6F6] block mb-2">
          {subtitle || (fullName ? `Generating Blueprint for ${fullName}` : "Initializing Portal")}
        </span>
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-4">
          {title || "Unveiling Your 3 Numbers"}
        </h3>

        {/* Step-by-step calculation status indicator */}
        <div className="w-full bg-[#0D0B1A]/60 border border-[#CFC6F6]/10 rounded-2xl p-4 mb-6 min-h-[64px] flex items-center justify-center">
          <p className="text-xs sm:text-sm text-[#CFC6F6]/90 font-medium transition-all duration-300">
            {steps[stepIndex]}
          </p>
        </div>

        {/* Smooth Progress Bar */}
        <div className="w-full h-1.5 bg-[#0D0B1A] rounded-full overflow-hidden border border-[#CFC6F6]/10">
          <div
            className="h-full bg-gradient-to-r from-[#5B3BD1] via-[#CFC6F6] to-white transition-all duration-300 ease-out"
            style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
          />
        </div>

        <span className="text-[11px] text-[#CFC6F6]/60 mt-4 tracking-wider uppercase font-mono">
          Deterministic Ephemeris &bull; Zero Hallucination
        </span>
      </div>
    </div>
  );
}
