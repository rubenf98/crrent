<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Cerbero\QueryFilters\FiltersRecords;
use Illuminate\Database\Eloquent\Model;
use Symfony\Component\Console\Output\ConsoleOutput;

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

        $blockedDates = BlockDate::whereBetween('date', [$startDate, $endDate])->where('car_id', $this->id)->where('reservation_id', "!=", null)->get();
        $out = new ConsoleOutput();
        $reservationDates = [];
        foreach ($blockedDates as $blockedDate) {
            if (!array_key_exists($blockedDate->date, $reservationDates)) {
                $reservationDates[$blockedDate->date] = [$blockedDate->reservation_id];
            } else {
                if (!array_key_exists($blockedDate->reservation_id, $reservationDates[$blockedDate->date])) {
                    array_push($reservationDates[$blockedDate->date], $blockedDate->reservation_id);
                }
            }
        }

        $out->writeln(json_encode($reservationDates));


        while ($startDate <= $endDate) {
            $hasReservation = [
                'color' => 'green',
                'type' => 'clear',
            ];
            // $out->writeln($startDate);

            $blockedDates = BlockDate::where('date', $startDate->format('Y-m-d'))->where('car_id', $this->id)->get();
            foreach ($blockedDates as $blockedDate) {
                if (array_key_exists($blockedDate->date, $reservationDates) && $blockedDate->reservation_id) {
                    // $out->writeln("--");
                    // $out->writeln($blockedDate->date);
                    $reservations = Reservation::with('client')->with('car.category')->whereIn('id', $reservationDates[$blockedDate->date])->get();

                    $colors = [];
                    $types = [];

                    foreach ($reservations as $reservation) {
                        // $out->writeln($reservation->id);
                        $color = $reservation->status == "pendente" ? "orange" : "red";

                        $pickup = Carbon::parse($reservation->pickup_date)->startOfDay();
                        $return = Carbon::parse($reservation->return_date)->startOfDay();
                        if ($pickup->eq($startDate) || $return->eq($startDate)) {
                            $color = "black";
                        }

                        array_push($colors, $color);
                        array_push($types, 'reservation');
                    }

                    $hasReservation = [
                        'color' => $colors,
                        'type' => 'reservation',
                        'content' => $reservations
                    ];
                } else if ($startDate->isSameDay($blockedDate->date)) {
                    $out->writeln($blockedDate->date);
                    $hasReservation = [
                        'color' => 'red',
                        'type' => 'other',
                        'content' => $blockedDate->notes
                    ];
                }
            }



            array_push($response, $hasReservation);
            $startDate->addDay();
        }

        $out->writeln("-------------------------------");
        // return $reservationDates;
        return $response;
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
