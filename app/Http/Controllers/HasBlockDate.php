<?php

namespace App\Http\Controllers;

use App\Http\Resources\BlockDateResource;
use App\Models\BlockDate;
use Carbon\Carbon;
use Illuminate\Http\Request;

class HasBlockDate extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $startDate =  Carbon::parse($request->start)->startOfDay();
        $endDate = Carbon::parse($request->end)->endOfDay();


        return BlockDateResource::collection(BlockDate::where('car_id', $request->car_id)
            ->whereBetween('date', [$startDate, $endDate])->get());
    }
}
