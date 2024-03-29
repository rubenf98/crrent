<?php

namespace App\Http\Controllers;

use App\Http\Resources\ComissionResource;
use App\Models\Comission;
use App\Models\LogRecord;
use Illuminate\Http\Request;

class ComissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Comission $comission)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Comission $comission)
    {
        if ($request->has('status')) {
            $comission->paid = $request->status;
            $comission->save();
        }
        LogRecord::create([
            'user_id' => auth()->user()->id,
            'description' => "atualizou o estado da comissão " . $comission->id
        ]);
        return new ComissionResource($comission);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comission $comission)
    {
        //
    }
}
