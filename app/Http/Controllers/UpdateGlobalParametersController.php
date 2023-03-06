<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateGlobalParametersRequest;
use App\Http\Resources\GlobalParameterResource;
use App\Models\GlobalParameter;
use App\Models\LogRecord;

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

        LogRecord::create([
            'user_id' => auth()->user()->id,
            'description' => "atualizou os parâmetros de configuração"
        ]);

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
