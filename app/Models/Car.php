<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Cerbero\QueryFilters\FiltersRecords;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Car extends Model
{
    use HasFactory;
    use FiltersRecords;
    use HasTranslations;

    protected $fillable = ['car', 'air', 'registration', 'description', 'doors', 'gas', 'level_id', 'people', 'shift_mode', 'subtitle', 'title'];


    protected $casts = [
        'air' => 'integer',
        'status' => 'boolean',
    ];

    public $translatable = ['description'];

    public function level()
    {
        return $this->belongsTo(Level::class);
    }
}
