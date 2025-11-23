<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Exercise;
use App\Models\Unit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use function Symfony\Component\String\b;
use function Termwind\parse;


//TODO revisar el código: pendiente

//Refactorizar el método largo
//Controlar si el ini está mal formado y no petar
//HAcer disponible esta funcionalidad desde admin
//Add que si añado un ini nuevo lo pueda agragar (los ya gestionados no hacerlos)

class ExercisesSeeder extends Seeder
{

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Recorremos los directorios que son los temas o unidades (/exercises(
        $dir_courses = Storage::disk("public")->directories("exercises");

//Para cada curso buscamos sus unidades
        foreach ($dir_courses as $course) {

            $dir_units = Storage::disk("public")->directories("$course");

            //Para cada unidad si hay ini y es correcto
            //Añado un tema en la base de datos con los valores del ini
            foreach ($dir_units as $unit) {
                //Cada ejercicio si tiene ini y es correcto lo doy de alta en la base de datos
                $unit_id = $this->add_unit_database($unit, $course);

                if (!$unit_id) continue;
                $this->add_exercise_database_if_ini($unit, $unit_id);
            }
        }
    }

    private function add_unit_database(string $unit, string $dir):null|int
    {
        $unit_dir =basename($unit);
        $path_base= Storage::disk("public")->path($unit);
        $init_file="$path_base/$unit_dir.ini";
        $data = @parse_ini_file($init_file, true);
        $dir=basename($dir);
        

        $course_id = Course::where('directory', $dir)->value('id');


        if (!is_array($data)) return null;
        $unit= Unit::create([
            "title" => $data["title"],
            "description" => $data["description"],
            "show_in_list" => $data["show_in_list"]==1?true:false,
            "folder_name" => $unit_dir,
            'number' => $data["number"],
            'course_id' => $course_id,
        ]);
        return $unit->id;
        }

        //Para cada directorio de unidad
    //Leo los ejercicios que hay
    //Si tienen ini file, los añado en la base de datos
    private function add_exercise_database_if_ini(string $unit, int $unit_id)
    {

        //OBtener todos los fichero de una carpeta
        $exercises_dir = Storage::disk("public")->directories($unit);
        sort($exercises_dir);
        foreach ($exercises_dir as $exercise) {
            $dir_name = basename($exercise);
            if (!Storage::drive("public")->exists("$exercise/$dir_name.ini"))
                continue;
            $path =Storage::drive("public")->path("$exercise");
            $ini_file= "$path/$dir_name.ini";
            $data= @parse_ini_file($ini_file, true);
            if (!is_array($data)) continue;
            Exercise::create([
                'list_title' => $data['datos']['listado'],
                'exercise_title' => $data['enunciado']['titulo'],
                'description' => '',
                'wiki_url' => $data['enunciado']['wiki'] ?? "",
                'index_name' => $data['ejecucion']['index'] ?? 'index',
                'show_source' => false,
                'unit_id' => $unit_id,
                'folder_name' => basename($dir_name)
            ]);

    }
}
}
