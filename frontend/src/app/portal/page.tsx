"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";
import CalculationLoader from "@/components/CalculationLoader";
import AuthGate, { UserSession } from "@/components/AuthGate";
import { BirthInput, FullCosmicAnalysis } from "@/types/astrology";
import { performFullAnalysis } from "@/lib/engines/synthesis";
import {
  Compass,
  History,
  Gem,
  Sliders,
  LogOut,
  User,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  Eye,
  Trash2,
  CheckCircle,
  ShieldCheck,
  Zap,
  Check,
  Layers,
  ArrowLeft,
  Edit3,
} from "lucide-react";

export interface StoredCalculation {
  id: string | number;
  fullName: string;
  birthDate: string;
  birthTime?: string;
  birthCity?: string;
  sunSign: string;
  moonSign: string;
  nakshatra: string;
  lifePathNumber: number;
  birthdayNumber: number;
  expressionNumber: number;
  isMasterNumber?: boolean;
  calculatedAt: string;
  fullData: FullCosmicAnalysis;
}

export default function PortalPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserSession | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [activeTab, setActiveTab] = useState<"webapp" | "history" | "plans" | "settings">("webapp");

  // Form State
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("1992-05-18");
  const [birthTime, setBirthTime] = useState("14:30");
  const [isTimeUnknown, setIsTimeUnknown] = useState(false);
  const [birthCity, setBirthCity] = useState("Kuala Lumpur, Malaysia");
  const [latitude, setLatitude] = useState(3.139);
  const [longitude, setLongitude] = useState(101.6869);
  const [timezone, setTimezone] = useState("Asia/Kuala_Lumpur");
  const [utcOffset, setUtcOffset] = useState(8);

  // History state
  const [history, setHistory] = useState<StoredCalculation[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Account Edit State
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [accountEmail, setAccountEmail] = useState("");

  // Calculation Loader
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatingName, setCalculatingName] = useState("");

  // Check saved session & history on mount + support URL query ?tab=history
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        const requestedTab = urlParams.get("tab");
        if (requestedTab === "history" || requestedTab === "plans" || requestedTab === "settings" || requestedTab === "webapp") {
          setActiveTab(requestedTab as any);
        }
      }

      const savedUser = localStorage.getItem("magic3_user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        setAccountName(parsed.name || "");
        setAccountEmail(parsed.email || "");
        if (parsed.name && parsed.name !== "Guest Explorer") {
          setFullName(parsed.name);
        }
      }

      // Load user calculations history
      const savedHistory = localStorage.getItem("magic3_user_history");
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      } else {
        // Fallback to active blueprint if available
        const activeBlueprint = localStorage.getItem("magic3_active_blueprint");
        if (activeBlueprint) {
          const bp: FullCosmicAnalysis = JSON.parse(activeBlueprint);
          const initialRecord: StoredCalculation = {
            id: Date.now(),
            fullName: bp.input.fullName,
            birthDate: bp.input.birthDate,
            birthTime: bp.input.birthTime,
            birthCity: bp.input.birthCity,
            sunSign: bp.western.sunSign,
            moonSign: bp.vedic.moonSign,
            nakshatra: bp.vedic.moonNakshatra,
            lifePathNumber: bp.numerology.lifePathNumber,
            birthdayNumber: bp.numerology.birthdayNumber,
            expressionNumber: bp.numerology.expressionNumber,
            isMasterNumber: bp.numerology.isMasterLifePath,
            calculatedAt: bp.calculatedAt || new Date().toISOString(),
            fullData: bp,
          };
          setHistory([initialRecord]);
          localStorage.setItem("magic3_user_history", JSON.stringify([initialRecord]));
        }
      }
    } catch (e) {
      console.warn("Storage reading error:", e);
    } finally {
      setAuthChecked(true);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("magic3_user");
    setUser(null);
    router.push("/");
  };

  const handleAuthSuccess = (authenticatedUser: UserSession) => {
    setUser(authenticatedUser);
    localStorage.setItem("magic3_user", JSON.stringify(authenticatedUser));
    if (authenticatedUser.name && authenticatedUser.name !== "Guest Explorer") {
      setFullName(authenticatedUser.name);
    }
    setToastMessage(`Welcome, ${authenticatedUser.name}!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !birthDate) return;

    setCalculatingName(fullName);
    setIsCalculating(true);

    const inputData: BirthInput = {
      fullName,
      birthDate,
      birthTime: isTimeUnknown ? "12:00" : birthTime,
      isTimeUnknown,
      birthCity,
      latitude,
      longitude,
      timezone,
      utcOffset,
    };

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
              full_name: inputData.fullName,
              birth_date: inputData.birthDate,
              birth_time: inputData.birthTime,
              is_time_unknown: inputData.isTimeUnknown,
              birth_city: inputData.birthCity,
              latitude: inputData.latitude,
              longitude: inputData.longitude,
              timezone: inputData.timezone,
              utc_offset: inputData.utcOffset,
            }),
          });

          if (response.ok) {
            const resJson = await response.json();
            if (resJson.success && resJson.data) {
              calculatedResult = {
                input: inputData,
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
        calculatedResult = performFullAnalysis(inputData);
      }

      // Persist to user history
      const newStoredRecord: StoredCalculation = {
        id: Date.now(),
        fullName: inputData.fullName,
        birthDate: inputData.birthDate,
        birthTime: inputData.birthTime,
        birthCity: inputData.birthCity,
        sunSign: calculatedResult.western.sunSign,
        moonSign: calculatedResult.vedic.moonSign,
        nakshatra: calculatedResult.vedic.moonNakshatra,
        lifePathNumber: calculatedResult.numerology.lifePathNumber,
        birthdayNumber: calculatedResult.numerology.birthdayNumber,
        expressionNumber: calculatedResult.numerology.expressionNumber,
        isMasterNumber: calculatedResult.numerology.isMasterLifePath,
        calculatedAt: new Date().toISOString(),
        fullData: calculatedResult,
      };

      const updatedHistory = [newStoredRecord, ...history.filter((h) => h.fullName !== inputData.fullName)];
      setHistory(updatedHistory);
      localStorage.setItem("magic3_user_history", JSON.stringify(updatedHistory));

      // Persist to Admin Panel records
      try {
        const existingAdmin = JSON.parse(localStorage.getItem("magic3_admin_records") || "[]");
        const adminItem = {
          id: newStoredRecord.id,
          full_name: inputData.fullName,
          email: user?.email || "anonymous@member.com",
          birth_date: inputData.birthDate,
          birth_time: inputData.birthTime,
          is_time_unknown: inputData.isTimeUnknown,
          birth_city: inputData.birthCity,
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
          created_at: newStoredRecord.calculatedAt,
        };
        localStorage.setItem("magic3_admin_records", JSON.stringify([adminItem, ...existingAdmin]));
      } catch (e) {}

      // Set active blueprint for view
      localStorage.setItem("magic3_active_blueprint", JSON.stringify(calculatedResult));

      // 1.8s tactile celestial animation
      await new Promise((resolve) => setTimeout(resolve, 1800));

      setIsCalculating(false);
      router.push("/blueprint");
    } catch (err) {
      console.error("Calculation failure:", err);
      const fallback = performFullAnalysis(inputData);
      localStorage.setItem("magic3_active_blueprint", JSON.stringify(fallback));
      setIsCalculating(false);
      router.push("/blueprint");
    }
  };

  const handleOpenFromHistory = (item: StoredCalculation) => {
    localStorage.setItem("magic3_active_blueprint", JSON.stringify(item.fullData));
    router.push("/blueprint");
  };

  const handleDeleteFromHistory = (id: string | number) => {
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    localStorage.setItem("magic3_user_history", JSON.stringify(updated));
    setToastMessage("Record removed from history.");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleEditProfile = (item: StoredCalculation) => {
    setFullName(item.fullName);
    setBirthDate(item.birthDate);
    setBirthTime(item.birthTime || "14:30");
    setIsTimeUnknown(item.fullData?.input?.isTimeUnknown || false);
    setBirthCity(item.birthCity || "Kuala Lumpur, Malaysia");
    if (item.fullData?.input?.latitude) setLatitude(item.fullData.input.latitude);
    if (item.fullData?.input?.longitude) setLongitude(item.fullData.input.longitude);
    if (item.fullData?.input?.timezone) setTimezone(item.fullData.input.timezone);
    if (item.fullData?.input?.utcOffset !== undefined) setUtcOffset(item.fullData.input.utcOffset);
    setActiveTab("webapp");
    setToastMessage(`Loaded profile for "${item.fullName}". Edit any field and click calculate.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveAccountDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountName.trim() || !accountEmail.trim() || !user) return;
    const updated = {
      ...user,
      name: accountName.trim(),
      email: accountEmail.trim(),
    };
    setUser(updated);
    localStorage.setItem("magic3_user", JSON.stringify(updated));
    setIsEditingAccount(false);
    setToastMessage("Account profile details updated successfully.");
    setTimeout(() => setToastMessage(null), 3500);
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#E7E3FB] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#5B3BD1] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#E7E3FB] text-[#0D0B1A] flex flex-col justify-between selection:bg-[#5B3BD1] selection:text-white pb-24 sm:pb-28">
      {/* Calculation Loading Screen */}
      <CalculationLoader isOpen={isCalculating} fullName={calculatingName} />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-[#0D0B1A] text-white shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-semibold border border-[#CFC6F6]/30 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          TOP NAVIGATION BAR: Brand Logo + Member Profile Status + Log out
          ========================================================================= */}
      <header className="sticky top-0 z-40 w-full bg-[#E7E3FB]/90 backdrop-blur-md border-b border-[#5B3BD1]/10 shadow-xs">
        <div className="content-container flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* Logo / Return to website */}
          <Link href="/" className="focus:outline-none flex-shrink-0" title="Return to Homepage">
            <BrandLogo textColor="text-[#0D0B1A]" className="w-7 h-7 sm:w-9 sm:h-9" />
          </Link>

          {/* User Profile Status & Log out */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {user ? (
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/90 border border-[#5B3BD1]/20 text-xs text-[#0D0B1A] shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span className="font-semibold truncate max-w-[120px] sm:max-w-[200px]">
                    {user.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white text-[#5B3BD1] hover:text-white hover:bg-[#5B3BD1] border border-[#5B3BD1]/20 transition-all text-xs font-semibold shadow-xs cursor-pointer focus:outline-none"
                  title="Sign out of member session"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Log out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/"
                className="text-xs font-semibold text-[#5B3BD1] hover:underline flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Website</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* =========================================================================
          MAIN PORTAL CONTENT AREA
          ========================================================================= */}
      <main className="content-container w-full max-w-5xl mx-auto pt-6 sm:pt-10 flex-1">
        {/* If user is not authenticated, show AuthGate */}
        {!user ? (
          <div className="max-w-xl mx-auto py-8">
            <div className="text-center mb-6">
              <span className="editorial-caption text-[#5B3BD1]">Member Portal Access</span>
              <h2 className="section-headline mt-1 uppercase tracking-tight text-[#0D0B1A]">
                Sign In To <span className="text-[#5B3BD1]">Your Portal.</span>
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#4A4568]">
                Sign in or create an account to access the calculations webapp, view your saved history, and manage settings.
              </p>
            </div>
            <AuthGate onAuthSuccess={handleAuthSuccess} />
          </div>
        ) : (
          <>
            {/* TAB 1: WEBAPP / BIRTH PROFILE CALCULATOR */}
            {activeTab === "webapp" && (
              <div className="max-w-2xl mx-auto w-full animate-fade-in">
                {/* Form Profile Header */}
                <div className="text-center mb-6 sm:mb-8">
                  <span className="editorial-caption text-[#5B3BD1]">Astronomical Synthesis</span>
                  <h2 className="section-headline mt-1 uppercase tracking-tight text-[#0D0B1A]">
                    Create Your <span className="text-[#5B3BD1]">Birth Profile.</span>
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-[#4A4568]">
                    Enter your birth parameters to initialize the astronomical ephemeris and numerological synthesis.
                  </p>
                </div>

                {/* Form Card */}
                <div className="w-full max-w-full rounded-[28px] sm:rounded-[36px] bg-white/90 backdrop-blur-xl border border-white shadow-xl shadow-[#5B3BD1]/5 p-5 sm:p-8 md:p-10 box-border overflow-hidden">
                  <form onSubmit={handleCalculate} className="space-y-5 sm:space-y-6 w-full max-w-full overflow-hidden">
                    {/* Full Birth Name */}
                    <div className="w-full max-w-full min-w-0">
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0B1A] mb-1.5 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-[#5B3BD1]" />
                          Full Birth Name
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-[#4A4568] font-normal normal-case">
                          For Expression calculation
                        </span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Maya Lin, Alexander, Hari..."
                        className="w-full max-w-full min-w-0 box-border px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#E7E3FB]/40 border border-[#5B3BD1]/20 text-[#0D0B1A] placeholder-[#4A4568]/50 focus:outline-none focus:border-[#5B3BD1] focus:bg-white text-base font-medium transition-all"
                      />
                    </div>

                    {/* Date of Birth */}
                    <div className="w-full max-w-full min-w-0">
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0B1A] mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#5B3BD1]" />
                        <span>Date of Birth</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full max-w-full min-w-0 box-border appearance-none px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#E7E3FB]/40 border border-[#5B3BD1]/20 text-[#0D0B1A] focus:outline-none focus:border-[#5B3BD1] focus:bg-white text-base font-medium transition-all"
                      />
                    </div>

                    {/* Birth Time */}
                    <div className="w-full max-w-full min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs uppercase tracking-wider font-semibold text-[#0D0B1A] flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#5B3BD1]" />
                          <span>Exact Birth Time</span>
                        </label>
                        <label className="inline-flex items-center gap-1.5 text-xs text-[#4A4568] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isTimeUnknown}
                            onChange={(e) => setIsTimeUnknown(e.target.checked)}
                            className="rounded border-[#5B3BD1]/30 text-[#5B3BD1] focus:ring-0"
                          />
                          <span>Time unknown</span>
                        </label>
                      </div>
                      <input
                        type="time"
                        disabled={isTimeUnknown}
                        value={birthTime}
                        onChange={(e) => setBirthTime(e.target.value)}
                        className="w-full max-w-full min-w-0 box-border appearance-none px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#E7E3FB]/40 border border-[#5B3BD1]/20 text-[#0D0B1A] disabled:opacity-50 focus:outline-none focus:border-[#5B3BD1] focus:bg-white text-base font-medium transition-all"
                      />
                    </div>

                    {/* Birthplace Location */}
                    <div className="w-full max-w-full min-w-0">
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0B1A] mb-1.5 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#5B3BD1]" />
                          Birthplace Location
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-[#4A4568] font-normal normal-case">
                          Auto-resolves Coordinates &amp; UTC
                        </span>
                      </label>
                      <input
                        type="text"
                        required
                        value={birthCity}
                        onChange={(e) => setBirthCity(e.target.value)}
                        placeholder="e.g. London, Tokyo, New York..."
                        className="w-full max-w-full min-w-0 box-border px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#E7E3FB]/40 border border-[#5B3BD1]/20 text-[#0D0B1A] placeholder-[#4A4568]/50 focus:outline-none focus:border-[#5B3BD1] focus:bg-white text-base font-medium transition-all"
                      />
                    </div>

                    {/* Metadata Badges */}
                    <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#4A4568]">
                      <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#5B3BD1]" />
                        <span>Saved securely to your private member account.</span>
                      </div>
                      <span className="text-[11px] font-mono text-[#5B3BD1]">Lahiri Ayanamsa</span>
                    </div>

                    {/* Calculate Button */}
                    <button
                      type="submit"
                      className="w-full py-4 px-6 rounded-2xl bg-[#5B3BD1] text-white text-sm sm:text-base font-bold uppercase tracking-wider transition-all duration-300 ease-editorial hover:bg-[#3A1F8C] hover:shadow-xl hover:shadow-[#5B3BD1]/30 active:scale-98 flex items-center justify-center gap-2 shadow-lg shadow-[#5B3BD1]/20 cursor-pointer"
                    >
                      <Sparkles className="w-5 h-5 text-[#CFC6F6]" />
                      <span>Calculate &amp; Reveal My 3 Numbers</span>
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* TAB 2: HISTORY */}
            {activeTab === "history" && (
              <div className="max-w-3xl mx-auto w-full animate-fade-in">
                <div className="text-center mb-6 sm:mb-8">
                  <span className="editorial-caption text-[#5B3BD1]">Calculation Archive</span>
                  <h2 className="section-headline mt-1 uppercase tracking-tight text-[#0D0B1A]">
                    Your Calculation <span className="text-[#5B3BD1]">History.</span>
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-[#4A4568]">
                    Reopen your calculated blueprints or inspect your derived astrological frequencies.
                  </p>
                </div>

                {history.length === 0 ? (
                  <div className="p-10 rounded-3xl bg-white/80 border border-white text-center">
                    <History className="w-10 h-10 text-[#5B3BD1]/50 mx-auto mb-3" />
                    <h4 className="text-base font-bold text-[#0D0B1A]">No Saved Blueprints Yet</h4>
                    <p className="text-xs text-[#4A4568] mt-1 mb-5">
                      Calculate your first profile in the Webapp tab to record your 3 Sacred Numbers here.
                    </p>
                    <button
                      onClick={() => setActiveTab("webapp")}
                      className="px-5 py-2.5 rounded-full bg-[#5B3BD1] text-white text-xs font-semibold hover:bg-[#3A1F8C] transition-all"
                    >
                      Open 3 Numbers Calculator &rarr;
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/90 border border-white shadow-md shadow-[#5B3BD1]/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:shadow-lg"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-[#0D0B1A] text-base">{item.fullName}</h4>
                            {item.isMasterNumber && (
                              <span className="px-2 py-0.5 rounded-full bg-[#5B3BD1]/15 text-[#5B3BD1] text-[10px] font-bold">
                                Master Vibration
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#4A4568]">
                            {item.birthDate} {item.birthTime ? `@ ${item.birthTime}` : ""} &bull; {item.birthCity || "Unknown city"}
                          </p>
                          <p className="text-xs text-[#5B3BD1] font-medium">
                            Sun in {item.sunSign} &bull; Moon in {item.moonSign} ({item.nakshatra})
                          </p>
                        </div>

                        {/* The 3 Numbers Badges */}
                        <div className="flex items-center gap-3">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#5B3BD1]/10 text-[#5B3BD1] font-mono font-bold text-xs border border-[#5B3BD1]/20 shadow-xs">
                            <span
                              className="w-6 h-6 rounded-lg bg-[#5B3BD1] text-white flex items-center justify-center text-xs font-extrabold"
                              title="Life Path"
                            >
                              {item.lifePathNumber}
                            </span>
                            <span className="text-gray-400">&bull;</span>
                            <span
                              className="w-6 h-6 rounded-lg bg-[#3A1F8C] text-white flex items-center justify-center text-xs font-extrabold"
                              title="Birthday"
                            >
                              {item.birthdayNumber}
                            </span>
                            <span className="text-gray-400">&bull;</span>
                            <span
                              className="w-6 h-6 rounded-lg bg-[#5B3BD1] text-white flex items-center justify-center text-xs font-extrabold"
                              title="Expression"
                            >
                              {item.expressionNumber}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleEditProfile(item)}
                              className="px-2.5 py-1.5 rounded-xl bg-[#E7E3FB] text-[#5B3BD1] hover:bg-[#5B3BD1] hover:text-white transition-colors text-xs font-semibold flex items-center gap-1 cursor-pointer"
                              title="Edit birth parameters & recalculate"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                              onClick={() => handleOpenFromHistory(item)}
                              className="px-3 py-1.5 rounded-xl bg-[#5B3BD1] text-white hover:bg-[#3A1F8C] transition-colors text-xs font-semibold flex items-center gap-1 cursor-pointer"
                              title="View Blueprint"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Open</span>
                            </button>
                            <button
                              onClick={() => handleDeleteFromHistory(item.id)}
                              className="p-1.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                              title="Delete from history"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: PLANS */}
            {activeTab === "plans" && (
              <div className="max-w-4xl mx-auto w-full animate-fade-in">
                <div className="text-center mb-6 sm:mb-8">
                  <span className="editorial-caption text-[#5B3BD1]">Platform Tiers</span>
                  <h2 className="section-headline mt-1 uppercase tracking-tight text-[#0D0B1A]">
                    Sacred Access <span className="text-[#5B3BD1]">Plans.</span>
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-[#4A4568]">
                    Explore deterministic calculation features and comprehensive master dossier unlocks.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {/* Free Explorer Plan (Current) */}
                  <div className="p-6 sm:p-8 rounded-[32px] bg-white/90 border border-white shadow-xl flex flex-col justify-between relative overflow-hidden">
                    <div>
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase mb-4">
                        <Check className="w-3 h-3" />
                        <span>Active Tier</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#0D0B1A]">Explorer Member</h3>
                      <p className="text-xs text-[#4A4568] mt-1 mb-6">
                        Complimentary foundational access to the 3 Sacred Numbers engine.
                      </p>

                      <div className="text-3xl font-extrabold text-[#0D0B1A] mb-6">
                        $0 <span className="text-xs text-[#4A4568] font-normal">/ complimentary</span>
                      </div>

                      <ul className="space-y-3 text-xs sm:text-sm text-[#0D0B1A]">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>3 Sacred Numbers Calculation (1-9 &amp; Master 11/22/33)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>Sidereal Vedic Moon Sign &amp; Nakshatra Asterism</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>Tropical Western Sun Sign &amp; Solar Ego synthesis</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>Deterministic Ephemeris &amp; Zero Hallucination</span>
                        </li>
                        <li className="flex items-center gap-2 text-gray-400">
                          <span className="w-4 h-4 text-center">&times;</span>
                          <span>40+ Page Master Dossier PDF Export</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-8 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => setActiveTab("webapp")}
                        className="w-full py-3 rounded-xl bg-gray-100 text-[#0D0B1A] text-xs font-bold hover:bg-gray-200 transition-colors uppercase tracking-wider"
                      >
                        Calculate Your 3 Numbers
                      </button>
                    </div>
                  </div>

                  {/* Master Blueprint Dossier */}
                  <div className="p-6 sm:p-8 rounded-[32px] bg-gradient-to-b from-[#16122C] to-[#0D0B1A] text-white border border-[#CFC6F6]/30 shadow-2xl flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                      <span className="px-3 py-1 rounded-full bg-[#5B3BD1] text-[#CFC6F6] text-[10px] font-bold uppercase tracking-wider">
                        Recommended
                      </span>
                    </div>

                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5B3BD1]/30 text-[#CFC6F6] text-xs font-bold uppercase mb-4 border border-[#5B3BD1]/50">
                        <Gem className="w-3.5 h-3.5 text-[#CFC6F6]" />
                        <span>Sacred Master Tier</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">Full Celestial Dossier</h3>
                      <p className="text-xs text-[#CFC6F6]/80 mt-1 mb-6">
                        Complete 40+ page comprehensive lifetime progression and transit dossier.
                      </p>

                      <div className="text-3xl font-extrabold text-white mb-6">
                        $29 <span className="text-xs text-[#CFC6F6]/60 font-normal">/ lifetime access</span>
                      </div>

                      <ul className="space-y-3 text-xs sm:text-sm text-[#CFC6F6]/90">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#CFC6F6] flex-shrink-0" />
                          <span>Includes all complimentary Explorer features</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#CFC6F6] flex-shrink-0" />
                          <span>Vimshottari Dasha 120-year planetary cycle forecast</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#CFC6F6] flex-shrink-0" />
                          <span>Harmonic geometric aspect overlays &amp; orb tolerances</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#CFC6F6] flex-shrink-0" />
                          <span>Full 365-day personal cosmic calendar &amp; ephemeris</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#CFC6F6] flex-shrink-0" />
                          <span>High-Resolution Celestial PDF Dossier Export</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/10">
                      <button
                        onClick={() => router.push("/blueprint#premium-reports")}
                        className="w-full py-3.5 rounded-xl bg-[#5B3BD1] hover:bg-[#3A1F8C] text-white text-xs font-bold transition-all uppercase tracking-wider shadow-lg shadow-[#5B3BD1]/40 flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 text-[#CFC6F6]" />
                        <span>View Dossier Blueprint</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: SETTINGS */}
            {activeTab === "settings" && (
              <div className="max-w-2xl mx-auto w-full animate-fade-in">
                <div className="text-center mb-6 sm:mb-8">
                  <span className="editorial-caption text-[#5B3BD1]">Account &amp; Engine</span>
                  <h2 className="section-headline mt-1 uppercase tracking-tight text-[#0D0B1A]">
                    Member <span className="text-[#5B3BD1]">Settings.</span>
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-[#4A4568]">
                    Configure your session parameters and astronomical engine preferences.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Session Information with Edit Option */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-white shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-[#0D0B1A] uppercase tracking-wider flex items-center gap-2">
                        <User className="w-4 h-4 text-[#5B3BD1]" />
                        <span>Member Profile Details</span>
                      </h3>
                      {!isEditingAccount && (
                        <button
                          type="button"
                          onClick={() => {
                            setAccountName(user.name);
                            setAccountEmail(user.email);
                            setIsEditingAccount(true);
                          }}
                          className="text-xs text-[#5B3BD1] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit Details</span>
                        </button>
                      )}
                    </div>

                    {isEditingAccount ? (
                      <form onSubmit={handleSaveAccountDetails} className="space-y-4 pt-1">
                        <div>
                          <label className="block text-xs uppercase font-semibold text-[#0D0B1A] mb-1">
                            Your Name
                          </label>
                          <input
                            type="text"
                            required
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                            className="w-full box-border px-3.5 py-2.5 rounded-xl border border-[#5B3BD1]/30 text-sm focus:outline-none focus:border-[#5B3BD1] bg-[#E7E3FB]/40"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase font-semibold text-[#0D0B1A] mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            value={accountEmail}
                            onChange={(e) => setAccountEmail(e.target.value)}
                            className="w-full box-border px-3.5 py-2.5 rounded-xl border border-[#5B3BD1]/30 text-sm focus:outline-none focus:border-[#5B3BD1] bg-[#E7E3FB]/40"
                          />
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <button
                            type="submit"
                            className="px-4 py-2 rounded-xl bg-[#5B3BD1] text-white text-xs font-bold hover:bg-[#3A1F8C] transition-colors cursor-pointer shadow-xs"
                          >
                            Save Changes
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsEditingAccount(false)}
                            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-3 text-xs sm:text-sm">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-[#4A4568]">Full Name</span>
                          <span className="font-semibold text-[#0D0B1A]">{user.name}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-[#4A4568]">Account Email</span>
                          <span className="font-semibold text-[#0D0B1A]">{user.email}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-[#4A4568]">Session Type</span>
                          <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-xs">
                            <Check className="w-3 h-3" />
                            Authenticated Member
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Engine Calibration */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-white shadow-xl">
                    <h3 className="text-sm font-bold text-[#0D0B1A] uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#5B3BD1]" />
                      <span>Calculation Engine Calibration</span>
                    </h3>
                    <div className="space-y-3 text-xs sm:text-sm">
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <div>
                          <p className="font-semibold text-[#0D0B1A]">Sidereal Ephemeris</p>
                          <p className="text-[11px] text-[#4A4568]">Lahiri Ayanamsa (Canonical 24° offset)</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-[#5B3BD1]/10 text-[#5B3BD1] text-xs font-bold">
                          Active
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <div>
                          <p className="font-semibold text-[#0D0B1A]">Master Number Retention</p>
                          <p className="text-[11px] text-[#4A4568]">Preserves 11, 22, 33 without single-digit reduction</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-[#5B3BD1]/10 text-[#5B3BD1] text-xs font-bold">
                          Enabled
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <div>
                          <p className="font-semibold text-[#0D0B1A]">Geocoding Resolution</p>
                          <p className="text-[11px] text-[#4A4568]">Nominatim OpenStreetMap High-Precision API</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-[#5B3BD1]/10 text-[#5B3BD1] text-xs font-bold">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Sign Out */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-[#0D0B1A] text-sm">Session Management</h4>
                      <p className="text-xs text-[#4A4568] mt-0.5">End your current session on this device.</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors text-xs font-semibold flex items-center justify-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* =========================================================================
          BOTTOM WEBAPP NAVBAR DOCK: Webapp, History, Plans, Settings
          ========================================================================= */}
      {user && (
        <nav
          role="navigation"
          aria-label="Webapp navigation"
          className="fixed bottom-0 left-0 right-0 z-40 bg-[#0D0B1A]/95 backdrop-blur-xl border-t border-[#3A1F8C]/40 text-white shadow-2xl px-4 py-2 sm:py-2.5"
        >
          <div className="max-w-md mx-auto grid grid-cols-4 gap-1">
            <button
              onClick={() => setActiveTab("webapp")}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all cursor-pointer select-none focus:outline-none ${
                activeTab === "webapp"
                  ? "bg-[#5B3BD1] text-white shadow-md shadow-[#5B3BD1]/40 font-bold"
                  : "text-[#CFC6F6]/70 hover:text-white hover:bg-white/5 font-medium"
              }`}
            >
              <Sparkles className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] tracking-tight">3 Numbers</span>
            </button>

            <button
              onClick={() => setActiveTab("history")}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all cursor-pointer select-none focus:outline-none ${
                activeTab === "history"
                  ? "bg-[#5B3BD1] text-white shadow-md shadow-[#5B3BD1]/40 font-bold"
                  : "text-[#CFC6F6]/70 hover:text-white hover:bg-white/5 font-medium"
              }`}
            >
              <History className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] tracking-tight">History</span>
            </button>

            <button
              onClick={() => setActiveTab("plans")}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all cursor-pointer select-none focus:outline-none ${
                activeTab === "plans"
                  ? "bg-[#5B3BD1] text-white shadow-md shadow-[#5B3BD1]/40 font-bold"
                  : "text-[#CFC6F6]/70 hover:text-white hover:bg-white/5 font-medium"
              }`}
            >
              <Gem className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] tracking-tight">Plans</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all cursor-pointer select-none focus:outline-none ${
                activeTab === "settings"
                  ? "bg-[#5B3BD1] text-white shadow-md shadow-[#5B3BD1]/40 font-bold"
                  : "text-[#CFC6F6]/70 hover:text-white hover:bg-white/5 font-medium"
              }`}
            >
              <Sliders className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] tracking-tight">Settings</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
