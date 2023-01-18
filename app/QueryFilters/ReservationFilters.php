<?php

namespace App\QueryFilters;

use Carbon\Carbon;
use Cerbero\QueryFilters\QueryFilters;

/**
 * Filter records based on query parameters.
 *
 */
class ReservationFilters extends QueryFilters
{
    public function dates($array)
    {
        // $startDate = Carbon::parse($array[0]);
        // $endDate = Carbon::parse($array[0]);

        $this->query->whereBetween('pickup_date', $array)->orWhereBetween('return_date', $array);
    }

    public function id($string)
    {
        $this->query->where('id', $string)
            ->orWhere('token', $string);
    }

    public function name($string)
    {
        $this->query->whereHas('client', function ($query) use ($string) {
            $query->where('name', $string);
        });
    }

    public function date($string)
    {
        $dates = [Carbon::parse($string)->startOfDay(), Carbon::parse($string)->endOfDay()];

        $this->query->whereBetween('pickup_date', $dates)->orWhereBetween('return_date', $dates);
    }

    public function after($string)
    {
        $date = Carbon::parse($string);

        $this->query->where('pickup_date', '>=', $date);
    }

    public function before($string)
    {
        $date = Carbon::parse($string);

        $this->query->where('pickup_date', '<', $date);
    }
}
