<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Database\Query\Builder;
use App\Constants\DailyReportConstants;

class InitialSaveDailyReportRequest extends FormRequest
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
        $memberId = Auth::guard('members')->id();

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
            'date' => [
                'required',
                'date_format:Y-m-d',
                Rule::unique('daily_reports')->where(function (Builder $query) use ($memberId) {
                    $query->where('member_id', $memberId);
                }),
            ],
            'startWorkType' => [
                'nullable',
                'string',
                Rule::in($startWorkTypeArray),
            ],
            'endWorkType' => [
                'nullable',
                'string',
                Rule::in($endWorkTypeArray),
            ],
            'attendanceMemo' => [
                'nullable',
                'string',
                'max:1000',
            ],
            'firstPeriod' => [
                'nullable',
                'string',
                'max:1000',
            ],
            'secondPeriod' => [
                'nullable',
                'string',
                'max:1000',
            ],
            'thirdPeriod' => [
                'nullable',
                'string',
                'max:1000',
            ],
            'fourthPeriod' => [
                'nullable',
                'string',
                'max:1000',
            ],
            'fifthPeriod' => [
                'nullable',
                'string',
                'max:1000',
            ],
            'comment' => [
                'nullable',
                'string',
                'max:1000',
            ],
            'nextSchedule' => [
                'nullable',
                'string',
                'max:1000',
            ],
            'mentalConditionScore' => [
                'nullable',
                'string',
                Rule::in($scoreOptionArray),
            ],
            'physicalConditionScore' => [
                'nullable',
                'string',
                Rule::in($scoreOptionArray),
            ],
        ];
    }

    public function messages()
    {
        return [
            'date.required' => '日付は必須です。',
            'date.date_format' => '日付の形式は yyyy-mm-dd にしてください。',
            'date.unique' => 'この日付の日報は既に存在しています。',
            'startWorkType.string' => '朝礼（10:00）は文字列で入力してください。',
            'startWorkType.in' => '朝礼（10:00）の値が不正です。',
            'endWorkType.string' => '終礼（15:20）は文字列で入力してください。',
            'endWorkType.in' => '終礼（15:20）の値が不正です。',
            'attendanceMemo.string' => 'この入力項目は文字列で入力してください。',
            'attendanceMemo.max' => 'この入力項目は:max文字以内で入力してください。',
            'firstPeriod.string' => 'この入力項目は文字列で入力してください。',
            'firstPeriod.max' => 'この入力項目は:max文字以内で入力してください。',
            'secondPeriod.string' => 'この入力項目は文字列で入力してください。',
            'secondPeriod.max' => 'この入力項目は:max文字以内で入力してください。',
            'thirdPeriod.string' => 'この入力項目は文字列で入力してください。',
            'thirdPeriod.max' => 'この入力項目は:max文字以内で入力してください。',
            'fourthPeriod.string' => 'この入力項目は文字列で入力してください。',
            'fourthPeriod.max' => 'この入力項目は:max文字以内で入力してください。',
            'fifthPeriod.string' => 'この入力項目は文字列で入力してください。',
            'fifthPeriod.max' => 'この入力項目は:max文字以内で入力してください。',
            'comment.string' => 'この入力項目は文字列で入力してください。',
            'comment.max' => 'この入力項目は:max文字以内で入力してください。',
            'nextSchedule.string' => 'この入力項目は文字列で入力してください。',
            'nextSchedule.max' => 'この入力項目は:max文字以内で入力してください。',
            'mentalConditionScore.string' => '心の調子は文字列で入力してください。',
            'mentalConditionScore.in' => '心の調子の値が不正です。',
            'physicalConditionScore.string' => '体の調子は文字列で入力してください。',
            'physicalConditionScore.in' => '体の調子の値が不正です。',
        ];
    }
}
