<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\DailyReport;
use App\Models\Member;

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
}
