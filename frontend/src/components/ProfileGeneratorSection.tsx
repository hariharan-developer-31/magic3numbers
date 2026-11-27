"use client";

import React, { useState } from "react";
import { Sparkles, MapPin, Clock, Calendar, User, CheckCircle2, ShieldCheck, HelpCircle, LogOut } from "lucide-react";
import { BirthInput } from "@/types/astrology";
import { CITIES_DATABASE, CityLocation, searchCities } from "@/lib/geocoding";
import AuthGate, { UserSession } from "./AuthGate";

export default function ProfileGeneratorSection({
  user,
  onAuthSuccess,
  onSignOut,
  onCalculate,
  isLoading,
}: {
  user: UserSession | null;
  onAuthSuccess: (user: UserSession) => void;
  onSignOut: () => void;
  onCalculate: (input: BirthInput) => void;
  isLoading: boolean;
}) {
  const [fullName, setFullName] = useState(user?.name || "Alexander Vance");
  const [birthDate, setBirthDate] = useState("1992-05-18");
  const [birthTime, setBirthTime] = useState("14:30");
  const [isTimeUnknown, setIsTimeUnknown] = useState(false);
  const [citySearch, setCitySearch] = useState("Kuala Lumpur, Malaysia");
  const [selectedCity, setSelectedCity] = useState<CityLocation>(CITIES_DATABASE[0]);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [filteredCities, setFilteredCities] = useState<CityLocation[]>(CITIES_DATABASE.slice(0, 5));

  // Sync user name if user signs in
  React.useEffect(() => {
    if (user?.name && fullName === "Alexander Vance") {
      setFullName(user.name);
    }
  }, [user]);

  const handleCityInput = (val: string) => {
    setCitySearch(val);
    const matches = searchCities(val);
    setFilteredCities(matches);
    setCityDropdownOpen(true);
  };

  const handleSelectCity = (city: CityLocation) => {
    setSelectedCity(city);
    setCitySearch(`${city.city}, ${city.country}`);
    setCityDropdownOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      fullName,
      birthDate,
      birthTime: isTimeUnknown ? "" : birthTime,
      isTimeUnknown,
      birthCity: selectedCity.city,
      latitude: selectedCity.latitude,
      longitude: selectedCity.longitude,
      timezone: selectedCity.timezone,
      utcOffset: selectedCity.utcOffset,
    });
  };

  return (
    <section
      id="profile-generator"
      data-theme="light"
      className="relative min-h-screen w-full py-16 sm:py-24 md:py-32 bg-[#E4E0FA] text-[#0D0B1A] flex items-center overflow-hidden"
    >
      <div className="content-container relative z-10 w-full">
        {/* If user is NOT logged in: Show AuthGate directly */}
        {!user ? (
          <div>
            <div className="text-center mb-8 sm:mb-10 max-w-xl mx-auto">
              <span className="editorial-caption text-[#5B3BD1]">Member Authentication</span>
              <h2 className="section-headline mt-2 uppercase tracking-tight text-[#0D0B1A]">
                Sign In To <span className="text-[#5B3BD1]">Calculate.</span>
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#4A4568]">
                Sign in or create an account to access the high-precision astronomical engine and save your profile to the platform.
              </p>
            </div>
            <AuthGate onAuthSuccess={onAuthSuccess} />
          </div>
        ) : (
          /* User is logged in: Show Birth Profile Form with clean box-contained layout */
          <div className="max-w-2xl mx-auto w-full">
            {/* Header & Signed-in status pill */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#5B3BD1]/20 text-xs text-[#0D0B1A] mb-3 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>
                  Signed in as <strong>{user.name}</strong> ({user.email})
                </span>
                <button
                  type="button"
                  onClick={onSignOut}
                  className="ml-2 text-[11px] text-[#5B3BD1] hover:underline flex items-center gap-1 font-semibold"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Sign out</span>
                </button>
              </div>

              <h2 className="section-headline mt-1 uppercase tracking-tight text-[#0D0B1A]">
                Create Your <span className="text-[#5B3BD1]">Birth Profile.</span>
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#4A4568]">
                Enter your birth parameters to initialize the astronomical ephemeris and numerological synthesis.
              </p>
            </div>

            {/* Strictly Contained Form Card (Fix for Image 4 outer overflow) */}
            <div className="w-full rounded-[28px] sm:rounded-[36px] bg-white/90 backdrop-blur-xl border border-white shadow-xl shadow-[#5B3BD1]/5 p-5 sm:p-8 md:p-10 box-border overflow-hidden">
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Full Birth Name */}
                <div>
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
                    placeholder="e.g. Alexander Vance"
                    className="w-full box-border px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#E7E3FB]/40 border border-[#5B3BD1]/20 text-[#0D0B1A] placeholder-[#4A4568]/50 focus:outline-none focus:border-[#5B3BD1] focus:bg-white text-sm sm:text-base font-medium transition-all"
                  />
                </div>

                {/* Date of Birth & Time in Responsive 2-col Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Date of Birth */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0B1A] mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#5B3BD1]" />
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      required
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full box-border px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#E7E3FB]/40 border border-[#5B3BD1]/20 text-[#0D0B1A] focus:outline-none focus:border-[#5B3BD1] focus:bg-white text-sm sm:text-base font-medium transition-all"
                    />
                  </div>

                  {/* Exact Birth Time */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs uppercase tracking-wider font-semibold text-[#0D0B1A] flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#5B3BD1]" />
                        Exact Birth Time
                      </label>
                      <label className="inline-flex items-center gap-1 cursor-pointer text-[11px] text-[#4A4568]">
                        <input
                          type="checkbox"
                          checked={isTimeUnknown}
                          onChange={(e) => setIsTimeUnknown(e.target.checked)}
                          className="rounded border-[#5B3BD1] text-[#5B3BD1] focus:ring-0"
                        />
                        <span>Time unknown</span>
                      </label>
                    </div>
                    <input
                      type="time"
                      disabled={isTimeUnknown}
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      className={`w-full box-border px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border text-[#0D0B1A] text-sm sm:text-base font-medium transition-all ${
                        isTimeUnknown
                          ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-[#E7E3FB]/40 border-[#5B3BD1]/20 focus:outline-none focus:border-[#5B3BD1] focus:bg-white"
                      }`}
                    />
                  </div>
                </div>

                {/* Birthplace Location Autocomplete */}
                <div className="relative">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0B1A] mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#5B3BD1]" />
                      Birthplace Location
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[#4A4568] font-normal normal-case">
                      Auto-resolves Coordinates &amp; UTC
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={citySearch}
                      onChange={(e) => handleCityInput(e.target.value)}
                      onFocus={() => setCityDropdownOpen(true)}
                      onBlur={() => setTimeout(() => setCityDropdownOpen(false), 200)}
                      placeholder="Search city, e.g. Kuala Lumpur, George Town, Singapore..."
                      className="w-full box-border px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#E7E3FB]/40 border border-[#5B3BD1]/20 text-[#0D0B1A] focus:outline-none focus:border-[#5B3BD1] focus:bg-white text-sm sm:text-base font-medium transition-all"
                    />
                    {selectedCity && (
                      <div className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-1 text-[11px] text-[#5B3BD1] bg-[#CFC6F6]/40 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{selectedCity.latitude.toFixed(2)}°N, {selectedCity.longitude.toFixed(2)}°E</span>
                      </div>
                    )}
                  </div>

                  {/* Autocomplete Dropdown */}
                  {cityDropdownOpen && filteredCities.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-2xl border border-[#5B3BD1]/20 shadow-2xl z-30 overflow-hidden max-h-48 overflow-y-auto">
                      {filteredCities.map((item, idx) => (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => handleSelectCity(item)}
                          className="w-full px-4 py-2.5 text-left hover:bg-[#E7E3FB]/60 transition-colors flex items-center justify-between text-xs sm:text-sm"
                        >
                          <span className="font-semibold text-[#0D0B1A]">
                            {item.city}, <span className="font-normal text-[#4A4568]">{item.country}</span>
                          </span>
                          <span className="text-[10px] text-[#5B3BD1] font-mono">
                            UTC {item.utcOffset >= 0 ? `+${item.utcOffset}` : item.utcOffset}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Subtext guarantees */}
                <div className="pt-3 border-t border-[#5B3BD1]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-[#4A4568]">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#5B3BD1] flex-shrink-0" />
                    <span>Saved securely to your private member account.</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#5B3BD1]">
                    <HelpCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Lahiri Ayanamsa</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-xl sm:rounded-2xl bg-[#5B3BD1] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 ease-editorial hover:bg-[#3A1F8C] hover:shadow-xl hover:shadow-[#5B3BD1]/30 active:scale-98 flex items-center justify-center gap-2 shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-[#CFC6F6]" />
                  <span>Calculate &amp; Reveal My 3 Numbers</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
