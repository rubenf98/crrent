<?php

namespace App\Http\Controllers;

use App\Http\Resources\CardResource;
use App\Mail\CardTokenMail;
use App\Models\Card;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class CardController extends Controller
{
    public function show($token)
    {
        $card = Card::where('token', $token)->first();
        if ($card) {
            $card->token = Card::getToken();
            $card->save();

            return new CardResource($card);
        } else {
            return null;
        }
    }

    public function sendEmail(Card $card)
    {
        Mail::to("info@cr-rent.com")->queue(new CardTokenMail($card->token));
        return $card;
    }
}
