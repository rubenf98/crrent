<?php

namespace App\Http\Requests;

use App\Models\Car;
use App\Models\Extra;
use App\Models\Promotion;
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

        $promotions = Promotion::all();


        // $out->writeln($level);
        $prices = $level->prices;
        $index = 0;
        $init = Carbon::parse($this->date[0]);
        $factors = [];
        while ($index < $days) {
            $factor = 1;
            foreach ($promotions as $promotion) {
                $min = Carbon::parse($promotion->start)->startOfDay();
                $max = Carbon::parse($promotion->end)->endOfDay();

                if ($init->between($min, $max)) {
                    $factor = $promotion->factor;
                }
            }

            array_push($factors, $factor);
            $init->addDay();
            $index++;
        }
        $out->writeln($factors);
        foreach ($prices as $index => $price) {
            if ($days >= $price->min && $days <= $price->max) {
                $value = $price->price;
            }
        }

        $prices = array_fill(0, $days, $value);
        $out->writeln($prices);
        $carPrice = 0;


        foreach ($prices as $index => $price) {
            $carPrice += $price * $factors[$index];
        }

        $out->writeln($carPrice);
        $extraPrice = 0;
        $extras = Extra::findMany($this->extras);
        $out->writeln($extras);
        foreach ($extras as $extra) {
            if ($extra->type == "day") {
                $extraPrice += $days * $extra->price;
            } else {
                $extraPrice += $extra->price;
            }
        }


        $out->writeln($extraPrice);


        $this->merge([
            'pickup_date' => $this->date[0],
            'return_date' => $this->date[1],
            'price' => ($carPrice + $extraPrice) + (15 * $days),
            'days' => $days,
            'car_price' => $carPrice,
            'car_price_per_day' => $value
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

            'pickup_date' => 'required|date|after:' . Carbon::now()->add(1, 'day'),
            'return_date' => 'required|date|after:' . Carbon::now()->add(3, 'day'),
            'pickup_place' => 'required|string',
            'return_place' => 'required|string',
            'flight' => 'required|string',
            'car_id' =>  'required|integer|exists:cars,id',
            'price' => 'required|numeric',
            'days' => 'required|integer|min:1',
            'car_price' => 'required|numeric',
            'car_price_per_day' => 'required|numeric',

            'extras' => 'nullable|array',
            'extras.*' => 'integer|exists:extras,id',

            'drivers' => 'required|array|min:1',
            'drivers.*.name' => 'required|string',
            'drivers.*.birthday' => 'required|date|before:-21 years',
            'drivers.*.license' => 'required|string',
            'drivers.*.emission' => 'required|date|before:' . $this->pickup_date,
            'drivers.*.validity' => 'required|date|after:' . $this->return_date,
            'drivers.*.emission_place' => 'required|string',
        ];
    }

    public function messages()
    {
        return [
            'drivers.*.validity.after' => 'The drivers\' license validity should be after the rental date',
            'drivers.*.emission.before' => 'The drivers\' license emission should be before the rental date',
            'drivers.*.birthday.before' => 'Driver\'s should be at least 21 years old',
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
