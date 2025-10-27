<?php

namespace App\Filament\Resources\Exercises\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class ExercisesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('list_title')
                    ->label("Titulo en la lista")
                    ->searchable(),
                TextColumn::make('exercise_title')
                    ->label("Título del ejercicio")
                    ->searchable(),
                TextColumn::make('wiki_url')
                    ->label("URL del enunciado del ejercicio")
                    ->searchable(),
                TextColumn::make('index_name')
                    ->label("Nombre del index")
                    ->searchable(),
                ToggleColumn::make('show_source')
                    ->label('Mostrar código fuente')
                    ->default(false),
                ToggleColumn::make('show_in_list')
                    ->label('Visible en listado')
                    ->default(true),
                TextColumn::make('units.title')
                    ->searchable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
