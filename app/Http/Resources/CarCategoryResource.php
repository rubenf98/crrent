<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CarCategoryResource extends JsonResource
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
            'level' => [
                'id' => $this->level->id,
                'code' => $this->level->code,
                'color' => $this->level->color,
                'prices' => $this->level->prices
            ],
            'available_cars' => $this->cars()->where('status', 1)->count(),
            'caution' => $this->level->min_caution,
            'charateristics' => $this->charateristics,
            'treshold' => $this->cars()->count(),
            'description' => $this->getTranslations('description'),
            'title' => $this->title,
            'image' => $this->image,
        ];
    }
}
