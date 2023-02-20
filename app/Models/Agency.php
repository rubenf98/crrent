<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agency extends Model
{
    use HasFactory;
    protected $fillable = ['name'];
    protected $appends = ['comissionStatus'];

    public function getComissionStatusAttribute()
    {
        $comissions = $this->comissions;

        $response = [
            "paid" => 0,
            "pending" => 0,
            "cancelled" => 0,
        ];

        foreach ($comissions as $comission) {
            if ($comission->paid) {
                $response["paid"] += $comission->value;
            } else {
                if (!$comission->cancelled) {
                    $response["pending"] += $comission->value;
                } else {
                    $response["cancelled"] += 1;
                }
            }
        }

        return $response;
    }


    public function reservations()
    {
        return $this->hasManyThrough(Reservation::class, Comission::class);
    }

    public function comissions()
    {
        return $this->hasMany(Comission::class);
    }
}
