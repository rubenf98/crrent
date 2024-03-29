<?php

namespace App\Http\Controllers;

use App\Http\Resources\AgencyResource;
use App\Models\Agency;
use App\Models\LogRecord;
use Illuminate\Http\Request;

class AgencyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AgencyResource::collection(Agency::with('reservations')->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($request->has('name')) {


            $agency = Agency::create([
                'name' => $request->name
            ]);

            LogRecord::create([
                'user_id' => auth()->user()->id,
                'description' => "criou a agência " . $agency->id
            ]);
        }

        return new AgencyResource($agency);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Agency  $agency
     * @return \Illuminate\Http\Response
     */
    public function show(Agency $agency)
    {
        return new AgencyResource($agency);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Agency  $agency
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Agency $agency)
    {
        if ($request->has('name')) {
            $agency->update([
                'name' => $request->name
            ]);

            LogRecord::create([
                'user_id' => auth()->user()->id,
                'description' => "atualizou a agência " . $agency->id
            ]);
        }

        return new AgencyResource($agency);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Agency  $agency
     * @return \Illuminate\Http\Response
     */
    public function destroy(Agency $agency)
    {

        LogRecord::create([
            'user_id' => auth()->user()->id,
            'description' => "apagou a agência " . $agency->id
        ]);
        $agency->delete();

        return response()->json(null, 204);
    }
}
