<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\NumerologyService;
use App\Services\SynthesisService;
use App\Services\VedicAstrologyService;
use App\Services\WesternAstrologyService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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

        return response()->json([
            'success' => true,
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

    public function health(): JsonResponse
    {
        return response()->json([
            'status' => 'healthy',
            'service' => 'magic3numbers-api',
            'timestamp' => now()->toIso8601String(),
            'version' => '1.0.0',
        ]);
    }
}
