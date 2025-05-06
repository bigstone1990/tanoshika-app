<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Member;
use App\Http\Requests\StoreMemberRequest;
use App\Http\Requests\UpdateMemberRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Jobs\SendMemberCreatedMail;

class MemberManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $members = Member::leftjoin('users', 'users.id', '=', 'members.user_id')
        ->orderBy('members.kana')
        ->select('members.id', 'members.name', 'members.email', 'members.user_id', 'users.name as user_name')
        ->get();

        return Inertia::render('Staff/Member/Index', [
            'members' => $members,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::orderBy('kana')
        ->select('id', 'name')
        ->get();

        return Inertia::render('Staff/Member/Create', [
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMemberRequest $request)
    {
        $userId = null;
        if (!is_null($request->affiliation)) {
            $userId = intval($request->affiliation);
        }

        $password = Str::random(8);

        $member = Member::create([
            'user_id' => $userId,
            'name' => $request->name,
            'kana' => $request->kana,
            'email' => $request->email,
            'password' => Hash::make($password),
        ]);

        SendMemberCreatedMail::dispatch($member, $password);

        return to_route('staff.members.index')->with([
            'message' => '登録しました',
            'status' => 'success',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Member $member)
    {
        $getMember = Member::leftjoin('users', 'users.id', '=', 'members.user_id')
        ->where('members.id', $member->id)
        ->select('members.id', 'members.name', 'members.kana', 'members.email', 'members.user_id', 'users.name as user_name')
        ->first();

        return Inertia::render('Staff/Member/Show', [
            'member' => $getMember,
        ]); 
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Member $member)
    {
        $users = User::orderBy('kana')
        ->select('id', 'name')
        ->get();

        return Inertia::render('Staff/Member/Edit', [
            'member' => [
                'id' => $member->id,
                'user_id' => $member->user_id,
                'name' => $member->name,
                'kana' => $member->kana,
                'email' => $member->email,
            ],
            'users' => $users,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMemberRequest $request, Member $member)
    {
        $userId = null;
        if (!is_null($request->affiliation)) {
            $userId = intval($request->affiliation);
        }

        $member->user_id = $userId;
        $member->name = $request->name;
        $member->kana = $request->kana;

        $member->save();

        return to_route('staff.members.show', ['member' => $member->id])->with([
            'message' => '更新しました',
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Member $member)
    {
        $member->delete();

        return to_route('staff.members.index')->with([
            'message' => '削除しました',
            'status' => 'success',
        ]);
    }
}
