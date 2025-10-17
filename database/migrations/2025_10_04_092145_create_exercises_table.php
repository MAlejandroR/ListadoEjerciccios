<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('exercises', function (Blueprint $table) {
            $table->id();
            $table->string('list_title');
            $table->string('exercise_title');
            $table->text('description')->nullable();
            $table->string('wiki_url')->nullable();
            $table->string('index:name')->default('index');
            $table->string('show_source')->default('false');
            $table->string('show_in_list')->default('true');
            $table->foreignId('units_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exercises');
    }
};
