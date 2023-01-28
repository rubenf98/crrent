<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ExternalReservationRequest extends FormRequest
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
            'name' => 'required|string',
            'cc' => 'required|string',
            'nif' => 'nullable|string',
            'address' => 'nullable|string',
            'country' => 'nullable|string',
            'postal_code' => 'nullable|string',
            'email' => 'required|string',
            'phone' => 'required|string',
            'client_notes' => 'nullable|string',

            'local_address' => 'required|string',
            'pickup_date' => 'required|date',
            'return_date' => 'required|date|after:' . Carbon::parse($this->pickup_date),
            'pickup_place' => 'required|string',
            'return_place' => 'required|string',
            'flight' => 'nullable|string',
            'car_id' =>  'required|integer|exists:cars,id',
            'insurance_id' => 'required|integer|exists:insurances,id',
            'price' => 'required|numeric',
            'days' => 'required|integer|min:1',
            'car_price' => 'required|numeric',
            'car_price_per_day' => 'required|numeric',

            'extras' => 'nullable|array',
            'extras.*' => 'integer|exists:extras,id',

            'agency_id' => 'nullable|exists:agencies,id',
            'intermediary' => 'required_with:agency_id|string',
            'value' => 'required_with:agency_id|string',

            'drivers' => 'nullable|array',
            'drivers.*.name' => 'nullable|string',
            'drivers.*.birthday' => 'nullable|date',
            'drivers.*.license' => 'nullable|string',
            'drivers.*.emission' => 'nullable|date',
            'drivers.*.validity' => 'nullable|date',
            'drivers.*.emission_place' => 'nullable|string',
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
