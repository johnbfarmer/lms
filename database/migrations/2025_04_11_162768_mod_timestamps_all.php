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
        Schema::table('enrollments', function (Blueprint $table) {
            $table->timestamp('created_at')->nullable()->useCurrent()->change();
            $table->timestamp('updated_at')->nullable()->useCurrent()->useCurrentOnUpdate()->change();
        });
        Schema::table('users', function (Blueprint $table) {
            $table->timestamp('created_at')->nullable()->useCurrent()->change();
            $table->timestamp('updated_at')->nullable()->useCurrent()->useCurrentOnUpdate()->change();
        });
        Schema::table('answer_sets', function (Blueprint $table) {
            $table->timestamp('created_at')->nullable()->useCurrent()->change();
            $table->timestamp('updated_at')->nullable()->useCurrent()->useCurrentOnUpdate()->change();
        });
        Schema::table('courses', function (Blueprint $table) {
            $table->timestamp('created_at')->nullable()->useCurrent()->change();
            $table->timestamp('updated_at')->nullable()->useCurrent()->useCurrentOnUpdate()->change();
        });
        Schema::table('courses_users', function (Blueprint $table) {
            $table->timestamp('created_at')->nullable()->useCurrent()->change();
            $table->timestamp('updated_at')->nullable()->useCurrent()->useCurrentOnUpdate()->change();
        });
        Schema::table('lessons', function (Blueprint $table) {
            $table->timestamp('created_at')->nullable()->useCurrent()->change();
            $table->timestamp('updated_at')->nullable()->useCurrent()->useCurrentOnUpdate()->change();
        });
        Schema::table('lesson_sets', function (Blueprint $table) {
            $table->timestamp('created_at')->nullable()->useCurrent()->change();
            $table->timestamp('updated_at')->nullable()->useCurrent()->useCurrentOnUpdate()->change();
        });
        Schema::table('problems', function (Blueprint $table) {
            $table->timestamp('created_at')->nullable()->useCurrent()->change();
            $table->timestamp('updated_at')->nullable()->useCurrent()->useCurrentOnUpdate()->change();
        });
        Schema::table('problem_sets', function (Blueprint $table) {
            $table->timestamp('created_at')->nullable()->useCurrent()->change();
            $table->timestamp('updated_at')->nullable()->useCurrent()->useCurrentOnUpdate()->change();
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
