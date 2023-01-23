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
            'status' => (bool) $this->status,
            'category' => [
                'id' => $this->category->id,
                'title' => $this->category->title,
                'description' => $this->category->getTranslations('description'),
                'image' => $this->category->image,
                'prices' => $this->category->prices,
                'charateristics' => $this->category->charateristics,
                'level' => [
                    'id' => $this->category->level->id,
                    'code' => $this->category->level->code,
                    'color' => $this->category->level->color,
                    'prices' => $this->category->level->prices
                ],
            ],
            'kms' => $this->kms,
        ];
    }
}
