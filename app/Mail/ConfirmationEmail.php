<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ConfirmationEmail extends Mailable implements ShouldQueue
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
        return $this->view('emails.confirmation')->subject('Finish your reservation')->attach(storage_path("/app/" . $this->token . ".pdf"), [
            'as' => 'invoice_' . $this->token . '.pdf',
            'mime' => 'application/pdf',
        ]);
    }
}
