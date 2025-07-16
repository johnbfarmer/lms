<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProblemUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */

public function messages(): array
{
    return [
        'problem.problem_text.required' => 'A p is required',
        'problem.problem_text' => 'A p is required',
        'body.required' => 'A message is required',
    ];
}
}
