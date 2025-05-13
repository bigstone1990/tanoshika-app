<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\DailyReport;
use App\Models\Member;
use App\Constants\DailyReportConstants;
use Illuminate\Validation\Rule;
use Illuminate\Database\Query\Builder;
use App\Http\Requests\InitialSaveDailyReportRequest;
use App\Http\Requests\InitialSubmitDailyReportRequest;
use App\Http\Requests\RepeatSaveDailyReportRequest;
use App\Http\Requests\RepeatSubmitDailyReportRequest;
use Carbon\Carbon;

class DailyReportController extends Controller
{
    public function index()
    {
        $memberId = Auth::guard('members')->id();

        $reports = DailyReport::select('id', 'date', 'submitted_at')
            ->where('member_id', $memberId)
            ->orderBy('date', 'desc')
            ->paginate(5);

        return Inertia::render('Member/DailyReport/Index', [
            'reports' => $reports,
        ]);
    }

    public function create()
    {
        $startWorkType = DailyReportConstants::START_WORK_TYPE;
        $endWorkType = DailyReportConstants::END_WORK_TYPE;
        $scoreOption = DailyReportConstants::SCORE_OPTION;

        return Inertia::render('Member/DailyReport/Create', [
            'startWorkType' => $startWorkType,
            'endWorkType' => $endWorkType,
            'scoreOption' => $scoreOption,
        ]);
    }

    public function validateStep(Request $request, int $step)
    {
        $memberId = Auth::guard('members')->id();
        
        $startWorkTypeArray = array_values(array_map(function ($type) {
            return $type['value'];
        }, DailyReportConstants::START_WORK_TYPE));
        
        $endWorkTypeArray = array_values(array_map(function ($type) {
            return $type['value'];
        }, DailyReportConstants::END_WORK_TYPE));

        $rules = match ($step) {
            1 => [
                'date' => [
                    'required',
                    'date_format:Y-m-d',
                    Rule::unique('daily_reports')->where(function (Builder $query) use ($memberId) {
                        $query->where('member_id', $memberId);
                    }),
                ],
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
            ],
            default => [],
        };

        $messages = [
            'date.required' => '日付は必須です。',
            'date.date_format' => '日付の形式は yyyy-mm-dd にしてください。',
            'date.unique' => 'この日付の日報は既に存在しています。',
            'startWorkType.required' => '朝礼（10:00）は必須です。',
            'startWorkType.string' => '朝礼（10:00）は文字列で入力してください。',
            'startWorkType.in' => '朝礼（10:00）の値が不正です。',
            'endWorkType.required' => '終礼（15:20）は必須です。',
            'endWorkType.string' => '終礼（15:20）は文字列で入力してください。',
            'endWorkType.in' => '終礼（15:20）の値が不正です。',
        ];

        $request->validate($rules, $messages);
    }

    public function initialSave(InitialSaveDailyReportRequest $request)
    {
        $memberId = Auth::guard('members')->id();

        $date = Carbon::parse($request->date)->format('Y-m-d');

        DailyReport::create([
            'member_id' => $memberId,
            'date' => $date,
            'start_work_type' => intval($request->startWorkType),
            'end_work_type' => intval($request->endWorkType),
            'attendance_memo' => $request->attendanceMemo,
            'first_period' => $request->firstPeriod,
            'second_period' => $request->secondPeriod,
            'third_period' => $request->thirdPeriod,
            'fourth_period' => $request->fourthPeriod,
            'fifth_period' => $request->fifthPeriod,
            'comment' => $request->comment,
            'next_schedule' => $request->nextSchedule,
            'mental_condition_score' => intval($request->mentalConditionScore),
            'physical_condition_score' => intval($request->physicalConditionScore),
            'submitted_at' => null,
        ]);

        return to_route('member.dailyReports.index')->with([
            'message' => '一時保存しました',
            'status' => 'success',
        ]);
    }

    public function initialSubmit(InitialSubmitDailyReportRequest $request)
    {
        $memberId = Auth::guard('members')->id();

        $date = Carbon::parse($request->date)->format('Y-m-d');
        $submitted_at = Carbon::now()->format('Y-m-d H:i:s');

        DailyReport::create([
            'member_id' => $memberId,
            'date' => $date,
            'start_work_type' => intval($request->startWorkType),
            'end_work_type' => intval($request->endWorkType),
            'attendance_memo' => $request->attendanceMemo,
            'first_period' => $request->firstPeriod,
            'second_period' => $request->secondPeriod,
            'third_period' => $request->thirdPeriod,
            'fourth_period' => $request->fourthPeriod,
            'fifth_period' => $request->fifthPeriod,
            'comment' => $request->comment,
            'next_schedule' => $request->nextSchedule,
            'mental_condition_score' => intval($request->mentalConditionScore),
            'physical_condition_score' => intval($request->physicalConditionScore),
            'submitted_at' => $submitted_at,
        ]);

        return to_route('member.dailyReports.index')->with([
            'message' => '提出しました',
            'status' => 'success',
        ]);
    }

    public function show(string $date)
    {
        $memberId = Auth::guard('members')->id();
        
        $report = DailyReport::select('id', 'member_id as memberId', 'date', 'start_work_type as startWorkType', 'end_work_type as endWorkType', 'attendance_memo as attendanceMemo', 'first_period as firstPeriod', 'second_period as secondPeriod', 'third_period as thirdPeriod', 'fourth_period as fourthPeriod', 'fifth_period as fifthPeriod', 'comment', 'next_schedule as nextSchedule', 'mental_condition_score as mentalConditionScore', 'physical_condition_score as physicalConditionScore', 'submitted_at as submittedAt')
            ->where('member_id', $memberId)
            ->where('date', $date)
            ->first();

        if (is_null($report)) {
            abort(404);
        }

        $startWorkType = DailyReportConstants::START_WORK_TYPE;
        $endWorkType = DailyReportConstants::END_WORK_TYPE;
        $scoreOption = DailyReportConstants::SCORE_OPTION;

        return Inertia::render('Member/DailyReport/Show', [
            'report' => $report,
            'startWorkType' => $startWorkType,
            'endWorkType' => $endWorkType,
            'scoreOption' => $scoreOption,
        ]);
    }

    public function edit(string $date)
    {
        $memberId = Auth::guard('members')->id();
        
        $report = DailyReport::select('date', 'start_work_type as startWorkType', 'end_work_type as endWorkType', 'attendance_memo as attendanceMemo', 'first_period as firstPeriod', 'second_period as secondPeriod', 'third_period as thirdPeriod', 'fourth_period as fourthPeriod', 'fifth_period as fifthPeriod', 'comment', 'next_schedule as nextSchedule', 'mental_condition_score as mentalConditionScore', 'physical_condition_score as physicalConditionScore')
            ->where('member_id', $memberId)
            ->where('date', $date)
            ->first();

        if (is_null($report)) {
            abort(404);
        }

        $startWorkType = DailyReportConstants::START_WORK_TYPE;
        $endWorkType = DailyReportConstants::END_WORK_TYPE;
        $scoreOption = DailyReportConstants::SCORE_OPTION;

        return Inertia::render('Member/DailyReport/Edit', [
            'report' => $report,
            'startWorkType' => $startWorkType,
            'endWorkType' => $endWorkType,
            'scoreOption' => $scoreOption,
        ]);
    }

    public function repeatValidateStep(Request $request, string $date, int $step)
    {
        $startWorkTypeArray = array_values(array_map(function ($type) {
            return $type['value'];
        }, DailyReportConstants::START_WORK_TYPE));
        
        $endWorkTypeArray = array_values(array_map(function ($type) {
            return $type['value'];
        }, DailyReportConstants::END_WORK_TYPE));

        $rules = match ($step) {
            1 => [
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
            ],
            default => [],
        };

        $messages = [
            'startWorkType.required' => '朝礼（10:00）は必須です。',
            'startWorkType.string' => '朝礼（10:00）は文字列で入力してください。',
            'startWorkType.in' => '朝礼（10:00）の値が不正です。',
            'endWorkType.required' => '終礼（15:20）は必須です。',
            'endWorkType.string' => '終礼（15:20）は文字列で入力してください。',
            'endWorkType.in' => '終礼（15:20）の値が不正です。',
        ];

        $request->validate($rules, $messages);
    }

    public function repeatSave(RepeatSaveDailyReportRequest $request, string $date)
    {
        $memberId = Auth::guard('members')->id();

        $dateFormat = Carbon::parse($date)->format('Y-m-d');

        $report = DailyReport::where('member_id', $memberId)->where('date', $date)->first();

        $report->start_work_type = intval($request->startWorkType);
        $report->end_work_type = intval($request->endWorkType);
        $report->attendance_memo = $request->attendanceMemo;
        $report->first_period = $request->firstPeriod;
        $report->second_period = $request->secondPeriod;
        $report->third_period = $request->thirdPeriod;
        $report->fourth_period = $request->fourthPeriod;
        $report->fifth_period = $request->fifthPeriod;
        $report->comment = $request->comment;
        $report->next_schedule = $request->nextSchedule;
        $report->mental_condition_score = intval($request->mentalConditionScore);
        $report->physical_condition_score = intval($request->physicalConditionScore);
        $report->submitted_at = null;

        $report->save();

        return to_route('member.dailyReports.show', ['date' => $dateFormat])->with([
            'message' => '一時保存しました',
            'status' => 'success',
        ]);
    }

    public function repeatSubmit(RepeatSubmitDailyReportRequest $request, string $date)
    {
        $memberId = Auth::guard('members')->id();

        $dateFormat = Carbon::parse($date)->format('Y-m-d');
        $submitted_at = Carbon::now()->format('Y-m-d H:i:s');

        $report = DailyReport::where('member_id', $memberId)->where('date', $date)->first();

        $report->start_work_type = intval($request->startWorkType);
        $report->end_work_type = intval($request->endWorkType);
        $report->attendance_memo = $request->attendanceMemo;
        $report->first_period = $request->firstPeriod;
        $report->second_period = $request->secondPeriod;
        $report->third_period = $request->thirdPeriod;
        $report->fourth_period = $request->fourthPeriod;
        $report->fifth_period = $request->fifthPeriod;
        $report->comment = $request->comment;
        $report->next_schedule = $request->nextSchedule;
        $report->mental_condition_score = intval($request->mentalConditionScore);
        $report->physical_condition_score = intval($request->physicalConditionScore);
        $report->submitted_at = $submitted_at;

        $report->save();

        return to_route('member.dailyReports.show', ['date' => $dateFormat])->with([
            'message' => '提出しました',
            'status' => 'success',
        ]);
    }

}
