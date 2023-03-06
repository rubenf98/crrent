<?php

namespace App\Http\Controllers;

use App\Http\Requests\CarCategoryRequest;
use App\Http\Resources\CarCategoryResource;
use App\Models\BlockDate;
use App\Models\CarCategory;
use App\Models\CarCharateristic;
use App\Models\CarHasCharateristic;
use App\Models\GlobalParameter;
use App\Models\LogRecord;
use App\QueryFilters\CarCategoryFilters;
use Carbon\Carbon;
use DateInterval;
use DatePeriod;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Console\Output\ConsoleOutput;

class CarCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(CarCategoryFilters $filters)
    {
        return CarCategoryResource::collection(CarCategory::filterBy($filters)->with('charateristics')->with('level')->with('cars')->paginate(10));
    }

    public function indexRemoteSelect(CarCategoryFilters $filters)
    {
        return CarCategoryResource::collection(CarCategory::filterBy($filters)->get());
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
            $carCategories = CarCategory::all();
            $begin = new DateTime($request->from);
            $end = new DateTime(Carbon::parse($request->to)->endOfDay());

            $interval = DateInterval::createFromDateString('1 day');
            $period = new DatePeriod($begin, $interval, $end);
            $out = new ConsoleOutput();
            foreach ($period as $dt) {
                $out->writeln($dt->format("Y-m-d"));
                foreach ($carCategories as $carCategory) {
                    $treshold = $carCategory->cars()->where('status', 1)->count();

                    if (!(Carbon::parse($request->from)->isSameDay(Carbon::parse($dt)) || Carbon::parse($request->to)->isSameDay(Carbon::parse($dt)))) {
                        $query = BlockDate::where('date', $dt->format("Y-m-d"))->where('car_category_id', $carCategory->id)->groupBy('car_id')->get();

                        $isFilled = count($query);

                        if ($isFilled >= $treshold) {
                            if (!in_array($carCategory->id, $blockedCars)) {
                                $out->writeln($carCategory->id);
                                $out->writeln($isFilled);
                                $out->writeln($treshold);
                                array_push($blockedCars, $carCategory->id);
                            }
                        }
                    } else {
                        $isFilled = BlockDate::where('date', $dt->format("Y-m-d"))->where('car_category_id', $carCategory->id)->where('time', '!=', null)->count();

                        if ($isFilled >= $treshold) {
                            if (!in_array($carCategory->id, $blockedCars)) {
                                $out->writeln($carCategory->id);
                                array_push($blockedCars, $carCategory->id);
                            }
                        } else {
                            $transactionDates = BlockDate::where('date', $dt->format("Y-m-d"))->where('car_category_id', $carCategory->id)->where('time', '!=', null)->get();

                            foreach ($transactionDates as $transactionDate) {
                                $fromDifference = Carbon::parse($transactionDate->time)->diffInMinutes($request->from, false);
                                $toDifference = Carbon::parse($transactionDate->time)->diffInMinutes($request->to, false);

                                if ($transactionDate->operator == "<") {

                                    if ($fromDifference < intval($reservation_difference->value)) {
                                        $isFilled++;
                                    }
                                } else {
                                    if ($toDifference + intval($reservation_difference->value) > 0) {
                                        $isFilled++;
                                    }
                                }
                            }

                            if ($isFilled >= $treshold) {
                                if (!in_array($carCategory->id, $blockedCars)) {
                                    array_push($blockedCars, $carCategory->id);
                                }
                            }
                        }
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
    public function store(CarCategoryRequest $request)
    {
        $validator = $request->validated();
        $imageName = time() . '.' . $request->image->extension();

        $request->file('image')->storeAs(
            'public/garage',
            $imageName
        );

        $validator['image'] = '/storage/garage/' . $imageName;

        $carCategory = CarCategory::create($validator);
        $array = ["gas", "people", "doors", "shift_mode", "air"];

        foreach ($array as $char) {
            $charateristic = CarCharateristic::where('name', $char)->first();

            CarHasCharateristic::create([
                "car_category_id" => $carCategory->id,
                "car_charateristic_id" => $charateristic->id,
                "value" => $validator[$char]
            ]);
        }
        LogRecord::create([
            'user_id' => auth()->user()->id,
            'description' => "criou a categoria de veículos " . $carCategory->id
        ]);
        return new CarCategoryResource($carCategory);
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
    public function update(CarCategoryRequest $request, CarCategory $carCategory)
    {
        $validator = $request->validated();

        if ($request->has("image")) {

            $imageName = time() . '.' . $request->image->extension();

            $request->file('image')->storeAs(
                'public/garage',
                $imageName
            );

            $validator['image'] = '/storage/garage/' . $imageName;
        }

        $carCategory->update($validator);

        $array = ["gas", "people", "doors", "shift_mode", "air"];

        foreach ($array as $char) {
            $charateristic = CarCharateristic::where('name', $char)->first();
            $carhaschar = CarHasCharateristic::where('car_category_id', $carCategory->id)->where('car_charateristic_id', $charateristic->id)->first();
            $carhaschar->value = $validator[$char];
            $carhaschar->save();
        }
        LogRecord::create([
            'user_id' => auth()->user()->id,
            'description' => "atualizou a categoria de veículos " . $carCategory->id
        ]);
        return new CarCategoryResource($carCategory);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CarCategory  $carCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy(CarCategory $carCategory)
    {
        LogRecord::create([
            'user_id' => auth()->user()->id,
            'description' => "apagou a categoria de veículos " . $carCategory->id
        ]);

        $carCategory->delete();

        return response()->json(null, 204);
    }
}
