<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    protected $fillable = ['start', 'end', 'value', 'factor', 'priority'];

    protected $casts = [
        'factor' => 'decimal:2',
        'priority' => 'integer',
    ];

    public function levels()
    {
        return $this->belongsToMany(Level::class, 'promotion_has_levels');
    }
}
