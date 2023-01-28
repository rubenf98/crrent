<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cerbero\QueryFilters\FiltersRecords;
use Illuminate\Support\Arr;

class Client extends Model
{
    use HasFactory, FiltersRecords;

    protected $fillable = ['notes', 'name', 'cc', 'nif', 'address', 'country', 'postal_code', 'email', 'phone', 'company'];

    public static function store($validator)
    {
        $client = self::where('cc', $validator['cc'])->first();

        if ($client) {
            $client->update([
                'name' => $validator['name'],
                'cc' => $validator['cc'],
                'nif' => Arr::get($validator, 'nif'),
                'address' => Arr::get($validator, 'address'),
                'country' => Arr::get($validator, 'country'),
                'postal_code' => Arr::get($validator, 'postal_code'),
                'email' => $validator['email'],
                'phone' => $validator['phone'],
                'notes' => Arr::get($validator, 'client_notes'),
            ]);
        } else {
            $client = self::create([
                'name' => $validator['name'],
                'cc' => $validator['cc'],
                'nif' => Arr::get($validator, 'nif'),
                'address' => Arr::get($validator, 'address'),
                'country' => Arr::get($validator, 'country'),
                'postal_code' => Arr::get($validator, 'postal_code'),
                'email' => $validator['email'],
                'phone' => $validator['phone'],
                'notes' => Arr::get($validator, 'client_notes'),
            ]);
        }

        return $client;
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
