<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationResource;
use App\Models\BlockDate;
use App\Models\Reservation;
use Carbon\Carbon;
use DateInterval;
use DatePeriod;
use Illuminate\Http\Request;

class UpdateReservationStatus extends Controller
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
        if ($reservation->status != $request->status) {
            if (($reservation->status == "pendente" || $reservation->status == "confirmado") && $request->status == "cancelado") {
                $blockedDates = BlockDate::where('reservation_id', $reservation->id)->get();
                $comission = $reservation->comission;
                $comission->cancelled = true;
                $comission->save();
                foreach ($blockedDates as $blockedDate) {
                    $blockedDate->delete();
                }
            } else if ($reservation->status == "cancelado" && ($request->status == "pendente" || $request->status == "confirmado")) {
                $interval = DateInterval::createFromDateString('1 day');
                $period = new DatePeriod(
                    Carbon::parse($reservation->pickup_date)->startOfDay(),
                    $interval,
                    Carbon::parse($reservation->return_date)->endOfDay()
                );

                foreach ($period as $dt) {
                    BlockDate::create([
                        "date" => $dt,
                        "car_id" => $reservation->car_id,
                        "car_category_id" => $reservation->car->car_category_id,
                        "reservation_id" => $reservation->id
                    ]);
                }

                $comission = $reservation->comission;
                $comission->cancelled = false;
                $comission->save();
            }

            $reservation->status = $request->status;
            $reservation->save();
        }

        return new ReservationResource($reservation);
    }
}
