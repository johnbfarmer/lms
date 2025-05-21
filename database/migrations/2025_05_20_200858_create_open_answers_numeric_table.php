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
        Schema::create('open_answers_numeric', function (Blueprint $table) {
            $table->id();
            $table->foreignId('problem_id');
            $table->decimal('answer', total: 12, places: 6);
            $table->decimal('pct_tolerance', total: 4, places: 2);
            $table->timestamp('created_at')->nullable()->useCurrent();
            $table->timestamp('updated_at')->nullable()->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('open_answers_numeric');
    }
};
