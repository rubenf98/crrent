<?php

namespace App\QueryFilters;

use App\Models\Client;
use Carbon\Carbon;
use Cerbero\QueryFilters\QueryFilters;

/**
 * Filter records based on query parameters.
 *
 */
class ReservationFilters extends QueryFilters
{

    public function clientSorter($string)
    {
        $this->query->orderBy(
            Client::select('name')
                ->whereColumn('clients.id', 'reservations.client_id'),
            $string
        );
    }

    public function pickupdateSorter($string)
    {
        $this->query->orderBy('pickup_date', $string);
    }

    public function returndateSorter($string)
    {
        $this->query->orderBy('return_date', $string);
    }

    public function idSorter($string)
    {
        $this->query->orderBy('id', $string);
    }


    public function car($string)
    {
        $this->query->whereHas('car', function ($query) use ($string) {
            $query->where('registration', 'like', '%' . $string . '%')
                ->orWhereHas('category', function ($query) use ($string) {
                    $query->where('title', 'like', '%' . $string . '%');
                });
        });
    }

    public function dates($array)
    {
        // $startDate = Carbon::parse($array[0]);
        // $endDate = Carbon::parse($array[0]);

        $this->query->whereBetween('pickup_date', $array)->whereBetween('return_date', $array);
    }



    public function id($string)
    {
        $this->query->where('id', $string)
            ->orWhere('token', $string);
    }

    public function name($string)
    {
        $this->query->whereHas('client', function ($query) use ($string) {
            $query->where('name', 'like', '%' . $string . '%');
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

        $this->query->where([['pickup_date', '>=', $date]])->orWhere([['return_date', '>=', $date], ['status', 'confirmado']]);
    }

    public function before($string)
    {
        $date = Carbon::parse($string);

        $this->query->where('pickup_date', '<', $date);
    }
}
