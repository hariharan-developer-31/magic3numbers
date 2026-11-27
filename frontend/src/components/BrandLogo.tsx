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
  return (
    <div className="flex items-center gap-2.5 sm:gap-3 group">
      {/* Golden Celestial Star-3 Emblem */}
      <div
        className={`relative ${className} rounded-xl overflow-hidden flex-shrink-0 transition-transform duration-500 ease-editorial group-hover:scale-105 shadow-md shadow-[#5B3BD1]/20`}
      >
        <Image
          src="/logo.png"
          alt="magic3numbers golden star logo"
          width={80}
          height={80}
          className="w-full h-full object-cover rounded-xl"
          priority
        />
      </div>

      {showText && (
        <span
          className={`text-base sm:text-lg md:text-xl font-bold tracking-tight uppercase ${textColor} select-none`}
        >
          magic<span className="text-[#5B3BD1]">3</span>numbers
        </span>
      )}
    </div>
  );
}
