<?php

namespace Database\Seeders;

use App\Models\Exercise;
use App\Models\Unit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;


//TODO revisar el código: pendiente

//Refactorizar el método largo
//Controlar si el ini está mal formado y no petar
//HAcer disponible esta funcionalidad desde admin
//Add que si añado un ini nuevo lo pueda agragar (los ya gestionados no hacerlos)

class ExercisesSeederOldold extends Seeder
{

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dirs = Storage::drive("public")->directories('exercises');
       //Recorremos el directorio y aquellos que tengan ini
        /* "exercises/T0",
           "exercises/T1",
           "exercises/T2"
         * */
        //Leo los datos y creo una unidad
        foreach ($dirs as $dir) {
            $name = basename($dir);

            $ini = "$dir/$name.ini";
            if (Storage::disk("public")->exists($ini)) {
                $full_path = Storage::disk("public")->path($ini);
                $data = parse_ini_file($full_path, true);
                $unit= Unit::create([
                    "title" => $data["title"],
                    "description" => $data["description"],
                    "show_in_list" => $data["show_in_list"]==1?true:false,
                    "folder_name" => $name
                ]);
                }
//Ahora recorreo cada directorio y creo ejercicios
            $exercises = Storage::disk("public")->directories($dir);
            /* ["exercises/T0/001_echo",
               "exercises/T1/002_printf",
               "exercises/T2"
            ]
             * */
            sort($exercises);
            foreach ($exercises as $dir_exercise) {
                var_dump($dir_exercise);
                $files = Storage::drive("public")->files($dir_exercise);
                /*
                [
                    "exercises/T0/001_echo/001_T0_echo.ini",
                    "exercises/T0/001_echo/contenido.php",
                ]
                */
                $ini_file= array_filter($files,fn($file)=>str_ends_with($file, "ini"));
                if (count($ini_file)==1) {
                    $ini= reset($ini_file);
                    //Obtengo el ini del ejercicio y leo su contenido
                    $full_path = Storage::disk("public")->path($ini);
                    $data = parse_ini_file($full_path, true);
                    Exercise::create([
                        'list_title' => $data['datos']['listado'],
                        'exercise_title' => $data['enunciado']['titulo'],
                        'description' => '',
                        'wiki_url' => $data['enunciado']['wiki'] ?? "",
                        'index_name' => $data['ejecucion']['index'] ?? 'index',
                        'show_source' => false,
                        'unit_id' => $unit->id,
                        'folder_name' => basename($dir_exercise)
                    ]);
                }
            }
        }




//        $files = scandir(public_path("/storage/ficheros_ini"));
//        foreach ($files as $file) {
//            if (str_ends_with($file, '.ini')) {
//
//                $content = parse_ini_file(public_path("/storage/ficheros_ini/$file"), true);
//                /*$content:
//
//             ] // database/seeders/ExercisesSeeder.php:22
//                */
//                dump($file);
//                dump($content);
//                echo "====================================\n";
//
//                $tema = (int)$content['datos']['tema'];
//                if (Unit::select('id')->where('number', $tema)->doesntExist()) {
//                    \App\Models\Unit::create([
//                        'number' => $tema,
//                        'title' => 'Tema ' . $content['datos']['tema']
//                    ]);
//
//                }
//
//
//                Exercise::create([
//                    'list_title' => $content['datos']['listado'],
//                    'exercise_title' => $content['enunciado']['titulo'],
//                    'description' => '',
//                    'wiki_url' => $content['enunciado']['wiki'] ?? "",
//                    'index_name' => $content['ejecucion']['index'] ?? 'index',
//                    'show_source' => false,
//                    'units_id' => \App\Models\Unit::select('id')->where('number', (int)$content['datos']['tema'])->first()->id
//                ]);
//            }
//
//        }
//        //
    }
}
