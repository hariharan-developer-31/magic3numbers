<?php

namespace Tests\Feature;

use Tests\TestCase;

class AstrologyApiTest extends TestCase
{
    public function test_health_check_returns_ok(): void
    {
        $response = $this->getJson('/api/v1/health');
        $response->assertStatus(200)
                 ->assertJson(['status' => 'healthy']);
    }

    public function test_calculate_endpoint_returns_expected_data(): void
    {
        $response = $this->postJson('/api/v1/calculate', [
            'full_name' => 'Alexander Vance',
            'birth_date' => '1992-05-18',
            'birth_time' => '14:30',
            'is_time_unknown' => false,
            'birth_city' => 'Kuala Lumpur',
            'latitude' => 3.139,
            'longitude' => 101.6869,
            'timezone' => 'Asia/Kuala_Lumpur',
            'utc_offset' => 8,
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'success',
                     'data' => [
                         'input',
                         'numerology' => ['lifePathNumber', 'birthdayNumber', 'expressionNumber'],
                         'vedic' => ['ascendantSign', 'moonSign', 'moonNakshatra', 'placements', 'houses'],
                         'western' => ['sunSign', 'moonSign', 'risingSign', 'aspects'],
                         'synthesis' => ['cosmicTriad', 'synthesisSummary', 'dailyInsight'],
                     ]
                 ]);
    }
}
