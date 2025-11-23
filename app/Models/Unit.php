<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Course;

class Unit extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
        'folder_name',
        'show_in_list',
        'number',
        'course_id'
    ];

    public function exercises(): HasMany
    {
        return $this->hasMany(Exercise::class);
    }
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}
