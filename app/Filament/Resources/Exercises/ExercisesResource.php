<?php

namespace App\Filament\Resources\Exercises;

use App\Filament\Resources\Exercises\Pages\CreateExercises;
use App\Filament\Resources\Exercises\Pages\EditExercises;
use App\Filament\Resources\Exercises\Pages\ListExercises;
use App\Filament\Resources\Exercises\Schemas\ExercisesForm;
use App\Filament\Resources\Exercises\Tables\ExercisesTable;
use App\Models\Exercise;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ExercisesResource extends Resource
{
    protected static ?string $model = Exercise::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'Exercise';

    public static function form(Schema $schema): Schema
    {
        return ExercisesForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ExercisesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListExercises::route('/'),
            'create' => CreateExercises::route('/create'),
            'edit' => EditExercises::route('/{record}/edit'),
        ];
    }
}
