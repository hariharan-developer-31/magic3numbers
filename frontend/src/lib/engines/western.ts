import { BirthInput, WesternAspect, WesternPlanetPlacement, WesternProfile } from "@/types/astrology";
import { calculateJulianDay, ZODIAC_SIGNS } from "./vedic";

function getTropicalPlanets(jd: number) {
  const d = jd - 2451545.0;
  const g_sun = ((357.52911 + 0.98560028 * d) % 360) * (Math.PI / 180);
  const lambda_sun = ((280.46646 + 0.98564736 * d) + 1.914602 * Math.sin(g_sun) + 0.019993 * Math.sin(2 * g_sun) + 360) % 360;

  const L_moon = (218.3165 + 13.176396 * d) % 360;
  const M_moon = ((134.963 + 13.064993 * d) % 360) * (Math.PI / 180);
  const lambda_moon = (L_moon + 6.289 * Math.sin(M_moon) - 1.274 * Math.sin(M_moon - 2 * g_sun) + 0.658 * Math.sin(2 * g_sun) + 360) % 360;

  const L_merc = (252.251 + 4.0923344 * d) % 360;
  const M_merc = ((174.795 + 4.0923344 * d) % 360) * (Math.PI / 180);
  const lambda_merc = (L_merc + 23.44 * Math.sin(M_merc) + 360) % 360;

  const L_ven = (181.979 + 1.6021305 * d) % 360;
  const M_ven = ((50.116 + 1.6021305 * d) % 360) * (Math.PI / 180);
  const lambda_ven = (L_ven + 0.776 * Math.sin(M_ven) + 360) % 360;

  const L_mars = (355.433 + 0.5240330 * d) % 360;
  const M_mars = ((19.373 + 0.5240208 * d) % 360) * (Math.PI / 180);
  const lambda_mars = (L_mars + 10.691 * Math.sin(M_mars) + 360) % 360;

  const L_jup = (34.351 + 0.0830853 * d) % 360;
  const M_jup = ((20.020 + 0.0830853 * d) % 360) * (Math.PI / 180);
  const lambda_jup = (L_jup + 5.55 * Math.sin(M_jup) + 360) % 360;

  const L_sat = (50.077 + 0.0334442 * d) % 360;
  const M_sat = ((317.021 + 0.0334442 * d) % 360) * (Math.PI / 180);
  const lambda_sat = (L_sat + 6.35 * Math.sin(M_sat) + 360) % 360;

  return {
    Sun: lambda_sun,
    Moon: lambda_moon,
    Mercury: lambda_merc,
    Venus: lambda_ven,
    Mars: lambda_mars,
    Jupiter: lambda_jup,
    Saturn: lambda_sat,
  };
}

function calculateWesternAscendant(jd: number, lat: number, lon: number, utHour: number): number {
  const d = jd - 2451545.0;
  const t = d / 36525.0;
  let gmst = 280.46061837 + 360.98564736629 * d + 0.000387933 * t * t;
  gmst = ((gmst % 360) + 360) % 360;
  const ramc = (((gmst + lon) % 360) + 360) % 360;

  const ramcRad = ramc * (Math.PI / 180);
  const latRad = lat * (Math.PI / 180);
  const epsRad = (23.4392911 - 0.0130042 * t) * (Math.PI / 180);

  const y = -Math.cos(ramcRad);
  const x = Math.sin(ramcRad) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad);
  let asc = Math.atan2(y, x) * (180 / Math.PI);
  return ((asc % 360) + 360) % 360;
}

export function calculateWesternProfile(input: BirthInput): WesternProfile {
  const parts = input.birthDate.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  let utHour = 12.0;
  if (!input.isTimeUnknown && input.birthTime) {
    const timeParts = input.birthTime.split(":");
    const localHour = parseInt(timeParts[0], 10) + parseInt(timeParts[1], 10) / 60;
    utHour = ((localHour - input.utcOffset) + 24) % 24;
  }

  const jd = calculateJulianDay(year, month, day, utHour);
  const planets = getTropicalPlanets(jd);

  let risingSign = "Aries";
  let ascLong = 0;
  if (!input.isTimeUnknown) {
    ascLong = calculateWesternAscendant(jd, input.latitude, input.longitude, utHour);
    risingSign = ZODIAC_SIGNS[Math.floor(ascLong / 30)];
  } else {
    risingSign = "Unknown (Time required)";
  }

  const sunSign = ZODIAC_SIGNS[Math.floor(planets.Sun / 30)];
  const moonSign = ZODIAC_SIGNS[Math.floor(planets.Moon / 30)];

  const placements: WesternPlanetPlacement[] = [];
  for (const [planet, long] of Object.entries(planets)) {
    const signIdx = Math.floor(long / 30);
    const degree = Math.floor(long % 30);
    const minute = Math.floor(((long % 30) - degree) * 60);

    // House in Equal house system from Ascendant (if known)
    let house = 1;
    if (!input.isTimeUnknown) {
      house = (Math.floor(((long - ascLong + 360) % 360) / 30)) + 1;
    }

    placements.push({
      planet,
      longitude: parseFloat(long.toFixed(2)),
      sign: ZODIAC_SIGNS[signIdx],
      degree,
      minute,
      house,
    });
  }

  // Calculate aspects
  const aspects: WesternAspect[] = [];
  const planetList = Object.entries(planets);

  for (let i = 0; i < planetList.length; i++) {
    for (let j = i + 1; j < planetList.length; j++) {
      const [p1, l1] = planetList[i];
      const [p2, l2] = planetList[j];
      let diff = Math.abs(l1 - l2);
      if (diff > 180) diff = 360 - diff;

      if (Math.abs(diff - 0) <= 8) {
        aspects.push({ planet1: p1, planet2: p2, aspectType: "Conjunction", angle: 0, orb: parseFloat(diff.toFixed(2)) });
      } else if (Math.abs(diff - 180) <= 8) {
        aspects.push({ planet1: p1, planet2: p2, aspectType: "Opposition", angle: 180, orb: parseFloat(Math.abs(diff - 180).toFixed(2)) });
      } else if (Math.abs(diff - 120) <= 8) {
        aspects.push({ planet1: p1, planet2: p2, aspectType: "Trine", angle: 120, orb: parseFloat(Math.abs(diff - 120).toFixed(2)) });
      } else if (Math.abs(diff - 90) <= 7) {
        aspects.push({ planet1: p1, planet2: p2, aspectType: "Square", angle: 90, orb: parseFloat(Math.abs(diff - 90).toFixed(2)) });
      } else if (Math.abs(diff - 60) <= 6) {
        aspects.push({ planet1: p1, planet2: p2, aspectType: "Sextile", angle: 60, orb: parseFloat(Math.abs(diff - 60).toFixed(2)) });
      }
    }
  }

  return {
    sunSign,
    moonSign,
    risingSign,
    placements,
    aspects,
  };
}
