<?php

namespace App\Filament\Resources\Exercises\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
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
                TextInput::make('index:name')
                    ->required()
                    ->default('index'),
                TextInput::make('show_source')
                    ->required()
                    ->default('false'),
                Select::make('units_id')
                    ->relationship('units', 'title')
                    ->required(),
            ]);
    }
}
