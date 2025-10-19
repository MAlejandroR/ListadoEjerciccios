<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UnitsController;
use App\Http\Controllers\ExercicesController;

Route::get('/', \App\Http\Controllers\MainController::class)->name('main');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::put('/units/{unit}/hide_show',[UnitsController::class, 'hide_show'])
    ->middleware(['auth'])->name('units.hide_show');

Route::put('/exercices/{exercice}/hide_show',[ExercicesController::class, 'hide_show'])
    ->middleware(['auth'])->name('exercices.hide_show');


require __DIR__.'/auth.php';
