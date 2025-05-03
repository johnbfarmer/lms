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
        Schema::table('problems', function (Blueprint $table) {
            $table->dropColumn('problem_set_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('problems', function (Blueprint $table) {
            $table->string('problem_set_id')->after('lesson_id')->default('0');
        });
    }
};
