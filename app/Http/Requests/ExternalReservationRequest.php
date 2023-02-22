<?php

namespace App\Http\Requests;

use App\Models\Car;
use App\Models\Extra;
use App\Models\Insurance;
use App\Models\Localization;
use App\Models\Promotion;
use Carbon\Carbon;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\Console\Output\ConsoleOutput;

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
            'name' => 'required|string',
            'cc' => 'required|string',
            'nif' => 'nullable|string',
            'address' => 'nullable|string',
            'country' => 'nullable|string',
            'postal_code' => 'nullable|string',
            'email' => 'required|string',
            'phone' => 'required|string',
            'payment_method' => 'nullable|string',
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

            'checkin' => 'nullable|date',
            'checkout' => 'nullable|date',

            'current_status' => 'required|string',

            'extras' => 'nullable|array',
            'extras.*' => 'integer|exists:extras,id',

            'localizations' => 'required|array|size:2',
            'localizations.*' => 'integer|exists:localizations,id',

            'agency_id' => 'nullable|exists:agencies,id',
            'intermediary' => 'required_with:agency_id|string',
            'value' => 'required_with:agency_id|numeric',
            'paid' => 'required_with:agency_id|integer',

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
