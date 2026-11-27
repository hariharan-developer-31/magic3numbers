<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('birth_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('full_name');
            $table->string('email')->nullable();
            $table->date('birth_date');
            $table->string('birth_time')->nullable();
            $table->boolean('is_time_unknown')->default(false);
            $table->string('birth_city')->nullable();
            $table->decimal('latitude', 10, 6)->nullable();
            $table->decimal('longitude', 10, 6)->nullable();
            $table->string('timezone')->nullable();
            $table->decimal('utc_offset', 4, 2)->default(0);
            
            // Core 3 Sacred Numbers outputs
            $table->string('sun_sign');
            $table->string('moon_sign');
            $table->string('nakshatra');
            $table->unsignedTinyInteger('pada')->default(1);
            $table->unsignedSmallInteger('life_path_number');
            $table->boolean('is_master_number')->default(false);
            $table->unsignedSmallInteger('birthday_number')->default(1);
            $table->unsignedSmallInteger('expression_number')->default(1);
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('birth_profiles');
    }
};
