<?php

namespace App\Http\Controllers;

use App\Http\Requests\CarRequest;
use App\Http\Requests\UpdateCarRequest;
use App\Http\Resources\CarResource;
use App\Models\BlockDate;
use App\Models\Car;
use App\Models\Level;
use App\QueryFilters\CarFilters;
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
        $blockedLevels = [];

        if ($request->from && $request->to) {
            $begin = new DateTime($request->from);
            $end = new DateTime($request->to);

            $interval = DateInterval::createFromDateString('1 day');
            $period = new DatePeriod($begin, $interval, $end);

            foreach ($period as $dt) {
                $levels = Level::all();

                foreach ($levels as $level) {
                    $n = BlockDate::where('date', $dt->format("Y-m-d"))->where('level_id', $level->id)->count();
                    $cars = $level->cars()->count();
                    if ($n >= $cars) {
                        array_push($blockedLevels, $level->id);
                    }
                }
            }
        }
        $filters = CarFilters::hydrate($request->query());

        return CarResource::collection(Car::filterBy($filters)->where('status', true)->with('level')->whereHas('level', function ($query) use ($blockedLevels) {
            $query->whereNotIn('id', $blockedLevels);
        })->where('visible', 1)->orderBy('level_id', 'asc')->get());
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
