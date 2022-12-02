<?php

namespace App\Http\Controllers;

use App\Http\Resources\BlockPeriodResource;
use App\Models\BlockDate;
use App\Models\BlockPeriod;
use Carbon\CarbonPeriod;
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
                $blockedDates = BlockDate::where('date', $date->format('Y-m-d'))->where('level_id', $level->id)->get();

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
