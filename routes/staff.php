<?php

use App\Http\Controllers\Staff\ProfileController;
use App\Http\Controllers\Staff\MemberManagementController;
use App\Http\Controllers\Staff\MemberReportController;
use App\Http\Controllers\Staff\MemberDailyReportController;
use App\Http\Controllers\Staff\MemberWeeklyReportController;
use App\Http\Controllers\Staff\MemberMonthlyReportController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('staff.dashboard');
})->middleware('auth:staff')->name('top');

Route::get('/dashboard', function () {
    return Inertia::render('Staff/Dashboard');
})->middleware(['auth:staff', 'verified'])->name('dashboard');

Route::middleware('auth:staff')->group(function () {
    Route::resource('members', MemberManagementController::class);
});

Route::middleware('auth:staff')->group(function () {
    Route::get('/member-reports', [MemberReportController::class, 'index'])->name('memberReports.index');
});

Route::middleware('auth:staff')->group(function () {
    Route::get('/member-reports/{member}/daily-reports', [MemberDailyReportController::class, 'index'])->name('memberDailyReports.index');
    Route::get('/member-reports/{member}/daily-reports/{date}', [MemberDailyReportController::class, 'show'])->name('memberDailyReports.show');
});

Route::middleware('auth:staff')->group(function () {
    Route::get('/member-reports/{member}/weekly-reports', [MemberWeeklyReportController::class, 'index'])->name('memberWeeklyReports.index');
});

Route::middleware('auth:staff')->group(function () {
    Route::get('/member-reports/{member}/monthly-reports', [MemberMonthlyReportController::class, 'index'])->name('memberMonthlyReports.index');
});

Route::middleware('auth:staff')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/staffAuth.php';
