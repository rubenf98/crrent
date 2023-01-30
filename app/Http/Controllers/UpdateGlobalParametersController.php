<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateGlobalParametersRequest;
use App\Http\Resources\GlobalParameterResource;
use App\Models\GlobalParameter;

class UpdateGlobalParametersController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(UpdateGlobalParametersRequest $request)
    {
        $validator = $request->validated();
        $globalParameters = GlobalParameter::all();

        foreach ($globalParameters as $globalParameter) {
            $globalParameter->update([
                'name' => $globalParameter->name,
                'code' => $globalParameter->code,
                'value' => $validator[$globalParameter->code]
            ]);
        }

        return GlobalParameterResource::collection(GlobalParameter::all());
    }
}
