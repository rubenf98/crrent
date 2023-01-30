<?php

namespace App\Http\Controllers;

use App\Http\Requests\LocalizationRequest;
use App\Http\Resources\LocalizationResource;
use App\Models\Localization;
use App\QueryFilters\LocalizationFilters;
use Illuminate\Http\Request;

class LocalizationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(LocalizationFilters $filters)
    {
        return LocalizationResource::collection(Localization::filterBy($filters)->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(LocalizationRequest $request)
    {
        $validator = $request->validated();
        $record = Localization::create([
            'name' => [
                'pt' => $validator['namept'],
                'en' => $validator['nameen'],
            ],
            'price' => $validator['price'],
            'visible' => $validator['visible'],
        ]);

        return new LocalizationResource($record);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Localization  $localization
     * @return \Illuminate\Http\Response
     */
    public function show(Localization $localization)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Localization  $localization
     * @return \Illuminate\Http\Response
     */
    public function update(LocalizationRequest $request, Localization $localization)
    {
        $validator = $request->validated();
        $localization->update([
            'name' => [
                'pt' => $validator['namept'],
                'en' => $validator['nameen'],
            ],
            'price' => $validator['price'],
            'visible' => $validator['visible'],
        ]);

        return new LocalizationResource($localization);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Localization  $localization
     * @return \Illuminate\Http\Response
     */
    public function destroy(Localization $localization)
    {
        //
    }
}
