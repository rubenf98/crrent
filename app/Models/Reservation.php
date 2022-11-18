<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = ['pickup_date', 'return_date', 'pickup_place', 'return_place', 'flight', 'price', 'car_id', 'client_id'];

    use HasFactory;

    public function extras()
    {
        return $this->belongsToMany(Extra::class, 'reservation_has_extras');
    }

    public function drivers()
    {
        return $this->belongsToMany(Driver::class, 'reservation_has_drivers');
    }
}
