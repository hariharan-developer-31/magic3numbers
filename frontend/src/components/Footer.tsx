"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer
      data-theme="dark"
      className="w-full bg-[#0D0B1A] text-white pt-12 pb-8 sm:pt-16 sm:pb-12 border-t border-[#3A1F8C]"
    >
      <div className="content-container">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-12 border-b border-[#3A1F8C]/60">
          {/* Brand Info */}
          <div className="sm:col-span-2 space-y-3">
            <BrandLogo textColor="text-white" />
            <p className="text-xs text-[#CFC6F6]/75 max-w-md leading-relaxed">
              Personal Astrology, Numerology &amp; Cosmic Number Discovery Platform. Synthesizing
              ancient Vedic Jyotish, Western Natal geometry, and Pythagorean numerology into
              reproducible personal blueprints.
            </p>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#CFC6F6] mb-3">
              Disciplines
            </h4>
            <ul className="space-y-2 text-xs text-[#CFC6F6]/80 font-medium">
              <li>Sidereal Vedic Astrology (Lahiri)</li>
              <li>Tropical Western Natal Wheel</li>
              <li>Pythagorean Numerology Matrices</li>
              <li>Master Numbers (11, 22, 33)</li>
              <li>Canonical 1–9 Planetary Links</li>
            </ul>
          </div>

          {/* Platform & Compliance */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#CFC6F6] mb-3">
              Platform Integrity
            </h4>
            <ul className="space-y-2 text-xs text-[#CFC6F6]/80 font-medium">
              <li>Sub-degree Geocoding &amp; UTC</li>
              <li>Zero Data Sale &bull; Private Session</li>
              <li>Exportable Dossier Reports</li>
              <li>Deterministic Ephemeris Engine</li>
            </ul>
          </div>
        </div>

        {/* Compliance Notice */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-[#3A1F8C]/20 border border-[#3A1F8C]/50 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-[#CFC6F6] flex-shrink-0 mt-0.5" />
          <div className="text-[11px] leading-relaxed text-[#CFC6F6]/80">
            <span className="font-bold text-white block mb-0.5 uppercase tracking-wider">
              Legal Compliance &amp; Scope Boundary Notice
            </span>
            magic3numbers is an independent astronomical, astrological, and numerological calculation platform
            designed strictly for personal reflection, cultural study, and creative self-discovery.
            The system does not provide lottery predictions, betting recommendations, wagering assistance, or draw tracking.
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#CFC6F6]/60 gap-3">
          <p>&copy; {new Date().getFullYear()} magic3numbers. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Deterministic Engine v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
