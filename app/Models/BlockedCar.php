<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cerbero\QueryFilters\FiltersRecords;

class BlockedCar extends Model
{
    use HasFactory, FiltersRecords;

    protected $fillable = ['from', 'to', 'car_id'];

    public function car()
    {
        return $this->belongsTo(Car::class);
    }
}
