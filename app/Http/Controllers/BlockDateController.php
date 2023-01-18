<?php

namespace App\Http\Controllers;

use App\Http\Resources\BlockDateResource;
use App\Http\Resources\BlockPeriodResource;
use App\Models\BlockDate;
use App\Models\BlockPeriod;
use App\Models\Car;
use App\Models\Level;
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
        return BlockDateResource::collection(BlockDate::where('fill', true)->with('level')->paginate(5));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function selector(Request $request)
    {
        if ($request->car_id != "undefined") {
            $car = Car::find($request->car_id);

            $dates = BlockDate::where('car_id', $car->id)->get();
        }

        $blocked = [];


        foreach ($dates as $date) {
            array_push($blocked, $date->date);
            // if ($date->fill) {
            //     array_push($blocked, $date->date);
            // } else {
            //     if (!array_key_exists($date->date, $counter)) {
            //         $counter[$date->date] = 1;
            //     } else {
            //         $counter[$date->date] += 1;
            //     }

            //     if ($counter[$date->date] >= $treshold) {
            //         array_push($blocked, $date->date);
            //     }
            // }
        }

        return $blocked;
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
        $levels = $request->levels;
        $data = [];
        $levels_id = [];
        foreach ($levels as $id => $level) {
            if ($level) {
                array_push($levels_id, $id);
                foreach ($period as $date) {
                    $blockedDate = BlockDate::create([
                        'date' => $date->format('Y-m-d'),
                        'level_id' => $id,
                        'fill' => 1
                    ]);
                    array_push($data, $blockedDate);
                }
            }
        }

        $blockPeriod = BlockPeriod::create([
            'from' => $request->dates[0],
            'to' => $request->dates[1],
        ]);

        $blockPeriod->levels()->attach($levels_id);

        return new BlockPeriodResource($blockPeriod);
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
