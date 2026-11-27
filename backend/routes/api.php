<?php

use App\Http\Controllers\Api\AstrologyController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/health', [AstrologyController::class, 'health']);
    Route::post('/calculate', [AstrologyController::class, 'calculate']);
});
