<?php

namespace App\Filament\Resources\Exercises\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Storage;
use App\Models\Unit;


class ExercisesForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('list_title')
                    ->required(),

                TextInput::make('exercise_title')
                    ->required(),

                Textarea::make('description')
                    ->columnSpanFull(),

                TextInput::make('wiki_url')
                    ->url(),

                TextInput::make('index_name')
                    ->required()
                    ->default('index'),
                Select::make('unit_id')
                    ->relationship('unit', 'title')
                    ->label('Unidad')
                    ->reactive() //Si este valor cambia vuelve a recalcular los campos que dependan de éste, o se folder_name de exercises
                    ->afterStateUpdated(fn(callable $set) => $set("folder_name", null))
                    ->required(),
                Select::make('folder_name')
                    ->label("Nombre de la carpeta")
                    ->options(function (callable $get){
                        $unit_id = $get("unit_id");
                        if (!$unit_id) return [];
                        $unit = Unit::find($unit_id);

                        $dirs= get_folder_exercises($unit->folder_name);
                        info ("ExercisesForm.configure.make_options");
                        info ($dirs);
                        info ("-$unit".$unit->folder_name."-");
                        return $dirs;
                    })
                    /*
                    ->options(function (callable $get) {
                        $unitId = $get('unit_id');
                        if (!$unitId) return [];

                        //Get the folder_name of folders:
                        $unit=Unit::find($unitId);
                        if (!$unit||!$unit->folder_name) return [];
                        $dirs = get_folder_exercises($unit->folder_name);
                        return $dirs;

                    })
                    */
                    ->searchable()
                    ->preload()
                    ->required()
                    ->reactive()
                    //También damos la opción de crearlo desde el propio select
                    ->createOptionForm([
                        TextInput::make('name')
                            ->label("Nombre de la nueva carpeta")
                            ->required()
                    ])
                    ->createOptionUsing(function (array $data, callable $get): string {
                        $unitId = $get('unit_id');
                        $unit = Unit::find($unitId);
                        if (!$unit || !$unit->folder_name) {
                            throw new \Exception('Unidad sin carpeta asociada.');
                        }
                        $newFolder = "exercises/{$unit->folder_name}/{$data['name']}";
                        Storage::disk('public')->makeDirectory($newFolder);
                        return basename($newFolder);

                    }),


                Toggle::make('show_source')
                    ->label('Mostrar código fuente')
                    ->default(false),

                Toggle::make('show_in_list')
                    ->label('Visible en listado')
                    ->default(true),


            ]);
    }
}
