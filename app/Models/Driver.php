<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    protected $fillable = ['name', 'birthday', 'license', 'emission', 'validity', 'emission_place'];
    use HasFactory;

    public static function store($validator)
    {
        $drivers = [];

        foreach ($validator['drivers'] as $driverData) {
            $driver = Driver::create([
                'name' => $driverData['name'],
                'birthday' => Carbon::parse($driverData['birthday']),
                'license' => $driverData['license'],
                'emission' => Carbon::parse($driverData['emission']),
                'validity' => Carbon::parse($driverData['validity']),
                'emission_place' => $driverData['emission_place'],
            ]);
            array_push($drivers, $driver->id);
        }

        return $drivers;
    }
}
