<?php

namespace App\Http\Controllers;

use App\Models\BlockDate;
use App\Models\Level;
use Illuminate\Http\Request;

class BlockDateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $level = Level::find($request->level_id);
        $treshold = $level->cars()->count();
        $counter = [];
        $blocked = [];
        $dates = BlockDate::where('level_id', $level->id)->get();

        foreach ($dates as $date) {

            if (!array_key_exists($date->date, $counter)) {
                $counter[$date->date] = 1;
            } else {
                $counter[$date->date] += 1;
            }

            if ($counter[$date->date] >= $treshold) {
                array_push($blocked, $date->date);
            }
        }

        return $blocked;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
    public function destroy(BlockDate $blockDate)
    {
        //
    }
}
