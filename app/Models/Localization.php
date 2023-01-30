<?php

namespace App\Models;

use Cerbero\QueryFilters\FiltersRecords;
use Spatie\Translatable\HasTranslations;
use Illuminate\Database\Eloquent\Model;

class Localization extends Model
{
    use HasTranslations, FiltersRecords;

    public $translatable = ['name'];
    protected $fillable = [
        'name',
        'price',
        'visible',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'visible' => 'integer',
    ];

    public function reservations()
    {
        return $this->belongsToMany(Reservation::class, 'reservation_has_localizations')->withPivot('price');
    }
}
