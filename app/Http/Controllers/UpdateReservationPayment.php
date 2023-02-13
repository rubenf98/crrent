<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UpdateReservationPayment extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke($id, Request $request)
    {
        $reservation = Reservation::find($id);
        if ($request->status) {
            if ($request->status == "pendente") {
                $reservation->payed_at = null;
            } else if ($request->status == "pago") {
                $reservation->payed_at = Carbon::now();
            }
            $reservation->save();
        }

        return new ReservationResource($reservation);
    }
}
