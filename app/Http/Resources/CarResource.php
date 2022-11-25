<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CarResource extends JsonResource
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
            'registration' => $this->registration,
            'level' => [
                'id' => $this->level->id,
                'code' => $this->level->code,
                'prices' => $this->level->prices
            ],
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'gas' => $this->gas,
            'people' => $this->people,
            'doors' => $this->doors,
            'shift_mode' => $this->shift_mode,
            'image' => $this->image,
        ];
    }
}
