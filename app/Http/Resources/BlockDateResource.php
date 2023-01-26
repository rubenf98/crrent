<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BlockDateResource extends JsonResource
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
            'car' => $this->car->with('category')->get(),
            'car_category_id' => $this->car_category_id,
            'date' => $this->date,
            'level' => $this->level,
            'created_at' => (string) $this->created_at,
        ];
    }
}
