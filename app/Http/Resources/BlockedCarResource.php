<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BlockedCarResource extends JsonResource
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
            'from' => $this->from,
            'to' => $this->to,
            'car' => [
                'id' => $this->car->id,
                'registration' => $this->car->registration,
                'category' => $this->car->category
            ],
            'notes' => $this->notes,
            'created_at' => (string) $this->created_at,
        ];
    }
}
