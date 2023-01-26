<?php

namespace App\QueryFilters;

use Cerbero\QueryFilters\QueryFilters;

/**
 * Filter records based on query parameters.
 *
 */
class ClientFilters extends QueryFilters
{
    public function name($string)
    {
        $this->query->where('name', 'like', '%' . $string . '%');
    }
    public function id($int)
    {
        $this->query->where('id', $int);
    }

    public function email($string)
    {
        $this->query->where('email', 'like', '%' . $string . '%');
    }
}
