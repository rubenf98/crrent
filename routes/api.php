<?php

use App\Http\Controllers\AgencyController;
use App\Http\Controllers\BlockDateController;
use App\Http\Controllers\BlockedCarController;
use App\Http\Controllers\BlockPeriodController;
use App\Http\Controllers\CarCategoryController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ComissionController;
use App\Http\Controllers\CreateExternalReservationController;
use App\Http\Controllers\ErrorReservation;
use App\Http\Controllers\ExtraController;
use App\Http\Controllers\FetchInvoicePdf;
use App\Http\Controllers\GlobalParameterController;
use App\Http\Controllers\HasBlockDate;
use App\Http\Controllers\InsuranceController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\LocalizationController;
use App\Http\Controllers\LogRecordController;
use App\Http\Controllers\PriceController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UpdateGlobalParametersController;
use App\Http\Controllers\UpdateReservationPayment;
use App\Http\Controllers\UpdateReservationStatus;
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
Route::get('/selector/car-categories', 'App\Http\Controllers\CarCategoryController@selector');
Route::get('/remoteselector/car-categories', 'App\Http\Controllers\CarCategoryController@indexRemoteSelect');
Route::get('/selector/blockPeriods', 'App\Http\Controllers\BlockPeriodController@selector');
Route::get('/selector/blockedDates', 'App\Http\Controllers\BlockDateController@selector');

Route::put('/confirm/reservation', 'App\Http\Controllers\ConfirmReservation');
Route::put('/error/reservation', ErrorReservation::class);

Route::post('external-reservation', CreateExternalReservationController::class);
Route::put('update-reservation-status/{id}', UpdateReservationStatus::class);
Route::put('update-reservation-payment/{id}', UpdateReservationPayment::class);

Route::get('/reservations-today', 'App\Http\Controllers\GetTodayReservationsController');
Route::get('/reservations-next', 'App\Http\Controllers\GetNextReservationsController');
Route::get('/reservations-per-month', 'App\Http\Controllers\GetReservationsPerMonthController');
Route::get('/reservations-archive', 'App\Http\Controllers\GetReservationArchive');

Route::get('/export/reservations', 'App\Http\Controllers\ReservationController@export');

Route::put('/car-status/{car}', 'App\Http\Controllers\CarStatusController');
Route::get('/car-availability', 'App\Http\Controllers\GetCarAvailability');

Route::post('download/invoice', FetchInvoicePdf::class);
Route::post('/download/contract', 'App\Http\Controllers\DownloadContractController');

Route::get('hasblock', HasBlockDate::class);

Route::put('globalParameters', UpdateGlobalParametersController::class);

Route::get('/card/{token}', 'App\Http\Controllers\CardController@show');
Route::get('/card-email/{card}', 'App\Http\Controllers\CardController@sendEmail');


Route::apiResource('logRecord', LogRecordController::class);
Route::apiResource('cars', CarController::class);
Route::apiResource('car-categories', CarCategoryController::class);
Route::apiResource('levels', LevelController::class);
Route::apiResource('extras', ExtraController::class);
Route::apiResource('prices', PriceController::class);
Route::apiResource('clients', ClientController::class);
Route::apiResource('reservations', ReservationController::class);
Route::apiResource('promotions', PromotionController::class);
Route::apiResource('blockedDates', BlockDateController::class);
Route::apiResource('blockPeriods', BlockPeriodController::class);
Route::apiResource('blockedCars', BlockedCarController::class);
Route::apiResource('globalParameters', GlobalParameterController::class);
Route::apiResource('agencies', AgencyController::class);
Route::apiResource('comissions', ComissionController::class);
Route::apiResource('localizations', LocalizationController::class);
Route::apiResource('insurances', InsuranceController::class);
