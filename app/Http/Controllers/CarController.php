<?php

namespace App\Http\Controllers;

use App\Http\Requests\CarRequest;
use App\Http\Requests\UpdateCarRequest;
use App\Http\Resources\CarResource;
use App\Models\BlockDate;
use App\Models\BlockedCar;
use App\Models\Car;
use App\Models\CarCategory;
use App\Models\GlobalParameter;
use App\Models\Level;
use App\Models\LogRecord;
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
    public function index(CarFilters $filters)
    {
        return CarResource::collection(Car::filterBy($filters)->with('category')->paginate(10));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function selector(Request $request)
    {
        $blockedCars = [];
        $reservation_difference = GlobalParameter::where('code', 'reservation_difference')->first();

        if ($request->from && $request->to) {
            $cars = Car::all();
            $begin = new DateTime($request->from);
            $end = new DateTime(Carbon::parse($request->to)->endOfDay());

            $interval = DateInterval::createFromDateString('1 day');
            $period = new DatePeriod($begin, $interval, $end);
            $exclude = false;

            if ($request->exclude) {
                $exclude = $request->exclude;
            }


            foreach ($period as $dt) {
                foreach ($cars as $car) {
                    $isFilled = BlockDate::where('date', $dt->format("Y-m-d"))->where('car_id', $car->id)->where('time', null);

                    if ($exclude != false) {
                        $isFilled = $isFilled->where('reservation_id', "!=", $exclude)->count();
                    } else {
                        $isFilled = $isFilled->count();
                    }

                    if ($isFilled) {
                        if (!in_array($car->id, $blockedCars)) {
                            array_push($blockedCars, $car->id);
                        }
                    } else {
                        $transactionDates = BlockDate::where('date', $dt->format("Y-m-d"))->where('car_id', $car->id)->where('time', '!=', null);

                        if ($exclude != false) {
                            $transactionDates = $transactionDates->where('reservation_id', "!=", $exclude)->get();
                        } else {
                            $transactionDates = $transactionDates->get();
                        }


                        foreach ($transactionDates as $transactionDate) {
                            $fromDifference = Carbon::parse($transactionDate->time)->diffInMinutes($request->from, false);
                            $toDifference = Carbon::parse($transactionDate->time)->diffInMinutes($request->to, false);
                            if ($transactionDate->operator == "<") {

                                if ($fromDifference < intval($reservation_difference->value)) {
                                    array_push($blockedCars, $car->id);
                                }
                            } else {
                                if ($toDifference + intval($reservation_difference->value) > 0) {
                                    array_push($blockedCars, $car->id);
                                }
                            }
                        }
                    }
                }
            }
        }

        $filters = CarFilters::hydrate($request->query());

        return CarResource::collection(
            Car::filterBy($filters)
                ->whereNotIn('id', $blockedCars)->where('status', true)->with('category')
                ->get()
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

        LogRecord::create([
            'user_id' => auth()->user()->id,
            'description' => "criou o veículo " . $record->id
        ]);

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

        LogRecord::create([
            'user_id' => auth()->user()->id,
            'description' => "atualizou o veículo " . $car->id
        ]);

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
        LogRecord::create([
            'user_id' => auth()->user()->id,
            'description' => "apagou o veículo " . $car->id
        ]);
        $car->delete();

        return response()->json(null, 204);
    }
}
