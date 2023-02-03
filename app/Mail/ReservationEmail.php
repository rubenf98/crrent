<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReservationEmail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $token;
    public $fromDate;
    public $toDate;
    public $car;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($aToken, $aFrom, $aTo, $aCar)
    {
        $this->car = $aCar;
        $this->token = $aToken;
        $this->fromDate = $aFrom;
        $this->toDate = $aTo;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        return $this->view('emails.reservation')
            ->subject('Nova reserva CR Rent')
            ->attach(storage_path("/app/" . $this->token . ".pdf"), [
                'as' => $this->token . '.pdf',
                'mime' => 'application/pdf',
            ])->attach(storage_path("/app/invoice_" . $this->token . ".pdf"), [
                'as' => 'reservation_details.pdf',
                'mime' => 'application/pdf',
            ]);
    }
}
