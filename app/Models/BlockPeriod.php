<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlockPeriod extends Model
{
    use HasFactory;
    protected $fillable = ['from', 'to'];

    public function levels()
    {
        return $this->belongsToMany(Level::class, 'block_period_has_levels');
    }
}
