<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
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
            'rent_contract' => $this->rent_contract,
            'payment_method' => $this->payment_method,
            'pickup_date' => $this->pickup_date,
            'return_date' => $this->return_date,
            'pickup_place' => $this->pickup_place,
            'return_place' => $this->return_place,
            'token' => $this->token,
            'flight' => $this->flight,
            'local_address' => $this->address,
            'price' => $this->price,
            'insurance' => $this->insurance,
            'car_price' => $this->car_price,
            'car_price_per_day' => $this->car_price_per_day,
            'days' => $this->days,
            'notes' => $this->notes,
            'checkin' => $this->checkin,
            'checkout' => $this->checkout,
            'client' => $this->client,
            'current_status' => $this->current_status,
            'car' => $this->car()->with('category')->first(),
            'drivers' => $this->drivers,
            'card_id' => $this->card_id,
            'extras' => $this->extras,
            'localizations' => $this->localizations,
            'comission' => $this->comission()->with('agency')->first(),
            'status' => $this->status,
            'kms_pickup' => $this->kms_pickup,
            'kms_return' => $this->kms_return,
            'gas_pickup' => $this->gas_pickup,
            'gas_return' => $this->gas_return,
            'confirmed_at' => $this->confirmed_at,
            'payed_at' => $this->payed_at,
            'created_at' => (string) $this->created_at,
        ];
    }
}
