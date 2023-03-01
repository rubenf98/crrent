<?php

namespace App\Http\Resources;

use App\Models\Card;
use Illuminate\Http\Resources\Json\JsonResource;

class CardResource extends JsonResource
{
    private $data;

    public function __construct(Card $resource)
    {
        $ciphering = config('jwt.ciphering');
        $secret = config('jwt.secret');
        $vectorDecryption = config('jwt.decryption');

        parent::__construct($resource);
        $this->data = [
            "number" => openssl_decrypt($this->number, $ciphering, $secret, 0, $vectorDecryption),
            "validity" => openssl_decrypt($this->validity, $ciphering, $secret, 0, $vectorDecryption),
            "cvv" => openssl_decrypt($this->cvv, $ciphering, $secret, 0, $vectorDecryption),
        ];
    }
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'number' => $this->data["number"],
            'validity' => $this->data["validity"],
            'cvv' => $this->data["cvv"],
        ];
    }
}
