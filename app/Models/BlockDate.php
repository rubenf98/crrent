<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlockDate extends Model
{
    protected $fillable = ['car_id', 'date', 'notes', 'reservation_id', 'car_category_id', 'level_id'];

    use HasFactory;

    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }

    public function level()
    {
        return $this->belongsTo(Level::class);
    }
}
