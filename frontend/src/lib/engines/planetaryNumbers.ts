import { PlanetaryAssociation } from "@/types/astrology";

export const PLANETARY_NUMBER_CATALOG: Record<number, Omit<PlanetaryAssociation, "relevanceToUser">> = {
  1: {
    number: 1,
    planet: "Sun",
    sanskritName: "Surya",
    energy: "Solar / Vital Prana",
    archetype: "The Divine Sovereign & Pioneer",
    qualities: ["Confidence", "Leadership", "Creative Vitality", "Integrity", "Self-Determination"],
  },
  2: {
    number: 2,
    planet: "Moon",
    sanskritName: "Chandra",
    energy: "Lunar / Receptive Mind",
    archetype: "The Intuitive Mirror & Diplomat",
    qualities: ["Emotional Depth", "Psychic Intuition", "Adaptability", "Harmony", "Empathy"],
  },
  3: {
    number: 3,
    planet: "Jupiter",
    sanskritName: "Guru / Brihaspati",
    energy: "Expansive / Dharmic Wisdom",
    archetype: "The Cosmic Sage & Philosopher",
    qualities: ["Higher Knowledge", "Optimism", "Benevolence", "Spiritual Expansion", "Inspiration"],
  },
  4: {
    number: 4,
    planet: "Rahu",
    sanskritName: "North Lunar Node",
    energy: "Electrifying / Evolutionary Drive",
    archetype: "The Boundary Breaker & Innovator",
    qualities: ["Unconventional Thinking", "Material Mastery", "Sudden Insights", "Global Vision", "Tenacity"],
  },
  5: {
    number: 5,
    planet: "Mercury",
    sanskritName: "Budha",
    energy: "Mercurial / Analytical Intellect",
    archetype: "The Alchemist & Messenger",
    qualities: ["Discernment", "Communication", "Agility", "Commercial Wit", "Adaptability"],
  },
  6: {
    number: 6,
    planet: "Venus",
    sanskritName: "Shukra",
    energy: "Harmonic / Aesthetic Grace",
    archetype: "The Cosmic Artist & Beautifier",
    qualities: ["Aesthetics", "Loving Kindness", "Sensory Refinement", "Abundance", "Devotion"],
  },
  7: {
    number: 7,
    planet: "Ketu",
    sanskritName: "South Lunar Node",
    energy: "Transcendental / Moksha Prana",
    archetype: "The Mystic Ascetic & Sage",
    qualities: ["Spiritual Detachment", "Deep Analytical Research", "Karmic Memory", "Occult Wisdom", "Introspection"],
  },
  8: {
    number: 8,
    planet: "Saturn",
    sanskritName: "Shani",
    energy: "Structural / Karmic Justice",
    archetype: "The Master of Time & Destiny",
    qualities: ["Endurance", "Discipline", "Architect of Order", "Patience", "Realized Power"],
  },
  9: {
    number: 9,
    planet: "Mars",
    sanskritName: "Mangala",
    energy: "Martial / Focused Will",
    archetype: "The Spiritual Warrior & Protector",
    qualities: ["Courage", "Focused Action", "Dynamic Initiative", "Noble Defense", "Transformative Heat"],
  },
};

export function getPlanetaryLink(num: number, userContext: { lifePath: number; birthDay: number }): PlanetaryAssociation {
  // If master number, reduce to single digit base for planetary ruler (e.g. 11->2, 22->4, 33->6)
  const baseNum = num > 9 ? (num === 11 ? 2 : num === 22 ? 4 : 6) : num;
  const item = PLANETARY_NUMBER_CATALOG[baseNum] || PLANETARY_NUMBER_CATALOG[1];

  let relevance = `Anchored to your personal vibration. Governs your foundational drive toward ${item.qualities[0].toLowerCase()} and ${item.qualities[1].toLowerCase()}.`;
  if (baseNum === userContext.lifePath) {
    relevance = `Your Primary Life Path Planetary Ruler (${item.planet} / ${item.sanskritName}). Radiates your core soul trajectory.`;
  } else if (baseNum === userContext.birthDay) {
    relevance = `Your Birthday Vibratory Anchor (${item.planet}). Informs how you approach everyday situations.`;
  }

  return {
    ...item,
    number: num,
    relevanceToUser: relevance,
  };
}
