<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Member;

class StoreMemberRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:10'],
            'kana' => ['required', 'string', 'regex:/^[ぁ-ゖー０-９ー\x{3000}]+$/u', 'max:255'],
            'email' => 'required|string|lowercase|email|max:255|unique:'.Member::class,
            'affiliation' => ['nullable', 'string', 'exists:users,id'],
        ];
    }

    public function messages()
    {
        return [
            'kana.regex' => 'かなは、ひらがなと全角スペース、全角数字のみで入力してください。',
            'affiliation.exists' => '指定された所属事業所は無効です。',
        ];
    }
}
