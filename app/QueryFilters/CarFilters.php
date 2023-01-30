<?php

namespace App\QueryFilters;


use Cerbero\QueryFilters\QueryFilters;

/**
 * Filter records based on query parameters.
 *
 */
class CarFilters extends QueryFilters
{
    public function hasRegistration($bool)
    {
        if ($bool) {
            $this->query->whereNotNull('registration');
        } else $this->query;
    }

    public function registration($string)
    {
        $this->query->where('registration', 'like', '%' . $string . '%');
    }

    public function category($string)
    {
        $this->query->whereHas('category', function ($query) use ($string) {
            $query->where('title', 'like', '%' . $string . '%');
        });
    }

    public function level($string)
    {
        $this->query->whereHas('category', function ($query) use ($string) {
            $query->whereHas('level', function ($query) use ($string) {
                $query->where('code', $string)
                    ->orWhere('name', 'like', '%' . $string . '%');
            });
        });
    }
}
