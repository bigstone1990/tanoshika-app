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
    Route::get('/daily-reports', [DailyReportController::class, 'index'])->name('dailyReports.index');
    Route::get('/daily-reports/create', [DailyReportController::class, 'create'])->name('dailyReports.create');
    Route::post('/daily-reports/validate-step/{step}', [DailyReportController::class, 'validateStep'])->name('dailyReports.validateStep');
    Route::post('/daily-reports/initial-save', [DailyReportController::class, 'initialSave'])->name('dailyReports.initialSave');
    Route::post('/daily-reports/initial-submit', [DailyReportController::class, 'initialSubmit'])->name('dailyReports.initialSubmit');
    Route::get('/daily-reports/{date}', [DailyReportController::class, 'show'])->name('dailyReports.show');
    Route::get('/daily-reports/{date}/edit', [DailyReportController::class, 'edit'])->name('dailyReports.edit');
});

Route::middleware('auth:members')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/memberAuth.php';
