<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Constants\DailyReportConstants;

class RepeatSubmitDailyReportRequest extends FormRequest
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
        $startWorkTypeArray = array_values(array_map(function ($type) {
            return $type['value'];
        }, DailyReportConstants::START_WORK_TYPE));

        $endWorkTypeArray = array_values(array_map(function ($type) {
            return $type['value'];
        }, DailyReportConstants::END_WORK_TYPE));

        $scoreOptionArray = array_values(array_map(function ($option) {
            return $option['value'];
        }, DailyReportConstants::SCORE_OPTION));

        return [
            'startWorkType' => [
                'required',
                'string',
                Rule::in($startWorkTypeArray),
            ],
            'endWorkType' => [
                'required',
                'string',
                Rule::in($endWorkTypeArray),
            ],
            'attendanceMemo' => [
                'nullable',
                'string',
                'max:1000',
            ],
            'firstPeriod' => [
                'required',
                'string',
                'max:1000',
            ],
            'secondPeriod' => [
                'required',
                'string',
                'max:1000',
            ],
            'thirdPeriod' => [
                'required',
                'string',
                'max:1000',
            ],
            'fourthPeriod' => [
                'required',
                'string',
                'max:1000',
            ],
            'fifthPeriod' => [
                'nullable',
                'string',
                'max:1000',
            ],
            'comment' => [
                'required',
                'string',
                'max:1000',
            ],
            'nextSchedule' => [
                'required',
                'string',
                'max:1000',
            ],
            'mentalConditionScore' => [
                'required',
                'string',
                Rule::in($scoreOptionArray),
            ],
            'physicalConditionScore' => [
                'required',
                'string',
                Rule::in($scoreOptionArray),
            ],
        ];
    }

    public function messages()
    {
        return [
            'startWorkType.required' => '朝礼（10:00）は必須です。',
            'startWorkType.string' => '朝礼（10:00）は文字列で入力してください。',
            'startWorkType.in' => '朝礼（10:00）の値が不正です。',
            'endWorkType.required' => '終礼（15:20）は必須です。',
            'endWorkType.string' => '終礼（15:20）は文字列で入力してください。',
            'endWorkType.in' => '終礼（15:20）の値が不正です。',
            'attendanceMemo.string' => 'この入力項目は文字列で入力してください。',
            'attendanceMemo.max' => 'この入力項目は:max文字以内で入力してください。',
            'firstPeriod.required' => 'この入力項目は必須です。',
            'firstPeriod.string' => 'この入力項目は文字列で入力してください。',
            'firstPeriod.max' => 'この入力項目は:max文字以内で入力してください。',
            'secondPeriod.required' => 'この入力項目は必須です。',
            'secondPeriod.string' => 'この入力項目は文字列で入力してください。',
            'secondPeriod.max' => 'この入力項目は:max文字以内で入力してください。',
            'thirdPeriod.required' => 'この入力項目は必須です。',
            'thirdPeriod.string' => 'この入力項目は文字列で入力してください。',
            'thirdPeriod.max' => 'この入力項目は:max文字以内で入力してください。',
            'fourthPeriod.required' => 'この入力項目は必須です。',
            'fourthPeriod.string' => 'この入力項目は文字列で入力してください。',
            'fourthPeriod.max' => 'この入力項目は:max文字以内で入力してください。',
            'fifthPeriod.string' => 'この入力項目は文字列で入力してください。',
            'fifthPeriod.max' => 'この入力項目は:max文字以内で入力してください。',
            'comment.required' => 'この入力項目は必須です。',
            'comment.string' => 'この入力項目は文字列で入力してください。',
            'comment.max' => 'この入力項目は:max文字以内で入力してください。',
            'nextSchedule.required' => 'この入力項目は必須です。',
            'nextSchedule.string' => 'この入力項目は文字列で入力してください。',
            'nextSchedule.max' => 'この入力項目は:max文字以内で入力してください。',
            'mentalConditionScore.required' => '心の調子は必須です。',
            'mentalConditionScore.string' => '心の調子は文字列で入力してください。',
            'mentalConditionScore.in' => '心の調子の値が不正です。',
            'physicalConditionScore.required' => '体の調子は必須です。',
            'physicalConditionScore.string' => '体の調子は文字列で入力してください。',
            'physicalConditionScore.in' => '体の調子の値が不正です。',
        ];
    }
}
