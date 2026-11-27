"use client";

import React from "react";
import Image from "next/image";

export default function BrandLogo({
  className = "w-9 h-9 sm:w-10 sm:h-10",
  showText = true,
  textColor = "text-current",
}: {
  className?: string;
  showText?: boolean;
  textColor?: string;
}) {
  const isWhite = textColor.includes("white");
  const digitColor = isWhite ? "text-[#CFC6F6]" : "text-[#5B3BD1]";
  const glowFilter = isWhite
    ? "drop-shadow(0 0 10px rgba(207, 198, 246, 0.7)) brightness(1.15)"
    : "drop-shadow(0 2px 8px rgba(91, 59, 209, 0.25))";

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 group">
      {/* Transparent Brand Emblem in Palette Theme */}
      <div
        className={`relative ${className} flex-shrink-0 transition-transform duration-500 ease-editorial group-hover:scale-105`}
        style={{ filter: glowFilter }}
      >
        <Image
          src="/logo.png"
          alt="magic3numbers star emblem"
          width={80}
          height={80}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      {showText && (
        <span
          className={`text-base sm:text-lg md:text-xl font-bold tracking-tight uppercase ${textColor} select-none`}
        >
          magic<span className={digitColor}>3</span>numbers
        </span>
      )}
    </div>
  );
}
