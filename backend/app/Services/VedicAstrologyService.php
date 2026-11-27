<?php

namespace App\Services;

class VedicAstrologyService
{
    public const ZODIAC_SIGNS = [
        'Aries', 'Taurus', 'Gemini', 'Cancer',
        'Leo', 'Virgo', 'Libra', 'Scorpio',
        'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ];

    public const SIGN_LORDS = [
        'Aries' => 'Mars', 'Taurus' => 'Venus', 'Gemini' => 'Mercury', 'Cancer' => 'Moon',
        'Leo' => 'Sun', 'Virgo' => 'Mercury', 'Libra' => 'Venus', 'Scorpio' => 'Mars',
        'Sagittarius' => 'Jupiter', 'Capricorn' => 'Saturn', 'Aquarius' => 'Saturn', 'Pisces' => 'Jupiter'
    ];

    public const NAKSHATRAS = [
        'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
        'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
        'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
        'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta',
        'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
    ];

    public function calculateJulianDay(int $year, int $month, int $day, float $utHour): float
    {
        $y = $year;
        $m = $month;
        if ($m <= 2) {
            $y -= 1;
            $m += 12;
        }
        $a = (int)floor($y / 100);
        $b = 2 - $a + (int)floor($a / 4);
        return floor(365.25 * ($y + 4716)) + floor(30.6001 * ($m + 1)) + $day + $b - 1524.5 + ($utHour / 24.0);
    }

    public function calculateLahiriAyanamsa(float $jd): float
    {
        $t = ($jd - 2451545.0) / 36525.0;
        return 23.8566 + ($t * 1.39697);
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
            $utHour = WesternAstrologyService::normalizeDegrees(($localHour - $utcOffset) + 24.0);
            $utHour = fmod($utHour, 24.0);
        }

        $jd = $this->calculateJulianDay($year, $month, $day, $utHour);
        $ayanamsa = $this->calculateLahiriAyanamsa($jd);

        $d = $jd - 2451545.0;
        $t = $d / 36525.0;

        // Tropical calculations normalized
        $L_sun = WesternAstrologyService::normalizeDegrees(280.46646 + 0.98564736 * $d);
        $g_sun = WesternAstrologyService::normalizeDegrees(357.52911 + 0.98560028 * $d) * (M_PI / 180);
        $lambda_sun = WesternAstrologyService::normalizeDegrees($L_sun + 1.914602 * sin($g_sun) + 0.019993 * sin(2 * $g_sun));

        $L_moon = WesternAstrologyService::normalizeDegrees(218.3165 + 13.176396 * $d);
        $M_moon = WesternAstrologyService::normalizeDegrees(134.963 + 13.064993 * $d) * (M_PI / 180);
        $lambda_moon = WesternAstrologyService::normalizeDegrees($L_moon + 6.289 * sin($M_moon) - 1.274 * sin($M_moon - 2 * $g_sun) + 0.658 * sin(2 * $g_sun));

        $L_mars = WesternAstrologyService::normalizeDegrees(355.433 + 0.5240330 * $d);
        $M_mars = WesternAstrologyService::normalizeDegrees(19.373 + 0.5240208 * $d) * (M_PI / 180);
        $lambda_mars = WesternAstrologyService::normalizeDegrees($L_mars + 10.691 * sin($M_mars));

        $L_merc = WesternAstrologyService::normalizeDegrees(252.251 + 4.0923344 * $d);
        $M_merc = WesternAstrologyService::normalizeDegrees(174.795 + 4.0923344 * $d) * (M_PI / 180);
        $lambda_merc = WesternAstrologyService::normalizeDegrees($L_merc + 23.44 * sin($M_merc));

        $L_jup = WesternAstrologyService::normalizeDegrees(34.351 + 0.0830853 * $d);
        $M_jup = WesternAstrologyService::normalizeDegrees(20.020 + 0.0830853 * $d) * (M_PI / 180);
        $lambda_jup = WesternAstrologyService::normalizeDegrees($L_jup + 5.55 * sin($M_jup));

        $L_ven = WesternAstrologyService::normalizeDegrees(181.979 + 1.6021305 * $d);
        $M_ven = WesternAstrologyService::normalizeDegrees(50.116 + 1.6021305 * $d) * (M_PI / 180);
        $lambda_ven = WesternAstrologyService::normalizeDegrees($L_ven + 0.776 * sin($M_ven));

        $L_sat = WesternAstrologyService::normalizeDegrees(50.077 + 0.0334442 * $d);
        $M_sat = WesternAstrologyService::normalizeDegrees(317.021 + 0.0334442 * $d) * (M_PI / 180);
        $lambda_sat = WesternAstrologyService::normalizeDegrees($L_sat + 6.35 * sin($M_sat));

        $lambda_rahu = WesternAstrologyService::normalizeDegrees(125.0445 - 0.05295377 * $d);
        $lambda_ketu = WesternAstrologyService::normalizeDegrees($lambda_rahu + 180);

        $rawPlanets = [
            'Sun' => $lambda_sun,
            'Moon' => $lambda_moon,
            'Mars' => $lambda_mars,
            'Mercury' => $lambda_merc,
            'Jupiter' => $lambda_jup,
            'Venus' => $lambda_ven,
            'Saturn' => $lambda_sat,
            'Rahu' => $lambda_rahu,
            'Ketu' => $lambda_ketu,
        ];

        // Sidereal adjustment
        $sidereal = [];
        foreach ($rawPlanets as $planet => $long) {
            $sidereal[$planet] = WesternAstrologyService::normalizeDegrees($long - $ayanamsa);
        }

        // Ascendant
        $ascSignIndex = 0;
        $ascendantSign = 'Time Unknown (Solar Lagna)';
        $ascendantDegree = 0.0;

        if (!$isUnknown) {
            $gmst = WesternAstrologyService::normalizeDegrees(280.46061837 + 360.98564736629 * $d + 0.000387933 * $t * $t);
            $ramc = WesternAstrologyService::normalizeDegrees($gmst + (float)($input['longitude'] ?? 0));
            $ramcRad = $ramc * (M_PI / 180);
            $latRad = (float)($input['latitude'] ?? 0) * (M_PI / 180);
            $epsRad = (23.4392911 - 0.0130042 * $t) * (M_PI / 180);

            $y = -cos($ramcRad);
            $x = sin($ramcRad) * cos($epsRad) + tan($latRad) * sin($epsRad);
            $tropAsc = WesternAstrologyService::normalizeDegrees(atan2($y, $x) * (180 / M_PI));
            $sidAsc = WesternAstrologyService::normalizeDegrees($tropAsc - $ayanamsa);

            $ascSignIndex = (int)floor($sidAsc / 30) % 12;
            $ascendantSign = self::ZODIAC_SIGNS[$ascSignIndex];
            $ascendantDegree = round(fmod($sidAsc, 30), 2);
        }

        // Moon details
        $sidMoon = $sidereal['Moon'];
        $moonSignIndex = (int)floor($sidMoon / 30) % 12;
        $moonSign = self::ZODIAC_SIGNS[$moonSignIndex];
        $nakshatraIndex = (int)floor($sidMoon / (360 / 27));
        $moonNakshatra = self::NAKSHATRAS[$nakshatraIndex % 27];
        $moonPada = ((int)floor($sidMoon / (360 / 108)) % 4) + 1;

        $placements = [];
        $housesMap = array_fill(1, 12, []);

        foreach ($sidereal as $planet => $long) {
            $signIdx = (int)floor($long / 30) % 12;
            $sign = self::ZODIAC_SIGNS[$signIdx];
            $nakIdx = (int)floor($long / (360 / 27)) % 27;
            $nak = self::NAKSHATRAS[$nakIdx];
            $pada = ((int)floor($long / (360 / 108)) % 4) + 1;

            $houseNum = (($signIdx - $ascSignIndex + 12) % 12) + 1;
            $housesMap[$houseNum][] = $planet;

            $placements[] = [
                'planet' => $planet,
                'longitude' => round($long, 2),
                'sign' => $sign,
                'signLord' => self::SIGN_LORDS[$sign],
                'house' => $isUnknown ? 0 : $houseNum,
                'nakshatra' => $nak,
                'pada' => $pada,
            ];
        }

        $houses = [];
        for ($i = 0; $i < 12; $i++) {
            $h = $i + 1;
            $hSignIdx = ($ascSignIndex + $i) % 12;
            $hSign = self::ZODIAC_SIGNS[$hSignIdx];
            $houses[] = [
                'house' => $h,
                'sign' => $hSign,
                'lord' => self::SIGN_LORDS[$hSign],
                'planets' => $housesMap[$h],
            ];
        }

        return [
            'ascendantSign' => $ascendantSign,
            'ascendantDegree' => $ascendantDegree,
            'moonSign' => $moonSign,
            'moonNakshatra' => $moonNakshatra,
            'moonPada' => $moonPada,
            'sunSign' => self::ZODIAC_SIGNS[(int)floor($sidereal['Sun'] / 30) % 12],
            'sunNakshatra' => self::NAKSHATRAS[(int)floor($sidereal['Sun'] / (360 / 27)) % 27],
            'ayanamsa' => round($ayanamsa, 2),
            'placements' => $placements,
            'houses' => $houses,
        ];
    }
}
