<?php

namespace App\Http\Services;

use App\Models\Course;
use App\Models\Exercise;
use App\Models\Unit;

class UserCourseContentService
{
    public static function getContent(?\App\Models\User $user)
    {
        // Directorio según curso matriculado o guest
        $dir = $user?->course?->directory ?? 'guest';

        // Identificar el curso por directorio
        $courseId = Course::where('directory', $dir)->value('id');

        // Unidades del curso
        $units = Unit::where('course_id', $courseId)->orderBy('number')->get();

        // Ejercicios con su unidad
        $exercises = Exercise::with('unit')
            ->whereIn('unit_id', $units->pluck('id'))
            ->orderBy('unit_id')
            ->get();

        // Ejercicios practicados del usuario (si existe)
        $practiced = $user
            ? $user->practicedExercises()
                ->wherePivot('practiced', true)
                ->pluck('exercise_id')
                ->toArray()
            : [];

        return compact("units","exercises","practiced","dir");

    }
}
