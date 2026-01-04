<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TourController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UnitsController;
use App\Http\Controllers\ExercicesController;
use App\Http\Controllers\UserController;


Route::get('/', \App\Http\Controllers\MainController::class)->name('main');
Route::get('/main1',fn()=>Inertia::render('Main1'));

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

Route::post("/exercises/{exercise}/practice",\App\Http\Controllers\ExercisePracticeController::class )->name("exercises.practice");
Route::post("/tour/reset",[\App\Http\Controllers\TourController::class,'reset'])->name("tour-reset");

Route::get("startTour",[TourController::class, "startTour"])->name('tour.start');
Route::get("closeTour",[TourController::class, "closeTour"])->name('tour.close');

require __DIR__.'/auth.php';
