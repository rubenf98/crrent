<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comission extends Model
{
    use HasFactory;

    protected $fillable = ['intermediary', 'value', 'agency_id', 'paid'];
    protected $casts = [
        'paid' => 'integer',
    ];

    public function agency()
    {
        return $this->belongsTo(Agency::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
