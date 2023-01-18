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
            'visible' => (bool) $this->visible,
            'status' => (bool) $this->status,
            'level' => [
                'id' => $this->level->id,
                'code' => $this->level->code,
                'color' => $this->level->color,
                'prices' => $this->level->prices
            ],
            'description' => $this->getTranslations('description'),
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'gas' => $this->gas,
            'air' => $this->air,
            'people' => $this->people,
            'doors' => $this->doors,
            'shift_mode' => $this->shift_mode,
            'image' => $this->image,
        ];
    }
}
