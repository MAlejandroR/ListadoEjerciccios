<?php

namespace Database\Seeders;

use App\Models\Exercise;
use App\Models\Unit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExercisesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {


        $files = scandir(public_path("/storage/ficheros_ini"));
        foreach ($files as $file) {
            if (str_ends_with($file, '.ini')) {

                $content = parse_ini_file(public_path("/storage/ficheros_ini/$file"), true);
                /*$content:

             ] // database/seeders/ExercisesSeeder.php:22
                */
                dump($file);
                dump($content);
                echo "====================================\n";

                $tema = (int)$content['datos']['tema'];
                if (Unit::select('id')->where('number', $tema)->doesntExist()) {
                    \App\Models\Unit::create([
                        'number' => $tema,
                        'title' => 'Tema ' . $content['datos']['tema']
                    ]);

                }


                Exercise::create([
                    'list_title' => $content['datos']['listado'],
                    'exercise_title' => $content['enunciado']['titulo'],
                    'description' => '',
                    'wiki_url' => $content['enunciado']['wiki'] ?? "",
                    'index_name' => $content['ejecucion']['index'] ?? 'index',
                    'show_source' => false,
                    'units_id' => \App\Models\Unit::select('id')->where('number', (int)$content['datos']['tema'])->first()->id
                ]);
            }

        }
        //
    }
}
