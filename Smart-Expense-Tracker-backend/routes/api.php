<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\CategoryController;

// Public routes - Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

    // Analytics
    Route::get('/analytics', [AnalyticsController::class, 'index']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {

    // Authenticated user info
    Route::get('/user', function (Request $request) {
        return $request->user();
    });


    // Expenses CRUD
    Route::get('/expenses', [ExpenseController::class, 'index']);
    Route::get('/expenses/{id}', [ExpenseController::class, 'show']);
    Route::post('/expenses', [ExpenseController::class, 'store']);
    Route::put('/expenses/{id}', [ExpenseController::class, 'update']);
    Route::delete('/expenses/{id}', [ExpenseController::class, 'destroy']);

    // Categories CRUD
    Route::apiResource('categories', CategoryController::class);
});
