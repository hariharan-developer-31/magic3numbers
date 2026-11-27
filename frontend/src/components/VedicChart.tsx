"use client";

import React, { useState } from "react";
import { VedicProfile } from "@/types/astrology";

const PLANET_ABBR: Record<string, string> = {
  Sun: "Su",
  Moon: "Mo",
  Mars: "Ma",
  Mercury: "Me",
  Jupiter: "Ju",
  Venus: "Ve",
  Saturn: "Sa",
  Rahu: "Ra",
  Ketu: "Ke",
};

export default function VedicChart({ vedic }: { vedic: VedicProfile }) {
  const [selectedHouse, setSelectedHouse] = useState<number | null>(1);

  // Group planets by house
  const housePlanets: Record<number, string[]> = {};
  for (let i = 1; i <= 12; i++) {
    housePlanets[i] = [];
  }
  vedic.placements.forEach((p) => {
    if (p.house >= 1 && p.house <= 12) {
      housePlanets[p.house].push(PLANET_ABBR[p.planet] || p.planet.slice(0, 2));
    }
  });

  const currentHouseDetail = vedic.houses.find((h) => h.house === selectedHouse);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center justify-between p-6 sm:p-8 rounded-3xl bg-white/70 border border-[#5B3BD1]/15 backdrop-blur-md">
      {/* Interactive North Indian D1 Chart SVG */}
      <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-square flex-shrink-0">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full text-[#3A1F8C] drop-shadow-sm select-none"
        >
          {/* Outer Border */}
          <rect
            x="4"
            y="4"
            width="392"
            height="392"
            fill="#E7E3FB"
            stroke="#5B3BD1"
            strokeWidth="2.5"
            rx="8"
          />

          {/* Diagonals */}
          <line x1="4" y1="4" x2="396" y2="396" stroke="#5B3BD1" strokeWidth="1.5" />
          <line x1="396" y1="4" x2="4" y2="396" stroke="#5B3BD1" strokeWidth="1.5" />

          {/* Inner Diamond */}
          <polygon
            points="200,4 396,200 200,396 4,200"
            fill="#FFFFFF"
            stroke="#5B3BD1"
            strokeWidth="2"
          />

          {/* House 1 (Top Center Diamond) */}
          <polygon
            points="200,4 298,102 200,200 102,102"
            fill={selectedHouse === 1 ? "#CFC6F6" : "transparent"}
            className="cursor-pointer transition-colors duration-200 hover:fill-[#CFC6F6]/50"
            onClick={() => setSelectedHouse(1)}
          />
          <text x="200" y="85" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5B3BD1">
            H1 ({vedic.houses[0]?.sign.slice(0, 3)})
          </text>
          <text x="200" y="115" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0D0B1A">
            {housePlanets[1].join(" ")}
          </text>

          {/* House 2 (Top Left Triangle) */}
          <polygon
            points="4,4 200,4 102,102"
            fill={selectedHouse === 2 ? "#CFC6F6" : "transparent"}
            className="cursor-pointer transition-colors duration-200 hover:fill-[#CFC6F6]/50"
            onClick={() => setSelectedHouse(2)}
          />
          <text x="100" y="45" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5B3BD1">
            H2 ({vedic.houses[1]?.sign.slice(0, 3)})
          </text>
          <text x="100" y="70" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0D0B1A">
            {housePlanets[2].join(" ")}
          </text>

          {/* House 3 */}
          <polygon
            points="4,4 102,102 4,200"
            fill={selectedHouse === 3 ? "#CFC6F6" : "transparent"}
            className="cursor-pointer transition-colors duration-200 hover:fill-[#CFC6F6]/50"
            onClick={() => setSelectedHouse(3)}
          />
          <text x="40" y="105" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5B3BD1">
            H3 ({vedic.houses[2]?.sign.slice(0, 3)})
          </text>
          <text x="40" y="130" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0D0B1A">
            {housePlanets[3].join(" ")}
          </text>

          {/* House 4 (Left Center Diamond) */}
          <polygon
            points="4,200 102,102 200,200 102,298"
            fill={selectedHouse === 4 ? "#CFC6F6" : "transparent"}
            className="cursor-pointer transition-colors duration-200 hover:fill-[#CFC6F6]/50"
            onClick={() => setSelectedHouse(4)}
          />
          <text x="100" y="195" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5B3BD1">
            H4 ({vedic.houses[3]?.sign.slice(0, 3)})
          </text>
          <text x="100" y="225" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0D0B1A">
            {housePlanets[4].join(" ")}
          </text>

          {/* House 5 */}
          <polygon
            points="4,200 102,298 4,396"
            fill={selectedHouse === 5 ? "#CFC6F6" : "transparent"}
            className="cursor-pointer transition-colors duration-200 hover:fill-[#CFC6F6]/50"
            onClick={() => setSelectedHouse(5)}
          />
          <text x="40" y="295" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5B3BD1">
            H5 ({vedic.houses[4]?.sign.slice(0, 3)})
          </text>
          <text x="40" y="320" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0D0B1A">
            {housePlanets[5].join(" ")}
          </text>

          {/* House 6 */}
          <polygon
            points="4,396 200,396 102,298"
            fill={selectedHouse === 6 ? "#CFC6F6" : "transparent"}
            className="cursor-pointer transition-colors duration-200 hover:fill-[#CFC6F6]/50"
            onClick={() => setSelectedHouse(6)}
          />
          <text x="100" y="360" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5B3BD1">
            H6 ({vedic.houses[5]?.sign.slice(0, 3)})
          </text>
          <text x="100" y="380" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0D0B1A">
            {housePlanets[6].join(" ")}
          </text>

          {/* House 7 (Bottom Center Diamond) */}
          <polygon
            points="200,200 298,298 200,396 102,298"
            fill={selectedHouse === 7 ? "#CFC6F6" : "transparent"}
            className="cursor-pointer transition-colors duration-200 hover:fill-[#CFC6F6]/50"
            onClick={() => setSelectedHouse(7)}
          />
          <text x="200" y="295" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5B3BD1">
            H7 ({vedic.houses[6]?.sign.slice(0, 3)})
          </text>
          <text x="200" y="325" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0D0B1A">
            {housePlanets[7].join(" ")}
          </text>

          {/* House 8 */}
          <polygon
            points="200,396 396,396 298,298"
            fill={selectedHouse === 8 ? "#CFC6F6" : "transparent"}
            className="cursor-pointer transition-colors duration-200 hover:fill-[#CFC6F6]/50"
            onClick={() => setSelectedHouse(8)}
          />
          <text x="300" y="360" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5B3BD1">
            H8 ({vedic.houses[7]?.sign.slice(0, 3)})
          </text>
          <text x="300" y="380" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0D0B1A">
            {housePlanets[8].join(" ")}
          </text>

          {/* House 9 */}
          <polygon
            points="396,200 298,298 396,396"
            fill={selectedHouse === 9 ? "#CFC6F6" : "transparent"}
            className="cursor-pointer transition-colors duration-200 hover:fill-[#CFC6F6]/50"
            onClick={() => setSelectedHouse(9)}
          />
          <text x="360" y="295" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5B3BD1">
            H9 ({vedic.houses[8]?.sign.slice(0, 3)})
          </text>
          <text x="360" y="320" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0D0B1A">
            {housePlanets[9].join(" ")}
          </text>

          {/* House 10 (Right Center Diamond) */}
          <polygon
            points="200,200 298,102 396,200 298,298"
            fill={selectedHouse === 10 ? "#CFC6F6" : "transparent"}
            className="cursor-pointer transition-colors duration-200 hover:fill-[#CFC6F6]/50"
            onClick={() => setSelectedHouse(10)}
          />
          <text x="300" y="195" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5B3BD1">
            H10 ({vedic.houses[9]?.sign.slice(0, 3)})
          </text>
          <text x="300" y="225" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0D0B1A">
            {housePlanets[10].join(" ")}
          </text>

          {/* House 11 */}
          <polygon
            points="396,4 396,200 298,102"
            fill={selectedHouse === 11 ? "#CFC6F6" : "transparent"}
            className="cursor-pointer transition-colors duration-200 hover:fill-[#CFC6F6]/50"
            onClick={() => setSelectedHouse(11)}
          />
          <text x="360" y="105" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5B3BD1">
            H11 ({vedic.houses[10]?.sign.slice(0, 3)})
          </text>
          <text x="360" y="130" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0D0B1A">
            {housePlanets[11].join(" ")}
          </text>

          {/* House 12 */}
          <polygon
            points="200,4 396,4 298,102"
            fill={selectedHouse === 12 ? "#CFC6F6" : "transparent"}
            className="cursor-pointer transition-colors duration-200 hover:fill-[#CFC6F6]/50"
            onClick={() => setSelectedHouse(12)}
          />
          <text x="300" y="45" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5B3BD1">
            H12 ({vedic.houses[11]?.sign.slice(0, 3)})
          </text>
          <text x="300" y="70" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0D0B1A">
            {housePlanets[12].join(" ")}
          </text>
        </svg>
      </div>

      {/* House & Planetary Placement Details Inspector */}
      <div className="w-full flex-1 lg:pl-6">
        <div className="flex items-center justify-between border-b border-[#5B3BD1]/15 pb-4 mb-4">
          <div>
            <span className="editorial-caption text-[#5B3BD1]">Vedic Kundali Inspector</span>
            <h4 className="text-xl font-bold text-[#0D0B1A]">
              House {selectedHouse}: {currentHouseDetail?.sign} (Lord: {currentHouseDetail?.lord})
            </h4>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-[#5B3BD1] text-white font-mono">
            Lahiri {vedic.ayanamsa}°
          </span>
        </div>

        {/* Resident Planets in Selected House */}
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#4A4568] block mb-2">
            Resident Planets ({currentHouseDetail?.planets.length || 0})
          </span>
          {currentHouseDetail && currentHouseDetail.planets.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {currentHouseDetail.planets.map((p, idx) => {
                const placement = vedic.placements.find((pl) => pl.planet === p);
                return (
                  <div
                    key={idx}
                    className="px-3.5 py-2 rounded-xl bg-white border border-[#5B3BD1]/20 text-xs font-semibold text-[#0D0B1A] flex items-center gap-2 shadow-xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#5B3BD1]" />
                    <span>{p}</span>
                    <span className="text-[#4A4568] font-mono">
                      {placement ? `${placement.longitude.toFixed(1)}° (${placement.nakshatra} P${placement.pada})` : ""}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-[#4A4568] italic">No physical planetary placements in this house. Ruled by {currentHouseDetail?.lord}.</p>
          )}
        </div>

        {/* Quick Placements Table */}
        <div className="max-h-48 overflow-y-auto rounded-xl border border-[#5B3BD1]/15 bg-white/60">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#E7E3FB] text-[#0D0B1A] font-semibold sticky top-0">
              <tr>
                <th className="p-2.5">Planet</th>
                <th className="p-2.5">Sign</th>
                <th className="p-2.5">Nakshatra</th>
                <th className="p-2.5">House</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5B3BD1]/10">
              {vedic.placements.map((p, i) => (
                <tr key={i} className="hover:bg-[#E7E3FB]/40 transition-colors">
                  <td className="p-2.5 font-bold text-[#5B3BD1]">{p.planet}</td>
                  <td className="p-2.5 font-medium">{p.sign}</td>
                  <td className="p-2.5 text-[#4A4568]">{p.nakshatra} (P{p.pada})</td>
                  <td className="p-2.5 font-mono">H{p.house || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
