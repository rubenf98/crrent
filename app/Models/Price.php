<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Price extends Model
{
    use HasFactory;

    protected $fillable = [
        'max',
        'min',
        'price',
    ];

    protected $casts = [
        'max' => 'integer',
        'min' => 'integer',
        'price' => 'decimal:2',
    ];

    public function level()
    {
        return $this->belongsTo(Level::class);
    }
}
