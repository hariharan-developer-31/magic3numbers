"use client";

import React, { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setVisible(false);
        if (onComplete) onComplete();
      }, 700);
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <aside
      aria-label="Application loading screen"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0D0B1A] transition-opacity duration-700 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.15, 1)" }}
    >
      {/* Background ambient cosmic glow */}
      <div className="absolute w-[360px] h-[360px] md:w-[600px] md:h-[600px] bg-[#5B3BD1] opacity-25 rounded-full blur-[120px] pointer-events-none animate-pulse-subtle" />

      {/* Rotating Sacred Triad & Celestial Rings */}
      <div className="relative w-36 h-36 md:w-48 md:h-48 flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute inset-0 border border-[#CFC6F6]/30 rounded-full animate-rotate-slow" />
        
        {/* Middle Ring with Dash Array */}
        <div
          className="absolute inset-3 border border-dashed border-[#5B3BD1] rounded-full animate-rotate-slow"
          style={{ animationDirection: "reverse", animationDuration: "16s" }}
        />

        {/* Inner Triad Geometry */}
        <svg
          viewBox="0 0 100 100"
          className="w-20 h-20 md:w-28 md:h-28 text-[#CFC6F6] animate-pulse-subtle"
        >
          <polygon
            points="50,15 85,78 15,78"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="15" r="3.5" fill="#5B3BD1" />
          <circle cx="85" cy="78" r="3.5" fill="#5B3BD1" />
          <circle cx="15" cy="78" r="3.5" fill="#5B3BD1" />
          <circle cx="50" cy="55" r="2" fill="#FFFFFF" />
        </svg>

        {/* Central Core Number 3 */}
        <span className="absolute text-2xl md:text-3xl font-extrabold text-white tracking-widest">
          3
        </span>
      </div>

      {/* Brand Title & Editorial Subtitle */}
      <div className="mt-8 text-center px-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-[0.25em] text-white uppercase">
          magic<span className="text-[#CFC6F6]">3</span>numbers
        </h2>
        <p className="mt-2 text-xs md:text-sm tracking-[0.2em] text-[#CFC6F6]/80 uppercase">
          Aligning Cosmic Identity &bull; Calculating Ephemeris
        </p>
      </div>

      {/* Elegant Progress bar indicator */}
      <div className="mt-6 w-36 md:w-48 h-[2px] bg-[#3A1F8C] overflow-hidden rounded-full">
        <div className="h-full bg-gradient-to-r from-[#5B3BD1] via-[#CFC6F6] to-white animate-pulse" />
      </div>
    </aside>
  );
}
