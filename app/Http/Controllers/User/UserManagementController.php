<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
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
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
