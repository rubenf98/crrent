<?php

use App\Http\Controllers\BlockDateController;
use App\Http\Controllers\BlockPeriodController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\ExtraController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\ReservationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', 'App\Http\Controllers\AuthController@login');
Route::post('logout', 'App\Http\Controllers\AuthController@logout');
Route::post('refresh', 'App\Http\Controllers\AuthController@refresh');
Route::get('me', 'App\Http\Controllers\AuthController@me');

Route::get('/selector/cars', 'App\Http\Controllers\CarController@selector');
Route::get('/selector/blockedDates', 'App\Http\Controllers\BlockDateController@selector');

Route::put('/confirm/reservation', 'App\Http\Controllers\ConfirmReservation');


Route::get('/reservations-today', 'App\Http\Controllers\GetTodayReservationsController');
Route::get('/reservations-next', 'App\Http\Controllers\GetNextReservationsController');


Route::post('/download/contract', 'App\Http\Controllers\DownloadContractController');

Route::apiResource('cars', CarController::class);
Route::apiResource('extras', ExtraController::class);
Route::apiResource('reservations', ReservationController::class);
Route::apiResource('promotions', PromotionController::class);
Route::apiResource('blockedDates', BlockDateController::class);
Route::apiResource('blockPeriods', BlockPeriodController::class);
