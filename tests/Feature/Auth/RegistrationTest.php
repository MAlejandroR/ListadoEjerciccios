<?php

namespace Tests\Feature\Auth;

use App\Models\Course;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        // 1. Crear el role que tu sistema requiere
        \Spatie\Permission\Models\Role::create(['name' => 'student']);

        $course = Course::factory()->create();
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'course_id' => $course->id,
        ]);



        $this->assertAuthenticated();
        $response->assertRedirect(route('main', absolute: false));
    }
}
