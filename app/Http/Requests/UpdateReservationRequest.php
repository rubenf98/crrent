<?php

namespace App\Http\Requests;

use App\Models\Extra;
use App\Models\Insurance;
use App\Models\Localization;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use Symfony\Component\Console\Output\ConsoleOutput;

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

    protected function prepareForValidation()
    {
        $days = $this->days;

        $out = new ConsoleOutput();
        // $out->writeln($prices);
        $carPrice = $this->car_price_per_day * $days;
        $out->writeln($carPrice);

        $extraPrice = 0;
        $extras = Extra::findMany($this->extras);

        foreach ($extras as $extra) {
            if ($extra->type == "day") {
                $extraPrice += $days * $extra->price;
            } else {
                $extraPrice += $extra->price;
            }
        }

        $insurance = Insurance::find($this->insurance_id);
        $pickup_localization = Localization::find($this->localizations_0);
        $return_localization = Localization::find($this->localizations_1);
        $localizationPrice = $pickup_localization->price + $return_localization->price;

        $this->merge([
            'localizations' => [$this->localizations_0, $this->localizations_1],
            'paid' => $this->paid ? 1 : 0,
            'price' => round(($carPrice + $extraPrice + $localizationPrice) + ($insurance->price * $days), 2),
            'days' => $days,
            'car_price' => round($carPrice, 2),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'pickup_date' => 'required|date',
            'return_date' => 'required|date|after:' . Carbon::parse($this->pickup_date),
            'pickup_place' => 'required|string',
            'return_place' => 'required|string',
            'flight' => 'nullable|string',
            'car_id' =>  'required|integer|exists:cars,id',
            'insurance_id' =>  'required|integer|exists:insurances,id',
            'price' => 'required|numeric',
            'days' => 'required|integer|min:1',
            'car_price' => 'required|numeric',
            'car_price_per_day' => 'required|numeric',
            'local_address' => 'required|string',
            'notes' => 'nullable|string',
            'payment_method' => 'nullable|string',

            'kms_pickup' => 'nullable|string',
            'kms_return' => 'nullable|string',
            'gas_pickup' => 'nullable|string',
            'gas_return' => 'nullable|string',

            'agency_id' => 'nullable|integer|exists:agencies,id',
            'intermediary' => 'required_with:agency_id|string',
            'value' => 'required_with:agency_id|numeric',
            'paid' => 'required_with:agency_id|integer',

            'checkin' => 'nullable|date',
            'checkout' => 'nullable|date',

            'extras' => 'nullable|array',
            'extras.*' => 'integer|exists:extras,id',

            'localizations_0' => 'required|exists:localizations,id',
            'localizations_1' => 'required|exists:localizations,id',

            'drivers' => 'nullable|array',
            'drivers.*.name' => 'nullable|string',
            'drivers.*.birthday' => 'nullable|date',
            'drivers.*.license' => 'nullable|string',
            'drivers.*.emission' => 'nullable|date',
            'drivers.*.validity' => 'nullable|date',
            'drivers.*.emission_place' => 'nullable|string',

            'name' => 'required|string',
            'cc' => 'required|string',
            'nif' => 'nullable|string',
            'address' => 'nullable|string',
            'country' => 'nullable|string',
            'postal_code' => 'nullable|string',
            'email' => 'required|string',
            'phone' => 'required|string',
            'client_notes' => 'nullable|string',
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
