<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use App\Models\Exercise;
use App\Models\Unit;

class MainController extends Controller
{
    //
    public function __invoke(Request $request)
    {
//        $exercices =Exercise::all();
        $exercises =Exercise::with('unit')
        ->orderBy('unit_id')
        ->get();
        $units = Unit::orderBy('number')->get();
        $courses =Course::all();

        $practiced = $request->user()
            ? $request->user()
                ->practicedExercises()
                ->wherePivot('practiced', true)
                ->pluck('exercise_id')
                ->toArray()
            : [];



        return inertia('Main', compact('exercises', 'units', "courses","practiced"));
    }
}
