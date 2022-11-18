<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReservationRequest;
use App\Http\Resources\ReservationResource;
use App\Models\Client;
use App\Models\Driver;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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

            $reservation = Reservation::create([
                'pickup_date' => Carbon::parse($validator['pickup_date']),
                'return_date' => Carbon::parse($validator['return_date']),
                'pickup_place' => $validator['pickup_place'],
                'return_place' => $validator['return_place'],
                'flight' => $validator['flight'],
                'price' => $validator['price'],
                'car_id' => $validator['car_id'],
                'client_id' => $client->id,
            ]);

            $reservation->extras()->attach($validator["extras"]);
            $reservation->drivers()->attach($drivers);
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
        //
    }
}
