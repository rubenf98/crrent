<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Cerbero\QueryFilters\FiltersRecords;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Car extends Model
{
    use HasFactory;
    use FiltersRecords;
    use HasTranslations;

    protected $fillable = ['car', 'air', 'registration', 'description', 'doors', 'gas', 'level_id', 'people', 'shift_mode', 'subtitle', 'title'];


    protected $casts = [
        'air' => 'integer',
        'status' => 'boolean',
    ];

    public $translatable = ['description'];

    public function level()
    {
        return $this->belongsTo(Level::class);
    }

    public function getAvailability($from, $to)
    {
        $startDate = Carbon::parse($from)->startOfDay();
        $endDate = Carbon::parse($to)->endOfDay();
        $cars = Car::where('title', $this->title)->pluck('id');

        $response = [];
        $reservations = Reservation::whereIn('car_pref_id', $cars)
            ->where(function ($query) use ($startDate, $endDate) {
                $query->whereBetween('pickup_date', [$startDate, $endDate])
                    ->orWhereBetween('return_date', [$startDate, $endDate]);
            })
            ->get();

        while ($startDate <= $endDate) {
            $hasReservation = 0;
            foreach ($reservations as $reservation) {
                $min = Carbon::parse($reservation->pickup_date)->startOfDay();
                $max = Carbon::parse($reservation->return_date)->endOfDay();
                if ($startDate->between($min, $max)) {
                    $hasReservation++;
                }
            }

            array_push($response, $hasReservation);

            $startDate->addDay();
        }

        return $response;
    }

    public function blockedDates()
    {
        return $this->hasMany(BlockedCar::class);
    }
}
