<?php

namespace App\Models;

use Cerbero\QueryFilters\FiltersRecords;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    use HasFactory, FiltersRecords;
    protected $fillable = ["name", "code", "color"];

    public function cars()
    {
        return $this->hasManyThrough(Car::class, CarCategory::class);
    }

    public function prices()
    {
        return $this->hasMany(Price::class);
    }
}
