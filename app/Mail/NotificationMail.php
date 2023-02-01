<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $returns, $pickups;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($aPickups, $aReturns)
    {
        $this->pickups = $aPickups;
        $this->returns = $aReturns;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.notification')->subject('Resumo atividades');
    }
}
