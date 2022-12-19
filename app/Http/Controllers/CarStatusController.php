<?php

namespace App\Http\Controllers;

use App\Http\Resources\CarResource;
use App\Models\Car;
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

        if ($request->has('visible')) {
            $car->visible = $request->visible;
        }

        $car->save();

        return new CarResource($car);
    }
}
