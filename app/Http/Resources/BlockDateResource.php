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
            'level_id' => $this->level_id,
            'date' => $this->date,
            'level' => [
                'id' => $this->level->id,
                'code' => $this->level->code,
                'name' => $this->level->name,
                'min_caution' => $this->level->min_caution
            ],
            'fill' => $this->fill,
            'created_at' => (string) $this->created_at,
        ];
    }
}
