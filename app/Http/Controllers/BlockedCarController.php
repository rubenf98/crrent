<?php

namespace App\Http\Controllers;

use App\Http\Resources\BlockedCarResource;
use App\Models\BlockDate;
use App\Models\BlockedCar;
use App\Models\Car;
use App\QueryFilters\BlockedCarFilters;
use Carbon\CarbonPeriod;
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
        return BlockedCarResource::collection(BlockedCar::filterBy($filters)->with('car.category')->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $period = CarbonPeriod::create($request->dates[0], $request->dates[1])->toArray();

        $notes = $request->notes;
        $car = Car::find($request->car_id);

        $record = BlockedCar::create([
            'from' => $request->dates[0],
            'to' => $request->dates[1],
            'car_id' => $request->car_id,
            'notes' => $notes ? $notes : null
        ]);

        foreach ($period as $date) {
            BlockDate::create([
                'date' => $date->format('Y-m-d'),
                'car_id' => $car->id,
                'car_category_id' => $car->car_category_id,
                'notes' => $notes ? $notes : null
            ]);
        }

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
        $period = CarbonPeriod::create($blockedCar->from, $blockedCar->to)->toArray();
        $car = $blockedCar->car;
        $ids = [];

        foreach ($period as $date) {
            $blockedDates = BlockDate::where('date', $date->format('Y-m-d'))->where('car_id', $car->id)->get();

            foreach ($blockedDates as $blockedDate) {
                array_push($ids, $blockedDate->id);
            }
        }


        BlockDate::destroy($ids);

        $blockedCar->delete();



        return response()->json(null, 204);
    }
}
