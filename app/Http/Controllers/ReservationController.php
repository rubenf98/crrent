<?php

namespace App\Http\Controllers;

use App\Exports\ReservationExport;
use App\Http\Requests\ReservationRequest;
use App\Http\Requests\UpdateReservationRequest;
use App\Http\Resources\ReservationResource;
use App\Jobs\HandleReservation;
use App\Mail\ConfirmationEmail;
use App\Mail\ProofEmail;
use App\Models\Agency;
use App\Models\BlockDate;
use App\Models\Car;
use App\Models\Card;
use App\Models\Client;
use App\Models\Comission;
use App\Models\Driver;
use App\Models\Localization;
use App\Models\Reservation;
use App\Models\ReservationHasLocalization;
use App\QueryFilters\ReservationFilters;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use DateInterval;
use DatePeriod;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(ReservationFilters $filters)
    {
        // return (new ReservationExport())->download('reservas.xlsx', \Maatwebsite\Excel\Excel::XLSX);

        return ReservationResource::collection(
            Reservation::with(["car", "car.category", 'client', 'drivers', 'extras'])
                ->filterBy($filters)->paginate(5)
        );
    }

    public function export()
    {
        return (new ReservationExport())->download('reservas.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ReservationRequest $request)
    {
        // return $request;
        $validator = $request->validated();

        DB::beginTransaction();
        // try {
        $client = Client::store($validator);
        $drivers = Driver::store($validator);
        $hasCard = false;
        if (array_key_exists('card_number', $validator)) {
            $hasCard = true;
            $card = Card::store($validator);
        }


        $initDate = Carbon::parse($validator['pickup_date']);
        $endDate = Carbon::parse($validator['return_date']);
        $token = uniqid();

        $reservation = Reservation::create([
            'token' => $token,
            'pickup_date' => $initDate,
            'return_date' =>  $endDate,
            'pickup_place' => $validator['pickup_place'],
            'return_place' => $validator['return_place'],
            'payment_method' => $validator['payment_method'] == 1 ? "Cartão de crédito" : "Pagamento no levantamento",
            'address' => $validator['local_address'],
            'flight' => array_key_exists('flight', $validator)  ? $validator['flight'] : null,
            'price' => $validator['price'],
            'car_price' => $validator['car_price'],
            'car_price_per_day' => $validator['car_price_per_day'],
            'days' => $validator['days'],
            'car_pref_id' => $validator['car_id'],
            'car_id' => $validator['car_id'],
            'insurance_id' => $validator['insurance_id'],
            'card_id' => $hasCard ? $card->id : null,
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

        $reservation->extras()->attach($validator["extras"]);
        $reservation->drivers()->attach($drivers);
        HandleReservation::dispatch($reservation);
        $reservation->generateInvoice();
        if ($validator['payment_method'] != 1) {
            Mail::to($validator['email'])->queue(new ConfirmationEmail($reservation->token));
        } else {
            Mail::to($validator['email'])->queue(new ProofEmail($reservation->token));
        }
        DB::commit();

        if ($validator['payment_method'] == 1) {
            $client = new \GuzzleHttp\Client();

            $response = $client->request('POST', 'https://clientes.eupago.pt/api/v1.02/creditcard/create', [
                'body' => '{"payment":{"amount":{"currency":"EUR","value":' . $reservation->price . '},"lang":"EN","successUrl":"https://crrent.ruben-freitas.pt/confirmation/?token=' . $reservation->token . '","failUrl":"https://crrent.ruben-freitas.pt/error/?token=' . $reservation->token . '","backUrl":"https://crrent.ruben-freitas.pt/error/?token=' . $reservation->token . '","identifier":"' . $reservation->token . '"},"customer":{"notify":true,"email":"joseruben98@hotmail.com"}}',
                'headers' => [
                    'Authorization' => 'ApiKey e50f-062e-e91a-118e-d72a',
                    'accept' => 'application/json',
                    'content-type' => 'application/json',
                ],
            ]);
            return json_decode($response->getBody(), true);
        } else {
            return new ReservationResource($reservation);
        }

        // } catch (\Throwable $th) {
        //     DB::rollBack();
        //     return response()->json([
        //         'success' => false,
        //         'errors' => $th
        //     ], 422);
        // }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function show(Reservation $reservation)
    {
        $reservation->generateDoc();
        return new ReservationResource($reservation);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateReservationRequest $request, Reservation $reservation)
    {
        $validator = $request->validated();

        DB::beginTransaction();
        $removeDates = BlockDate::where("reservation_id", $reservation->id)->get();

        foreach ($removeDates as $removeDate) {
            $removeDate->delete();
        }
        $initDate = Carbon::parse($validator['pickup_date']);
        $endDate = Carbon::parse($validator['return_date']);

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

        $client = Client::store($validator);
        $reservation->update([
            'pickup_date' => $validator['pickup_date'],
            'return_date' =>  $validator['return_date'],
            'pickup_place' => $validator['pickup_place'],
            'return_place' => $validator['return_place'],
            'flight' => Arr::get($validator, "flight"),
            'address' => Arr::get($validator, "local_address"),
            'checkin' => Arr::get($validator, "checkin"),
            'checkout' => Arr::get($validator, "checkout"),
            'price' => $validator['price'],
            'current_status' => $validator['current_status'],
            'payment_method' => Arr::get($validator, 'payment_method'),
            'car_price' => $validator['car_price'],
            'car_price_per_day' => $validator['car_price_per_day'],
            'days' => $validator['days'],
            'car_id' => $validator['car_id'],
            'insurance_id' => $validator['insurance_id'],
            'kms_pickup' => Arr::get($validator, "kms_pickup"),
            'kms_return' => Arr::get($validator, "kms_return"),
            'gas_pickup' => Arr::get($validator, "gas_pickup"),
            'gas_return' => Arr::get($validator, "gas_return"),

            'notes' => Arr::get($validator, "notes"),
            'client_id' => $client->id,
        ]);

        if (Arr::has($validator, ['agency_id', 'intermediary', 'value'])) {
            if ($reservation->comission_id) {
                $comission = Comission::find($reservation->comission_id);
                $comission->update([
                    'agency_id' => $validator['agency_id'],
                    'intermediary' => $validator['intermediary'],
                    'value' => $validator['value'],
                    'paid' => $validator['paid'],
                ]);
            } else {
                $comission = Comission::create([
                    'agency_id' => $validator['agency_id'],
                    'intermediary' => $validator['intermediary'],
                    'value' => $validator['value'],
                    'paid' => $validator['paid'],
                ]);
                $reservation->comission_id = $comission->id;
                $reservation->save();
            }
        }

        $reservation->localizations()->detach();

        $current = Localization::find($validator["localizations_0"]);
        ReservationHasLocalization::create([
            'reservation_id' => $reservation->id,
            'localization_id' => $current->id,
            'price' => $current->price,
        ]);

        $current = Localization::find($validator["localizations_1"]);
        ReservationHasLocalization::create([
            'reservation_id' => $reservation->id,
            'localization_id' => $current->id,
            'price' => $current->price,
        ]);

        $reservation->extras()->sync($validator['extras']);

        $drivers = [];

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
        $reservation->drivers()->sync($drivers);
        $reservation->generateInvoice();
        DB::commit();
        return new ReservationResource($reservation);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reservation $reservation)
    {
        DB::beginTransaction();
        $comission = $reservation->comission;
        if ($comission) {
            $comission->cancelled = true;
            $comission->save();
        }


        $blockedDates = BlockDate::where('reservation_id', $reservation->id)->get();

        foreach ($blockedDates as $blockedDate) {
            $blockedDate->delete();
        }

        $reservation->delete();
        DB::commit();

        return response()->json(null, 204);
    }
}
