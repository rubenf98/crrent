<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    use HasFactory;
    protected $fillable = ['number', 'validity', 'cvv'];


    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }

    public static function store($validator)
    {
        $card = self::create([
            'number' => bcrypt($validator['card_number']),
            'validity' => bcrypt(Carbon::parse($validator['card_validity'])),
            'cvv' => bcrypt($validator['card_cvv']),
        ]);

        return $card;
    }
}
