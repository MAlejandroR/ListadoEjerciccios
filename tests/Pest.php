<?php


use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

// Para todos los Feature Tests:
uses(TestCase::class, RefreshDatabase::class)->in('Feature');

// Para Unit tests:
uses(TestCase::class)->in('Unit');
