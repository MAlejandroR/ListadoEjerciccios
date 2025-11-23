<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $course = Course::create([
            "name" =>"Curso Invitado" ,
            "teacher" =>"Manuel Romero Miguel",
            "directory"=>"guest"
        ]);
        $course = Course::create([
            "name" =>"Certificado de profesionalidad (DATW)" ,
            "teacher" =>"Manuel Romero Miguel",
            "directory"=>"datw"
        ]);
        $user=User::create([
            "name" =>"datw1" ,
            'email'=>"datw1@gmail.com",
            'password'=>bcrypt("12345678"),
            "course_id"=>$course->id,
        ]);
        $user->assignRole('student');

        $course=Course::create([
            "name" =>"Desarrollo de aplicaciones web presencial (DWES_Presencial)",
            "teacher" =>"Manuel Romero Miguel",
            "directory"=>"dwes_presencial"
        ]);
        $user=User::create([
            "name" =>"dwes1" ,
            'email'=>"dwes1@gmail.com",
            'password'=>bcrypt("12345678"),
            "course_id"=>$course->id,
        ]);
        $user->assignRole('student');



        $course=Course::create([
            "name" =>"Desarrollo de aplicaciones web distancia (DWES_Distancia)",
            "teacher" =>"Manuel Romero Miguel",
            "directory"=>"dwes_distancia"
        ]);
        $user=User::create([
            "name" =>"Alumno 1 dwes distancia" ,
            'email'=>"ddwes1@gmail.com",
            'password'=>bcrypt("12345678"),
            "course_id"=>$course->id,
        ]);
        $user->assignRole('student');
    }
}
