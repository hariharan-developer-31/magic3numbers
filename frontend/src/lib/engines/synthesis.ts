import {
  BirthInput,
  FullCosmicAnalysis,
  NumerologyProfile,
  PlanetaryAssociation,
  SynthesisReport,
  VedicProfile,
  WesternProfile,
} from "@/types/astrology";
import { getPlanetaryLink } from "./planetaryNumbers";

export function generateSynthesisReport(
  input: BirthInput,
  numerology: NumerologyProfile,
  vedic: VedicProfile,
  western: WesternProfile
): SynthesisReport {
  // Planetary links for top numbers
  const relevantNumbers = [
    numerology.lifePathNumber,
    numerology.birthdayNumber,
    numerology.expressionNumber,
    numerology.soulUrgeNumber,
    numerology.personalYearNumber,
  ];

  const uniqueNumbers = Array.from(new Set(relevantNumbers));
  const planetaryLinks: PlanetaryAssociation[] = uniqueNumbers.map((num) =>
    getPlanetaryLink(num, {
      lifePath: numerology.lifePathNumber,
      birthDay: numerology.birthdayNumber,
    })
  );

  const primaryPlanetaryRuler = planetaryLinks.find(
    (p) => p.number === numerology.lifePathNumber
  ) || planetaryLinks[0];

  const safeSunSign = western?.sunSign || "Taurus";
  const safeMoonSign = vedic?.moonSign || "Scorpio";
  const safeMoonNakshatra = vedic?.moonNakshatra || "Anuradha";
  const safeMoonPada = vedic?.moonPada || 1;

  // Triad components
  const cosmicTriad = {
    soulPurpose: {
      source: "Western Sun" as const,
      title: "Solar Radiance & Conscious Purpose",
      sign: safeSunSign,
      description: `Your core vitality operates through the lens of ${safeSunSign}. This defines your deliberate creative fire, conscious identity, and how you choose to project yourself into the world.`,
    },
    innerMind: {
      source: "Vedic Moon & Nakshatra" as const,
      title: "Lunar Sanctuary & Karmic Subconscious",
      sign: safeMoonSign,
      nakshatra: safeMoonNakshatra,
      pada: safeMoonPada,
      description: `In the sidereal zodiac, your Moon rests in ${safeMoonSign} under the asterism of ${safeMoonNakshatra} (Pada ${safeMoonPada}). This governs your intuitive subconscious patterns, deep emotional memory, and instinctive perception.`,
    },
    destinyPath: {
      source: "Numerology Life Path" as const,
      title: "Pythagorean Life Path Frequency",
      number: numerology.lifePathNumber,
      description: `Vibrating on Frequency ${numerology.lifePathNumber}${
        numerology.isMasterLifePath ? " (Master Number)" : ""
      }. Governed primarily by ${primaryPlanetaryRuler.planet} (${primaryPlanetaryRuler.sanskritName}), your life journey synthesizes ${primaryPlanetaryRuler.qualities.slice(0, 3).join(", ")}.`,
    },
  };

  const synthesisSummary = `Your cosmic blueprint is anchored by the creative drive of ${safeSunSign}, deepened by the instinctive wisdom of ${safeMoonNakshatra} in ${safeMoonSign}, and guided toward mastery via Life Path ${numerology.lifePathNumber}. Together, this energetic triad fosters ${primaryPlanetaryRuler.archetype.toLowerCase()} qualities across both your personal and creative endeavours.`;

  const derivedRationales = [
    `Life Path ${numerology.lifePathNumber} was derived through recursive Pythagorean reduction of ${input.birthDate}, preserving master vibrations.`,
    `Vedic placements were cast in the Sidereal Zodiac using the Lahiri Ayanamsa (${vedic.ayanamsa}° correction) and Whole Sign house orientation.`,
    `Western placements were calculated in the Tropical Zodiac under Placidus/Equal quadrants for core psychological aspects.`,
    `Planetary frequency ${primaryPlanetaryRuler.number} is tied directly to ${primaryPlanetaryRuler.planet} (${primaryPlanetaryRuler.sanskritName}) as codified in traditional cosmological tables.`,
    input.isTimeUnknown
      ? `Birth time was noted as unverified; house cusps and Ascendant were gracefully omitted to maintain mathematical integrity.`
      : `Ascendant (${vedic.ascendantSign} sidereal / ${western.risingSign} tropical) was precisely triangulated at latitude ${input.latitude}°, longitude ${input.longitude}° adjusted to UTC.`,
  ];

  // Daily, Weekly, and Monthly cycles
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday...
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayPlanets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];
  const currentDayPlanet = dayPlanets[dayOfWeek];

  const dailyInsight = {
    headline: `Alignment of ${primaryPlanetaryRuler.planet} and Day Energy (${currentDayPlanet})`,
    focusNumber: numerology.lifePathNumber,
    alignedPlanet: primaryPlanetaryRuler.planet,
    advice: `Focus today on ${primaryPlanetaryRuler.qualities[0].toLowerCase()} and clarity. Your Life Path ${numerology.lifePathNumber} aligns naturally with steady progress in creative projects.`,
    cycleTheme: `Resonance with ${primaryPlanetaryRuler.energy}`,
  };

  const weeklyInsight = {
    theme: `Harnessing ${primaryPlanetaryRuler.archetype}`,
    dominantNumber: numerology.personalYearNumber,
    overview: `This week invites introspection and balanced execution. Your Personal Year ${numerology.personalYearNumber} cycle highlights foundational strategy and harmonious alliances.`,
    favorableDays: [dayNames[(dayOfWeek + 1) % 7], dayNames[(dayOfWeek + 3) % 7]],
  };

  const monthlyInsight = {
    theme: `Month of Alignment & Expansion`,
    personalMonthNumber: ((numerology.personalYearNumber + (today.getMonth() + 1)) % 9) || 9,
    strategicAdvice: `Channel your ${western.sunSign} discipline while remaining responsive to intuitive insights from ${vedic.moonNakshatra}. Ideal for launching new initiatives and refining your personal goals.`,
  };

  return {
    cosmicTriad,
    synthesisSummary,
    derivedRationales,
    dailyInsight,
    weeklyInsight,
    monthlyInsight,
    planetaryNumberLinks: planetaryLinks,
  };
}

export function performFullAnalysis(input: BirthInput): FullCosmicAnalysis {
  const { calculateNumerology } = require("./numerology");
  const { calculateVedicProfile } = require("./vedic");
  const { calculateWesternProfile } = require("./western");

  const numerology = calculateNumerology(input.fullName, input.birthDate);
  const vedic = calculateVedicProfile(input);
  const western = calculateWesternProfile(input);
  const synthesis = generateSynthesisReport(input, numerology, vedic, western);

  return {
    input,
    numerology,
    vedic,
    western,
    synthesis,
    calculatedAt: new Date().toISOString(),
  };
}
