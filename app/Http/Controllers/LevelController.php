<?php

namespace App\Http\Controllers;

use App\Http\Requests\LevelRequest;
use App\Http\Resources\LevelResource;
use App\Models\Level;
use App\Models\Price;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LevelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return LevelResource::collection(Level::with('prices')->get());
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(LevelRequest $request)
    {
        $validator = $request->validated();
        DB::beginTransaction();
        $record = Level::create($validator);

        foreach ($validator['prices'] as $price) {
            Price::create([
                'max' => $price['max'],
                'min' => $price['min'],
                'price' => $price['price'],
                'level_id' => $record->id,
            ]);
        }

        DB::commit();

        return new LevelResource($record);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Car  $car
     * @return \Illuminate\Http\Response
     */
    public function show(Level $car)
    {
        return new LevelResource($car);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Car  $car
     * @return \Illuminate\Http\Response
     */
    public function update(LevelRequest $request, Level $level)
    {
        $validator = $request->validated();

        $level->update($validator);

        return new LevelResource($level);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Level  $car
     * @return \Illuminate\Http\Response
     */
    public function destroy(Level $level)
    {
        $level->delete();

        return response()->json(null, 204);
    }
}
