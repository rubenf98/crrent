<?php

namespace App\QueryFilters;

use Cerbero\QueryFilters\QueryFilters;

/**
 * Filter records based on query parameters.
 *
 */
class CarCategoryFilters extends QueryFilters
{
    public function name($string)
    {
        $this->query->where('title', 'like', '%' . $string . '%');
    }

    public function level($string)
    {
        $this->query->whereHas('level', function ($query) use ($string) {
            $query->where('code', $string)
                ->orWhere('name', 'like', '%' . $string . '%');
        });
    }
}
