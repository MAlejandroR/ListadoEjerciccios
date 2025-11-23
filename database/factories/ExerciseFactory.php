<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Exercise;
use App\Models\Unit;

class ExerciseFactory extends Factory
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
            'list_title' => $this->faker->word(),
            'exercise_title' => $this->faker->word(),
            'description' => $this->faker->text(),
            'wiki_url' => $this->faker->word(),
            'index_name' => $this->faker->word(),
            'show_source' =>true,
            'unit_id' => Unit::factory(),
            'folder_name'=>$this->faker->word(),
            'show_in_list' => true,

        ];
    }
}
