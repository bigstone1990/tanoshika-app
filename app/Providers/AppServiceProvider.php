<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        if (request()->is('staff*')) {
            config(['session.table' => config('session.table_staff')]);
            config(['session.cookie' => config('session.cookie_staff')]);
        }
        elseif (request()->is('member*')) {
            config(['session.table' => config('session.table_member')]);
            config(['session.cookie' => config('session.cookie_member')]);
        }
        elseif (request()->is('user*')) {
            config(['session.table' => config('session.table')]);
            config(['session.cookie' => config('session.cookie')]);
        }
        else {
            config(['session.table' => config('session.table')]);
            config(['session.cookie' => config('session.cookie')]);
        }
    }
}
