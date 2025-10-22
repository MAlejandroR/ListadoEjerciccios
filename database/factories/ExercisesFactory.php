<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Exercise;
use App\Models\Unit;

class ExercisesFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Exercise::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'list_title' => fake()->word(),
            'exercise_title' => fake()->word(),
            'description' => fake()->text(),
            'wiki_url' => fake()->word(),
            'index:name' => fake()->word(),
            'show_source' => fake()->word(),
            'units_id' => Unit::factory(),
        ];
    }
}
