<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agency extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'comission'];

    public function reservations()
    {
        return $this->hasManyThrough(Reservation::class, Comission::class);
    }

    public function comissions()
    {
        return $this->hasMany(Comission::class);
    }
}
