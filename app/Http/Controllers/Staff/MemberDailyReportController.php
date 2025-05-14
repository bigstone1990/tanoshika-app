<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Member;
use App\Models\DailyReport;
use App\Constants\DailyReportConstants;

class MemberDailyReportController extends Controller
{
    public function index(Member $member)
    {
        $memberId = $member->id;

        $getMember = Member::select('id', 'name')->findOrFail($memberId);

        $reports = DailyReport::select('id', 'date', 'submitted_at as submittedAt', 'staff_memo as staffMemo')
            ->where('member_id', $memberId)
            ->whereNotNull('submitted_at')
            ->orderBy('date', 'desc')
            ->paginate(5);

        return Inertia::render('Staff/MemberReport/DailyReport/Index', [
            'member' => $getMember,
            'reports' => $reports,
        ]);
    }

    public function show(Member $member, string $date)
    {
        $memberId = $member->id;

        $getMember = Member::select('id', 'name')->findOrFail($memberId);

        $report = DailyReport::select('id', 'member_id as memberId', 'date', 'start_work_type as startWorkType', 'end_work_type as endWorkType', 'attendance_memo as attendanceMemo', 'first_period as firstPeriod', 'second_period as secondPeriod', 'third_period as thirdPeriod', 'fourth_period as fourthPeriod', 'fifth_period as fifthPeriod', 'comment', 'next_schedule as nextSchedule', 'mental_condition_score as mentalConditionScore', 'physical_condition_score as physicalConditionScore', 'submitted_at as submittedAt', 'staff_name as staffName', 'staff_memo as staffMemo')
            ->where('member_id', $memberId)
            ->where('date', $date)
            ->whereNotNull('submitted_at')
            ->first();

        if (is_null($report)) {
            abort(404);
        }

        $startWorkType = DailyReportConstants::START_WORK_TYPE;
        $endWorkType = DailyReportConstants::END_WORK_TYPE;
        $scoreOption = DailyReportConstants::SCORE_OPTION;

        return Inertia::render('Staff/MemberReport/DailyReport/Show', [
            'member' => $getMember,
            'report' => $report,
            'startWorkType' => $startWorkType,
            'endWorkType' => $endWorkType,
            'scoreOption' => $scoreOption,
        ]);
    }
}
