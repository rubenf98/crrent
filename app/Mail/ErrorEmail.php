<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ErrorEmail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $token, $date, $id;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($aDate, $aId, $aToken)
    {
        $this->token = $aToken;
        $this->date = $aDate;
        $this->id = $aId;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.error')->subject('Problema na reserva - ' . $this->token);
    }
}
