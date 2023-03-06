<?php

namespace App\Http\Controllers;

use App\Http\Requests\PromotionRequest;
use App\Http\Resources\PromotionResource;
use App\Models\Level;
use App\Models\LogRecord;
use App\Models\Promotion;
use Illuminate\Http\Request;

class PromotionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PromotionResource::collection(Promotion::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PromotionRequest $request)
    {
        $validator = $request->validated();
        $record = Promotion::create([
            'start' => $validator['dates'][0],
            'end' => $validator['dates'][1],
            'value' => $validator['value'],
            'factor' => $validator['factor'],
            'priority' =>  array_key_exists('priority', $validator) ?  $validator['priority'] : 1
        ]);

        LogRecord::create([
            'user_id' => auth()->user()->id,
            'description' => "criou uma nova entrada de preços percentuais nº " . $record->id
        ]);

        if ($request->has('levels')) {
            $levels = $request->levels;
            $levels_id = [];
            foreach ($levels as $id => $level) {
                if ($level) {
                    array_push($levels_id, $id);
                }
            }

            $record->levels()->attach($levels_id);
        }

        return new PromotionResource($record);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Promotion  $promotion
     * @return \Illuminate\Http\Response
     */
    public function show(Promotion $promotion)
    {
        return new PromotionResource($promotion);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Promotion  $promotion
     * @return \Illuminate\Http\Response
     */
    public function update(PromotionRequest $request, Promotion $promotion)
    {
        LogRecord::create([
            'user_id' => auth()->user()->id,
            'description' => "atualizou a entrada de preços percentuais " . $promotion->id
        ]);

        $validator = $request->validated();
        $promotion->update([
            'start' => $validator['dates'][0],
            'end' => $validator['dates'][1],
            'value' => $validator['value'],
            'factor' => $validator['factor'],
            'priority' =>  array_key_exists('priority', $validator) ?  $validator['priority'] : 1
        ]);

        $promotion->levels()->detach();
        if ($request->has('levels')) {
            $levels = $request->levels;
            $levels_id = [];
            foreach ($levels as $id => $level) {
                if ($level) {
                    array_push($levels_id, $id);
                }
            }

            $promotion->levels()->attach($levels_id);
        }

        return new PromotionResource($promotion);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Promotion  $promotion
     * @return \Illuminate\Http\Response
     */
    public function destroy(Promotion $promotion)
    {
        LogRecord::create([
            'user_id' => auth()->user()->id,
            'description' => "apagou a entrada de preços percentuais " . $promotion->id
        ]);
        $promotion->delete();

        return response()->json(null, 204);
    }
}
