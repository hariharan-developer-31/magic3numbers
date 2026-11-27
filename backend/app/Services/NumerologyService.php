<?php

namespace App\Services;

class NumerologyService
{
    private const PYTHAGOREAN_MAP = [
        'a' => 1, 'j' => 1, 's' => 1,
        'b' => 2, 'k' => 2, 't' => 2,
        'c' => 3, 'l' => 3, 'u' => 3,
        'd' => 4, 'm' => 4, 'v' => 4,
        'e' => 5, 'n' => 5, 'w' => 5,
        'f' => 6, 'o' => 6, 'x' => 6,
        'g' => 7, 'p' => 7, 'y' => 7,
        'h' => 8, 'q' => 8, 'z' => 8,
        'i' => 9, 'r' => 9,
    ];

    private const VOWELS = ['a', 'e', 'i', 'o', 'u'];

    private const ARCHETYPES = [
        1 => 'The Pioneer & Initiator — Independent, pioneering spirit with natural leadership and original vision.',
        2 => 'The Diplomat & Intuitive — Harmonious, empathetic, deeply receptive, bringing balance and partnership.',
        3 => 'The Creative Communicator — Expressive, imaginative, radiant joy and profound artistic expression.',
        4 => 'The Master Builder — Grounded, methodical, structured, building enduring foundations with integrity.',
        5 => 'The Free Spirit & Catalyst — Dynamic, adaptable, adventurous, embracing change and versatile growth.',
        6 => 'The Nurturer & Harmonizer — Compassionate, responsible, devoted to family, aesthetics, and community healing.',
        7 => 'The Mystic Seeker & Analyst — Philosophical, contemplative, analytical, probing the deeper cosmic truths.',
        8 => 'The Executive & Manifestor — Ambitious, authoritative, mastering the material plane with karmic accountability.',
        9 => 'The Universal Humanitarian — Altruistic, compassionate, visionary, concluding karmic cycles for the greater good.',
        11 => 'Master Number 11: The Illuminated Messenger — High spiritual intuition, visionary idealism, and catalyst for illumination.',
        22 => 'Master Number 22: The Master Architect — Translating lofty spiritual visions into tangible, monumental earthly structures.',
        33 => 'Master Number 33: The Master Teacher — Universal selfless service, cosmic compassion, and upliftment of human consciousness.',
    ];

    public function reduceToCoreOrMaster(int $n): int
    {
        if ($n <= 9 || $n === 11 || $n === 22 || $n === 33) {
            return $n;
        }

        $sum = $n;
        while ($sum > 9 && $sum !== 11 && $sum !== 22 && $sum !== 33) {
            $digits = str_split((string)$sum);
            $sum = array_sum(array_map('intval', $digits));
        }

        return $sum;
    }

    public function isMasterNumber(int $n): bool
    {
        return in_array($n, [11, 22, 33], true);
    }

    public function calculate(string $fullName, string $birthDate): array
    {
        $parts = explode('-', $birthDate);
        $year = (int)($parts[0] ?? 1990);
        $month = (int)($parts[1] ?? 1);
        $day = (int)($parts[2] ?? 1);

        $redMonth = $this->reduceToCoreOrMaster($month);
        $redDay = $this->reduceToCoreOrMaster($day);
        $redYear = $this->reduceToCoreOrMaster($year);
        $lifePath = $this->reduceToCoreOrMaster($redMonth + $redDay + $redYear);

        $birthdayNumber = $this->reduceToCoreOrMaster($day);

        $cleanName = strtolower(preg_replace('/[^a-z]/i', '', $fullName));
        $expressionSum = 0;
        $soulUrgeSum = 0;
        $personalitySum = 0;

        for ($i = 0; $i < strlen($cleanName); $i++) {
            $char = $cleanName[$i];
            $val = self::PYTHAGOREAN_MAP[$char] ?? 0;
            $expressionSum += $val;

            if (in_array($char, self::VOWELS, true)) {
                $soulUrgeSum += $val;
            } else {
                $personalitySum += $val;
            }
        }

        $expressionNumber = $expressionSum > 0 ? $this->reduceToCoreOrMaster($expressionSum) : 1;
        $soulUrgeNumber = $soulUrgeSum > 0 ? $this->reduceToCoreOrMaster($soulUrgeSum) : 1;
        $personalityNumber = $personalitySum > 0 ? $this->reduceToCoreOrMaster($personalitySum) : 1;

        $currentYear = (int)date('Y');
        $personalYear = $this->reduceToCoreOrMaster(
            $this->reduceToCoreOrMaster($month) + $this->reduceToCoreOrMaster($day) + $this->reduceToCoreOrMaster($currentYear)
        );

        return [
            'lifePathNumber' => $lifePath,
            'birthdayNumber' => $birthdayNumber,
            'expressionNumber' => $expressionNumber,
            'soulUrgeNumber' => $soulUrgeNumber,
            'personalityNumber' => $personalityNumber,
            'personalYearNumber' => $personalYear,
            'isMasterLifePath' => $this->isMasterNumber($lifePath),
            'isMasterExpression' => $this->isMasterNumber($expressionNumber),
            'isMasterSoulUrge' => $this->isMasterNumber($soulUrgeNumber),
            'isMasterPersonality' => $this->isMasterNumber($personalityNumber),
            'descriptions' => [
                'lifePath' => self::ARCHETYPES[$lifePath] ?? self::ARCHETYPES[$this->reduceToCoreOrMaster($lifePath)],
                'birthday' => self::ARCHETYPES[$birthdayNumber] ?? self::ARCHETYPES[$this->reduceToCoreOrMaster($birthdayNumber)],
                'expression' => self::ARCHETYPES[$expressionNumber] ?? self::ARCHETYPES[$this->reduceToCoreOrMaster($expressionNumber)],
                'soulUrge' => self::ARCHETYPES[$soulUrgeNumber] ?? self::ARCHETYPES[$this->reduceToCoreOrMaster($soulUrgeNumber)],
                'personality' => self::ARCHETYPES[$personalityNumber] ?? self::ARCHETYPES[$this->reduceToCoreOrMaster($personalityNumber)],
                'personalYear' => "Year of Personal Vibration {$personalYear}.",
            ],
        ];
    }
}
