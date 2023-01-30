<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FetchInvoicePdf extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {

        $headers = [
            'Content-Type' => 'application/pdf',
        ];

        return response()->download(storage_path("app/invoice_" . $request->token . '.pdf'), $request->token . '.pdf', $headers);
    }
}
