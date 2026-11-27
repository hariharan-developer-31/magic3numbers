"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, Menu, X } from "lucide-react";

export default function Navbar({ onScrollToCalculator }: { onScrollToCalculator?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      // Detect if user is scrolled over any dark section
      const darkSections = document.querySelectorAll("[data-theme='dark']");
      let overDark = false;
      const navPosition = scrollY + 50;

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
      ? "bg-[#3A1F8C]/80 backdrop-blur-md border-b border-[#CFC6F6]/15 shadow-sm"
      : "bg-[#E7E3FB]/85 backdrop-blur-md border-b border-[#5B3BD1]/10 shadow-sm"
    : "bg-transparent";

  return (
    <header className="contents">
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-editorial ${navBgClass}`}
      >
        <div className="content-container flex items-center justify-between h-20 md:h-24">
        {/* Minimal Logo with Hover Rotation */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-3.5 text-left focus:outline-none"
        >
          <div className="relative w-9 h-9 md:w-11 md:h-11 rounded-full border border-current flex items-center justify-center transition-transform duration-700 ease-editorial group-hover:rotate-180">
            <span className="text-base md:text-lg font-extrabold tracking-tighter">3</span>
            <div className="absolute -inset-1 border border-dashed border-[#5B3BD1] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <span className={`text-lg md:text-xl font-bold tracking-tight uppercase ${textColorClass}`}>
            magic<span className="text-[#5B3BD1]">3</span>numbers
          </span>
        </button>

        {/* Desktop Animated Underline Links */}
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
            Cosmic Triad
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
            className="group relative inline-flex items-center gap-2 px-6 py-3 md:px-7 md:py-3.5 rounded-full text-xs md:text-sm font-semibold tracking-wide uppercase transition-all duration-300 ease-editorial bg-[#5B3BD1] text-white hover:bg-[#3A1F8C] hover:shadow-lg hover:shadow-[#5B3BD1]/25 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-[#CFC6F6] transition-transform duration-500 group-hover:rotate-45" />
            <span>Discover Your Triad</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${textColorClass}`}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D0B1A] text-white border-b border-[#3A1F8C] px-6 py-8 flex flex-col gap-6 shadow-2xl animate-fade-in">
          <button
            onClick={() => scrollTo("three-pillars")}
            className="text-left text-lg font-medium hover:text-[#CFC6F6]"
          >
            The Three Pillars
          </button>
          <button
            onClick={() => scrollTo("profile-generator")}
            className="text-left text-lg font-medium hover:text-[#CFC6F6]"
          >
            Calculate Blueprint
          </button>
          <button
            onClick={() => scrollTo("dashboard-section")}
            className="text-left text-lg font-medium hover:text-[#CFC6F6]"
          >
            Cosmic Triad
          </button>
          <button
            onClick={() => scrollTo("insights-calendar")}
            className="text-left text-lg font-medium hover:text-[#CFC6F6]"
          >
            Personal Calendar
          </button>
          <button
            onClick={() => scrollTo("premium-reports")}
            className="text-left text-lg font-medium hover:text-[#CFC6F6]"
          >
            Reports
          </button>
          <button
            onClick={() => scrollTo("profile-generator")}
            className="mt-4 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#5B3BD1] text-white text-sm font-semibold tracking-wider uppercase"
          >
            <Sparkles className="w-4 h-4 text-[#CFC6F6]" />
            <span>Calculate Your Numbers</span>
          </button>
        </div>
      )}
      </nav>
    </header>
  );
}
