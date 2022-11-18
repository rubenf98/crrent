<?php

namespace App\Http\Requests;

use App\Models\Car;
use App\Models\Extra;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use Symfony\Component\Console\Output\ConsoleOutput;

class ReservationRequest extends FormRequest
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
        $car = Car::find($this->car_id);
        $from = Carbon::parse($this->date[0]);
        $now = Carbon::parse($this->date[1]);
        $days = $from->diffInDays($now);
        $value = 0;

        $level = $car->level;
        $out = new ConsoleOutput();
        $out->writeln($days);


        $out->writeln($level);
        $prices = $level->prices;

        foreach ($prices as $price) {
            if ($days >= $price->min && $days <= $price->max) {
                $value = $days * $price->price;
            }
        }
        $out->writeln($value);

        $extras = Extra::findMany($this->extras);
        $out->writeln($extras);
        foreach ($extras as $extra) {
            if ($extra->type == "day") {
                $value += $days * $extra->price;
            } else {
                $value += $extra->price;
            }
        }


        $out->writeln($value);


        $this->merge([
            'pickup_date' => $this->date[0],
            'return_date' => $this->date[1],
            'price' => $value
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
            'nif' => 'required|string',
            'address' => 'required|string',
            'country' => 'required|string',
            'postal_code' => 'required|string',
            'email' => 'required|string',
            'phone' => 'required|string',
            'local_address' => 'required|string',
            'company' => 'required|string',

            'pickup_date' => 'required|date',
            'return_date' => 'required|date',
            'pickup_place' => 'required|string',
            'return_place' => 'required|string',
            'flight' => 'required|string',
            'car_id' =>  'required|integer|exists:cars,id',
            'price' => 'required|numeric',

            'extras' => 'required|array',
            'extras.*' => 'required|integer|exists:extras,id',

            'drivers' => 'required|array|min:1',
            'drivers.*.name' => 'required|string',
            'drivers.*.birthday' => 'required|date',
            'drivers.*.license' => 'required|string',
            'drivers.*.emission' => 'required|date',
            'drivers.*.validity' => 'required|date',
            'drivers.*.emission_place' => 'required|string',
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
