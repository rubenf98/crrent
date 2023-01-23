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

        foreach ($cars as $car) {
            $isBlocked = false;
            foreach ($period as $dt) {

                $isFilled = BlockDate::where('date', $dt->format("Y-m-d"))->where('car_id', $car->id)->count();

                if ($isFilled) {
                    $isBlocked = true;
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
