import { NumerologyProfile } from "@/types/astrology";

const PYTHAGOREAN_MAP: Record<string, number> = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9,
};

const VOWELS = new Set(["a", "e", "i", "o", "u"]);

export function reduceToCoreOrMaster(n: number): number {
  if (n <= 9) return n;
  if (n === 11 || n === 22 || n === 33) return n;

  let sum = n;
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum
      .toString()
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return sum;
}

export function isMasterNumber(n: number): boolean {
  return n === 11 || n === 22 || n === 33;
}

const NUMBER_ARCHETYPES: Record<number, string> = {
  1: "The Pioneer & Initiator — Independent, pioneering spirit with natural leadership and original vision.",
  2: "The Diplomat & Intuitive — Harmonious, empathetic, deeply receptive, bringing balance and partnership.",
  3: "The Creative Communicator — Expressive, imaginative, radiant joy and profound artistic expression.",
  4: "The Master Builder — Grounded, methodical, structured, building enduring foundations with integrity.",
  5: "The Free Spirit & Catalyst — Dynamic, adaptable, adventurous, embracing change and versatile growth.",
  6: "The Nurturer & Harmonizer — Compassionate, responsible, devoted to family, aesthetics, and community healing.",
  7: "The Mystic Seeker & Analyst — Philosophical, contemplative, analytical, probing the deeper cosmic truths.",
  8: "The Executive & Manifestor — Ambitious, authoritative, mastering the material plane with karmic accountability.",
  9: "The Universal Humanitarian — Altruistic, compassionate, visionary, concluding karmic cycles for the greater good.",
  11: "Master Number 11: The Illuminated Messenger — High spiritual intuition, visionary idealism, and catalyst for illumination.",
  22: "Master Number 22: The Master Architect — Translating lofty spiritual visions into tangible, monumental earthly structures.",
  33: "Master Number 33: The Master Teacher — Universal selfless service, cosmic compassion, and upliftment of human consciousness.",
};

export function calculateNumerology(
  fullName: string,
  birthDate: string // YYYY-MM-DD
): NumerologyProfile {
  // Parse birth date parts
  const parts = birthDate.split("-");
  const year = parseInt(parts[0], 10) || 1990;
  const month = parseInt(parts[1], 10) || 1;
  const day = parseInt(parts[2], 10) || 1;

  // 1. Life Path Number: Reduce month, day, year separately then sum
  const redMonth = reduceToCoreOrMaster(month);
  const redDay = reduceToCoreOrMaster(day);
  const redYear = reduceToCoreOrMaster(year);
  const lifePathNumber = reduceToCoreOrMaster(redMonth + redDay + redYear);

  // 2. Birthday Number: Day of birth
  const birthdayNumber = reduceToCoreOrMaster(day);

  // Clean name
  const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, "");

  // 3. Expression / Destiny Number: All letters
  let expressionSum = 0;
  let soulUrgeSum = 0;
  let personalitySum = 0;

  for (let i = 0; i < cleanName.length; i++) {
    const char = cleanName[i];
    const val = PYTHAGOREAN_MAP[char] || 0;
    expressionSum += val;

    if (VOWELS.has(char)) {
      soulUrgeSum += val;
    } else {
      personalitySum += val;
    }
  }

  const expressionNumber = expressionSum > 0 ? reduceToCoreOrMaster(expressionSum) : 1;
  const soulUrgeNumber = soulUrgeSum > 0 ? reduceToCoreOrMaster(soulUrgeSum) : 1;
  const personalityNumber = personalitySum > 0 ? reduceToCoreOrMaster(personalitySum) : 1;

  // 4. Personal Year Number: Month + Day + Current Year (2026)
  const currentYear = new Date().getFullYear();
  const personalYearNumber = reduceToCoreOrMaster(
    reduceToCoreOrMaster(month) + reduceToCoreOrMaster(day) + reduceToCoreOrMaster(currentYear)
  );

  return {
    lifePathNumber,
    birthdayNumber,
    expressionNumber,
    soulUrgeNumber,
    personalityNumber,
    personalYearNumber,
    isMasterLifePath: isMasterNumber(lifePathNumber),
    isMasterExpression: isMasterNumber(expressionNumber),
    isMasterSoulUrge: isMasterNumber(soulUrgeNumber),
    isMasterPersonality: isMasterNumber(personalityNumber),
    descriptions: {
      lifePath: NUMBER_ARCHETYPES[lifePathNumber] || NUMBER_ARCHETYPES[reduceToCoreOrMaster(lifePathNumber)],
      birthday: NUMBER_ARCHETYPES[birthdayNumber] || NUMBER_ARCHETYPES[reduceToCoreOrMaster(birthdayNumber)],
      expression: NUMBER_ARCHETYPES[expressionNumber] || NUMBER_ARCHETYPES[reduceToCoreOrMaster(expressionNumber)],
      soulUrge: NUMBER_ARCHETYPES[soulUrgeNumber] || NUMBER_ARCHETYPES[reduceToCoreOrMaster(soulUrgeNumber)],
      personality: NUMBER_ARCHETYPES[personalityNumber] || NUMBER_ARCHETYPES[reduceToCoreOrMaster(personalityNumber)],
      personalYear: `Year of ${NUMBER_ARCHETYPES[personalYearNumber] || personalYearNumber}: A cycle focused on theme ${personalYearNumber}.`,
    },
  };
}
