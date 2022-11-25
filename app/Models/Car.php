<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Cerbero\QueryFilters\FiltersRecords;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;
    use FiltersRecords;

    public function level()
    {
        return $this->belongsTo(Level::class);
    }
}
