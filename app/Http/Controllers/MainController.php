<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Exercise;
use App\Models\Unit;

class MainController extends Controller
{
    //
    public function __invoke(Request $request)
    {
//        $exercices =Exercise::all();
        $exercices =Exercise::orderBy('units_id')->get();
        $units = Unit::all();

        return inertia('Main', compact('exercices', 'units'));
    }
}
