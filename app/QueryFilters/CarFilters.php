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
}
