<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Extra extends Model
{
    use HasFactory;

    protected $fillable = [
        'price', 'type', 'price', 'name'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'visible' => 'integer',
    ];
}
