<?php

namespace App\Http\Controllers;

use App\Http\Resources\GlobalParameterResource;
use App\Models\GlobalParameter;
use Illuminate\Http\Request;

class GlobalParameterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return GlobalParameterResource::collection(GlobalParameter::all());
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\GlobalParameter  $globalParameter
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, GlobalParameter $globalParameter)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GlobalParameter  $globalParameter
     * @return \Illuminate\Http\Response
     */
    public function destroy(GlobalParameter $globalParameter)
    {
        if ($globalParameter->can_be_deleted) {
            $globalParameter->delete();
        }
        return response()->json(null, 204);
    }
}
