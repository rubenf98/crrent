<?php

namespace App\Http\Requests;

use App\Models\Car;
use App\Models\CarCategory;
use App\Models\Extra;
use App\Models\Insurance;
use App\Models\Localization;
use App\Models\Promotion;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Support\Facades\Log;
use LVR\CreditCard\CardCvc;
use LVR\CreditCard\CardNumber;
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
        $carCategory = CarCategory::find($this->car_category_id);

        $from = Carbon::parse($this->date[0]);
        $now = Carbon::parse($this->date[1]);
        $out = new ConsoleOutput();
        $days = Reservation::getNumDays($from, $now);
        $car = $carCategory->getAvailableCar($from, $now);
        $out->writeln($days);
        // $out = new ConsoleOutput();

        $value = 0;
        // $out->writeln($days);

        $promotions = Promotion::all();

        $prices = $carCategory->level->prices;
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

        // $out->writeln($factors);
        foreach ($prices as $index => $price) {
            if ($days >= $price->min && $days <= $price->max) {
                $value = $price->price;
            }
        }

        $prices = array_fill(0, $days, $value);
        // $out->writeln($prices);
        $carPrice = 0;


        foreach ($prices as $index => $price) {
            $carPrice += $price * $factors[$index];
        }

        // $out->writeln($carPrice);
        $extraPrice = 0;
        $extras = Extra::findMany($this->extras);
        // $out->writeln($extras);
        foreach ($extras as $extra) {
            if ($extra->type == "day") {
                $extraPrice += $days * $extra->price;
            } else {
                $extraPrice += $extra->price;
            }
        }

        // $out->writeln($extraPrice);

        $insurance = Insurance::find($this->insurance_id);

        $localizations = Localization::whereIn('id', $this->localizations)->get();
        $localizationPrice = 0;

        foreach ($localizations as $localization) {
            $localizationPrice += $localization->price;
        }


        $this->merge([
            'pickup_date' => $this->date[0],
            'return_date' => $this->date[1],
            'price' => round(($carPrice + $extraPrice + $localizationPrice) + ($insurance->price * $days), 2),
            'days' => $days,
            'car_id' => $car ? $car->id : 0,
            'car_price' => round($carPrice, 2),
            'car_price_per_day' => round($value, 2)
        ]);
        // Log::alert("step 9");
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

            'pickup_date' => 'required|date|after:' . Carbon::now()->add(1, 'day')->startOfDay(),
            'return_date' => 'required|date|after:' . Carbon::now()->add(1, 'day')->startOfDay(),
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

            'localizations' => 'required|array|size:2',
            'localizations.*' => 'integer|exists:localizations,id',

            'drivers' => 'required|array|min:1',
            'drivers.*.name' => 'required|string',
            'drivers.*.birthday' => 'required|date|before:-21 years',
            'drivers.*.license' => 'required|string',
            'drivers.*.emission' => 'required|date|before:' . $this->pickup_date,
            'drivers.*.validity' => 'required|date|after:' . $this->return_date,
            'drivers.*.emission_place' => 'required|string',

            'payment_method' => 'required|integer',

            'card_number' => ['required_if:payment_method,2', new CardNumber],
            'card_validity' => 'required_if:payment_method,2|date|after:' . $this->return_date,
            'card_cvv' => ['required_if:payment_method,2', new CardCvc($this->card_number)],
        ];
    }

    public function messages()
    {
        return [
            'drivers.*.validity.after' => 'The drivers\' license validity should be after the rental date',
            'drivers.*.emission.before' => 'The drivers\' license emission should be before the rental date',
            'drivers.*.birthday.before' => 'Driver\'s should be at least 21 years old',
            'card_number.*' => 'Cartão inválido'
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
