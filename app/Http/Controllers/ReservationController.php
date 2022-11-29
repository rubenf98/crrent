<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReservationRequest;
use App\Http\Resources\ReservationResource;
use App\Jobs\HandleReservation;
use App\Mail\ConfirmationEmail;
use App\Models\BlockDate;
use App\Models\Car;
use App\Models\Client;
use App\Models\Driver;
use App\Models\Reservation;
use Carbon\Carbon;
use DateInterval;
use DatePeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return ReservationResource::collection(Reservation::with("car")->with('client')->with('drivers')->with('extras')->paginate(5));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ReservationRequest $request)
    {
        $validator = $request->validated();

        DB::beginTransaction();
        try {
            $client = Client::store($validator);
            $drivers = Driver::store($validator);

            $initDate =  Carbon::parse($validator['pickup_date']);
            $endDate =  Carbon::parse($validator['return_date']);
            $token = uniqid();

            $reservation = Reservation::create([
                'token' => $token,
                'pickup_date' => $initDate,
                'return_date' =>  $endDate,
                'pickup_place' => $validator['pickup_place'],
                'return_place' => $validator['return_place'],
                'flight' => $validator['flight'],
                'price' => $validator['price'],
                'car_id' => $validator['car_id'],
                'client_id' => $client->id,
            ]);

            $car = Car::find($validator['car_id']);
            $interval = DateInterval::createFromDateString('1 day');
            $period = new DatePeriod($initDate, $interval, $endDate);

            foreach ($period as $dt) {
                BlockDate::create([
                    "date" => $dt,
                    "level_id" => $car->level->id
                ]);
            }

            $reservation->extras()->attach($validator["extras"]);
            $reservation->drivers()->attach($drivers);
            HandleReservation::dispatch($reservation);
            Mail::to($validator['email'])->queue(new ConfirmationEmail($reservation->token));
            DB::commit();

            return new ReservationResource($reservation);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'errors' => $th
            ], 422);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function show(Reservation $reservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Reservation $reservation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reservation $reservation)
    {
        $reservation->delete();

        return response()->json(null, 204);
    }
}
