<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Exercices;
use App\Models\Units;

class MainController extends Controller
{
    //
    public function __invoke(Request $request)
    {
//        $exercices =Exercices::all();
        $exercices =Exercices::orderBy('units_id')->get();
        $units = Units::all();

        return inertia('Main', compact('exercices', 'units'));
    }
}
