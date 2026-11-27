export interface BirthInput {
  fullName: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:MM
  isTimeUnknown: boolean;
  birthCity: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utcOffset: number; // in hours
}

export interface NumerologyProfile {
  lifePathNumber: number;
  birthdayNumber: number;
  expressionNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  personalYearNumber: number;
  isMasterLifePath: boolean;
  isMasterExpression: boolean;
  isMasterSoulUrge: boolean;
  isMasterPersonality: boolean;
  descriptions: {
    lifePath: string;
    birthday: string;
    expression: string;
    soulUrge: string;
    personality: string;
    personalYear: string;
  };
}

export interface VedicPlanetPlacement {
  planet: string;
  longitude: number;
  sign: string;
  signLord: string;
  house: number;
  nakshatra: string;
  pada: number;
  isRetrograde?: boolean;
}

export interface VedicProfile {
  ascendantSign: string;
  ascendantDegree: number;
  moonSign: string;
  moonNakshatra: string;
  moonPada: number;
  sunSign: string;
  sunNakshatra: string;
  ayanamsa: number; // Lahiri in degrees
  placements: VedicPlanetPlacement[];
  houses: { house: number; sign: string; lord: string; planets: string[] }[];
}

export interface WesternPlanetPlacement {
  planet: string;
  longitude: number;
  sign: string;
  degree: number;
  minute: number;
  house: number;
}

export interface WesternAspect {
  planet1: string;
  planet2: string;
  aspectType: "Conjunction" | "Opposition" | "Trine" | "Square" | "Sextile";
  angle: number;
  orb: number;
}

export interface WesternProfile {
  sunSign: string;
  moonSign: string;
  risingSign: string;
  placements: WesternPlanetPlacement[];
  aspects: WesternAspect[];
}

export interface PlanetaryAssociation {
  number: number;
  planet: string;
  sanskritName: string;
  energy: string;
  archetype: string;
  qualities: string[];
  relevanceToUser: string;
}

export interface SynthesisReport {
  cosmicTriad: {
    soulPurpose: { source: "Western Sun"; title: string; sign: string; description: string };
    innerMind: { source: "Vedic Moon & Nakshatra"; title: string; sign: string; nakshatra: string; pada: number; description: string };
    destinyPath: { source: "Numerology Life Path"; title: string; number: number; description: string };
  };
  synthesisSummary: string;
  derivedRationales: string[];
  dailyInsight: {
    headline: string;
    focusNumber: number;
    alignedPlanet: string;
    advice: string;
    cycleTheme: string;
  };
  weeklyInsight: {
    theme: string;
    dominantNumber: number;
    overview: string;
    favorableDays: string[];
  };
  monthlyInsight: {
    theme: string;
    personalMonthNumber: number;
    strategicAdvice: string;
  };
  planetaryNumberLinks: PlanetaryAssociation[];
}

export interface FullCosmicAnalysis {
  input: BirthInput;
  numerology: NumerologyProfile;
  vedic: VedicProfile;
  western: WesternProfile;
  synthesis: SynthesisReport;
  calculatedAt: string;
}
