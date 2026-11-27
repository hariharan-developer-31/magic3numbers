"use client";

import React from "react";
import { Compass, Moon, Sun, Orbit } from "lucide-react";

export default function ThreePillarsSection() {
  const pillars = [
    {
      num: "01",
      icon: Moon,
      title: "Vedic Astrology (Jyotish)",
      subtitle: "The Subconscious Lunar Sanctuary",
      description:
        "Calculated using the Sidereal Zodiac with Chitrapaksha (Lahiri) Ayanamsa. We map your exact Rashi (Moon Sign), D1 Chart in Whole Signs, and position within the 27 Nakshatras and 108 Padas to reveal karmic tendencies and emotional wisdom.",
      features: ["Sidereal Lahiri Ayanamsa", "D1 Rashi Chart & Whole Sign Houses", "27 Nakshatras & 4 Padas each", "9 Planetary Grahas (Sun to Ketu)"],
    },
    {
      num: "02",
      icon: Sun,
      title: "Western Astrology",
      subtitle: "The Conscious Solar Ego & Geometry",
      description:
        "Grounded in the Tropical Zodiac and seasonal solstices. Analyzes your conscious purpose through your Sun Sign, personality projection via your Rising Sign (Ascendant), and energetic dynamics through precise planetary aspects (conjunction, trine, square).",
      features: ["Tropical Zodiac Alignment", "Sun, Moon & Rising Sign Triad", "Major Aspects with precise orbs", "Placidus & Equal House quadrants"],
    },
    {
      num: "03",
      icon: Orbit,
      title: "Pythagorean Numerology",
      subtitle: "The Vibrational Blueprint",
      description:
        "Translates your birth date and full name into foundational cosmic frequencies. Strictly preserving Master Numbers (11, 22, 33), we compute your Life Path, Birthday, Expression, Soul Urge, and Personal Year linked to canonical planetary rulers.",
      features: ["Life Path & Birthday Numbers", "Expression, Soul Urge & Personality", "Preserved Master Frequencies (11/22/33)", "Canonical 1–9 Planetary Mappings"],
    },
  ];

  return (
    <section
      id="three-pillars"
      data-theme="dark"
      className="relative min-h-screen w-full py-24 md:py-32 bg-[#3A1F8C] text-white overflow-hidden flex items-center"
    >
      {/* Background celestial grid and glowing ambient aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#5B3BD1] opacity-35 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(207,198,246,0.1),transparent_70%)] pointer-events-none" />

      <div className="content-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
          <div className="max-w-2xl">
            <span className="editorial-caption text-[#CFC6F6]">The Methodological Foundation</span>
            <h2 className="section-headline text-white mt-4 uppercase">
              Three Sacred <span className="text-[#CFC6F6]">Disciplines.</span>
              <br />
              One Unified Blueprint.
            </h2>
          </div>
          <div className="mt-6 md:mt-0 max-w-md">
            <p className="text-sm md:text-base text-[#CFC6F6]/85 font-normal leading-relaxed">
              Never arbitrary, never vague. Each component runs on deterministic mathematical formulas
              documented across millennia and adapted for digital precision.
            </p>
          </div>
        </div>

        {/* Asymmetrical Three Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12 items-stretch">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="group relative flex flex-col justify-between p-8 xl:p-10 rounded-3xl bg-[#0D0B1A]/40 border border-[#CFC6F6]/15 backdrop-blur-md transition-all duration-500 ease-editorial hover:border-[#CFC6F6]/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#0D0B1A]/40"
              >
                {/* Header: Oversized Number & Pillar Icon */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-4xl xl:text-5xl font-extrabold text-[#CFC6F6]/40 group-hover:text-[#CFC6F6] transition-colors duration-500">
                      {pillar.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#5B3BD1]/40 border border-[#CFC6F6]/30 flex items-center justify-center text-[#CFC6F6] group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl xl:text-2xl font-bold tracking-tight text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-[#CFC6F6] font-semibold mb-5">
                    {pillar.subtitle}
                  </p>
                  <p className="text-sm leading-relaxed text-[#CFC6F6]/85 font-normal">
                    {pillar.description}
                  </p>
                </div>

                {/* Sub-features Checklist */}
                <div className="mt-8 pt-6 border-t border-[#CFC6F6]/15">
                  <ul className="space-y-2 text-xs text-[#CFC6F6]/80 font-medium">
                    {pillar.features.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#CFC6F6]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
