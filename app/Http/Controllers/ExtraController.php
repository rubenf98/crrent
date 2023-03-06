<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExtraRequest;
use App\Http\Resources\ExtraResource;
use App\Models\Extra;
use App\Models\LogRecord;
use Illuminate\Http\Request;

class ExtraController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ExtraResource::collection(Extra::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ExtraRequest $request)
    {
        $validator = $request->validated();
        $extra = Extra::create([
            'name' => [
                'pt' => $validator['namept'],
                'en' => $validator['nameen'],
            ],
            'price' => $validator['price'],
            'type' => $validator['type'],
        ]);

        LogRecord::create([
            'user_id' => auth()->user()->id,
            'description' => "criou o extra " . $extra->id
        ]);

        return new ExtraResource($extra);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Extra  $extra
     * @return \Illuminate\Http\Response
     */
    public function show(Extra $extra)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Extra  $extra
     * @return \Illuminate\Http\Response
     */
    public function update(ExtraRequest $request, Extra $extra)
    {
        $validator = $request->validated();

        $extra->update($validator);

        LogRecord::create([
            'user_id' => auth()->user()->id,
            'description' => "atualizou o extra " . $extra->id
        ]);

        return new ExtraResource($extra);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Extra  $extra
     * @return \Illuminate\Http\Response
     */
    public function destroy(Extra $extra)
    {
        LogRecord::create([
            'user_id' => auth()->user()->id,
            'description' => "apagou o extra " . $extra->id
        ]);

        $extra->delete();

        return response()->json(null, 204);
    }
}
