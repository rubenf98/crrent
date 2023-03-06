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
use App\Models\Localization;
use App\Models\LogRecord;
use App\Models\Reservation;
use App\Models\ReservationHasLocalization;
use Carbon\Carbon;
use DateInterval;
use DatePeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Console\Output\ConsoleOutput;

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
                "paid" => $validator['paid'],
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
            'checkin' => Arr::get($validator, "checkin"),
            'checkout' => Arr::get($validator, "checkout"),
            'current_status' => $validator['current_status'],
            'price' => $validator['price'],
            'car_price' => $validator['car_price'],
            'car_price_per_day' => $validator['car_price_per_day'],
            'days' => $validator['days'],
            'payment_method' => Arr::get($validator, 'payment_method'),
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
            $operator = null;

            if (Carbon::parse($dt)->isSameDay($period->start)) {
                $operator = ">";
            } else if (Carbon::parse($dt)->isSameDay($period->end)) {
                $operator = "<";
            }

            BlockDate::create([
                "date" => $dt,
                "time" => $operator ? ($operator == ">" ? $validator['pickup_date'] : $validator['return_date']) : null,
                "operator" => $operator,
                "car_id" => $car->id,
                "car_category_id" => $car->car_category_id,
                "reservation_id" => $reservation->id
            ]);
        }

        foreach ($validator['localizations'] as $localization) {
            $current = Localization::find($localization);
            ReservationHasLocalization::create([
                'reservation_id' => $reservation->id,
                'localization_id' => $current->id,
                'price' => $current->price,
            ]);
        }

        if ($request->has("extras")) {
            $reservation->extras()->attach($validator["extras"]);
        }

        $drivers = [];
        if (Arr::get($validator, 'drivers')) {
            foreach ($validator['drivers'] as $driverData) {
                if ($driverData) {
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
            }
            if (count($drivers)) {
                $reservation->drivers()->attach($drivers);
            }
        }

        $reservation->generateInvoice();

        LogRecord::create([
            'user_id' => auth()->user()->id,
            'description' => "criou a reserva externa " . $reservation->id
        ]);
        HandleReservation::dispatch($reservation);
        DB::commit();

        return new ReservationResource($reservation);
    }
}
