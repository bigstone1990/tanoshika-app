<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Auth;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $guard = 'users';
        if ($request->routeIs('staff.*')) {
            $guard = 'staff';
        }
        elseif ($request->routeIs('member.*')) {
            $guard = 'members';
        }
        elseif ($request->routeIs('user.*')) {
            $guard = 'users';
        }

        $permissions = [];
        if (Auth::guard('users')->check()) {
            $permissions['adminUser'] = $request->user() ? $request->user()->can('adminUser') : false;
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => Auth::guard($guard)->user(),
                'permissions' => $permissions,
            ],
        ];
    }
}
