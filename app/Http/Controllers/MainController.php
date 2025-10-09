<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Exercises;
use App\Models\Units;

class MainController extends Controller
{
    //
    public function __invoke(Request $request)
    {
        $exercices =Exercises::all();
        $exercices=Exercises::orderBy('units_id')->get();
        $units = Units::all();

        return inertia('Main', compact('exercices', 'units'));
    }
}
