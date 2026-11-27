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
                     'profile_id',
                     'data' => [
                         'input',
                         'numerology' => ['lifePathNumber', 'birthdayNumber', 'expressionNumber'],
                         'vedic' => ['ascendantSign', 'moonSign', 'moonNakshatra', 'placements', 'houses'],
                         'western' => ['sunSign', 'moonSign', 'risingSign', 'aspects'],
                         'synthesis' => ['cosmicTriad', 'synthesisSummary', 'dailyInsight'],
                     ]
                 ]);
    }

    public function test_admin_delete_profile_endpoint(): void
    {
        // First calculate and save a profile
        $calcResponse = $this->postJson('/api/v1/calculate', [
            'full_name' => 'Test Deletion Profile',
            'birth_date' => '1995-10-24',
            'birth_time' => '12:00',
            'is_time_unknown' => false,
            'birth_city' => 'London',
            'latitude' => 51.5074,
            'longitude' => -0.1278,
            'timezone' => 'Europe/London',
            'utc_offset' => 0,
        ]);

        $profileId = $calcResponse->json('profile_id');
        $this->assertNotNull($profileId);

        // Delete the profile
        $deleteResponse = $this->deleteJson("/api/v1/admin/profiles/{$profileId}");
        $deleteResponse->assertStatus(200)
                       ->assertJson([
                           'success' => true,
                           'message' => 'Profile deleted successfully',
                       ]);

        // Attempting to delete again returns 404
        $deleteAgain = $this->deleteJson("/api/v1/admin/profiles/{$profileId}");
        $deleteAgain->assertStatus(404);
    }
}
