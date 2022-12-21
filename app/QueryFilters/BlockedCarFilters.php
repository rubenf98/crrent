<?php

namespace App\QueryFilters;

use Cerbero\QueryFilters\QueryFilters;

/**
 * Filter records based on query parameters.
 *
 */
class BlockedCarFilters extends QueryFilters
{
    public function car($id)
    {
        $this->query->where('car_id', $id);
    }
}
