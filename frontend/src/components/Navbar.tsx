"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Menu, X, ArrowRight } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default function Navbar({ onScrollToCalculator }: { onScrollToCalculator?: () => void }) {
  const router = useRouter();
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
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 80);
  };

  const handleNavigateToBlueprint = (targetHash?: string) => {
    setMobileMenuOpen(false);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("magic3_active_blueprint");
      if (stored) {
        router.push(targetHash ? `/blueprint#${targetHash}` : "/blueprint");
        return;
      }
    }
    scrollTo("profile-generator");
  };

  const textColorClass = isDarkSection ? "text-white" : "text-[#0D0B1A]";
  const navBgClass = isScrolled
    ? isDarkSection
      ? "bg-[#3A1F8C]/90 backdrop-blur-md border-b border-[#CFC6F6]/15 shadow-sm"
      : "bg-[#E7E3FB]/90 backdrop-blur-md border-b border-[#5B3BD1]/10 shadow-sm"
    : "bg-transparent";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-editorial ${navBgClass}`}
      >
        <div className="content-container flex items-center justify-between h-16 sm:h-20 md:h-24">
          {/* Brand Logo with Golden Celestial Star Emblem */}
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
              onClick={() => handleNavigateToBlueprint()}
              className={`nav-link ${textColorClass} hover:opacity-80 transition-opacity`}
            >
              Your 3 Numbers
            </button>
          </div>

          {/* Right-aligned Primary CTA Button (Tablet & Desktop) */}
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
            onClick={() => setMobileMenuOpen(true)}
            className={`lg:hidden p-2 rounded-xl transition-colors ${textColorClass} focus:outline-none`}
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Full-Screen Mobile Navigation Overlay (Pristine, Zero Clipping) */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="lg:hidden fixed inset-0 z-50 bg-[#0D0B1A] text-white flex flex-col p-6 sm:p-8 animate-fade-in"
        >
          {/* Top Bar with Brand Logo and Close Button */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 flex-shrink-0">
            <BrandLogo textColor="text-white" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links with Arrow Indicators - neatly aligned directly below top bar */}
          <div className="flex flex-col gap-3 pt-5 sm:pt-6 pb-4 overflow-y-auto">
            <button
              onClick={() => scrollTo("three-pillars")}
              className="flex items-center justify-between text-left py-3 px-4 rounded-2xl hover:bg-white/5 border border-white/10 text-base font-semibold transition-colors"
            >
              <span>The Three Pillars</span>
              <ArrowRight className="w-4 h-4 text-[#CFC6F6]" />
            </button>
            <button
              onClick={() => scrollTo("profile-generator")}
              className="flex items-center justify-between text-left py-3 px-4 rounded-2xl hover:bg-white/5 border border-white/10 text-base font-semibold transition-colors"
            >
              <span>Calculate Blueprint</span>
              <ArrowRight className="w-4 h-4 text-[#CFC6F6]" />
            </button>
            <button
              onClick={() => handleNavigateToBlueprint()}
              className="flex items-center justify-between text-left py-3 px-4 rounded-2xl bg-[#5B3BD1]/20 border border-[#5B3BD1]/40 text-base font-bold text-[#CFC6F6] transition-colors"
            >
              <span>Your 3 Numbers</span>
              <ArrowRight className="w-4 h-4 text-[#CFC6F6]" />
            </button>
          </div>

          {/* Bottom Action Section - anchored to bottom */}
          <div className="mt-auto pt-4 border-t border-white/10 flex-shrink-0">
            <button
              onClick={() => scrollTo("profile-generator")}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#5B3BD1] text-white text-sm font-semibold tracking-wider uppercase shadow-xl shadow-[#5B3BD1]/40 active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-[#CFC6F6]" />
              <span>Calculate Your Numbers Now</span>
            </button>
            <p className="text-center text-[11px] text-[#CFC6F6]/60 mt-3">
              Sidereal Vedic &bull; Tropical Western &bull; Pythagorean Matrix
            </p>
          </div>
        </div>
      )}
    </>
  );
}
