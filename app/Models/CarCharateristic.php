<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarCharateristic extends Model
{
    use HasFactory;
    protected $fillable = ['name'];

    public function cars()
    {
        return $this->belongsToMany(CarCharateristic::class, 'car_has_charateristics')->withPivot('value');
    }
}
