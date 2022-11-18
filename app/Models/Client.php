<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'cc', 'nif', 'address', 'country', 'postal_code', 'email', 'phone', 'local_address', 'company'];

    public function card()
    {
        return $this->hasOne(Card::class);
    }

    public static function store($validator)
    {
        $client = self::where('cc', $validator['cc'])->first();

        if ($client) {
            $client->update([
                'name' => $validator['name'],
                'cc' => $validator['cc'],
                'nif' => $validator['nif'],
                'address' => $validator['address'],
                'country' => $validator['country'],
                'postal_code' => $validator['postal_code'],
                'email' => $validator['email'],
                'phone' => $validator['phone'],
                'local_address' => $validator['local_address'],
                'company' => $validator['company'],
            ]);
        } else {
            $client = self::create([
                'name' => $validator['name'],
                'cc' => $validator['cc'],
                'nif' => $validator['nif'],
                'address' => $validator['address'],
                'country' => $validator['country'],
                'postal_code' => $validator['postal_code'],
                'email' => $validator['email'],
                'phone' => $validator['phone'],
                'local_address' => $validator['local_address'],
                'company' => $validator['company'],
            ]);
        }


        return $client;
    }
}
