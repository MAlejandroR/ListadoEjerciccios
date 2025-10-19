<?php

namespace App\Filament\Resources\Exercises\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Toggle;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ExercisesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('list_title')
                    ->searchable(),
                TextColumn::make('exercise_title')
                    ->searchable(),
                TextColumn::make('wiki_url')
                    ->searchable(),
                TextColumn::make('index_name')
                    ->searchable(),
                TextColumn::make('show_source')
                    ->searchable(),
                Toggle::make('show_source')
                    ->label('Mostrar código fuente')
                    ->default(false),

                Toggle::make('show_in_list')
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
