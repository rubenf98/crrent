<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Insurance extends Model
{
    use HasTranslations;

    public $translatable = ['name', 'description', 'description_one', 'description_two', 'description_three'];

    protected $casts = [
        'price' => 'decimal:2',
    ];
}
