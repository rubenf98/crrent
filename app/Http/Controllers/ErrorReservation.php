<?php

namespace App\Http\Controllers;

use App\Mail\ErrorEmail;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ErrorReservation extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $reservation = Reservation::where('token', $request->token)->firstOrFail();
        // $reservation->generateDoc();
        if ($reservation) {
            Mail::to("info@cr-rent.com")->queue(new ErrorEmail($reservation->created_at, $reservation->id, $reservation->token));
        }
        // Mail::to("jrubenf98@gmail.com")->queue(new ReservationEmail($reservation->token, $reservation->pickup_date, $reservation->return_date, $reservation->carPref->title));

    }
}
