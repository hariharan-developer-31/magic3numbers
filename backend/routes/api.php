<?php

use App\Http\Controllers\Api\AstrologyController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/health', [AstrologyController::class, 'health']);
    Route::post('/calculate', [AstrologyController::class, 'calculate']);

    // Authentication endpoints
    Route::post('/auth/register', [AstrologyController::class, 'register']);
    Route::post('/auth/login', [AstrologyController::class, 'login']);

    // Admin endpoints
    Route::prefix('admin')->group(function () {
        Route::get('/stats', [AstrologyController::class, 'adminStats']);
        Route::get('/profiles', [AstrologyController::class, 'adminProfiles']);
    });
});
