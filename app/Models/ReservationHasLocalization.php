<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReservationHasLocalization extends Model
{
    use HasFactory;
    protected $fillable = [
        'reservation_id',
        'localization_id',
        'price',
    ];
}
