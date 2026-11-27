<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BirthProfile;
use App\Models\User;
use App\Services\NumerologyService;
use App\Services\SynthesisService;
use App\Services\VedicAstrologyService;
use App\Services\WesternAstrologyService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AstrologyController extends Controller
{
    public function __construct(
        protected NumerologyService $numerology,
        protected VedicAstrologyService $vedic,
        protected WesternAstrologyService $western,
        protected SynthesisService $synthesis
    ) {}

    public function calculate(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:120',
            'email' => 'nullable|email|max:120',
            'user_id' => 'nullable|integer',
            'birth_date' => 'required|date_format:Y-m-d',
            'birth_time' => 'nullable|string',
            'is_time_unknown' => 'nullable|boolean',
            'birth_city' => 'nullable|string|max:120',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'timezone' => 'nullable|string',
            'utc_offset' => 'nullable|numeric',
        ]);

        $numData = $this->numerology->calculate($validated['full_name'], $validated['birth_date']);
        $vedicData = $this->vedic->calculate($validated);
        $westernData = $this->western->calculate($validated);
        $synthData = $this->synthesis->synthesize($validated, $numData, $vedicData, $westernData);

        // Persist to Database for Admin Panel tracking
        try {
            $savedProfile = BirthProfile::create([
                'user_id' => $validated['user_id'] ?? null,
                'full_name' => $validated['full_name'],
                'email' => $validated['email'] ?? null,
                'birth_date' => $validated['birth_date'],
                'birth_time' => $validated['birth_time'] ?? null,
                'is_time_unknown' => !empty($validated['is_time_unknown']),
                'birth_city' => $validated['birth_city'] ?? 'Unknown',
                'latitude' => $validated['latitude'] ?? 0,
                'longitude' => $validated['longitude'] ?? 0,
                'timezone' => $validated['timezone'] ?? 'UTC',
                'utc_offset' => $validated['utc_offset'] ?? 0,
                'sun_sign' => $westernData['sunSign'],
                'moon_sign' => $vedicData['moonSign'],
                'nakshatra' => $vedicData['moonNakshatra'],
                'pada' => $vedicData['moonPada'] ?? 1,
                'life_path_number' => $numData['lifePathNumber'],
                'is_master_number' => !empty($numData['isMasterLifePath']),
                'birthday_number' => $numData['birthdayNumber'],
                'expression_number' => $numData['expressionNumber'],
            ]);
            $profileId = $savedProfile->id;
        } catch (\Throwable $e) {
            $profileId = null;
        }

        return response()->json([
            'success' => true,
            'profile_id' => $profileId,
            'data' => [
                'input' => $validated,
                'numerology' => $numData,
                'vedic' => $vedicData,
                'western' => $westernData,
                'synthesis' => $synthData,
                'calculated_at' => now()->toIso8601String(),
            ],
        ]);
    }

    // User Registration
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:120',
            'email' => 'required|email|max:120|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Account created successfully',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ]);
    }

    // User Login
    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid email credentials',
            ], 401);
        }

        return response()->json([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ]);
    }

    // Admin: Retrieve statistics & all stored records
    public function adminStats(): JsonResponse
    {
        $totalProfiles = BirthProfile::count();
        $totalUsers = User::count();
        $todayProfiles = BirthProfile::whereDate('created_at', today())->count();

        // Top Life Path numbers
        $topNumbers = BirthProfile::selectRaw('life_path_number, count(*) as count')
            ->groupBy('life_path_number')
            ->orderByDesc('count')
            ->limit(5)
            ->get();

        return response()->json([
            'success' => true,
            'stats' => [
                'total_profiles' => $totalProfiles,
                'total_users' => $totalUsers,
                'today_profiles' => $todayProfiles,
                'top_numbers' => $topNumbers,
            ],
        ]);
    }

    // Admin: List all stored profiles with optional query filter
    public function adminProfiles(Request $request): JsonResponse
    {
        $query = BirthProfile::query()->latest();

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('birth_city', 'like', "%{$search}%")
                  ->orWhere('sun_sign', 'like', "%{$search}%")
                  ->orWhere('nakshatra', 'like', "%{$search}%");
            });
        }

        $profiles = $query->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $profiles,
        ]);
    }

    public function health(): JsonResponse
    {
        return response()->json([
            'status' => 'healthy',
            'service' => 'magic3numbers-api',
            'timestamp' => now()->toIso8601String(),
            'version' => '1.1.0',
        ]);
    }
}
