"use client";

import React, { useState } from "react";
import { Sparkles, MapPin, Clock, Calendar, User, CheckCircle2, ShieldCheck, HelpCircle } from "lucide-react";
import { BirthInput } from "@/types/astrology";
import { CITIES_DATABASE, CityLocation, searchCities } from "@/lib/geocoding";

export default function ProfileGeneratorSection({
  onCalculate,
  isLoading,
}: {
  onCalculate: (input: BirthInput) => void;
  isLoading: boolean;
}) {
  const [fullName, setFullName] = useState("Alexander Vance");
  const [birthDate, setBirthDate] = useState("1992-05-18");
  const [birthTime, setBirthTime] = useState("14:30");
  const [isTimeUnknown, setIsTimeUnknown] = useState(false);
  const [citySearch, setCitySearch] = useState("Kuala Lumpur");
  const [selectedCity, setSelectedCity] = useState<CityLocation>(CITIES_DATABASE[0]);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [filteredCities, setFilteredCities] = useState<CityLocation[]>(CITIES_DATABASE.slice(0, 5));

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
      className="relative min-h-screen w-full py-24 md:py-32 bg-[#E4E0FA] text-[#0D0B1A] flex items-center overflow-hidden"
    >
      {/* Decorative ambient blurred ring */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#CFC6F6]/60 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#5B3BD1]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="content-container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="editorial-caption text-[#5B3BD1]">Ephemeris Calculation Input</span>
            <h2 className="section-headline mt-3 uppercase tracking-tight">
              Create Your <span className="text-[#5B3BD1]">Birth Profile.</span>
            </h2>
            <p className="mt-4 text-sm md:text-base text-[#4A4568] max-w-xl mx-auto">
              Provide your birth parameters to initialize the high-precision sidereal ephemeris,
              tropical aspects, and Pythagorean numerology matrices.
            </p>
          </div>

          {/* Editorial Card Form */}
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-12 md:p-16 rounded-[32px] bg-white/80 backdrop-blur-xl border border-white shadow-xl shadow-[#5B3BD1]/5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {/* Full Name at Birth */}
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0B1A] mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#5B3BD1]" />
                    Full Name at Birth (Original Spelling)
                  </span>
                  <span className="text-[11px] text-[#4A4568] font-normal normal-case">
                    For Expression &amp; Soul Urge calculation
                  </span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alexander Vance"
                  className="w-full px-5 py-4 rounded-2xl bg-[#E7E3FB]/40 border border-[#5B3BD1]/20 text-[#0D0B1A] placeholder-[#4A4568]/50 focus:outline-none focus:border-[#5B3BD1] focus:bg-white transition-all text-base font-medium"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0B1A] mb-2 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#5B3BD1]" />
                  Date of Birth
                </label>
                <input
                  type="date"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-[#E7E3FB]/40 border border-[#5B3BD1]/20 text-[#0D0B1A] focus:outline-none focus:border-[#5B3BD1] focus:bg-white transition-all text-base font-medium"
                />
              </div>

              {/* Exact Birth Time */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#0D0B1A] flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#5B3BD1]" />
                    Exact Birth Time
                  </label>
                  <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs text-[#4A4568]">
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
                  className={`w-full px-5 py-4 rounded-2xl border text-[#0D0B1A] transition-all text-base font-medium ${
                    isTimeUnknown
                      ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-[#E7E3FB]/40 border-[#5B3BD1]/20 focus:outline-none focus:border-[#5B3BD1] focus:bg-white"
                  }`}
                />
                {isTimeUnknown && (
                  <p className="mt-1.5 text-[11px] text-[#4A4568]">
                    Note: Planetary coordinates will calculate at solar noon; Ascendant house cusps will be omitted for mathematical honesty.
                  </p>
                )}
              </div>

              {/* Searchable Birthplace with Geocoding */}
              <div className="md:col-span-2 relative">
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0B1A] mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#5B3BD1]" />
                    Birthplace Location
                  </span>
                  <span className="text-[11px] text-[#4A4568] font-normal normal-case">
                    Auto-resolves Latitude, Longitude &amp; Historical UTC Offset
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={citySearch}
                    onChange={(e) => handleCityInput(e.target.value)}
                    onFocus={() => setCityDropdownOpen(true)}
                    placeholder="Search city, e.g. Kuala Lumpur, George Town, London, Singapore..."
                    className="w-full px-5 py-4 rounded-2xl bg-[#E7E3FB]/40 border border-[#5B3BD1]/20 text-[#0D0B1A] focus:outline-none focus:border-[#5B3BD1] focus:bg-white transition-all text-base font-medium"
                  />
                  {selectedCity && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-xs text-[#5B3BD1] bg-[#CFC6F6]/40 px-3 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{selectedCity.latitude.toFixed(2)}°N, {selectedCity.longitude.toFixed(2)}°E (UTC+{selectedCity.utcOffset})</span>
                    </div>
                  )}
                </div>

                {/* Autocomplete Dropdown */}
                {cityDropdownOpen && filteredCities.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-[#5B3BD1]/20 shadow-2xl z-30 overflow-hidden max-h-56 overflow-y-auto">
                    {filteredCities.map((item, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => handleSelectCity(item)}
                        className="w-full px-5 py-3 text-left hover:bg-[#E7E3FB]/60 transition-colors flex items-center justify-between text-sm"
                      >
                        <span className="font-semibold text-[#0D0B1A]">
                          {item.city}, <span className="font-normal text-[#4A4568]">{item.country}</span>
                        </span>
                        <span className="text-xs text-[#5B3BD1] font-mono">
                          UTC {item.utcOffset >= 0 ? `+${item.utcOffset}` : item.utcOffset} &bull; {item.timezone}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Privacy & Methodology Guarantee */}
            <div className="mt-8 pt-6 border-t border-[#5B3BD1]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4A4568]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5B3BD1]" />
                <span>Deterministic calculations strictly processed in private sessions. No data sharing.</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#5B3BD1]">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Formula: Lahiri Ayanamsa + Pythagorean Reduction</span>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="mt-10">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-5 rounded-2xl bg-[#5B3BD1] text-white text-base font-semibold tracking-wider uppercase transition-all duration-300 ease-editorial hover:bg-[#3A1F8C] hover:shadow-xl hover:shadow-[#5B3BD1]/30 active:scale-98 flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Computing Cosmic Ephemeris...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-[#CFC6F6]" />
                    <span>Generate Cosmic Profile &amp; Numbers</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
