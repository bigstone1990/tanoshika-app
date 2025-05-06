<?php

use App\Http\Controllers\Staff\ProfileController;
use App\Http\Controllers\Staff\MemberManagementController;
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
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/staffAuth.php';
