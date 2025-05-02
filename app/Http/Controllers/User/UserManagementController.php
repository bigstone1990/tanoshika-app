<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Staff;
use App\Models\Member;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Jobs\SendUserCreatedMail;

class UserManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::orderBy('kana')
            ->select('id', 'name', 'email', 'authority')
            ->get();

        return Inertia::render('User/User/Index', [
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $loginUser = User::findOrFail(Auth::guard('users')->id());

        if (!$loginUser->can('adminUser')) {
            return to_route('user.users.index')->with([
                'message' => 'このアカウントではアクセスできません',
                'status' => 'error',
            ]);
        }

        return Inertia::render('User/User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $loginUser = User::findOrFail(Auth::guard('users')->id());

        if (!$loginUser->can('adminUser')) {
            return to_route('user.users.index')->with([
                'message' => 'このアカウントではアクセスできません',
                'status' => 'error',
            ]);
        }

        $password = Str::random(8);

        $user = User::create([
            'name' => $request->name,
            'kana' => $request->kana,
            'email' => $request->email,
            'password' => Hash::make($password),
            'authority' => intval($request->authority),
        ]);

        SendUserCreatedMail::dispatch($user, $password);

        return to_route('user.users.index')->with([
            'message' => '登録しました',
            'status' => 'success',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return Inertia::render('User/User/Show', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'kana' => $user->kana,
                'email' => $user->email,
                'authority' => $user->authority,
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $loginUser = User::findOrFail(Auth::guard('users')->id());

        if (!$loginUser->can('adminUser')) {
            return to_route('user.users.show', ['user' => $user->id])->with([
                'message' => 'このアカウントではアクセスできません',
                'status' => 'error',
            ]);
        }

        $isSelf = false;

        if ($user->id == $loginUser->id) {
            $isSelf = true;
        }

        return Inertia::render('User/User/Edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'kana' => $user->kana,
                'email' => $user->email,
                'authority' => $user->authority,
                'isSelf' => $isSelf,
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $loginUser = User::findOrFail(Auth::guard('users')->id());

        if (!$loginUser->can('adminUser')) {
            return to_route('user.users.show', ['user' => $user->id])->with([
                'message' => 'このアカウントではアクセスできません',
                'status' => 'error',
            ]);
        }

        if ($user->id == $loginUser->id) {
            if ($user->authority !== intval($request->authority)) {
                return to_route('user.users.show', ['user' => $user->id])->with([
                    'message' => '不正な操作がありました',
                    'status' => 'error',
                ]);
            }
        }

        $user->name = $request->name;
        $user->kana = $request->kana;
        $user->authority = intval($request->authority);

        $user->save();

        return to_route('user.users.show', ['user' => $user->id])->with([
            'message' => '更新しました',
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $loginUser = User::findOrFail(Auth::guard('users')->id());

        if (!$loginUser->can('adminUser')) {
            return to_route('user.users.show', ['user' => $user->id])->with([
                'message' => 'このアカウントではアクセスできません',
                'status' => 'error',
            ]);
        }

        if ($user->id === $loginUser->id) {
            return to_route('user.users.show', ['user' => $user->id])->with([
                'message' => '不正な操作がありました',
                'status' => 'error',
            ]);
        }

        $staff = Staff::where('user_id', $user->id)->get();

        if (!$staff->isEmpty()) {
            foreach ($staff as $item) {
                $item->user_id = null;
                $item->save();
            }
        }

        $members = Member::where('user_id', $user->id)->get();

        if (!$members->isEmpty()) {
            foreach ($members as $item) {
                $item->user_id = null;
                $item->save();
            }
        }

        $user->delete();

        return to_route('user.users.index')->with([
            'message' => '削除しました',
            'status' => 'success',
        ]);
    }
}
