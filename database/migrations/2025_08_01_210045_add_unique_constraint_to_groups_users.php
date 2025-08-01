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
        Schema::table('student_group_user', function (Blueprint $table) {
            $table->unique(['student_group_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('student_group_user', function (Blueprint $table) {
            $table->dropUnique(['student_group_id', 'user_id']);
        });
    }
};
