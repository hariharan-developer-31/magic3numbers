import { BirthInput, VedicPlanetPlacement, VedicProfile } from "@/types/astrology";

export const ZODIAC_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer",
  "Leo", "Virgo", "Libra", "Scorpio",
  "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export const SIGN_LORDS: Record<string, string> = {
  Aries: "Mars", Taurus: "Venus", Gemini: "Mercury", Cancer: "Moon",
  Leo: "Sun", Virgo: "Mercury", Libra: "Venus", Scorpio: "Mars",
  Sagittarius: "Jupiter", Capricorn: "Saturn", Aquarius: "Saturn", Pisces: "Jupiter"
};

export const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
  "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta",
  "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
];

// Calculate Julian Day from UTC date and decimal hour
export function calculateJulianDay(year: number, month: number, day: number, utHour: number): number {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5 + (utHour / 24.0);
  return jd;
}

// Calculate Lahiri Ayanamsa for given Julian Day
export function calculateLahiriAyanamsa(jd: number): number {
  const t = (jd - 2451545.0) / 36525.0;
  // Lahiri Ayanamsa: approximately 23.85° at J2000.0, increasing by 50.29 arcseconds / year
  const ayanamsa = 23.8566 + (t * 1.39697);
  return ayanamsa;
}

// Approximate Planetary positions (in Tropical degrees 0-360)
// Using standard mean orbital elements with equation of center
function calculateTropicalPlanets(jd: number) {
  const d = jd - 2451545.0; // days since J2000.0
  const t = d / 36525.0;

  // Sun
  const L_sun = (280.46646 + 0.98564736 * d) % 360;
  const g_sun = ((357.52911 + 0.98560028 * d) % 360) * (Math.PI / 180);
  const lambda_sun = (L_sun + 1.914602 * Math.sin(g_sun) + 0.019993 * Math.sin(2 * g_sun) + 360) % 360;

  // Moon
  const L_moon = (218.3165 + 13.176396 * d) % 360;
  const M_moon = ((134.963 + 13.064993 * d) % 360) * (Math.PI / 180);
  const F_moon = ((93.272 + 13.229350 * d) % 360) * (Math.PI / 180);
  const lambda_moon = (L_moon + 6.289 * Math.sin(M_moon) - 1.274 * Math.sin(M_moon - 2 * g_sun) + 0.658 * Math.sin(2 * g_sun) + 360) % 360;

  // Mars
  const L_mars = (355.433 + 0.5240330 * d) % 360;
  const M_mars = ((19.373 + 0.5240208 * d) % 360) * (Math.PI / 180);
  const lambda_mars = (L_mars + 10.691 * Math.sin(M_mars) + 360) % 360;

  // Mercury
  const L_merc = (252.251 + 4.0923344 * d) % 360;
  const M_merc = ((174.795 + 4.0923344 * d) % 360) * (Math.PI / 180);
  const lambda_merc = (L_merc + 23.44 * Math.sin(M_merc) + 360) % 360;

  // Jupiter
  const L_jup = (34.351 + 0.0830853 * d) % 360;
  const M_jup = ((20.020 + 0.0830853 * d) % 360) * (Math.PI / 180);
  const lambda_jup = (L_jup + 5.55 * Math.sin(M_jup) + 360) % 360;

  // Venus
  const L_ven = (181.979 + 1.6021305 * d) % 360;
  const M_ven = ((50.116 + 1.6021305 * d) % 360) * (Math.PI / 180);
  const lambda_ven = (L_ven + 0.776 * Math.sin(M_ven) + 360) % 360;

  // Saturn
  const L_sat = (50.077 + 0.0334442 * d) % 360;
  const M_sat = ((317.021 + 0.0334442 * d) % 360) * (Math.PI / 180);
  const lambda_sat = (L_sat + 6.35 * Math.sin(M_sat) + 360) % 360;

  // Rahu (Mean North Node, moves backwards ~19.34° per year)
  const node_long = (125.0445 - 0.05295377 * d + 360000) % 360;
  const lambda_rahu = node_long;
  const lambda_ketu = (node_long + 180) % 360;

  return {
    Sun: lambda_sun,
    Moon: lambda_moon,
    Mars: lambda_mars,
    Mercury: lambda_merc,
    Jupiter: lambda_jup,
    Venus: lambda_ven,
    Saturn: lambda_sat,
    Rahu: lambda_rahu,
    Ketu: lambda_ketu,
  };
}

// Calculate Ascendant (Lagna)
function calculateAscendant(jd: number, lat: number, lon: number, utHour: number): number {
  const d = jd - 2451545.0;
  const t = d / 36525.0;
  // Greenwich Mean Sidereal Time in degrees
  let gmst = 280.46061837 + 360.98564736629 * d + 0.000387933 * t * t - (t * t * t) / 38710000;
  gmst = ((gmst % 360) + 360) % 360;

  // Local Sidereal Time / RAMC
  const ramc = (((gmst + lon) % 360) + 360) % 360;
  const ramcRad = ramc * (Math.PI / 180);
  const latRad = lat * (Math.PI / 180);
  const epsRad = (23.4392911 - 0.0130042 * t) * (Math.PI / 180); // obliquity

  // Ascendant formula
  const y = -Math.cos(ramcRad);
  const x = Math.sin(ramcRad) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad);
  let asc = Math.atan2(y, x) * (180 / Math.PI);
  asc = ((asc % 360) + 360) % 360;
  return asc;
}

export function calculateVedicProfile(input: BirthInput): VedicProfile {
  const parts = input.birthDate.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  let utHour = 12.0; // default noon if time unknown
  if (!input.isTimeUnknown && input.birthTime) {
    const timeParts = input.birthTime.split(":");
    const localHour = parseInt(timeParts[0], 10) + parseInt(timeParts[1], 10) / 60;
    utHour = ((localHour - input.utcOffset) + 24) % 24;
  }

  const jd = calculateJulianDay(year, month, day, utHour);
  const ayanamsa = calculateLahiriAyanamsa(jd);
  const tropicalPlanets = calculateTropicalPlanets(jd);

  // Convert to Sidereal
  const siderealPlanets: Record<string, number> = {};
  for (const [planet, tropLong] of Object.entries(tropicalPlanets)) {
    siderealPlanets[planet] = ((tropLong - ayanamsa + 360) % 360);
  }

  // Ascendant
  let ascendantSign = "Aries";
  let ascendantDegree = 0;
  let ascSignIndex = 0;

  if (!input.isTimeUnknown) {
    const tropAsc = calculateAscendant(jd, input.latitude, input.longitude, utHour);
    const sidAsc = ((tropAsc - ayanamsa + 360) % 360);
    ascSignIndex = Math.floor(sidAsc / 30);
    ascendantSign = ZODIAC_SIGNS[ascSignIndex];
    ascendantDegree = parseFloat((sidAsc % 30).toFixed(2));
  } else {
    // If unknown, mark as Sun's sign or generic placeholder
    ascendantSign = "Time Unknown (Solar Lagna applied)";
    ascendantDegree = 0;
  }

  // Moon details
  const sidMoon = siderealPlanets.Moon;
  const moonSignIndex = Math.floor(sidMoon / 30);
  const moonSign = ZODIAC_SIGNS[moonSignIndex];
  const nakshatraIndex = Math.floor(sidMoon / (360 / 27));
  const moonNakshatra = NAKSHATRAS[nakshatraIndex % 27];
  const moonPada = (Math.floor(sidMoon / (360 / 108)) % 4) + 1;

  // Sun details
  const sidSun = siderealPlanets.Sun;
  const sunNakshatra = NAKSHATRAS[Math.floor(sidSun / (360 / 27)) % 27];
  const sunSign = ZODIAC_SIGNS[Math.floor(sidSun / 30)];

  // Placements with Whole Sign houses
  const placements: VedicPlanetPlacement[] = [];
  const housesMap: Record<number, string[]> = {
    1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: []
  };

  for (const [planet, long] of Object.entries(siderealPlanets)) {
    const signIdx = Math.floor(long / 30);
    const sign = ZODIAC_SIGNS[signIdx];
    const nakIdx = Math.floor(long / (360 / 27)) % 27;
    const nak = NAKSHATRAS[nakIdx];
    const pada = (Math.floor(long / (360 / 108)) % 4) + 1;

    // Whole Sign: Lagna sign is House 1
    const houseNum = ((signIdx - ascSignIndex + 12) % 12) + 1;
    housesMap[houseNum].push(planet);

    placements.push({
      planet,
      longitude: parseFloat(long.toFixed(2)),
      sign,
      signLord: SIGN_LORDS[sign],
      house: input.isTimeUnknown ? 0 : houseNum,
      nakshatra: nak,
      pada,
    });
  }

  const houses = Array.from({ length: 12 }, (_, i) => {
    const h = i + 1;
    const hSignIdx = (ascSignIndex + i) % 12;
    const hSign = ZODIAC_SIGNS[hSignIdx];
    return {
      house: h,
      sign: hSign,
      lord: SIGN_LORDS[hSign],
      planets: housesMap[h] || [],
    };
  });

  return {
    ascendantSign,
    ascendantDegree,
    moonSign,
    moonNakshatra,
    moonPada,
    sunSign,
    sunNakshatra,
    ayanamsa: parseFloat(ayanamsa.toFixed(2)),
    placements,
    houses,
  };
}
