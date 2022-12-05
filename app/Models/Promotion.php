<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    protected $fillable = ['start', 'end', 'value', 'factor'];

    protected $casts = [
        'factor' => 'decimal:2',
    ];
    use HasFactory;
}
