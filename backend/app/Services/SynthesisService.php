<?php

namespace App\Services;

class SynthesisService
{
    public const PLANETS_MAP = [
        1 => ['planet' => 'Sun', 'sanskrit' => 'Surya', 'energy' => 'Solar / Vital Prana', 'archetype' => 'The Divine Sovereign & Pioneer'],
        2 => ['planet' => 'Moon', 'sanskrit' => 'Chandra', 'energy' => 'Lunar / Receptive Mind', 'archetype' => 'The Intuitive Mirror & Diplomat'],
        3 => ['planet' => 'Jupiter', 'sanskrit' => 'Guru', 'energy' => 'Expansive / Dharmic Wisdom', 'archetype' => 'The Cosmic Sage & Philosopher'],
        4 => ['planet' => 'Rahu', 'sanskrit' => 'North Lunar Node', 'energy' => 'Electrifying / Evolutionary Drive', 'archetype' => 'The Boundary Breaker & Innovator'],
        5 => ['planet' => 'Mercury', 'sanskrit' => 'Budha', 'energy' => 'Mercurial / Analytical Intellect', 'archetype' => 'The Alchemist & Messenger'],
        6 => ['planet' => 'Venus', 'sanskrit' => 'Shukra', 'energy' => 'Harmonic / Aesthetic Grace', 'archetype' => 'The Cosmic Artist & Beautifier'],
        7 => ['planet' => 'Ketu', 'sanskrit' => 'South Lunar Node', 'energy' => 'Transcendental / Moksha Prana', 'archetype' => 'The Mystic Ascetic & Sage'],
        8 => ['planet' => 'Saturn', 'sanskrit' => 'Shani', 'energy' => 'Structural / Karmic Justice', 'archetype' => 'The Master of Time & Destiny'],
        9 => ['planet' => 'Mars', 'sanskrit' => 'Mangala', 'energy' => 'Martial / Focused Will', 'archetype' => 'The Spiritual Warrior & Protector'],
    ];

    public function synthesize(array $input, array $num, array $vedic, array $western): array
    {
        $lifePath = $num['lifePathNumber'];
        $baseNum = $lifePath > 9 ? ($lifePath === 11 ? 2 : ($lifePath === 22 ? 4 : 6)) : $lifePath;
        $primary = self::PLANETS_MAP[$baseNum] ?? self::PLANETS_MAP[1];

        $today = new \DateTime();
        $dayOfWeek = (int)$today->format('w');
        $dayPlanets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
        $currentDayPlanet = $dayPlanets[$dayOfWeek] ?? 'Sun';

        return [
            'cosmicTriad' => [
                'soulPurpose' => [
                    'source' => 'Western Sun',
                    'title' => 'Solar Radiance & Conscious Purpose',
                    'sign' => $western['sunSign'],
                    'description' => "Your conscious core operates through {$western['sunSign']}, expressing leadership and creative self-actualization.",
                ],
                'innerMind' => [
                    'source' => 'Vedic Moon & Nakshatra',
                    'title' => 'Lunar Sanctuary & Karmic Subconscious',
                    'sign' => $vedic['moonSign'],
                    'nakshatra' => $vedic['moonNakshatra'],
                    'pada' => $vedic['moonPada'],
                    'description' => "In sidereal astronomy, your Moon resides in {$vedic['moonSign']} under the asterism {$vedic['moonNakshatra']} (Pada {$vedic['moonPada']}), governing your emotional rhythm.",
                ],
                'destinyPath' => [
                    'source' => 'Numerology Life Path',
                    'title' => 'Pythagorean Life Path Frequency',
                    'number' => $lifePath,
                    'description' => "Vibrating on Frequency {$lifePath}, governed by {$primary['planet']} ({$primary['sanskrit']}), directing your journey of personal mastery.",
                ],
            ],
            'synthesisSummary' => "Your cosmic architecture combines the purposeful fire of {$western['sunSign']}, the intuitive emotional depths of sidereal {$vedic['moonNakshatra']} in {$vedic['moonSign']}, and the systematic guidance of Life Path {$lifePath}.",
            'derivedRationales' => [
                "Life Path {$lifePath} derived via recursive Pythagorean reduction of birth date {$input['birth_date']}.",
                "Vedic placements computed with Chitrapaksha/Lahiri Ayanamsa ({$vedic['ayanamsa']}°) in the Whole Sign house matrix.",
                "Western placements computed in the Tropical zodiac with Placidus quadrant geometry.",
                "Planetary frequency {$lifePath} mapped to {$primary['planet']} ({$primary['sanskrit']}) via cosmological tradition.",
            ],
            'dailyInsight' => [
                'headline' => "Harmonic Alignment of {$primary['planet']} and Current Transit ({$currentDayPlanet})",
                'focusNumber' => $lifePath,
                'alignedPlanet' => $primary['planet'],
                'advice' => "Harness {$primary['archetype']} today for strategic progress and creative focus.",
                'cycleTheme' => "Vibrational harmony with {$primary['energy']}",
            ],
            'weeklyInsight' => [
                'theme' => "Navigating Personal Year {$num['personalYearNumber']} Cycles",
                'dominantNumber' => $num['personalYearNumber'],
                'overview' => "This week emphasizes structured expansion, mindful communication, and steady progress.",
                'favorableDays' => ['Wednesday', 'Friday'],
            ],
            'monthlyInsight' => [
                'theme' => "Expansion and Harmonic Alignment",
                'personalMonthNumber' => (($num['personalYearNumber'] + (int)$today->format('n')) % 9) ?: 9,
                'strategicAdvice' => "Cultivate new creative endeavors and balance rational clarity with intuitive insight.",
            ],
        ];
    }
}
