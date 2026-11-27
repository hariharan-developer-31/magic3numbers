"use client";

import React, { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ThreePillarsSection from "@/components/ThreePillarsSection";
import ProfileGeneratorSection from "@/components/ProfileGeneratorSection";
import DashboardSection from "@/components/DashboardSection";
import InsightsCalendarSection from "@/components/InsightsCalendarSection";
import PremiumReportSection from "@/components/PremiumReportSection";
import Footer from "@/components/Footer";
import { BirthInput, FullCosmicAnalysis } from "@/types/astrology";
import { performFullAnalysis } from "@/lib/engines/synthesis";
import { CITIES_DATABASE } from "@/lib/geocoding";

const INITIAL_INPUT: BirthInput = {
  fullName: "Alexander Vance",
  birthDate: "1992-05-18",
  birthTime: "14:30",
  isTimeUnknown: false,
  birthCity: "Kuala Lumpur",
  latitude: 3.139,
  longitude: 101.6869,
  timezone: "Asia/Kuala_Lumpur",
  utcOffset: 8,
};

export default function Home() {
  const [analysis, setAnalysis] = useState<FullCosmicAnalysis>(() => performFullAnalysis(INITIAL_INPUT));
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = async (input: BirthInput) => {
    setIsCalculating(true);
    try {
      // Optional check for external Laravel backend on Railway
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (apiUrl) {
        const response = await fetch(`${apiUrl}/api/v1/calculate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: input.fullName,
            birth_date: input.birthDate,
            birth_time: input.birthTime,
            is_time_unknown: input.isTimeUnknown,
            birth_city: input.birthCity,
            latitude: input.latitude,
            longitude: input.longitude,
            timezone: input.timezone,
            utc_offset: input.utcOffset,
          }),
        });

        if (response.ok) {
          const resJson = await response.json();
          if (resJson.success && resJson.data) {
            // Map backend snake_case response to frontend type
            setAnalysis({
              input,
              numerology: resJson.data.numerology,
              vedic: resJson.data.vedic,
              western: resJson.data.western,
              synthesis: resJson.data.synthesis,
              calculatedAt: resJson.data.calculated_at,
            });
            scrollToDashboard();
            setIsCalculating(false);
            return;
          }
        }
      }

      // High-precision client-side engine (Zero-dependency, immediate sub-second calculation)
      const result = performFullAnalysis(input);
      setAnalysis(result);
      scrollToDashboard();
    } catch (err) {
      console.error("Calculation fallback to local engine:", err);
      const fallbackResult = performFullAnalysis(input);
      setAnalysis(fallbackResult);
      scrollToDashboard();
    } finally {
      setIsCalculating(false);
    }
  };

  const scrollToDashboard = () => {
    setTimeout(() => {
      const el = document.getElementById("dashboard-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  const scrollToCalculator = () => {
    const el = document.getElementById("profile-generator");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPillars = () => {
    const el = document.getElementById("three-pillars");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen w-full bg-[#E7E3FB]">
      {/* Animated Loading Screen on First Visit */}
      <LoadingScreen />

      {/* Fixed Transparent / Adaptive Navbar */}
      <Navbar onScrollToCalculator={scrollToCalculator} />

      {/* Section 1: Hero (~100vh) */}
      <HeroSection onGetStarted={scrollToCalculator} onExplore={scrollToPillars} />

      {/* Section 2: The Three Pillars (~100vh Dark Storytelling Section) */}
      <ThreePillarsSection />

      {/* Section 3: Birth Profile Generator (~100vh Light Section) */}
      <ProfileGeneratorSection onCalculate={handleCalculate} isLoading={isCalculating} />

      {/* Section 4: Live Cosmic Dashboard & Numbers Breakdown */}
      <DashboardSection analysis={analysis} />

      {/* Section 5: Personal Insights & Calendar (~100vh Dark Nighttime Section) */}
      <InsightsCalendarSection synthesis={analysis.synthesis} />

      {/* Section 6: Premium Synthesis Reports & Plans */}
      <PremiumReportSection analysis={analysis} />

      {/* Section 7: Minimal Editorial Footer */}
      <Footer />
    </main>
  );
}
