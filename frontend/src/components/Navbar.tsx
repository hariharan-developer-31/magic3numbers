"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, Menu, X } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default function Navbar({ onScrollToCalculator }: { onScrollToCalculator?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 30);

      const darkSections = document.querySelectorAll("[data-theme='dark']");
      let overDark = false;
      const navPosition = scrollY + 45;

      darkSections.forEach((section) => {
        const el = section as HTMLElement;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (navPosition >= top && navPosition <= bottom) {
          overDark = true;
        }
      });

      setIsDarkSection(overDark);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const textColorClass = isDarkSection ? "text-white" : "text-[#0D0B1A]";
  const navBgClass = isScrolled
    ? isDarkSection
      ? "bg-[#3A1F8C]/90 backdrop-blur-md border-b border-[#CFC6F6]/15 shadow-sm"
      : "bg-[#E7E3FB]/90 backdrop-blur-md border-b border-[#5B3BD1]/10 shadow-sm"
    : "bg-transparent";

  return (
    <header className="contents">
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-editorial ${navBgClass}`}
      >
        <div className="content-container flex items-center justify-between h-16 sm:h-20 md:h-24">
          {/* Brand Logo with New Golden Celestial Star Emblem */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="focus:outline-none"
          >
            <BrandLogo textColor={textColorClass} />
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12 text-sm font-medium">
            <button
              onClick={() => scrollTo("three-pillars")}
              className={`nav-link ${textColorClass} hover:opacity-80 transition-opacity`}
            >
              The Three Pillars
            </button>
            <button
              onClick={() => scrollTo("profile-generator")}
              className={`nav-link ${textColorClass} hover:opacity-80 transition-opacity`}
            >
              Calculate Blueprint
            </button>
            <button
              onClick={() => scrollTo("dashboard-section")}
              className={`nav-link ${textColorClass} hover:opacity-80 transition-opacity`}
            >
              Your 3 Numbers
            </button>
            <button
              onClick={() => scrollTo("insights-calendar")}
              className={`nav-link ${textColorClass} hover:opacity-80 transition-opacity`}
            >
              Personal Calendar
            </button>
            <button
              onClick={() => scrollTo("premium-reports")}
              className={`nav-link ${textColorClass} hover:opacity-80 transition-opacity`}
            >
              Reports
            </button>
          </div>

          {/* Right-aligned Primary CTA Button */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => {
                if (onScrollToCalculator) onScrollToCalculator();
                else scrollTo("profile-generator");
              }}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 ease-editorial bg-[#5B3BD1] text-white hover:bg-[#3A1F8C] hover:shadow-lg hover:shadow-[#5B3BD1]/25 active:scale-95 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#CFC6F6] transition-transform duration-500 group-hover:rotate-45" />
              <span>Get Your 3 Numbers</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors ${textColorClass} focus:outline-none`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Full-Screen Overlay Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 bg-[#0D0B1A]/95 backdrop-blur-2xl text-white px-6 py-8 flex flex-col justify-between shadow-2xl animate-fade-in z-50 overflow-y-auto">
            <div className="flex flex-col gap-6 text-lg font-medium">
              <button
                onClick={() => scrollTo("three-pillars")}
                className="text-left py-2 hover:text-[#CFC6F6] border-b border-white/10"
              >
                The Three Pillars
              </button>
              <button
                onClick={() => scrollTo("profile-generator")}
                className="text-left py-2 hover:text-[#CFC6F6] border-b border-white/10"
              >
                Calculate Blueprint
              </button>
              <button
                onClick={() => scrollTo("dashboard-section")}
                className="text-left py-2 hover:text-[#CFC6F6] border-b border-white/10 text-[#CFC6F6] font-bold"
              >
                Your 3 Numbers
              </button>
              <button
                onClick={() => scrollTo("insights-calendar")}
                className="text-left py-2 hover:text-[#CFC6F6] border-b border-white/10"
              >
                Personal Calendar
              </button>
              <button
                onClick={() => scrollTo("premium-reports")}
                className="text-left py-2 hover:text-[#CFC6F6] border-b border-white/10"
              >
                Reports &amp; Dossiers
              </button>
            </div>

            <div className="pt-6">
              <button
                onClick={() => scrollTo("profile-generator")}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#5B3BD1] text-white text-sm font-semibold tracking-wider uppercase shadow-xl shadow-[#5B3BD1]/30 active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-[#CFC6F6]" />
                <span>Calculate Your Numbers Now</span>
              </button>
              <p className="text-center text-[11px] text-[#CFC6F6]/60 mt-4">
                Vedic Sidereal &bull; Western Tropical &bull; Pythagorean
              </p>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
