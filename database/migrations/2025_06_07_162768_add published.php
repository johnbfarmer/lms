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
        Schema::table('courses', function (Blueprint $table) {
            $table->boolean('active')->after('description')->default(0);
        });
        Schema::table('problems', function (Blueprint $table) {
            $table->boolean('active')->after('problem_text')->default(0);
        });
        Schema::table('lesson_sets', function (Blueprint $table) {
            $table->boolean('active')->after('sequence_id')->default(0);
        });
        Schema::table('lessons', function (Blueprint $table) {
            $table->boolean('active')->after('sequence_id')->default(0);
        });
        Schema::table('answer_sets', function (Blueprint $table) {
            $table->boolean('active')->after('answer_text')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // return null;
    }
};
