<?php

namespace App\Services;

class WesternAstrologyService
{
    public static function normalizeDegrees(float $deg): float
    {
        $val = fmod($deg, 360.0);
        if ($val < 0.0) {
            $val += 360.0;
        }
        return $val;
    }

    public function calculate(array $input): array
    {
        $parts = explode('-', $input['birth_date']);
        $year = (int)$parts[0];
        $month = (int)$parts[1];
        $day = (int)$parts[2];

        $isUnknown = !empty($input['is_time_unknown']);
        $utHour = 12.0;
        if (!$isUnknown && !empty($input['birth_time'])) {
            $tParts = explode(':', $input['birth_time']);
            $localHour = (float)$tParts[0] + ((float)($tParts[1] ?? 0) / 60.0);
            $utcOffset = (float)($input['utc_offset'] ?? 0);
            $utHour = self::normalizeDegrees(($localHour - $utcOffset) + 24.0);
            $utHour = fmod($utHour, 24.0);
        }

        $y = $year;
        $m = $month;
        if ($m <= 2) {
            $y -= 1;
            $m += 12;
        }
        $a = (int)floor($y / 100);
        $b = 2 - $a + (int)floor($a / 4);
        $jd = floor(365.25 * ($y + 4716)) + floor(30.6001 * ($m + 1)) + $day + $b - 1524.5 + ($utHour / 24.0);
        $d = $jd - 2451545.0;
        $t = $d / 36525.0;

        $g_sun = self::normalizeDegrees(357.52911 + 0.98560028 * $d) * (M_PI / 180);
        $lambda_sun = self::normalizeDegrees(280.46646 + 0.98564736 * $d + 1.914602 * sin($g_sun) + 0.019993 * sin(2 * $g_sun));

        $L_moon = self::normalizeDegrees(218.3165 + 13.176396 * $d);
        $M_moon = self::normalizeDegrees(134.963 + 13.064993 * $d) * (M_PI / 180);
        $lambda_moon = self::normalizeDegrees($L_moon + 6.289 * sin($M_moon) - 1.274 * sin($M_moon - 2 * $g_sun) + 0.658 * sin(2 * $g_sun));

        $L_merc = self::normalizeDegrees(252.251 + 4.0923344 * $d);
        $M_merc = self::normalizeDegrees(174.795 + 4.0923344 * $d) * (M_PI / 180);
        $lambda_merc = self::normalizeDegrees($L_merc + 23.44 * sin($M_merc));

        $L_ven = self::normalizeDegrees(181.979 + 1.6021305 * $d);
        $M_ven = self::normalizeDegrees(50.116 + 1.6021305 * $d) * (M_PI / 180);
        $lambda_ven = self::normalizeDegrees($L_ven + 0.776 * sin($M_ven));

        $L_mars = self::normalizeDegrees(355.433 + 0.5240330 * $d);
        $M_mars = self::normalizeDegrees(19.373 + 0.5240208 * $d) * (M_PI / 180);
        $lambda_mars = self::normalizeDegrees($L_mars + 10.691 * sin($M_mars));

        $L_jup = self::normalizeDegrees(34.351 + 0.0830853 * $d);
        $M_jup = self::normalizeDegrees(20.020 + 0.0830853 * $d) * (M_PI / 180);
        $lambda_jup = self::normalizeDegrees($L_jup + 5.55 * sin($M_jup));

        $L_sat = self::normalizeDegrees(50.077 + 0.0334442 * $d);
        $M_sat = self::normalizeDegrees(317.021 + 0.0334442 * $d) * (M_PI / 180);
        $lambda_sat = self::normalizeDegrees($L_sat + 6.35 * sin($M_sat));

        $planets = [
            'Sun' => $lambda_sun,
            'Moon' => $lambda_moon,
            'Mercury' => $lambda_merc,
            'Venus' => $lambda_ven,
            'Mars' => $lambda_mars,
            'Jupiter' => $lambda_jup,
            'Saturn' => $lambda_sat,
        ];

        $risingSign = 'Unknown (Time required)';
        $ascLong = 0.0;
        if (!$isUnknown) {
            $gmst = self::normalizeDegrees(280.46061837 + 360.98564736629 * $d + 0.000387933 * $t * $t);
            $ramc = self::normalizeDegrees($gmst + (float)($input['longitude'] ?? 0));
            $ramcRad = $ramc * (M_PI / 180);
            $latRad = (float)($input['latitude'] ?? 0) * (M_PI / 180);
            $epsRad = (23.4392911 - 0.0130042 * $t) * (M_PI / 180);

            $y = -cos($ramcRad);
            $x = sin($ramcRad) * cos($epsRad) + tan($latRad) * sin($epsRad);
            $ascLong = self::normalizeDegrees(atan2($y, $x) * (180 / M_PI));
            $risingSign = VedicAstrologyService::ZODIAC_SIGNS[(int)floor($ascLong / 30) % 12];
        }

        $placements = [];
        foreach ($planets as $planet => $long) {
            $signIdx = (int)floor($long / 30) % 12;
            $deg = (int)floor(fmod($long, 30));
            $min = (int)floor((fmod($long, 30) - $deg) * 60);

            $house = 1;
            if (!$isUnknown) {
                $house = ((int)floor(self::normalizeDegrees($long - $ascLong) / 30) % 12) + 1;
            }

            $placements[] = [
                'planet' => $planet,
                'longitude' => round($long, 2),
                'sign' => VedicAstrologyService::ZODIAC_SIGNS[$signIdx],
                'degree' => $deg,
                'minute' => $min,
                'house' => $house,
            ];
        }

        // Aspects
        $aspects = [];
        $pEntries = array_keys($planets);
        for ($i = 0; $i < count($pEntries); $i++) {
            for ($j = $i + 1; $j < count($pEntries); $j++) {
                $p1 = $pEntries[$i];
                $p2 = $pEntries[$j];
                $l1 = $planets[$p1];
                $l2 = $planets[$p2];
                $diff = abs($l1 - $l2);
                if ($diff > 180) $diff = 360 - $diff;

                if (abs($diff - 0) <= 8) {
                    $aspects[] = ['planet1' => $p1, 'planet2' => $p2, 'aspectType' => 'Conjunction', 'angle' => 0, 'orb' => round($diff, 2)];
                } elseif (abs($diff - 180) <= 8) {
                    $aspects[] = ['planet1' => $p1, 'planet2' => $p2, 'aspectType' => 'Opposition', 'angle' => 180, 'orb' => round(abs($diff - 180), 2)];
                } elseif (abs($diff - 120) <= 8) {
                    $aspects[] = ['planet1' => $p1, 'planet2' => $p2, 'aspectType' => 'Trine', 'angle' => 120, 'orb' => round(abs($diff - 120), 2)];
                } elseif (abs($diff - 90) <= 7) {
                    $aspects[] = ['planet1' => $p1, 'planet2' => $p2, 'aspectType' => 'Square', 'angle' => 90, 'orb' => round(abs($diff - 90), 2)];
                } elseif (abs($diff - 60) <= 6) {
                    $aspects[] = ['planet1' => $p1, 'planet2' => $p2, 'aspectType' => 'Sextile', 'angle' => 60, 'orb' => round(abs($diff - 60), 2)];
                }
            }
        }

        return [
            'sunSign' => VedicAstrologyService::ZODIAC_SIGNS[(int)floor($planets['Sun'] / 30) % 12],
            'moonSign' => VedicAstrologyService::ZODIAC_SIGNS[(int)floor($planets['Moon'] / 30) % 12],
            'risingSign' => $risingSign,
            'placements' => $placements,
            'aspects' => $aspects,
        ];
    }
}
