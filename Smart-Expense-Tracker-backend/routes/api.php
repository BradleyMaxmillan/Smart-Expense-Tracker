<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExpenseController;


Route::get('/expenses', [ExpenseController::class, 'index']);   
Route::get('/expenses/{id}', [ExpenseController::class, 'show']);   
Route::post('/expenses', [ExpenseController::class, 'store']);
Route::put('/expense/{id}',[ExpenseController::class,'update']);
Route::delete('/expense/{id}',[ExpenseController::class,'destroy']);
