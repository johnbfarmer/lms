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
        Schema::table('answer_sets', function (Blueprint $table) {
            $table->string('display_type')->after('problem_id')->default('numeric');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('answer_sets', function (Blueprint $table) {
            $table->dropColumn('display_type');
        });
    }
};
