<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExternalReservationRequest;
use App\Http\Resources\ReservationResource;
use App\Jobs\HandleReservation;
use App\Models\BlockDate;
use App\Models\Car;
use App\Models\Card;
use App\Models\Client;
use App\Models\Comission;
use App\Models\Driver;
use App\Models\Reservation;
use Carbon\Carbon;
use DateInterval;
use DatePeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class CreateExternalReservationController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(ExternalReservationRequest $request)
    {
        $validator = $request->validated();

        DB::beginTransaction();
        // try {
        $client = Client::store($validator);

        $initDate = Carbon::parse($validator['pickup_date']);
        $endDate = Carbon::parse($validator['return_date']);
        $token = uniqid();

        if ($request->has("agency_id")) {
            $comission = Comission::create([
                "agency_id" => $validator['agency_id'],
                "intermediary" => $validator['intermediary'],
                "value" => $validator['value'],
            ]);

            $validator['comission_id'] = $comission->id;
        }

        $reservation = Reservation::create([
            'token' => $token,
            'pickup_date' => $initDate,
            'return_date' =>  $endDate,
            'pickup_place' => $validator['pickup_place'],
            'return_place' => $validator['return_place'],
            'address' => $validator['local_address'],
            'flight' => Arr::get($validator, 'flight'),
            'price' => $validator['price'],
            'car_price' => $validator['car_price'],
            'car_price_per_day' => $validator['car_price_per_day'],
            'days' => $validator['days'],
            'car_pref_id' => $validator['car_id'],
            'car_id' => $validator['car_id'],
            'insurance_id' => $validator['insurance_id'],
            'comission_id' => Arr::get($validator, 'comission_id'),
            'client_id' => $client->id,
        ]);

        $car = Car::find($validator['car_id']);
        $interval = DateInterval::createFromDateString('1 day');
        $period = new DatePeriod($initDate->startOfDay(), $interval, $endDate->endOfDay());

        foreach ($period as $dt) {
            BlockDate::create([
                "date" => $dt,
                "car_id" => $car->id,
                "car_category_id" => $car->car_category_id,
                "reservation_id" => $reservation->id
            ]);
        }
        if ($request->has("extras")) {
            $reservation->extras()->attach($validator["extras"]);
        }

        $drivers = [];
        if (Arr::get($validator, 'drivers')) {
            foreach ($validator['drivers'] as $driverData) {
                $driver = Driver::create([
                    'name' => Arr::get($driverData, 'name'),
                    'birthday' => array_key_exists('birthday', $driverData)  ? Carbon::parse($driverData['birthday']) : null,
                    'license' => Arr::get($driverData, 'license'),
                    'emission' => array_key_exists('emission', $driverData)  ? Carbon::parse($driverData['emission']) : null,
                    'validity' => array_key_exists('validity', $driverData)  ? Carbon::parse($driverData['validity']) : null,
                    'emission_place' => Arr::get($driverData, 'emission_place'),
                ]);
                array_push($drivers, $driver->id);
            }
            $reservation->drivers()->attach($drivers);
        }


        HandleReservation::dispatch($reservation);
        DB::commit();

        return new ReservationResource($reservation);
    }
}
