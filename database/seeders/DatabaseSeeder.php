<?php

namespace Database\Seeders;

use App\Models\User;
use Spatie\Permission\Models\Role;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            RolesTableSeeder::class,
            ExercisesSeeder::class,
            CourseSeeder::class,
        ]);
        $user = User::factory()->create([
            'name' => 'Admin',
            'email' => 'a@a.com',
            'password' => bcrypt('12345678'),
        ]);
        $user->assignRole('admin');

    }
}
