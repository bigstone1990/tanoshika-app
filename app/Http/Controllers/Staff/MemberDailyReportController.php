<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Member;
use App\Models\DailyReport;

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
}
