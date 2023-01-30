<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class CarCategoryRequest extends FormRequest
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

        $this->merge([
            'description' => [
                'en' => $this->descriptionen,
                'pt' => $this->descriptionpt,
            ],
            'air' => $this->air ? 1 : 0
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
            'title' => 'required|string',
            'level_id' => 'required|integer|exists:levels,id',
            'description' => 'nullable|array',
            'description.en' => 'required|string',
            'description.pt' => 'required|string',
            'air' => 'required|integer',
            'people' => 'required|integer',
            'doors' => 'required|integer',
            'shift_mode' => 'required|string',
            'gas' => 'required|string',
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
