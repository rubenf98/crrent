<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ProofEmail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $token;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($aToken)
    {
        $this->token = $aToken;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.proof')->subject('Thank you for your reservation')->attach(storage_path("/app/invoice_" . $this->token . ".pdf"), [
            'as' => 'reservation_details.pdf',
            'mime' => 'application/pdf',
        ]);
    }
}
