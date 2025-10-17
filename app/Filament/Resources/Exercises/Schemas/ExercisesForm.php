<?php

namespace App\Filament\Resources\Exercises\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

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

                TextInput::make('index')
                    ->required()
                    ->default('index'),

                Toggle::make('show_source')
                    ->label('Mostrar código fuente')
                    ->default(false),

                Toggle::make('show_in_list')
                    ->label('Visible en listado')
                    ->default(true),

                Select::make('units_id')
                    ->relationship('units', 'title')
                    ->label('Unidad')
                    ->required(),
            ]);
    }
}
