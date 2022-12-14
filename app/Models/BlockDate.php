<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlockDate extends Model
{
    protected $fillable = ['level_id', 'date', 'fill'];

    use HasFactory;

    public function level()
    {
        return $this->belongsTo(Level::class);
    }
}
