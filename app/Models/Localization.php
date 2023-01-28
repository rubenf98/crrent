<?php

namespace App\Models;

use Spatie\Translatable\HasTranslations;
use Illuminate\Database\Eloquent\Model;

class Localization extends Model
{
    use HasTranslations;

    public $translatable = ['name'];
}
