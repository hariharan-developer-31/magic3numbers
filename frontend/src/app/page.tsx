"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ThreePillarsSection from "@/components/ThreePillarsSection";
import ProfileGeneratorSection from "@/components/ProfileGeneratorSection";
import Footer from "@/components/Footer";
import CalculationLoader from "@/components/CalculationLoader";
import { UserSession } from "@/components/AuthGate";
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
  const router = useRouter();
  const [user, setUser] = useState<UserSession | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [currentCalculatingName, setCurrentCalculatingName] = useState("");

  // Check saved user session
  useEffect(() => {
    const savedUser = localStorage.getItem("magic3_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {}
    }
  }, []);

  const handleAuthSuccess = (authenticatedUser: UserSession) => {
    setUser(authenticatedUser);
    localStorage.setItem("magic3_user", JSON.stringify(authenticatedUser));
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("magic3_user");
  };

  const handleCalculate = async (input: BirthInput) => {
    setCurrentCalculatingName(input.fullName);
    setIsCalculating(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      let calculatedResult: FullCosmicAnalysis | null = null;

      if (apiUrl) {
        try {
          const response = await fetch(`${apiUrl}/api/v1/calculate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: user?.id || null,
              email: user?.email || null,
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
        // High-precision local deterministic calculation
        calculatedResult = performFullAnalysis(input);
      }

      // Record profile for Admin Panel in localStorage as persistent client telemetry
      try {
        const existingRecords = JSON.parse(localStorage.getItem("magic3_admin_records") || "[]");
        const newRecord = {
          id: Date.now(),
          full_name: input.fullName,
          email: user?.email || "anonymous@member.com",
          birth_date: input.birthDate,
          birth_time: input.birthTime,
          is_time_unknown: input.isTimeUnknown,
          birth_city: input.birthCity,
          sun_sign: calculatedResult.western.sunSign,
          moon_sign: calculatedResult.vedic.moonSign,
          nakshatra: calculatedResult.vedic.moonNakshatra,
          pada: calculatedResult.vedic.moonPada,
          life_path_number: calculatedResult.numerology.lifePathNumber,
          birthday_number: calculatedResult.numerology.birthdayNumber,
          expression_number: calculatedResult.numerology.expressionNumber,
          number_1: calculatedResult.numerology.lifePathNumber,
          number_2: calculatedResult.numerology.birthdayNumber,
          number_3: calculatedResult.numerology.expressionNumber,
          formatted_numbers: `${calculatedResult.numerology.lifePathNumber} • ${calculatedResult.numerology.birthdayNumber} • ${calculatedResult.numerology.expressionNumber}`,
          is_master_number: calculatedResult.numerology.isMasterLifePath,
          created_at: new Date().toISOString(),
        };
        localStorage.setItem("magic3_admin_records", JSON.stringify([newRecord, ...existingRecords]));
      } catch (e) {}

      // Persist active blueprint for the dedicated /blueprint page
      localStorage.setItem("magic3_active_blueprint", JSON.stringify(calculatedResult));

      // Allow smooth animation steps in CalculationLoader (1.8s for tactile celestial experience)
      await new Promise((resolve) => setTimeout(resolve, 1800));

      setIsCalculating(false);
      // Navigate to dedicated new blueprint page
      router.push("/blueprint");
    } catch (err) {
      console.error("Calculation error:", err);
      const fallbackResult = performFullAnalysis(input);
      localStorage.setItem("magic3_active_blueprint", JSON.stringify(fallbackResult));
      setIsCalculating(false);
      router.push("/blueprint");
    }
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

      {/* Section 1: Hero (strictly 100vh) */}
      <HeroSection onGetStarted={scrollToCalculator} />

      {/* Section 2: The Three Pillars */}
      <ThreePillarsSection />

      {/* Section 3: Birth Profile Generator Input (Gated with Account Login / Sign Up) */}
      <ProfileGeneratorSection
        user={user}
        onAuthSuccess={handleAuthSuccess}
        onSignOut={handleSignOut}
        onCalculate={handleCalculate}
        isLoading={isCalculating}
      />

      {/* Section 4: Minimal Editorial Footer */}
      <Footer />
    </main>
  );
}
