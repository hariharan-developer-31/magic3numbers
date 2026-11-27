"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ThreePillarsSection from "@/components/ThreePillarsSection";
import ProfileGeneratorSection from "@/components/ProfileGeneratorSection";
import DashboardSection from "@/components/DashboardSection";
import InsightsCalendarSection from "@/components/InsightsCalendarSection";
import PremiumReportSection from "@/components/PremiumReportSection";
import Footer from "@/components/Footer";
import CalculationLoader from "@/components/CalculationLoader";
import { BirthInput, FullCosmicAnalysis } from "@/types/astrology";
import { performFullAnalysis } from "@/lib/engines/synthesis";

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
  const [currentCalculatingName, setCurrentCalculatingName] = useState("");

  const handleCalculate = async (input: BirthInput) => {
    setCurrentCalculatingName(input.fullName);
    setIsCalculating(true);

    try {
      // Optional check for external Laravel backend on Railway
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      let calculatedResult: FullCosmicAnalysis | null = null;

      if (apiUrl) {
        try {
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
              calculatedResult = {
                input,
                numerology: resJson.data.numerology,
                vedic: resJson.data.vedic,
                western: resJson.data.western,
                synthesis: resJson.data.synthesis,
                calculatedAt: resJson.data.calculated_at,
              };
            }
          }
        } catch (apiErr) {
          console.warn("Backend API not reachable, falling back to client-side engine:", apiErr);
        }
      }

      if (!calculatedResult) {
        // High-precision local deterministic engine
        calculatedResult = performFullAnalysis(input);
      }

      // Allow smooth animation steps in CalculationLoader (min 1.6s for tactile realism)
      await new Promise((resolve) => setTimeout(resolve, 1800));

      setAnalysis(calculatedResult);
      setIsCalculating(false);
      scrollToDashboard();
    } catch (err) {
      console.error("Calculation error:", err);
      const fallbackResult = performFullAnalysis(input);
      setAnalysis(fallbackResult);
      setIsCalculating(false);
      scrollToDashboard();
    }
  };

  const scrollToDashboard = () => {
    setTimeout(() => {
      const el = document.getElementById("dashboard-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  const scrollToCalculator = () => {
    const el = document.getElementById("profile-generator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToPillars = () => {
    const el = document.getElementById("three-pillars");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-[#E7E3FB] selection:bg-[#5B3BD1] selection:text-white">
      {/* Animative Calculation Screen triggered on input submission */}
      <CalculationLoader isOpen={isCalculating} fullName={currentCalculatingName} />

      {/* Fixed Transparent / Adaptive Navbar */}
      <Navbar onScrollToCalculator={scrollToCalculator} />

      {/* Section 1: Hero */}
      <HeroSection onGetStarted={scrollToCalculator} onExplore={scrollToPillars} />

      {/* Section 2: The Three Pillars */}
      <ThreePillarsSection />

      {/* Section 3: Birth Profile Generator Input */}
      <ProfileGeneratorSection onCalculate={handleCalculate} isLoading={isCalculating} />

      {/* Section 4: Live Cosmic Dashboard - THE 3 NUMBERS REVEALED 1ST, THEN EXPLAINED BELOW */}
      <DashboardSection analysis={analysis} />

      {/* Section 5: Personal Insights & Calendar */}
      <InsightsCalendarSection synthesis={analysis.synthesis} />

      {/* Section 6: Premium Synthesis Reports & Plans */}
      <PremiumReportSection analysis={analysis} />

      {/* Section 7: Minimal Editorial Footer */}
      <Footer />
    </main>
  );
}
