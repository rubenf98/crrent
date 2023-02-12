<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Cerbero\QueryFilters\FiltersRecords;
use Illuminate\Database\Eloquent\Model;


class Car extends Model
{
    use HasFactory;
    use FiltersRecords;

    protected $fillable = ['kms', 'registration', 'car_category_id', 'status'];


    protected $casts = [
        'status' => 'boolean',
    ];

    public function level()
    {
        return $this->belongsTo(Level::class);
    }

    public function getAvailability($from, $to)
    {
        $startDate = Carbon::parse($from)->startOfDay();
        $endDate = Carbon::parse($to)->endOfDay();

        $response = [];
        $blockedDates = BlockDate::whereBetween('date', [$startDate, $endDate])->where('car_id', $this->id)->get();

        while ($startDate <= $endDate) {
            $hasReservation = [
                'color' => 'green',
                'type' => 'clear',
            ];

            foreach ($blockedDates as $blockedDate) {
                if ($startDate->eq($blockedDate->date)) {
                    $reservation = Reservation::with('client')->with('car.category')->find($blockedDate->reservation_id);
                    if ($reservation) {
                        $color = "orange";
                        $pickup = Carbon::parse($reservation->pickup_date)->startOfDay();
                        $return = Carbon::parse($reservation->return_date)->startOfDay();
                        if ($pickup->eq($startDate) || $return->eq($startDate)) {
                            $color = "red";
                        }
                        $hasReservation = [
                            'color' => $reservation->status == "pendente" ? $color : "red",
                            'type' => 'reservation',
                            'content' => $reservation
                        ];
                    } else {
                        $hasReservation = [
                            'color' => 'red',
                            'type' => 'other',
                            'content' => $blockedDate->notes
                        ];
                    }
                }
            }

            array_push($response, $hasReservation);
            $startDate->addDay();
        }

        return $response;
        // $reservations = Reservation::where('car_id', $this->id)
        //     ->where(function ($query) use ($startDate, $endDate) {
        //         $query->whereBetween('pickup_date', [$startDate, $endDate])
        //             ->orWhereBetween('return_date', [$startDate, $endDate]);
        //     })
        //     ->get();

        // while ($startDate <= $endDate) {
        //     $hasReservation = 0;
        //     foreach ($reservations as $reservation) {
        //         $min = Carbon::parse($reservation->pickup_date)->startOfDay();
        //         $max = Carbon::parse($reservation->return_date)->endOfDay();
        //         if ($startDate->between($min, $max)) {
        //             $hasReservation = [
        //                 'color' => 'red',
        //                 'type' => 'reservation',
        //                 'reservation' => $reservation->client()->first()
        //             ];
        //         }
        //     }

        //     array_push($response, $hasReservation);

        //     $startDate->addDay();
        // }

        // return $response;
    }

    public function blockedDates()
    {
        return $this->hasMany(BlockedCar::class);
    }

    public function category()
    {
        return $this->belongsTo(CarCategory::class, 'car_category_id');
    }
}
