<?php

namespace App\Http\Controllers;

use App\Http\Requests\BlockPeriodRequest;
use App\Http\Resources\BlockPeriodResource;
use App\Models\BlockDate;
use App\Models\BlockPeriod;
use App\Models\Car;
use App\Models\Level;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use DateInterval;
use DatePeriod;
use Illuminate\Http\Request;

class BlockPeriodController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return BlockPeriodResource::collection(BlockPeriod::with('levels')->paginate(5));
    }

    public function selector(Request $request)
    {
        $dates = BlockPeriod::all();
        $blocked = [];


        foreach ($dates as $date) {
            $interval = DateInterval::createFromDateString('1 day');
            $period = new DatePeriod(Carbon::parse($date->from), $interval, Carbon::parse($date->to));

            foreach ($period as $dt) {
                array_push($blocked, $dt->toDateString());
            }
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
        $notes = $request->notes;
        $levels_id = [];
        foreach ($levels as $id => $level) {
            if ($level) {
                $levelObject = Level::find($id);
                $cars = $levelObject->cars()->get();
                array_push($levels_id, $id);
                foreach ($period as $date) {

                    foreach ($cars as $car) {
                        BlockDate::create([
                            'date' => $date->format('Y-m-d'),
                            'car_id' => $car->id,
                            'car_category_id' => $car->car_category_id,
                            'level_id' => $id,
                            'notes' => $notes ? $notes : null
                        ]);
                    }
                }
            }
        }

        $blockPeriod = BlockPeriod::create([
            'from' => $request->dates[0],
            'to' => $request->dates[1],
            'notes' => $notes ? $notes : null
        ]);

        $blockPeriod->levels()->attach($levels_id);

        return new BlockPeriodResource($blockPeriod);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\BlockPeriod  $blockPeriod
     * @return \Illuminate\Http\Response
     */
    public function show(BlockPeriod $blockPeriod)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\BlockPeriod  $blockPeriod
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BlockPeriod $blockPeriod)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BlockPeriod  $blockPeriod
     * @return \Illuminate\Http\Response
     */
    public function destroy(BlockPeriod $blockPeriod)
    {
        $period = CarbonPeriod::create($blockPeriod->from, $blockPeriod->to)->toArray();
        $levels = $blockPeriod->levels;
        $ids = [];
        foreach ($levels as $level) {
            foreach ($period as $date) {
                $blockedDates = BlockDate::where('date', $date->format('Y-m-d'))
                    ->where('level_id', $level->id)
                    ->where('reservation_id', null)
                    ->get();

                foreach ($blockedDates as $blockedDate) {
                    array_push($ids, $blockedDate->id);
                }
            }
        }

        BlockDate::destroy($ids);

        $blockPeriod->delete();



        return response()->json(null, 204);
    }
}
