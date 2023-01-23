<?php

namespace App\Http\Controllers;

use App\Mail\ReservationEmail;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ConfirmReservation extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $reservation = Reservation::with('car')->where('token', $request->token)->firstOrFail();
        // $reservation->generateDoc();

        if (!$reservation->confirmed_at) {
            $reservation->confirmed_at = Carbon::now();
            $reservation->save();
            // Mail::to("jrubenf98@gmail.com")->queue(new ReservationEmail($reservation->token, $reservation->pickup_date, $reservation->return_date, $reservation->carPref->title));
            Mail::to("info@cr-rent.com")->queue(new ReservationEmail($reservation->token, $reservation->pickup_date, $reservation->return_date, $reservation->car->category->title));
        }
    }
}
