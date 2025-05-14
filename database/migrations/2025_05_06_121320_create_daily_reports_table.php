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
        Schema::create('daily_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('member_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->date('date');
            $table->tinyInteger('start_work_type')->nullable();
            $table->tinyInteger('end_work_type')->nullable();
            $table->text('attendance_memo')->nullable();
            $table->text('first_period')->nullable();
            $table->text('second_period')->nullable();
            $table->text('third_period')->nullable();
            $table->text('fourth_period')->nullable();
            $table->text('fifth_period')->nullable();
            $table->text('comment')->nullable();
            $table->text('next_schedule')->nullable();
            $table->tinyInteger('mental_condition_score')->nullable();
            $table->tinyInteger('physical_condition_score')->nullable();
            $table->dateTime('submitted_at', precision: 0)->nullable();
            $table->string('staff_name')->nullable();
            $table->text('staff_memo')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_reports');
    }
};
