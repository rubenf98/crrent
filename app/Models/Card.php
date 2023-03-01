<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Symfony\Component\Console\Output\ConsoleOutput;

class Card extends Model
{
    use HasFactory;
    protected $fillable = ['number', 'validity', 'cvv', 'token'];
    protected $hidden = ['token'];


    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }

    public static function getToken()
    {
        return substr(md5(microtime()), rand(0, 26), 5);
    }

    public static function store($validator)
    {
        $ciphering = config('jwt.ciphering');
        $secret = config('jwt.secret');
        $vectorDecryption = config('jwt.decryption');
        $token = self::getToken();

        $continue = true;
        while ($continue) {
            if (self::where('token', $token)->count()) {
                $token = self::getToken();
                $continue = true;
            } else $continue = false;
        }

        // openssl_decrypt($teste, $ciphering, $secret, 0, $vectorDecryption)
        $card = self::create([
            'number' => openssl_encrypt($validator['card_number'], $ciphering,  $secret, 0, $vectorDecryption),
            'validity' => openssl_encrypt(Carbon::parse($validator['card_validity']), $ciphering, $secret, 0, $vectorDecryption),
            'cvv' => openssl_encrypt($validator['card_cvv'], $ciphering,  $secret, 0, $vectorDecryption),
            'token' => $token,
        ]);

        return $card;
    }
}
