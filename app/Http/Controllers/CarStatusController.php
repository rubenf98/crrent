<?php

namespace App\Http\Controllers;

use App\Http\Resources\CarResource;
use App\Models\Car;
use App\Models\LogRecord;
use Illuminate\Http\Request;

class CarStatusController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, Car $car)
    {
        if ($request->has('status')) {
            $car->status = $request->status;
        }

        $car->save();

        LogRecord::create([
            'user_id' => auth()->user()->id,
            'description' => "atualizou o estado do veículo " . $car->id
        ]);

        return new CarResource($car);
    }
}
