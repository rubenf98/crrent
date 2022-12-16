<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Http\Request;

class GetTodayReservationsController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $startDate =  Carbon::now()->startOfDay();
        $endDate = Carbon::now()->endOfDay();

        $pickup = ReservationResource::collection(Reservation::with("car")->with('client')->whereBetween('pickup_date', [$startDate, $endDate])->get());
        $return = ReservationResource::collection(Reservation::with("car")->with('client')->whereBetween('return_date', [$startDate, $endDate])->get());

        return response()->json([
            'pickup' => $pickup,
            'return' => $return,
        ]);
    }
}
