<?php

namespace App\Http\Controllers;

use App\Http\Resources\BlockedCarResource;
use App\Models\BlockedCar;
use App\QueryFilters\BlockedCarFilters;
use Illuminate\Http\Request;

class BlockedCarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(BlockedCarFilters $filters)
    {
        return BlockedCarResource::collection(BlockedCar::filterBy($filters)->with('car')->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $record = BlockedCar::create([
            'from' => $request->dates[0],
            'to' => $request->dates[1],
            'car_id' => $request->car_id,
        ]);

        return new BlockedCarResource($record);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\BlockedCar  $blockedCar
     * @return \Illuminate\Http\Response
     */
    public function show(BlockedCar $blockedCar)
    {
        return new BlockedCarResource($blockedCar);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\BlockedCar  $blockedCar
     * @return \Illuminate\Http\Response
     */
    public function edit(BlockedCar $blockedCar)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\BlockedCar  $blockedCar
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BlockedCar $blockedCar)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BlockedCar  $blockedCar
     * @return \Illuminate\Http\Response
     */
    public function destroy(BlockedCar $blockedCar)
    {
        $blockedCar->delete();



        return response()->json(null, 204);
    }
}
