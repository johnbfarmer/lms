<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Enrollment extends Model
{
    protected $fillable = [
        'user_id',
        'course_id',
        'is_premium',
    ];

    public static function enroll($userId, $courseId)
    {
        $sql = 'INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)';
        DB::insert($sql, [$userId, $courseId]);
    }
}
