<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BirthProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'full_name',
        'email',
        'birth_date',
        'birth_time',
        'is_time_unknown',
        'birth_city',
        'latitude',
        'longitude',
        'timezone',
        'utc_offset',
        'sun_sign',
        'moon_sign',
        'nakshatra',
        'pada',
        'life_path_number',
        'is_master_number',
        'birthday_number',
        'expression_number',
    ];

    protected $casts = [
        'is_time_unknown' => 'boolean',
        'is_master_number' => 'boolean',
        'latitude' => 'float',
        'longitude' => 'float',
        'utc_offset' => 'float',
        'life_path_number' => 'integer',
        'birthday_number' => 'integer',
        'expression_number' => 'integer',
        'pada' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
