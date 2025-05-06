<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Staff;
use App\Http\Requests\StoreStaffRequest;
use App\Http\Requests\UpdateStaffRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Jobs\SendStaffCreatedMail;

class StaffManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $staff = Staff::leftjoin('users', 'users.id', '=', 'staff.user_id')
        ->orderBy('staff.kana')
        ->select('staff.id', 'staff.name', 'staff.email', 'staff.user_id', 'users.name as user_name')
        ->get();

        return Inertia::render('User/Staff/Index', [
            'staff' => $staff,
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

        return Inertia::render('User/Staff/Create', [
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStaffRequest $request)
    {
        $userId = null;
        if (!is_null($request->affiliation)) {
            $userId = intval($request->affiliation);
        }

        $password = Str::random(8);

        $staff = Staff::create([
            'user_id' => $userId,
            'name' => $request->name,
            'kana' => $request->kana,
            'email' => $request->email,
            'password' => Hash::make($password),
        ]);

        SendStaffCreatedMail::dispatch($staff, $password);

        return to_route('user.staff.index')->with([
            'message' => '登録しました',
            'status' => 'success',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Staff $staff)
    {
        $getStaff = Staff::leftjoin('users', 'users.id', '=', 'staff.user_id')
        ->where('staff.id', $staff->id)
        ->select('staff.id', 'staff.name', 'staff.kana', 'staff.email', 'staff.user_id', 'users.name as user_name')
        ->first();

        return Inertia::render('User/Staff/Show', [
            'staff' => $getStaff,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Staff $staff)
    {
        $users = User::orderBy('kana')
        ->select('id', 'name')
        ->get();

        return Inertia::render('User/Staff/Edit', [
            'staff' => [
                'id' => $staff->id,
                'user_id' => $staff->user_id,
                'name' => $staff->name,
                'kana' => $staff->kana,
                'email' => $staff->email,
            ],
            'users' => $users,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStaffRequest $request, Staff $staff)
    {
        $userId = null;
        if (!is_null($request->affiliation)) {
            $userId = intval($request->affiliation);
        }

        $staff->user_id = $userId;
        $staff->name = $request->name;
        $staff->kana = $request->kana;

        $staff->save();

        return to_route('user.staff.show', ['staff' => $staff->id])->with([
            'message' => '更新しました',
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Staff $staff)
    {
        $staff->delete();

        return to_route('user.staff.index')->with([
            'message' => '削除しました',
            'status' => 'success',
        ]);
    }
}
