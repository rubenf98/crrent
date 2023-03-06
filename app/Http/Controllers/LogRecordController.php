<?php

namespace App\Http\Controllers;

use App\Http\Resources\LogRecordResource;
use App\Models\LogRecord;
use Illuminate\Http\Request;

class LogRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return LogRecordResource::collection(LogRecord::latest()->take(100)->with('user')->get());
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
     * @param  \App\Models\LogRecord  $logRecord
     * @return \Illuminate\Http\Response
     */
    public function show(LogRecord $logRecord)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\LogRecord  $logRecord
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, LogRecord $logRecord)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\LogRecord  $logRecord
     * @return \Illuminate\Http\Response
     */
    public function destroy(LogRecord $logRecord)
    {
        //
    }
}
