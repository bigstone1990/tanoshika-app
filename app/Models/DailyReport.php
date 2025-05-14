<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DailyReport extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'member_id',
        'date',
        'start_work_type',
        'end_work_type',
        'attendance_memo',
        'first_period',
        'second_period',
        'third_period',
        'fourth_period',
        'fifth_period',
        'comment',
        'next_schedule',
        'mental_condition_score',
        'physical_condition_score',
        'submitted_at',
        'staff_name',
        'staff_memo',
    ];
}
