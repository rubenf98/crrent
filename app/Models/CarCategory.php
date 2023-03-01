<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;
use Cerbero\QueryFilters\FiltersRecords;
use DateInterval;
use DatePeriod;
use DateTime;

class CarCategory extends Model
{
    use HasTranslations, FiltersRecords;

    protected $fillable = ['description', 'level_id', 'title', 'image'];
    public $translatable = ['description'];

    public function getAvailableCar($from, $to)
    {
        $begin = new DateTime($from);
        $end = new DateTime(Carbon::parse($to)->endOfDay());
        $interval = DateInterval::createFromDateString('1 day');
        $period = new DatePeriod($begin, $interval, $end);
        $cars = $this->cars;
        $reservation_difference = GlobalParameter::where('code', 'reservation_difference')->first();

        foreach ($cars as $car) {
            $isBlocked = false;
            
            foreach ($period as $dt) {
                $isFilled = BlockDate::where('date', $dt->format("Y-m-d"))->where('car_id', $car->id)->where('time', null)->count();

                if ($isFilled) {
                    $isBlocked = true;
                } else {
                    $transactionDates = BlockDate::where('date', $dt->format("Y-m-d"))->where('car_id', $car->id)->where('time', '!=', null)->get();

                    foreach ($transactionDates as $transactionDate) {
                        $fromDifference = Carbon::parse($transactionDate->time)->diffInMinutes($from, false);
                        $toDifference = Carbon::parse($transactionDate->time)->diffInMinutes($to, false);

                        if ($transactionDate->operator == "<") {
                            if ($fromDifference < intval($reservation_difference->value)) {
                                $isBlocked = true;
                            }
                        } else {
                            if ($toDifference + intval($reservation_difference->value) > 0) {
                                $isBlocked = true;
                            }
                        }
                    }
                }
            }

            if (!$isBlocked) {
                return $car;
            }
        }
    }

    public function level()
    {
        return $this->belongsTo(Level::class);
    }

    public function cars()
    {
        return $this->hasMany(Car::class);
    }

    public function charateristics()
    {
        return $this->belongsToMany(CarCharateristic::class, 'car_has_charateristics')->withPivot('value');
    }
}
