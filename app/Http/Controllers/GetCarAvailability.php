<?php

namespace App\Http\Controllers;

use App\Http\Resources\CarAvailabilityResource;
use App\Models\Car;
use Illuminate\Http\Request;

class GetCarAvailability extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        return CarAvailabilityResource::collection(Car::where('status', true)->whereNotNull('registration')->orderBy('id')->groupBy('title')->get());
    }
}
