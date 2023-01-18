<?php

namespace App\Http\Controllers;

use App\Http\Requests\CarRequest;
use App\Http\Requests\UpdateCarRequest;
use App\Http\Resources\CarResource;
use App\Models\BlockDate;
use App\Models\BlockedCar;
use App\Models\Car;
use App\Models\Level;
use App\QueryFilters\CarFilters;
use Carbon\Carbon;
use DateInterval;
use DatePeriod;
use DateTime;
use Illuminate\Http\Request;
use Symfony\Component\Console\Output\ConsoleOutput;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return CarResource::collection(Car::with('level')->paginate(10));
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
            $cars = Car::all();
            $begin = new DateTime($request->from);
            $end = new DateTime(Carbon::parse($request->to)->endOfDay());

            $interval = DateInterval::createFromDateString('1 day');
            $period = new DatePeriod($begin, $interval, $end);

            foreach ($period as $dt) {
                foreach ($cars as $car) {
                    $isFilled = BlockDate::where('date', $dt->format("Y-m-d"))->where('car_id', $car->id)->count();
                    if ($isFilled && !in_array($car->id, $blockedCars)) {
                        array_push($blockedCars, $car->id);
                    }
                }
            }
        }

        $filters = CarFilters::hydrate($request->query());

        return CarResource::collection(
            Car::filterBy($filters)
                ->whereNotIn('id', $blockedCars)->where('status', true)->with('level')
                ->where('visible', 1)->orderBy('level_id', 'asc')->groupBy('title')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CarRequest $request)
    {
        $validator = $request->validated();
        $record = Car::create($validator);

        return new CarResource($record);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Car  $car
     * @return \Illuminate\Http\Response
     */
    public function show(Car $car)
    {
        return new CarResource($car);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Car  $car
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCarRequest $request, Car $car)
    {
        $validator = $request->validated();

        $car->update($validator);

        return new CarResource($car);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Car  $car
     * @return \Illuminate\Http\Response
     */
    public function destroy(Car $car)
    {
        $car->delete();

        return response()->json(null, 204);
    }
}
