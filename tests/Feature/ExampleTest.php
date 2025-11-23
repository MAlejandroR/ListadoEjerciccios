<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Course;
use App\Models\Exercise;
use App\Models\Unit;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {

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
        $practiced=[];

        $response = $this->get('/');
        $response->assertStatus(200);
    }
}
