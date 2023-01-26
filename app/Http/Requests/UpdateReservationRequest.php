<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class UpdateReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'pickup_date' => 'required|date|after:' . Carbon::now()->addDay(),
            'return_date' => 'required|date|after:' . Carbon::now()->addDays(3),
            'pickup_place' => 'required|string',
            'return_place' => 'required|string',
            'flight' => 'nullable|string',
            'car_id' =>  'required|integer|exists:cars,id',
            'price' => 'required|numeric',
            'days' => 'required|integer|min:1',
            'car_price' => 'required|numeric',
            'car_price_per_day' => 'required|numeric',
            'address' => 'required|string',
            'notes' => 'nullable|string',

            'kms_pickup' => 'nullable|string',
            'kms_return' => 'nullable|string',
            'gas_pickup' => 'nullable|string',
            'gas_return' => 'nullable|string',

            'agency_name' => 'nullable|string',
            'agency_intermediary' => 'required_with:agency_name|string',
            'agency_comission' => 'required_with:agency_name|numeric',

            'extras' => 'nullable|array',
            'extras.*' => 'integer|exists:extras,id',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'errors' => $validator->errors()
        ], 422));
    }
}
