<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Unit;

class Course extends Model
{
    /** @use HasFactory<\Database\Factories\CourseFactory> */
    use HasFactory;
    protected $fillable = [ "name", "teacher", "directory"];
    public function students(){
        return $this->hasMany(Students::class);
    }
    public function units(){
        return $this->hasMany(Unit::class);
    }
}
