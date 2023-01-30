<?php

namespace App\QueryFilters;

use Cerbero\QueryFilters\QueryFilters;

/**
 * Filter records based on query parameters.
 *
 */
class LevelFilters extends QueryFilters
{
    public function name($string)
    {
        $this->query->where('name', 'like', '%' . $string . '%');
    }

    public function code($string)
    {
        $this->query->where('code', $string);
    }
}
