<?php

namespace App\QueryFilters;

use Cerbero\QueryFilters\QueryFilters;

/**
 * Filter records based on query parameters.
 *
 */
class LocalizationFilters extends QueryFilters
{
    public function visible($int)
    {
        $this->query->where('visible', $int);
    }
}
