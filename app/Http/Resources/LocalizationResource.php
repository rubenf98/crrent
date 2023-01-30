<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LocalizationResource extends JsonResource
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
            'name' => $this->getTranslations('name'),
            'price' => floatval($this->price),
            'visible' => $this->visible,
        ];
    }
}
