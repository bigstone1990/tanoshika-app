<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: function () {
            Route::middleware('web')
                ->prefix('staff')
                ->name('staff.')
                ->group(__DIR__.'/../routes/staff.php');
            Route::middleware('web')
                ->prefix('member')
                ->name('member.')
                ->group(__DIR__.'/../routes/member.php');
        },
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
        $middleware->redirectGuestsTo(function (Request $request) {
            if (request()->routeIs('staff.*')) {
                return $request->expectsJson() ? null : route('staff.login');
            }
            elseif (request()->routeIs('member.*')) {
                return $request->expectsJson() ? null : route('member.login');
            }
            elseif (request()->routeIs('user.*')) {
                return $request->expectsJson() ? null : route('user.login');
            }
            else {
                return $request->expectsJson() ? null : route('user.login');
            }
        });
        $middleware->redirectUsersTo(function () {
            if (Auth::guard('users')->check()) {
                return route('user.dashboard');
            }
            elseif (Auth::guard('staff')->check()) {
                return route('staff.dashboard');
            }
            elseif (Auth::guard('members')->check()) {
                return route('member.dashboard');
            }
        
            return null;
        });

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function (Response $response) {
            if ($response->getStatusCode() === 419) {
                return Inertia::render('ForRedirect', [
                    'redirectTo' => url()->previous(),
                ]);
            }
    
            return $response;
        });
    })->create();
