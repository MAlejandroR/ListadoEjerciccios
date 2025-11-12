<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;

class ExercisePracticeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Exercise $exercise)
    {
        $user = $request->user();

        // true/false que viene del checkbox
        $practiced = $request->boolean('practiced');

        if ($practiced) {
            // crea o actualiza
            $user->practicedExercises()->syncWithoutDetaching([
                $exercise->id => ['practiced' => true],
            ]);
        } else {
//            // o bien actualizas a false...
//            $user->practicedExercises()->syncWithoutDetaching([
//                $exercise->id => ['practiced' => false],
//            ]);
//            // ...o incluso puedes borrar la fila:
//            //
             $user->practicedExercises()->detach($exercise->id);
        }

        return response()->json(['ok' => true]);
    }
}
