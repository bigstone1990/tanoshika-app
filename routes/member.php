<?php

use App\Http\Controllers\Member\ProfileController;
use App\Http\Controllers\Member\DailyReportController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('member.dashboard');
})->middleware('auth:members')->name('top');

Route::get('/dashboard', function () {
    return Inertia::render('Member/Dashboard');
})->middleware(['auth:members', 'verified'])->name('dashboard');

Route::middleware('auth:members')->group(function () {
    Route::get('/dailyreports', [DailyReportController::class, 'index'])->name('dailyreports.index');
    Route::get('/dailyreports/create', [DailyReportController::class, 'create'])->name('dailyreports.create');
    Route::get('/dailyreports/{date}', [DailyReportController::class, 'show'])->name('dailyreports.show');
});

Route::middleware('auth:members')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/memberAuth.php';
