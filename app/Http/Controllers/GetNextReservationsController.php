<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Http\Request;

class GetNextReservationsController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $startDate =  Carbon::now()->startOfDay()->addDay();
        $endDate = Carbon::now()->endOfDay()->addDays(5);

        return ReservationResource::collection(
            Reservation::with("car")->with("car.category")
                ->with('client')->orderBy('pickup_date', 'asc')
                ->whereBetween('pickup_date', [$startDate, $endDate])
                ->orWhereBetween('return_date', [$startDate, $endDate])->get()
        );
    }
}
