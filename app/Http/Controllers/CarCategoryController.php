<?php

namespace App\Http\Controllers;

use App\Http\Resources\CarCategoryResource;
use App\Models\BlockDate;
use App\Models\CarCategory;
use Carbon\Carbon;
use DateInterval;
use DatePeriod;
use DateTime;
use Illuminate\Http\Request;

class CarCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CarCategoryResource::collection(CarCategory::with('charateristics')->with('level')->with('cars')->paginate(10));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function selector(Request $request)
    {
        $blockedCars = [];

        if ($request->from && $request->to) {
            $carCategories = CarCategory::all();
            $begin = new DateTime($request->from);
            $end = new DateTime(Carbon::parse($request->to)->endOfDay());

            $interval = DateInterval::createFromDateString('1 day');
            $period = new DatePeriod($begin, $interval, $end);

            foreach ($period as $dt) {
                foreach ($carCategories as $carCategory) {
                    $treshold = $carCategory->cars()->count();
                    $isFilled = BlockDate::where('date', $dt->format("Y-m-d"))->where('car_category_id', $carCategory->id)->count();

                    if ($isFilled >= $treshold && !in_array($carCategory->id, $blockedCars)) {
                        array_push($blockedCars, $carCategory->id);
                    }
                }
            }
        }

        return CarCategoryResource::collection(
            CarCategory::whereNotIn('id', $blockedCars)->with('level')
                ->orderBy('level_id', 'asc')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CarCategory $carCategory)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CarCategory  $carCategory
     * @return \Illuminate\Http\Response
     */
    public function show(CarCategory $carCategory)
    {
        return new CarCategoryResource($carCategory);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CarCategory  $carCategory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CarCategory $carCategory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CarCategory  $carCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy(CarCategory $carCategory)
    {
        //
    }
}
