<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use App\QueryFilters\ReservationFilters;
use Illuminate\Http\Request;

class GetReservationsPerMonthController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(ReservationFilters $filters)
    {
        return ReservationResource::collection(Reservation::filterBy($filters)->with("carPref")->with("car")->with('client')->with('drivers')->with('extras')->get());
    }
}
