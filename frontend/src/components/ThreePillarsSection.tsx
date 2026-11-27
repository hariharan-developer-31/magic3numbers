"use client";

import React, { useState } from "react";
import { Moon, Sun, Orbit, ChevronLeft, ChevronRight } from "lucide-react";

export default function ThreePillarsSection() {
  const [activeMobileCard, setActiveMobileCard] = useState(0);

  const pillars = [
    {
      num: "01",
      icon: Moon,
      title: "Vedic Astrology (Jyotish)",
      subtitle: "The Subconscious Lunar Sanctuary",
      description:
        "Calculated using the Sidereal Zodiac with Chitrapaksha (Lahiri) Ayanamsa. We map your exact Rashi (Moon Sign), D1 Chart in Whole Signs, and position within the 27 Nakshatras and 108 Padas to reveal subconscious intuition and karmic orientation.",
      features: [
        "Sidereal Lahiri Ayanamsa",
        "D1 Rashi Chart & Whole Sign Houses",
        "27 Nakshatras & 4 Padas each",
        "9 Grahas (Sun to Ketu)",
      ],
    },
    {
      num: "02",
      icon: Sun,
      title: "Western Astrology",
      subtitle: "The Conscious Solar Ego & Geometry",
      description:
        "Grounded in the Tropical Zodiac and seasonal solstices. Analyzes your conscious purpose through your Sun Sign, personality projection via your Rising Sign (Ascendant), and energetic dynamics through precise planetary aspects (conjunction, trine, square).",
      features: [
        "Tropical Zodiac Alignment",
        "Sun, Moon & Rising Sign Triad",
        "Major Aspects with precise orbs",
        "Placidus & Equal House quadrants",
      ],
    },
    {
      num: "03",
      icon: Orbit,
      title: "Pythagorean Numerology",
      subtitle: "The Vibrational Blueprint",
      description:
        "Translates your birth date and full name into foundational cosmic frequencies. Strictly preserving Master Numbers (11, 22, 33), we compute your Life Path, Birthday, Expression, Soul Urge, and Personal Year linked to canonical planetary rulers.",
      features: [
        "Life Path & Birthday Numbers",
        "Expression, Soul Urge & Personality",
        "Preserved Master Frequencies (11/22/33)",
        "Canonical 1–9 Planetary Mappings",
      ],
    },
  ];

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const cardWidth = el.scrollWidth / pillars.length;
    const index = Math.round(el.scrollLeft / cardWidth);
    if (index >= 0 && index < pillars.length) {
      setActiveMobileCard(index);
    }
  };

  return (
    <section
      id="three-pillars"
      data-theme="dark"
      className="relative min-h-screen w-full py-16 sm:py-24 md:py-32 bg-[#3A1F8C] text-white overflow-hidden flex items-center"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[600px] h-80 sm:h-[600px] bg-[#5B3BD1] opacity-30 rounded-full blur-[120px] pointer-events-none" />

      <div className="content-container relative z-10 w-full">
        {/* Section Header: 60% space allocated to headline above tablet view */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10 mb-10 sm:mb-16 md:mb-20">
          <div className="w-full md:w-[60%] lg:w-[60%] flex-shrink-0">
            <span className="editorial-caption text-[#CFC6F6]">The Methodological Foundation</span>
            <h2 className="section-headline text-white mt-3 uppercase tracking-tight leading-[1.08]">
              Three Sacred <span className="text-[#CFC6F6]">Disciplines.</span>
              <br />
              One Unified Blueprint.
            </h2>
          </div>
          <div className="w-full md:w-[36%] lg:w-[35%]">
            <p className="text-xs sm:text-sm md:text-base text-[#CFC6F6]/85 font-normal leading-relaxed">
              Never arbitrary, never vague. Each component runs on deterministic mathematical formulas
              documented across millennia and adapted for digital precision.
            </p>
          </div>
        </div>

        {/* Mobile Swipe Instructions & Counter */}
        <div className="flex md:hidden items-center justify-between text-xs text-[#CFC6F6]/80 mb-3 px-1">
          <span className="font-semibold uppercase tracking-wider text-[10px]">
            Discipline {activeMobileCard + 1} of 3
          </span>
          <span className="text-[11px] flex items-center gap-1 font-medium text-[#CFC6F6] animate-pulse">
            Swipe cards &rarr;
          </span>
        </div>

        {/* Swipeable Container on Mobile, Wider 3-column Grid Above Tablet */}
        <div
          onScroll={handleMobileScroll}
          className="flex md:grid md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 xl:gap-10 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory pt-4 pb-8 sm:pt-6 sm:pb-10 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="w-[88vw] max-w-[420px] sm:w-[440px] md:w-full md:max-w-none flex-shrink-0 snap-center group relative flex flex-col justify-between p-7 sm:p-9 lg:p-11 rounded-[32px] bg-[#0D0B1A]/55 border border-[#CFC6F6]/20 backdrop-blur-md transition-all duration-300 ease-editorial hover:border-[#CFC6F6]/40 md:hover:-translate-y-2 shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#CFC6F6]/35 group-hover:text-[#CFC6F6] transition-colors">
                      {pillar.num}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-[#5B3BD1]/50 border border-[#CFC6F6]/30 flex items-center justify-center text-[#CFC6F6] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs uppercase tracking-wider text-[#CFC6F6] font-semibold mb-4">
                    {pillar.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#CFC6F6]/85 font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[#CFC6F6]/15">
                  <ul className="space-y-2 text-xs text-[#CFC6F6]/80 font-medium">
                    {pillar.features.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#CFC6F6] flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Swipe Indicators (Active Dot Tracking) */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-4">
          {pillars.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeMobileCard === idx ? "w-6 bg-[#CFC6F6]" : "w-1.5 bg-[#CFC6F6]/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
