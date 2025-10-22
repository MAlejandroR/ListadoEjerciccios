<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Exercise extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'list_title',
        'exercise_title',
        'description',
        'wiki_url',
        'index_name',
        'show_in_list',
        'show_source',
        'units_id',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'units_id' => 'integer',
        ];
    }

    public function units(): BelongsTo
    {
        return $this->belongsTo(Unit::class);
    }
}
