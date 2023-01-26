<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use App\QueryFilters\ReservationFilters;
use Carbon\Carbon;

class GetReservationArchive extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(ReservationFilters $filters)
    {
        return ReservationResource::collection(Reservation::filterBy($filters)
            ->where('pickup_date', '<', Carbon::now()->startOfDay())
            ->with("car.category")->with('client')->with('drivers')->with('extras')->paginate(5));
    }
}
