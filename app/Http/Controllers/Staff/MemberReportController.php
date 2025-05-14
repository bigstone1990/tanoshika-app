<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Member;

class MemberReportController extends Controller
{
    public function index()
    {
        $staffUserId = Auth::guard('staff')->user()->user_id;

        $members = Member::select('id', 'name')
            ->where('user_id', $staffUserId)
            ->orderBy('kana')
            ->get();

        return Inertia::render('Staff/MemberReport/Index', [
            'members' => $members,
        ]);
    }
}
