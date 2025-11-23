<?php

use App\Models\Course;
use App\Models\Exercise;
use App\Models\Unit;


//Usa esta clase de base de datos temporal para test para todas las clases

it("return all units correct for user conected", function(){
    //Tenemos tres cursos vamos a ver cada uno

    //cREO UN CURSO PARA GUEST
    $guest_course = Course::factory()->create([
        "name"=>"test Name",
        "directory" => "guest",
        "teacher"=>"Teacher name",
        //
    ]);


    //cREO UNA UNIDAD PARA ESE CURSO
    $unit = Unit::factory()->create(["course_id"=>$guest_course->id]);

    //cREO EJERCICIOS PARA ESA UNIDAD
    $exercise=Exercise::factory()->create(["unit_id"=>$unit->id]);
    //Ahora ejecuto el servicio

    $result  =\App\Http\Services\UserCourseContentService::getContent(null);

    //Ahora las aserciones
    expect($result['dir'])->toBe('guest');
    expect($result['units'])->toHaveCount(1);
    expect($result['exercises'])->toHaveCount(1);
    expect ($result['practiced'])->toBe([]);



});



