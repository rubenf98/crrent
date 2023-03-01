<?php

namespace App\Http\Controllers;

use App\Http\Resources\BlockDateResource;
use App\Http\Resources\BlockPeriodResource;
use App\Models\BlockDate;
use App\Models\BlockPeriod;
use App\Models\Car;
use App\Models\CarCategory;
use App\Models\Level;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Symfony\Component\Console\Output\ConsoleOutput;

class BlockDateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return BlockDateResource::collection(BlockDate::where('level_id', null)->where('reservation_id', null)->paginate(5));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function selector(Request $request)
    {
        $times = [];
        $blocked = [];

        if ($request->car && $request->car != "undefined") {
            $car = Car::find($request->car);

            $dates = BlockDate::where('car_id', $car->id)->get();

            foreach ($dates as $date) {
                if ($date->time) {
                    array_push($times, ["time" => $date->time, "operator" => $date->operator]);
                } else {
                    array_push($blocked, $date->date);
                }
            }
        } else if ($request->carCategory && $request->carCategory != "undefined") {
            $carCategory = CarCategory::find($request->carCategory);

            $dates = BlockDate::where('car_category_id', $carCategory->id)->get();
            $treshold = $carCategory->cars()->where('status', true)->count();
            $counter = [];
            $timeHistory = [];
            $indexes = [];
            $deleteKeys = [];

            foreach ($dates as $date) {
                if (!array_key_exists($date->date, $counter)) {
                    $counter[$date->date] = 1;
                } else {
                    $counter[$date->date] += 1;
                }

                if ($counter[$date->date] >= $treshold) {
                    array_push($blocked, $date->date);
                }

                if (!$date->time) {
                    if (!array_key_exists($date->date, $counter)) {
                        $counter[$date->date] = 1;
                    } else {
                        $counter[$date->date] += 1;
                    }
                } else {
                    if (!array_key_exists($date->reservation_id, $timeHistory)) {
                        array_push($indexes, $date->reservation_id);
                        $timeHistory[$date->reservation_id] = [$date->time];
                    } else {
                        array_push($timeHistory[$date->reservation_id], $date->time);
                    }
                }
            }

            foreach ($blocked as $blockedKey => $date) {
                $formattedDate = Carbon::parse($date);
                foreach ($indexes as $index) {
                    foreach ($timeHistory[$index] as $key => $value) {
                        $formattedValue = Carbon::parse($value);

                        if ($formattedDate->isSameDay($formattedValue)) {

                            if (!in_array($blockedKey, $deleteKeys)) {
                                array_push($deleteKeys, $blockedKey);
                            }


                            $hasNewTime = true;

                            foreach ($times as $newKey => $time) {
                                $formattedTime = Carbon::parse($time['time']);

                                if ($formattedTime->isSameDay($formattedValue)) {
                                    $hasNewTime = false;
                                    if ($key == 0) {
                                        if ($formattedValue->isAfter($formattedTime)) {
                                            $times[$newKey] = ["time" => $value, "operator" => ">"];
                                        }
                                    } else {
                                        if ($formattedValue->isBefore($formattedTime)) {
                                            $times[$newKey] = ["time" => $value, "operator" => "<"];
                                        }
                                    }
                                }
                            }

                            if ($hasNewTime) {
                                array_push($times, ["time" => $value, "operator" => $key == 0 ? ">" : "<"]);
                            }
                        }
                    }
                }
            }
        }


        foreach ($deleteKeys as $key) {
            unset($blocked[$key]);
        }

        return [
            'dates' => array_values($blocked),
            'times' => $times,
        ];
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
        $data = [];
        $car = Car::find($request->car_id);

        foreach ($period as $date) {
            $blockedDate = BlockDate::create([
                'date' => $date->format('Y-m-d'),
                'car_id' => $car->id,
                'car_category_id' => $car->car_category_id,
                'notes' => $request->notes ? $request->notes : null
            ]);

            array_push($data, $blockedDate->id);
        }
        return BlockDateResource::collection(BlockDate::whereIn('id', $data)->get());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\BlockDate  $blockDate
     * @return \Illuminate\Http\Response
     */
    public function show(BlockDate $blockDate)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\BlockDate  $blockDate
     * @return \Illuminate\Http\Response
     */
    public function edit(BlockDate $blockDate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\BlockDate  $blockDate
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BlockDate $blockDate)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BlockDate  $blockDate
     * @return \Illuminate\Http\Response
     */
    public function destroy(BlockDate $blockedDate)
    {
        $blockedDate->delete();

        return response()->json(null, 204);
    }
}
